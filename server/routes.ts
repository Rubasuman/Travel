import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertTripSchema, insertItinerarySchema, insertPhotoSchema, insertNotificationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Users API
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const userPayload = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUid(userPayload.uid);
      
      if (existingUser) {
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
      const trip = await storage.createTrip(tripPayload);
      res.status(201).json(trip);
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
      const itineraryPayload = insertItinerarySchema.parse(req.body);
      const itinerary = await storage.createItinerary(itineraryPayload);
      res.status(201).json(itinerary);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid itinerary data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create itinerary" });
    }
  });
  
  app.patch("/api/itineraries/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      
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
      const photoPayload = insertPhotoSchema.parse(req.body);
      const photo = await storage.createPhoto(photoPayload);
      res.status(201).json(photo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid photo data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create photo" });
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

  return httpServer;
}
