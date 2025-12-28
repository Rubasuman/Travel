import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { insertUserSchema, insertTripSchema, insertItinerarySchema, insertPhotoSchema, insertNotificationSchema, insertHotelSchema, insertPlaceSchema, insertReviewSchema, insertBudgetSchema, insertExpenseSchema, insertCurrencyRateSchema } from "@shared/schema";
import { z } from "zod";
// Helper: sort activities array by HH:MM time ascending
function timeToMinutes(val: any): number {
  const s = String(val ?? '00:00');
  const m = s.match(/^(\d{1,2}):(\d{2})$/);
  const h = m ? parseInt(m[1], 10) : 0;
  const min = m ? parseInt(m[2], 10) : 0;
  return h * 60 + min;
}
function sortActivitiesByTime(list: any[] | undefined): any[] | undefined {
  if (!Array.isArray(list)) return list;
  return [...list].sort((a: any, b: any) => timeToMinutes(a?.time) - timeToMinutes(b?.time));
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Users API
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const userPayload = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUid(userPayload.uid);
      
      if (existingUser) {
        // Allow updating certain mutable fields when the user already exists.
        // For in-memory storage the returned object is the same reference
        // so mutating it persists; in other storage backends this path
        // could be extended to call an explicit update method.
        try {
          const body = req.body as any;
          if (body.username) existingUser.username = body.username;
          if (body.email) existingUser.email = body.email;
          if (body.displayName !== undefined) existingUser.displayName = body.displayName;
          if (body.photoURL !== undefined) existingUser.photoURL = body.photoURL;
        } catch (e) {
          // ignore if mutation not possible
        }
        return res.status(200).json(existingUser);
      }
      
      const user = await storage.createUser(userPayload);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  
  app.get("/api/users/uid/:uid", async (req: Request, res: Response) => {
    try {
      const uid = req.params.uid;
      const user = await storage.getUserByUid(uid);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  app.patch("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      console.log('[PATCH /api/users/:id] Updating user:', id, 'with:', updates);
      
      // First check if user exists
      const existingUser = await storage.getUser(id);
      if (!existingUser) {
        console.log('[PATCH /api/users/:id] User not found in database:', id);
        return res.status(404).json({ message: "User not found. Please log out and log in again." });
      }
      
      const updatedUser = await storage.updateUser(id, updates);
      
      if (!updatedUser) {
        console.log('[PATCH /api/users/:id] Update returned null/undefined');
        return res.status(404).json({ message: "Failed to update user" });
      }
      
      console.log('[PATCH /api/users/:id] Update successful:', updatedUser);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('[PATCH /api/users/:id] Error updating user:', error);
      res.status(500).json({ 
        message: "Failed to update user", 
        error: error instanceof Error ? error.message : String(error),
        details: error 
      });
    }
  });

  // NOTE: duplicate lightweight /api/trips handler removed during revert cleanup.
  // The main /api/trips handler remains further down in this file.
  // Destinations API
  app.get("/api/destinations", async (_req: Request, res: Response) => {
    try {
      const destinations = await storage.getDestinations();
      res.status(200).json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to get destinations" });
    }
  });
  
  app.get("/api/destinations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const destination = await storage.getDestination(id);
      
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      
      res.status(200).json(destination);
    } catch (error) {
      res.status(500).json({ message: "Failed to get destination" });
    }
  });
  
  // Trips API
  app.get("/api/users/:userId/trips", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const trips = await storage.getTrips(userId);
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ message: "Failed to get trips" });
    }
  });
  
  app.get("/api/trips/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const trip = await storage.getTrip(id);
      
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({ message: "Failed to get trip" });
    }
  });
  
  app.post("/api/trips", async (req: Request, res: Response) => {
    try {
      // Convert ISO date strings to Date objects
      const body = { ...req.body };
      if (typeof body.startDate === 'string') {
        body.startDate = new Date(body.startDate);
      }
      if (typeof body.endDate === 'string') {
        body.endDate = new Date(body.endDate);
      }
      
      const tripPayload = insertTripSchema.parse(body);
      // If Supabase service credentials are available, prefer writing to Supabase and return that row
      const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE;
      // Use unified storage (SupabaseStorage or MemStorage depending on configuration)
      const created = await storage.createTrip(tripPayload as any);
      res.status(201).json(created);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid trip data", errors: error.errors });
      }
      console.error("Failed to create trip:", error);
      res.status(500).json({ message: "Failed to create trip" });
    }
  });
  
  app.patch("/api/trips/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      
      const updatedTrip = await storage.updateTrip(id, updateData);
      
      if (!updatedTrip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      
      res.status(200).json(updatedTrip);
    } catch (error) {
      res.status(500).json({ message: "Failed to update trip" });
    }
  });
  
  app.delete("/api/trips/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteTrip(id);
      
      if (!success) {
        return res.status(404).json({ message: "Trip not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete trip" });
    }
  });
  
  // Itineraries API
  app.get("/api/trips/:tripId/itineraries", async (req: Request, res: Response) => {
    try {
      const tripId = parseInt(req.params.tripId);
      const itineraries = await storage.getItineraries(tripId);
      res.status(200).json(itineraries);
    } catch (error) {
      res.status(500).json({ message: "Failed to get itineraries" });
    }
  });
  
  app.post("/api/itineraries", async (req: Request, res: Response) => {
    try {
      // Coerce date string to Date so Zod/timestamp expects a Date object
      const body = { ...req.body };
      if (body && typeof body.date === 'string') {
        body.date = new Date(body.date);
      }
      // Sort activities by time if provided
      if (body && body.activities) {
        body.activities = sortActivitiesByTime(body.activities);
      }
      const itineraryPayload = insertItinerarySchema.parse(body);
      try {
        const created = await storage.createItinerary(itineraryPayload as any);
        return res.status(201).json(created);
      } catch (dbErr: any) {
        // Detect common FK/constraint errors and return a helpful message
        const msg = String(dbErr?.message || dbErr || '');
        if (/foreign key|violat(e|ion)|constraint/i.test(msg)) {
          return res.status(400).json({ message: 'Referenced trip not found in the database. Please save the trip before adding itineraries.' });
        }
        console.error('Failed to persist itinerary:', dbErr);
        throw dbErr;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid itinerary data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create itinerary" });
    }
  });

  // Create default itineraries for a trip (one per day)
  app.post('/api/trips/:tripId/itineraries/default', async (req: Request, res: Response) => {
    try {
      const tripId = parseInt(req.params.tripId);
      const trip = await storage.getTrip(tripId);
      if (!trip) return res.status(404).json({ message: 'Trip not found' });

      // If itineraries already exist, return them
      const existing = await storage.getItineraries(tripId);
      if (existing.length > 0) {
        return res.status(200).json(existing);
      }

      // Build default activities for each day
      const start = new Date(trip.startDate as any);
      const end = new Date(trip.endDate as any);
      const created: any[] = [];

      const oneDayMs = 24 * 60 * 60 * 1000;
      for (let day = 1, d = new Date(start.getTime()); d.getTime() <= end.getTime(); day++, d = new Date(d.getTime() + oneDayMs)) {
        const activities = [
          { time: '08:00', title: 'Breakfast', description: 'Start your day with a hearty breakfast.' },
          { time: '10:00', title: 'Morning Explore', description: 'Visit a nearby attraction or take a walk.' },
          { time: '13:00', title: 'Lunch', description: 'Enjoy local cuisine for lunch.' },
          { time: '15:00', title: 'Sightseeing', description: 'Plan an afternoon activity or museum visit.' },
          { time: '19:00', title: 'Dinner', description: 'Relax and dine at a recommended restaurant.' },
        ];

        const insert = {
          tripId,
          day,
          date: d,
          activities,
          notes: null,
        } as any;

        const it = await storage.createItinerary(insert);
        created.push(it);
      }

      return res.status(201).json(created);
    } catch (err) {
      console.error('Failed to create default itineraries:', err);
      res.status(500).json({ message: 'Failed to create default itineraries' });
    }
  });

  // Debug: insert a small test trip directly into Supabase so we can confirm writes
  app.post('/api/_debug/insert-test-trip', async (_req: Request, res: Response) => {
    try {
      const now = new Date();
      const insert = {
        userId: 1,
        destinationId: 1,
        title: `TEST TRIP ${now.toISOString()}`,
        startDate: now,
        endDate: now,
        description: 'Debug insert',
      };

      console.log('[routes] POST /api/_debug/insert-test-trip - using storage.createTrip, payload:', insert);
      const created = await storage.createTrip(insert as any);
      return res.status(201).json({ ok: true, created });
    } catch (err) {
      console.error('Debug insert failed:', err);
      res.status(500).json({ ok: false, error: String(err) });
    }
  });

  // AI-generated itinerary: generate and persist
  app.post('/api/trips/:tripId/itineraries/generate', async (req: Request, res: Response) => {
    try {
      const tripId = parseInt(req.params.tripId);
      const trip = await storage.getTrip(tripId);
      if (!trip) return res.status(404).json({ message: 'Trip not found' });

      // lazy import to avoid cycles and heavy startup
      const { generateItinerary } = await import('./itinerary-generator');

      const prefs = req.body.preferences ?? null;
      const aiItinerary = await generateItinerary({
        title: trip.title,
        startDate: trip.startDate?.toString?.() ?? String(trip.startDate),
        endDate: trip.endDate?.toString?.() ?? String(trip.endDate),
        // If you have destination metadata, consider loading the destination name to pass to generator
        destination: String(trip.destinationId),
        preferences: prefs,
      });

      // coerce and set tripId/day/date; currently generator returns InsertItinerary-like
      const toInsert = { ...aiItinerary, tripId };
      const created = await storage.createItinerary(toInsert as any);
      res.status(201).json(created);
    } catch (err: any) {
      console.error('Failed to generate itinerary:', err);
      res.status(500).json({ message: 'Failed to generate itinerary', error: String(err) });
    }
  });
  
  app.patch("/api/itineraries/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updateData: any = { ...req.body };
      if (updateData && updateData.activities) {
        updateData.activities = sortActivitiesByTime(updateData.activities);
      }
      
      const updatedItinerary = await storage.updateItinerary(id, updateData);
      
      if (!updatedItinerary) {
        return res.status(404).json({ message: "Itinerary not found" });
      }
      
      res.status(200).json(updatedItinerary);
    } catch (error) {
      res.status(500).json({ message: "Failed to update itinerary" });
    }
  });
  
  app.delete("/api/itineraries/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteItinerary(id);
      
      if (!success) {
        return res.status(404).json({ message: "Itinerary not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete itinerary" });
    }
  });
  
  // Photos API
  app.get("/api/users/:userId/photos", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const photos = await storage.getPhotos(userId);
      res.status(200).json(photos);
    } catch (error) {
      res.status(500).json({ message: "Failed to get photos" });
    }
  });
  
  app.get("/api/trips/:tripId/photos", async (req: Request, res: Response) => {
    try {
      const tripId = parseInt(req.params.tripId);
      const photos = await storage.getTripPhotos(tripId);
      res.status(200).json(photos);
    } catch (error) {
      res.status(500).json({ message: "Failed to get trip photos" });
    }
  });
  
  app.post("/api/photos", async (req: Request, res: Response) => {
    try {
  console.log('POST /api/photos handler [v2] - received at', new Date().toISOString());
  console.log('POST /api/photos body preview:', { keys: Object.keys(req.body).slice(0,10) });
      // Build a safe, coerced payload server-side so Zod receives the correct types.
      const body = { ...req.body };

      const photoPayloadRaw = {
        userId: typeof body.userId === 'string' ? parseInt(body.userId) : body.userId,
        tripId: body.tripId ? (typeof body.tripId === 'string' ? parseInt(body.tripId) : body.tripId) : null,
        imageUrl: String(body.imageUrl),
        caption: body.caption ?? null,
        // Server-controlled timestamp ensures correct type
        uploadedAt: new Date(),
      };

      // Validate/coerce using zod; if validation still fails, try a tolerant fallback
      const parsed = insertPhotoSchema.safeParse(photoPayloadRaw);
      if (!parsed.success) {
        console.warn('/api/photos validation failed, attempting coercion', { errors: parsed.error.errors, payload: photoPayloadRaw });
        // Last ditch: ensure uploadedAt is a Date and try again
        photoPayloadRaw.uploadedAt = new Date();
        const parsed2 = insertPhotoSchema.safeParse(photoPayloadRaw);
        if (!parsed2.success) {
          // If schema still rejects, bypass strict parse and insert a minimal object to storage
          const photo = await storage.createPhoto(photoPayloadRaw as any);
          return res.status(201).json(photo);
        }
        const photo = await storage.createPhoto(parsed2.data);
        return res.status(201).json(photo);
      }

      const photo = await storage.createPhoto(parsed.data);
      res.status(201).json(photo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('POST /api/photos ZodError [v2]:', error.errors);
        return res.status(400).json({ message: "Invalid photo data [v2]", errors: error.errors });
      }
      console.error('POST /api/photos unexpected error [v2]:', error);
      res.status(500).json({ message: "Failed to create photo [v2]" });
    }
  });

  // Return a short-lived signed URL for a photo's storage object (requires SUPABASE_SERVICE_ROLE_KEY env)
  app.get('/api/photos/:id/signed-url', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const photo = await storage.getPhoto(id);
      if (!photo) return res.status(404).json({ message: 'Photo not found' });

      // photo.imageUrl may be stored in two formats:
      // 1) "bucket/path/to/file.jpg" (stored by client as bucket + object path)
      // 2) Full public Supabase URL like https://project.supabase.co/storage/v1/object/public/bucket/path
      try {
        const value = photo.imageUrl;

        // Helper: if value looks like a full URL, return it directly (public buckets)
        try {
          const maybeUrl = new URL(value);
          // If it's a Supabase storage public URL, return it without signing
          if (maybeUrl.pathname.includes('/storage/v1/object/public/')) {
            return res.status(200).json({ signedUrl: value });
          }
        } catch (e) {
          // not a URL, continue
        }

        // Otherwise expect format "bucket/path/to/object"
        const parts = value.split('/');
        const bucket = parts.shift();
        const objectPath = parts.join('/');
        if (!bucket || !objectPath) {
          return res.status(400).json({ message: 'Invalid stored imageUrl format; expected bucket/object or full URL' });
        }

        const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE;
        if (!supabaseUrl || !serviceKey) {
          // If service key missing, return a constructed public URL as best-effort
          const publicUrl = `${(supabaseUrl || '').replace(/\s+$/,'')}/storage/v1/object/public/${bucket}/${objectPath}`;
          return res.status(200).json({ signedUrl: publicUrl });
        }

          const sb = createSupabaseClient(supabaseUrl, serviceKey);
        const { data, error } = await sb.storage.from(bucket).createSignedUrl(objectPath, 60);
        if (error) {
          return res.status(500).json({ message: 'Failed to create signed url', error });
        }

        return res.status(200).json({ signedUrl: data?.signedUrl });
      } catch (err) {
        return res.status(500).json({ message: 'Failed to generate signed URL', error: String(err) });
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to get photo' });
    }
  });

  // Proxy route that redirects directly to a photo's signed/public URL so the browser can load it
  app.get('/api/photos/:id/raw', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const photo = await storage.getPhoto(id);
      if (!photo) return res.status(404).json({ message: 'Photo not found' });

      const value = photo.imageUrl;
      // If full URL or data URL, redirect directly
      try {
        const maybeUrl = new URL(String(value));
        return res.redirect(String(value));
      } catch (e) {
        // not a full URL, continue
      }

      // Otherwise expect format bucket/object
      const parts = String(value).replace(/^\/+/, '').split('/');
      const bucket = parts.shift();
      const objectPath = parts.join('/');
      if (!bucket || !objectPath) {
        return res.status(400).json({ message: 'Invalid stored imageUrl format; expected bucket/object or full URL' });
      }

      const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE;
      if (!supabaseUrl || !serviceKey) {
        // If service key missing but supabaseUrl present, redirect to public path
        if (supabaseUrl) {
          const publicUrl = `${String(supabaseUrl).replace(/\/+$/, '')}/storage/v1/object/public/${bucket}/${objectPath}`;
          return res.redirect(publicUrl);
        }
        return res.status(500).json({ message: 'Supabase configuration missing for image retrieval' });
      }

      const sb = createSupabaseClient(supabaseUrl, serviceKey);
      const { data, error } = await sb.storage.from(bucket).createSignedUrl(objectPath, 60);
      if (error) {
        return res.status(500).json({ message: 'Failed to create signed url', error });
      }

      return res.redirect(data?.signedUrl || '');
    } catch (err) {
      console.error('Failed to redirect to raw photo url', err);
      res.status(500).json({ message: 'Failed to get photo raw url' });
    }
  });
  
  app.delete("/api/photos/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePhoto(id);
      
      if (!success) {
        return res.status(404).json({ message: "Photo not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete photo" });
    }
  });
  
  // Notifications API
  app.get("/api/users/:userId/notifications", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const notifications = await storage.getNotifications(userId);
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Failed to get notifications" });
    }
  });
  
  app.post("/api/notifications", async (req: Request, res: Response) => {
    try {
      const notificationPayload = insertNotificationSchema.parse(req.body);
      const notification = await storage.createNotification(notificationPayload);
      res.status(201).json(notification);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid notification data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create notification" });
    }
  });
  
  app.patch("/api/notifications/:id/read", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.markNotificationAsRead(id);
      
      if (!success) {
        return res.status(404).json({ message: "Notification not found" });
      }
      
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });
  
  // Hotels API
  app.get("/api/destinations/:destinationId/hotels", async (req: Request, res: Response) => {
    try {
      const destinationId = parseInt(req.params.destinationId);
      const hotels = await storage.getHotels(destinationId);
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Failed to get hotels" });
    }
  });
  
  app.get("/api/hotels/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const hotel = await storage.getHotel(id);
      
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      
      res.status(200).json(hotel);
    } catch (error) {
      res.status(500).json({ message: "Failed to get hotel" });
    }
  });
  
  app.post("/api/hotels", async (req: Request, res: Response) => {
    try {
      const hotelPayload = insertHotelSchema.parse(req.body);
      const hotel = await storage.createHotel(hotelPayload);
      res.status(201).json(hotel);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid hotel data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create hotel" });
    }
  });
  
  // Places API
  app.get("/api/destinations/:destinationId/places", async (req: Request, res: Response) => {
    try {
      const destinationId = parseInt(req.params.destinationId);
      const places = await storage.getPlaces(destinationId);
      res.status(200).json(places);
    } catch (error) {
      res.status(500).json({ message: "Failed to get places" });
    }
  });
  
  app.get("/api/places/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const place = await storage.getPlace(id);
      
      if (!place) {
        return res.status(404).json({ message: "Place not found" });
      }
      
      res.status(200).json(place);
    } catch (error) {
      res.status(500).json({ message: "Failed to get place" });
    }
  });
  
  app.post("/api/places", async (req: Request, res: Response) => {
    try {
      const placePayload = insertPlaceSchema.parse(req.body);
      const place = await storage.createPlace(placePayload);
      res.status(201).json(place);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid place data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create place" });
    }
  });
  
  // Reviews API
  app.get("/api/reviews", async (req: Request, res: Response) => {
    try {
      const hotelId = req.query.hotelId ? parseInt(req.query.hotelId as string) : undefined;
      const placeId = req.query.placeId ? parseInt(req.query.placeId as string) : undefined;
      const reviews = await storage.getReviews(hotelId, placeId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to get reviews" });
    }
  });
  
  app.get("/api/reviews/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const review = await storage.getReview(id);
      
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ message: "Failed to get review" });
    }
  });
  
  app.post("/api/reviews", async (req: Request, res: Response) => {
    try {
      // Convert ISO date strings to Date objects
      const body = { ...req.body };
      if (typeof body.createdAt === 'string') {
        body.createdAt = new Date(body.createdAt);
      }
      if (typeof body.updatedAt === 'string') {
        body.updatedAt = new Date(body.updatedAt);
      }
      
      const reviewPayload = insertReviewSchema.parse(body);
      const review = await storage.createReview(reviewPayload);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });
  
  app.patch("/api/reviews/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      
      const updatedReview = await storage.updateReview(id, updateData);
      
      if (!updatedReview) {
        return res.status(404).json({ message: "Review not found" });
      }
      
      res.status(200).json(updatedReview);
    } catch (error) {
      res.status(500).json({ message: "Failed to update review" });
    }
  });
  
  app.delete("/api/reviews/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteReview(id);
      
      if (!success) {
        return res.status(404).json({ message: "Review not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete review" });
    }
  });

  // Budget routes
  app.get('/api/trips/:tripId/budget', async (req, res) => {
    try {
      const tripId = parseInt(req.params.tripId);
      const budget = await storage.getBudgetByTrip(tripId);
      res.json(budget);
    } catch (error) {
      console.error('Get budget error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.post('/api/trips/:tripId/budget', async (req, res) => {
    try {
      const tripId = parseInt(req.params.tripId);
      const budgetData = { ...req.body, tripId };
      const result = insertBudgetSchema.safeParse(budgetData);
      if (!result.success) {
        return res.status(400).json({ error: result.error.issues });
      }
      const budget = await storage.createBudget(result.data);
      res.status(201).json(budget);
    } catch (error) {
      console.error('Create budget error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.put('/api/budgets/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const budget = await storage.updateBudget(id, req.body);
      if (!budget) {
        return res.status(404).json({ error: 'Budget not found' });
      }
      res.json(budget);
    } catch (error) {
      console.error('Update budget error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Expense routes
  app.get('/api/trips/:tripId/expenses', async (req, res) => {
    try {
      const tripId = parseInt(req.params.tripId);
      const expenses = await storage.getExpenses(tripId);
      res.json(expenses);
    } catch (error) {
      console.error('Get expenses error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.post('/api/expenses', async (req, res) => {
    try {
      const result = insertExpenseSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.issues });
      }
      const expense = await storage.createExpense(result.data);
      res.status(201).json(expense);
    } catch (error) {
      console.error('Create expense error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.put('/api/expenses/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const expense = await storage.updateExpense(id, req.body);
      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      res.json(expense);
    } catch (error) {
      console.error('Update expense error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.delete('/api/expenses/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteExpense(id);
      if (!success) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Delete expense error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return httpServer;
}
