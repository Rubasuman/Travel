import { 
  users, type User, type InsertUser,
  destinations, type Destination, type InsertDestination,
  trips, type Trip, type InsertTrip,
  itineraries, type Itinerary, type InsertItinerary,
  photos, type Photo, type InsertPhoto,
  notifications, type Notification, type InsertNotification,
  hotels, type Hotel, type InsertHotel,
  places, type Place, type InsertPlace,
  reviews, type Review, type InsertReview,
  budgets, type Budget, type InsertBudget,
  expenses, type Expense, type InsertExpense,
  currencyRates, type CurrencyRate, type InsertCurrencyRate
} from "@shared/schema";
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUid(uid: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // Destination operations
  getDestinations(): Promise<Destination[]>;
  getDestination(id: number): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  
  // Trip operations
  getTrips(userId: number): Promise<Trip[]>;
  getTrip(id: number): Promise<Trip | undefined>;
  createTrip(trip: InsertTrip): Promise<Trip>;
  updateTrip(id: number, trip: Partial<Trip>): Promise<Trip | undefined>;
  deleteTrip(id: number): Promise<boolean>;
  
  // Itinerary operations
  getItineraries(tripId: number): Promise<Itinerary[]>;
  getItinerary(id: number): Promise<Itinerary | undefined>;
  createItinerary(itinerary: InsertItinerary): Promise<Itinerary>;
  updateItinerary(id: number, itinerary: Partial<Itinerary>): Promise<Itinerary | undefined>;
  deleteItinerary(id: number): Promise<boolean>;
  
  // Photo operations
  getPhotos(userId: number): Promise<Photo[]>;
  getTripPhotos(tripId: number): Promise<Photo[]>;
  getPhoto(id: number): Promise<Photo | undefined>;
  createPhoto(photo: InsertPhoto): Promise<Photo>;
  deletePhoto(id: number): Promise<boolean>;
  
  // Notification operations
  getNotifications(userId: number): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: number): Promise<boolean>;
  
  // Hotel operations
  getHotels(destinationId: number): Promise<Hotel[]>;
  getHotel(id: number): Promise<Hotel | undefined>;
  createHotel(hotel: InsertHotel): Promise<Hotel>;
  
  // Place operations
  getPlaces(destinationId: number): Promise<Place[]>;
  getPlace(id: number): Promise<Place | undefined>;
  createPlace(place: InsertPlace): Promise<Place>;
  
  // Review operations
  getReviews(hotelId?: number, placeId?: number): Promise<Review[]>;
  getReview(id: number): Promise<Review | undefined>;
  createReview(review: InsertReview): Promise<Review>;
  updateReview(id: number, review: Partial<Review>): Promise<Review | undefined>;
  deleteReview(id: number): Promise<boolean>;
  
  // Budget operations
  getBudgets(tripId: number): Promise<Budget[]>;
  getBudget(id: number): Promise<Budget | undefined>;
  getBudgetByTrip(tripId: number): Promise<Budget | undefined>;
  createBudget(budget: InsertBudget): Promise<Budget>;
  updateBudget(id: number, budget: Partial<Budget>): Promise<Budget | undefined>;
  deleteBudget(id: number): Promise<boolean>;
  
  // Expense operations
  getExpenses(tripId: number): Promise<Expense[]>;
  getExpensesByBudget(budgetId: number): Promise<Expense[]>;
  getExpense(id: number): Promise<Expense | undefined>;
  createExpense(expense: InsertExpense): Promise<Expense>;
  updateExpense(id: number, expense: Partial<Expense>): Promise<Expense | undefined>;
  deleteExpense(id: number): Promise<boolean>;
  
  // Currency operations
  getCurrencyRate(baseCurrency: string, targetCurrency: string): Promise<CurrencyRate | undefined>;
  createOrUpdateCurrencyRate(rate: InsertCurrencyRate): Promise<CurrencyRate>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private destinations: Map<number, Destination>;
  private trips: Map<number, Trip>;
  private itineraries: Map<number, Itinerary>;
  private photos: Map<number, Photo>;
  private notifications: Map<number, Notification>;
  private hotels: Map<number, Hotel>;
  private places: Map<number, Place>;
  private reviews: Map<number, Review>;
  private budgets: Map<number, Budget>;
  private expenses: Map<number, Expense>;
  private currencyRates: Map<string, CurrencyRate>;
  
  private currentUserId: number;
  private currentDestinationId: number;
  private currentTripId: number;
  private currentItineraryId: number;
  private currentPhotoId: number;
  private currentNotificationId: number;
  private currentHotelId: number;
  private currentPlaceId: number;
  private currentReviewId: number;
  private currentBudgetId: number;
  private currentExpenseId: number;
  private currentCurrencyRateId: number;

  constructor() {
    this.users = new Map();
    this.destinations = new Map();
    this.trips = new Map();
    this.itineraries = new Map();
    this.photos = new Map();
    this.notifications = new Map();
    this.hotels = new Map();
    this.places = new Map();
    this.reviews = new Map();
    this.budgets = new Map();
    this.expenses = new Map();
    this.currencyRates = new Map();
    
    this.currentUserId = 1;
    this.currentDestinationId = 1;
    this.currentTripId = 1;
    this.currentItineraryId = 1;
    this.currentPhotoId = 1;
    this.currentNotificationId = 1;
    this.currentHotelId = 1;
    this.currentPlaceId = 1;
    this.currentReviewId = 1;
    this.currentBudgetId = 1;
    this.currentExpenseId = 1;
    this.currentCurrencyRateId = 1;
    
    // Add sample data
    this.seedDestinations();
    this.seedHotelsAndPlaces();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUid(uid: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.uid === uid);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      photoURL: insertUser.photoURL ?? null,
      displayName: insertUser.displayName ?? null
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userUpdate: Partial<User>): Promise<User | undefined> {
    const existing = this.users.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...userUpdate, id };
    this.users.set(id, updated);
    return updated;
  }

  // Destination operations
  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getDestination(id: number): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async createDestination(destination: InsertDestination): Promise<Destination> {
    const id = this.currentDestinationId++;
    const newDestination: Destination = { 
      ...destination, 
      id,
      city: destination.city ?? null,
      description: destination.description ?? null,
      imageUrl: destination.imageUrl ?? null,
      latitude: destination.latitude ?? null,
      longitude: destination.longitude ?? null,
      rating: destination.rating ?? null,
      category: destination.category ?? null,
      address: destination.address ?? null,
      mapUrl: destination.mapUrl ?? null
    };
    this.destinations.set(id, newDestination);
    return newDestination;
  }

  // Trip operations
  async getTrips(userId: number): Promise<Trip[]> {
    return Array.from(this.trips.values()).filter(trip => trip.userId === userId);
  }

  async getTrip(id: number): Promise<Trip | undefined> {
    return this.trips.get(id);
  }

  async createTrip(trip: InsertTrip): Promise<Trip> {
    const id = this.currentTripId++;
    const newTrip: Trip = { 
      ...trip, 
      id,
      description: trip.description ?? null,
      imageUrl: trip.imageUrl ?? null,
      activities: trip.activities ?? null,
      isFavorite: trip.isFavorite ?? null
    };
    this.trips.set(id, newTrip);
    return newTrip;
  }

  async updateTrip(id: number, tripUpdate: Partial<Trip>): Promise<Trip | undefined> {
    const trip = this.trips.get(id);
    if (!trip) return undefined;
    
    const updatedTrip = { ...trip, ...tripUpdate };
    this.trips.set(id, updatedTrip);
    return updatedTrip;
  }

  async deleteTrip(id: number): Promise<boolean> {
    return this.trips.delete(id);
  }

  // Itinerary operations
  async getItineraries(tripId: number): Promise<Itinerary[]> {
    return Array.from(this.itineraries.values()).filter(itinerary => itinerary.tripId === tripId);
  }

  async getItinerary(id: number): Promise<Itinerary | undefined> {
    return this.itineraries.get(id);
  }

  async createItinerary(itinerary: InsertItinerary): Promise<Itinerary> {
    const id = this.currentItineraryId++;
    const newItinerary: Itinerary = { 
      ...itinerary, 
      id,
      notes: itinerary.notes ?? null
    };
    this.itineraries.set(id, newItinerary);
    return newItinerary;
  }

  async updateItinerary(id: number, itineraryUpdate: Partial<Itinerary>): Promise<Itinerary | undefined> {
    const itinerary = this.itineraries.get(id);
    if (!itinerary) return undefined;
    
    const updatedItinerary = { ...itinerary, ...itineraryUpdate };
    this.itineraries.set(id, updatedItinerary);
    return updatedItinerary;
  }

  async deleteItinerary(id: number): Promise<boolean> {
    return this.itineraries.delete(id);
  }

  // Photo operations
  async getPhotos(userId: number): Promise<Photo[]> {
    return Array.from(this.photos.values()).filter(photo => photo.userId === userId);
  }

  async getTripPhotos(tripId: number): Promise<Photo[]> {
    return Array.from(this.photos.values()).filter(photo => photo.tripId === tripId);
  }

  async getPhoto(id: number): Promise<Photo | undefined> {
    return this.photos.get(id);
  }

  async createPhoto(photo: InsertPhoto): Promise<Photo> {
    const id = this.currentPhotoId++;
    const newPhoto: Photo = { 
      ...photo, 
      id,
      tripId: photo.tripId ?? null,
      caption: photo.caption ?? null
    };
    this.photos.set(id, newPhoto);
    return newPhoto;
  }

  async deletePhoto(id: number): Promise<boolean> {
    return this.photos.delete(id);
  }

  // Notification operations
  async getNotifications(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter(notification => notification.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const id = this.currentNotificationId++;
    const newNotification: Notification = { 
      ...notification, 
      id,
      isRead: notification.isRead ?? null
    };
    this.notifications.set(id, newNotification);
    return newNotification;
  }

  async markNotificationAsRead(id: number): Promise<boolean> {
    const notification = this.notifications.get(id);
    if (!notification) return false;
    
    notification.isRead = true;
    this.notifications.set(id, notification);
    return true;
  }

  // Hotel operations
  async getHotels(destinationId: number): Promise<Hotel[]> {
    return Array.from(this.hotels.values()).filter(hotel => hotel.destinationId === destinationId);
  }

  async getHotel(id: number): Promise<Hotel | undefined> {
    return this.hotels.get(id);
  }

  async createHotel(hotel: InsertHotel): Promise<Hotel> {
    const id = this.currentHotelId++;
    const newHotel: Hotel = { 
      ...hotel, 
      id,
      rating: hotel.rating ?? null,
      pricePerNight: hotel.pricePerNight ?? null,
      description: hotel.description ?? null,
      amenities: hotel.amenities ?? [],
      imageUrls: hotel.imageUrls ?? [],
      virtual360Url: hotel.virtual360Url ?? null,
      website: hotel.website ?? null,
      phone: hotel.phone ?? null
    };
    this.hotels.set(id, newHotel);
    return newHotel;
  }

  // Place operations
  async getPlaces(destinationId: number): Promise<Place[]> {
    return Array.from(this.places.values()).filter(place => place.destinationId === destinationId);
  }

  async getPlace(id: number): Promise<Place | undefined> {
    return this.places.get(id);
  }

  async createPlace(place: InsertPlace): Promise<Place> {
    const id = this.currentPlaceId++;
    const newPlace: Place = { 
      ...place, 
      id,
      rating: place.rating ?? null,
      description: place.description ?? null,
      imageUrls: place.imageUrls ?? [],
      virtual360Url: place.virtual360Url ?? null,
      website: place.website ?? null,
      phone: place.phone ?? null,
      openingHours: place.openingHours ?? null,
      priceRange: place.priceRange ?? null
    };
    this.places.set(id, newPlace);
    return newPlace;
  }

  // Review operations
  async getReviews(hotelId?: number, placeId?: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => {
      if (hotelId) return review.hotelId === hotelId;
      if (placeId) return review.placeId === placeId;
      return true;
    });
  }

  async getReview(id: number): Promise<Review | undefined> {
    return this.reviews.get(id);
  }

  async createReview(review: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const newReview: Review = { 
      ...review, 
      id,
      hotelId: review.hotelId ?? null,
      placeId: review.placeId ?? null,
      title: review.title ?? null,
      imageUrls: review.imageUrls ?? [],
      virtual360Url: review.virtual360Url ?? null,
      isVerified: review.isVerified ?? null
    };
    this.reviews.set(id, newReview);
    return newReview;
  }

  async updateReview(id: number, reviewUpdate: Partial<Review>): Promise<Review | undefined> {
    const review = this.reviews.get(id);
    if (!review) return undefined;
    
    const updatedReview = { ...review, ...reviewUpdate };
    this.reviews.set(id, updatedReview);
    return updatedReview;
  }

  async deleteReview(id: number): Promise<boolean> {
    return this.reviews.delete(id);
  }

  // Budget operations
  async getBudgets(tripId: number): Promise<Budget[]> {
    return Array.from(this.budgets.values()).filter(budget => budget.tripId === tripId);
  }

  async getBudget(id: number): Promise<Budget | undefined> {
    return this.budgets.get(id);
  }

  async getBudgetByTrip(tripId: number): Promise<Budget | undefined> {
    return Array.from(this.budgets.values()).find(budget => budget.tripId === tripId);
  }

  async createBudget(budget: InsertBudget): Promise<Budget> {
    const id = this.currentBudgetId++;
    const newBudget: Budget = { 
      ...budget, 
      id,
  // ensure currency is always present (required by Budget type)
  currency: budget.currency ?? 'USD',
  createdAt: budget.createdAt || new Date(),
  updatedAt: budget.updatedAt || new Date()
    };
    this.budgets.set(id, newBudget);
    return newBudget;
  }

  async updateBudget(id: number, budgetUpdate: Partial<Budget>): Promise<Budget | undefined> {
    const budget = this.budgets.get(id);
    if (!budget) return undefined;
    
    const updatedBudget = { ...budget, ...budgetUpdate, updatedAt: new Date() };
    this.budgets.set(id, updatedBudget);
    return updatedBudget;
  }

  async deleteBudget(id: number): Promise<boolean> {
    return this.budgets.delete(id);
  }

  // Expense operations
  async getExpenses(tripId: number): Promise<Expense[]> {
    return Array.from(this.expenses.values()).filter(expense => expense.tripId === tripId);
  }

  async getExpensesByBudget(budgetId: number): Promise<Expense[]> {
    return Array.from(this.expenses.values()).filter(expense => expense.budgetId === budgetId);
  }

  async getExpense(id: number): Promise<Expense | undefined> {
    return this.expenses.get(id);
  }

  async createExpense(expense: InsertExpense): Promise<Expense> {
    const id = this.currentExpenseId++;
    const newExpense: Expense = { 
      ...expense, 
      id,
  // ensure currency is always present (required by Expense type)
  currency: expense.currency ?? 'USD',
      budgetId: expense.budgetId ?? null,
      originalAmount: expense.originalAmount ?? null,
      originalCurrency: expense.originalCurrency ?? null,
      location: expense.location ?? null,
      receiptUrl: expense.receiptUrl ?? null,
      exchangeRate: expense.exchangeRate ?? null,
      createdAt: expense.createdAt || new Date()
    };
    this.expenses.set(id, newExpense);
    return newExpense;
  }

  async updateExpense(id: number, expenseUpdate: Partial<Expense>): Promise<Expense | undefined> {
    const expense = this.expenses.get(id);
    if (!expense) return undefined;
    
    const updatedExpense = { ...expense, ...expenseUpdate };
    this.expenses.set(id, updatedExpense);
    return updatedExpense;
  }

  async deleteExpense(id: number): Promise<boolean> {
    return this.expenses.delete(id);
  }

  // Currency operations
  async getCurrencyRate(baseCurrency: string, targetCurrency: string): Promise<CurrencyRate | undefined> {
    const key = `${baseCurrency}-${targetCurrency}`;
    return this.currencyRates.get(key);
  }

  async createOrUpdateCurrencyRate(rate: InsertCurrencyRate): Promise<CurrencyRate> {
    const key = `${rate.baseCurrency}-${rate.targetCurrency}`;
    const id = this.currentCurrencyRateId++;
    const newRate: CurrencyRate = { 
      ...rate, 
      id,
      lastUpdated: rate.lastUpdated || new Date()
    };
    this.currencyRates.set(key, newRate);
    return newRate;
  }

  // Seed data
  private seedDestinations() {
    const destinations: InsertDestination[] = [
      {
        name: "Paris",
        country: "France",
        city: "Paris",
        description: "Experience the city of love with its iconic landmarks and romantic atmosphere.",
        imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
        latitude: "48.8566",
        longitude: "2.3522",
        rating: "4.8",
        category: "City",
        address: "Paris, France"
      },
      {
        name: "Rome",
        country: "Italy",
        city: "Rome",
        description: "Explore ancient ruins and experience the rich history of the Eternal City.",
        imageUrl: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        latitude: "41.9028",
        longitude: "12.4964",
        rating: "4.7",
        category: "Historical",
        address: "Rome, Italy"
      },
      {
        name: "Santorini",
        country: "Greece",
        city: "Santorini",
        description: "Enjoy breathtaking sunsets and stunning views of the Aegean Sea.",
        imageUrl: "https://images.unsplash.com/photo-1582050041567-9cfdd330d545?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        latitude: "36.3932",
        longitude: "25.4615",
        rating: "4.9",
        category: "Beach",
        address: "Santorini, Greece"
      },
      {
        name: "New York",
        country: "USA",
        city: "New York",
        description: "Explore the city that never sleeps with its iconic skyline and vibrant atmosphere.",
        imageUrl: "https://images.unsplash.com/photo-1543832923-44667a44c804?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        latitude: "40.7128",
        longitude: "-74.0060",
        rating: "4.6",
        category: "City",
        address: "New York, NY, USA"
      },
      {
        name: "Tokyo",
        country: "Japan",
        city: "Tokyo",
        description: "Discover the perfect blend of traditional culture and futuristic cityscape.",
        imageUrl: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
        latitude: "35.6762",
        longitude: "139.6503",
        rating: "4.8",
        category: "City",
        address: "Tokyo, Japan"
      },
      {
        name: "Delhi",
        country: "India",
        city: "Delhi",
        description: "Explore India's capital city where ancient monuments blend seamlessly with modern architecture. Experience the bustling markets, spiritual temples, and rich Mughal heritage in this vibrant metropolis that serves as the heart of India.",
        imageUrl: "https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        latitude: "28.6139",
        longitude: "77.2090",
        rating: "4.6",
        category: "City",
        address: "Delhi, India"
      }
    ];

    destinations.forEach(destination => {
      this.createDestination(destination);
    });
  }

  private seedHotelsAndPlaces() {
    // Paris hotels and places
    this.createHotel({
      name: "Hotel Ritz Paris",
      destinationId: 1,
      address: "15 Place Vendôme, 75001 Paris, France",
      latitude: "48.8680",
      longitude: "2.3299",
      rating: "4.9",
      pricePerNight: "800.00",
      description: "Luxury hotel in the heart of Paris with world-class amenities.",
      amenities: ["Spa", "Restaurant", "Bar", "Concierge", "Room Service"],
      imageUrls: ["https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
      website: "https://www.ritzparis.com",
      phone: "+33 1 43 16 30 30"
    });

    this.createPlace({
      name: "Eiffel Tower",
      destinationId: 1,
      address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
      latitude: "48.8584",
      longitude: "2.2945",
      category: "Attraction",
      rating: "4.6",
      description: "Iconic iron lattice tower and symbol of Paris.",
      imageUrls: ["https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
      openingHours: {"monday": "9:30-23:45", "tuesday": "9:30-23:45", "wednesday": "9:30-23:45", "thursday": "9:30-23:45", "friday": "9:30-23:45", "saturday": "9:30-23:45", "sunday": "9:30-23:45"},
      priceRange: "$$"
    });

    // Tokyo hotels and places
    this.createHotel({
      name: "Park Hyatt Tokyo",
      destinationId: 5,
      address: "3-7-1-2 Nishi-Shinjuku, Shinjuku City, Tokyo 163-1055, Japan",
      latitude: "35.6859",
      longitude: "139.6917",
      rating: "4.8",
      pricePerNight: "600.00",
      description: "Luxury hotel with stunning city views and world-class service.",
      amenities: ["Spa", "Fitness Center", "Pool", "Restaurant", "Bar"],
      imageUrls: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
      website: "https://www.hyatt.com",
      phone: "+81 3-5322-1234"
    });

    this.createPlace({
      name: "Senso-ji Temple",
      destinationId: 5,
      address: "2-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan",
      latitude: "35.7148",
      longitude: "139.7967",
      category: "Temple",
      rating: "4.5",
      description: "Tokyo's oldest temple with traditional architecture and cultural significance.",
      imageUrls: ["https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
      openingHours: {"monday": "6:00-17:00", "tuesday": "6:00-17:00", "wednesday": "6:00-17:00", "thursday": "6:00-17:00", "friday": "6:00-17:00", "saturday": "6:00-17:00", "sunday": "6:00-17:00"},
      priceRange: "Free"
    });

    // Rome hotels and places
    this.createHotel({
      name: "Hotel de' Ricci",
      destinationId: 2,
      address: "Via delle Carrozze, 7, 00186 Rome, Italy",
      latitude: "41.9009",
      longitude: "12.4833",
      rating: "4.7",
      pricePerNight: "220.00",
      description: "Boutique hotel located close to Rome's historic centre with intimate rooms and personalized service.",
      amenities: ["Bar", "Concierge", "Breakfast"],
      imageUrls: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
      website: "https://www.hoteldericci.com",
      phone: "+39 06 700 1234"
    });

    this.createPlace({
      name: "Colosseum",
      destinationId: 2,
      address: "Piazza del Colosseo, 1, 00184 Roma RM, Italy",
      latitude: "41.8902",
      longitude: "12.4922",
      category: "Attraction",
      rating: "4.8",
      description: "An iconic symbol of Imperial Rome; ancient amphitheatre and major tourist attraction.",
      imageUrls: ["https://images.unsplash.com/photo-1549893079-8a1b9c8f3d07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
      openingHours: {"monday": "8:30-19:00", "tuesday": "8:30-19:00", "wednesday": "8:30-19:00", "thursday": "8:30-19:00", "friday": "8:30-19:00", "saturday": "8:30-19:00", "sunday": "8:30-19:00"},
      priceRange: "$$"
    });

    // Santorini hotels and places
    this.createHotel({
      name: "Santorini Suites",
      destinationId: 3,
      address: "Oia, Santorini, Greece",
      latitude: "36.4616",
      longitude: "25.3750",
      rating: "4.9",
      pricePerNight: "350.00",
      description: "Clifftop suites with caldera views and private terraces.",
      amenities: ["Breakfast", "Terrace", "Airport Transfer"],
      imageUrls: ["https://images.unsplash.com/photo-1505765053186-0a2f1f3b8d6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
      website: "https://www.santorinisuites.example",
      phone: "+30 2286 123456"
    });

    this.createPlace({
      name: "Oia Sunset Point",
      destinationId: 3,
      address: "Oia, 84702, Santorini, Greece",
      latitude: "36.4619",
      longitude: "25.3755",
      category: "Scenic",
      rating: "4.9",
      description: "Famous sunset viewpoint offering breathtaking views over the caldera.",
      imageUrls: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
      openingHours: {"daily": "All day"},
      priceRange: "Free"
    });

    // New York hotels and places
    this.createHotel({
      name: "The Midtown Grand",
      destinationId: 4,
      address: "45 W 45th St, New York, NY 10036, USA",
      latitude: "40.7561",
      longitude: "-73.9845",
      rating: "4.6",
      pricePerNight: "320.00",
      description: "Comfortable downtown hotel close to Times Square and Broadway theaters.",
      amenities: ["Gym", "Restaurant", "Room Service"],
      imageUrls: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
      website: "https://www.midtowngrand.example",
      phone: "+1 212-555-0123"
    });

    this.createPlace({
      name: "Central Park",
      destinationId: 4,
      address: "New York, NY, USA",
      latitude: "40.7851",
      longitude: "-73.9683",
      category: "Park",
      rating: "4.8",
      description: "Large public park in the center of Manhattan offering walking paths, lakes, and attractions.",
      imageUrls: ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
      openingHours: {"daily": "06:00-01:00"},
      priceRange: "Free"
    });

    // Additional Tokyo place
    this.createPlace({
      name: "Shibuya Crossing",
      destinationId: 5,
      address: "Shibuya, Tokyo, Japan",
      latitude: "35.6595",
      longitude: "139.7005",
      category: "Landmark",
      rating: "4.6",
      description: "Bustling intersection known for its scramble crossing and neon signage.",
      imageUrls: ["https://images.unsplash.com/photo-1508766206392-8bd5cf550d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
      openingHours: {"daily": "All day"},
      priceRange: "Free"
    });

    // Delhi hotels and places
    this.createHotel({
      name: "The Grand Delhi",
      destinationId: 6,
      address: "1 Rajendra Place, New Delhi 110001, India",
      latitude: "28.5921",
      longitude: "77.2315",
      rating: "4.7",
      pricePerNight: "150.00",
      description: "Five-star luxury hotel offering world-class hospitality in the heart of New Delhi. Features elegant rooms, award-winning restaurants, rejuvenating spa, and premium business facilities with impeccable service.",
      amenities: ["Spa", "Restaurant", "Fitness Center", "Business Center", "Concierge", "Pool", "Room Service"],
      imageUrls: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
      website: "https://www.thegranddelhi.example",
      phone: "+91 11-4108 1010"
    });

    this.createPlace({
      name: "India Gate",
      destinationId: 6,
      address: "Rajpath, New Delhi, 110001, India",
      latitude: "28.6129",
      longitude: "77.2295",
      category: "Monument",
      rating: "4.7",
      description: "The iconic India Gate is a war memorial and one of Delhi's most recognizable landmarks. This 42-meter high archway stands at the center of New Delhi and is a symbol of Indian independence. A popular gathering spot for locals and tourists alike, surrounded by beautiful lawns and cafes.",
      imageUrls: ["https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
      openingHours: {"daily": "24 hours"},
      priceRange: "Free"
    });

    this.createPlace({
      name: "Jama Masjid",
      destinationId: 6,
      address: "Chandni Chowk, Old Delhi, 110006, India",
      latitude: "28.6505",
      longitude: "77.2306",
      category: "Religious Site",
      rating: "4.6",
      description: "One of the largest and most impressive mosques in India, built by Mughal Emperor Shah Jahan in 1656. Jama Masjid features stunning red sandstone architecture, three grand gates, and accommodates up to 25,000 worshippers. Located in the heart of Old Delhi's bustling Chandni Chowk market, it's a masterpiece of Mughal craftsmanship.",
      imageUrls: ["https://plus.unsplash.com/premium_photo-1697730390709-48bebc012175?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
      openingHours: {"daily": "07:00-22:00"},
      priceRange: "Free"
    });
  }
}

// Helper: convert snake_case keys to camelCase (basic)
function snakeToCamelRow(row: any) {
  if (!row || typeof row !== 'object') return row;
  const out: any = {};
  for (const k of Object.keys(row)) {
    const v = row[k];
    const parts = k.split('_');
    const camel = parts[0] + parts.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
    out[camel] = v;
  }
  return out;
}

function snakeToCamelArray(rows: any[]) {
  return (rows || []).map(r => snakeToCamelRow(r));
}

function camelToSnakeRow(row: any) {
  if (!row || typeof row !== 'object') return row;
  const out: any = {};
  for (const k of Object.keys(row)) {
    const v = row[k];
    // Convert camelCase to snake_case:
    // userId -> user_id
    // photoURL -> photo_url (not photo_u_r_l)
    // displayName -> display_name
    const snake = k
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2') // Handle consecutive capitals: URLParser -> URL_Parser
      .replace(/([a-z\d])([A-Z])/g, '$1_$2') // Handle regular camelCase: userId -> user_Id
      .toLowerCase();
    out[snake] = v;
  }
  return out;
}

class SupabaseStorage implements IStorage {
  private sb: any;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE;
    if (!supabaseUrl || !serviceKey) throw new Error('Supabase service key not configured for SupabaseStorage');
    this.sb = createSupabaseClient(supabaseUrl, serviceKey);
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const { data, error } = await this.sb.from('users').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data ? snakeToCamelRow(data) as any : undefined;
  }

  async getUserByUid(uid: string): Promise<User | undefined> {
    const { data, error } = await this.sb.from('users').select('*').eq('uid', uid).maybeSingle();
    if (error) throw error;
    return data ? snakeToCamelRow(data) as any : undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    const row = camelToSnakeRow(user);
    const { data, error } = await this.sb.from('users').insert([row]).select();
    if (error) throw error;
    const created = Array.isArray(data) ? data[0] : data;
    return snakeToCamelRow(created) as any;
  }

  async updateUser(id: number, userUpdate: Partial<User>): Promise<User | undefined> {
    console.log('[SupabaseStorage.updateUser] Updating user:', id, 'with:', userUpdate);
    const row = camelToSnakeRow(userUpdate as any);
    console.log('[SupabaseStorage.updateUser] Converted to snake_case:', row);
    const { data, error } = await this.sb.from('users').update(row).eq('id', id).select();
    if (error) {
      console.error('[SupabaseStorage.updateUser] Supabase error:', error);
      throw error;
    }
    const updated = Array.isArray(data) ? data[0] : data;
    console.log('[SupabaseStorage.updateUser] Result:', updated);
    return updated ? snakeToCamelRow(updated) as any : undefined;
  }

  // Destinations
  async getDestinations(): Promise<Destination[]> {
    const { data, error } = await this.sb.from('destinations').select('*');
    if (error) throw error;
    return snakeToCamelArray(data) as any;
  }

  async getDestination(id: number): Promise<Destination | undefined> {
    const { data, error } = await this.sb.from('destinations').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data ? snakeToCamelRow(data) as any : undefined;
  }

  async createDestination(destination: InsertDestination): Promise<Destination> {
    const row = camelToSnakeRow(destination);
    const { data, error } = await this.sb.from('destinations').insert([row]).select();
    if (error) throw error;
    return snakeToCamelRow(Array.isArray(data) ? data[0] : data) as any;
  }

  // Trips
  async getTrips(userId: number): Promise<Trip[]> {
    const { data, error } = await this.sb.from('trips').select('*').eq('user_id', userId);
    if (error) throw error;
    return snakeToCamelArray(data) as any;
  }

  async getTrip(id: number): Promise<Trip | undefined> {
    const { data, error } = await this.sb.from('trips').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data ? snakeToCamelRow(data) as any : undefined;
  }

  async createTrip(trip: InsertTrip): Promise<Trip> {
    const row = camelToSnakeRow(trip);
    const { data, error } = await this.sb.from('trips').insert([row]).select();
    if (error) throw error;
    return snakeToCamelRow(Array.isArray(data) ? data[0] : data) as any;
  }

  async updateTrip(id: number, tripUpdate: Partial<Trip>): Promise<Trip | undefined> {
    const row = camelToSnakeRow(tripUpdate as any);
    const { data, error } = await this.sb.from('trips').update(row).eq('id', id).select();
    if (error) throw error;
    const updated = Array.isArray(data) ? data[0] : data;
    return updated ? snakeToCamelRow(updated) as any : undefined;
  }

  async deleteTrip(id: number): Promise<boolean> {
    const { error } = await this.sb.from('trips').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  // Itineraries
  async getItineraries(tripId: number): Promise<Itinerary[]> {
    const { data, error } = await this.sb.from('itineraries').select('*').eq('trip_id', tripId).order('day', { ascending: true });
    if (error) throw error;
    return snakeToCamelArray(data) as any;
  }

  async getItinerary(id: number): Promise<Itinerary | undefined> {
    const { data, error } = await this.sb.from('itineraries').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data ? snakeToCamelRow(data) as any : undefined;
  }

  async createItinerary(itinerary: InsertItinerary): Promise<Itinerary> {
    const row = camelToSnakeRow(itinerary as any);
    const { data, error } = await this.sb.from('itineraries').insert([row]).select();
    if (error) throw error;
    return snakeToCamelRow(Array.isArray(data) ? data[0] : data) as any;
  }

  async updateItinerary(id: number, itineraryUpdate: Partial<Itinerary>): Promise<Itinerary | undefined> {
    const row = camelToSnakeRow(itineraryUpdate as any);
    const { data, error } = await this.sb.from('itineraries').update(row).eq('id', id).select();
    if (error) throw error;
    const updated = Array.isArray(data) ? data[0] : data;
    return updated ? snakeToCamelRow(updated) as any : undefined;
  }

  async deleteItinerary(id: number): Promise<boolean> {
    const { error } = await this.sb.from('itineraries').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  // Photos
  async getPhotos(userId: number): Promise<Photo[]> {
    const { data, error } = await this.sb.from('photos').select('*').eq('user_id', userId);
    if (error) throw error;
    return snakeToCamelArray(data) as any;
  }

  async getTripPhotos(tripId: number): Promise<Photo[]> {
    const { data, error } = await this.sb.from('photos').select('*').eq('trip_id', tripId);
    if (error) throw error;
    return snakeToCamelArray(data) as any;
  }

  async getPhoto(id: number): Promise<Photo | undefined> {
    const { data, error } = await this.sb.from('photos').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data ? snakeToCamelRow(data) as any : undefined;
  }

  async createPhoto(photo: InsertPhoto): Promise<Photo> {
    const row = camelToSnakeRow(photo as any);
    const { data, error } = await this.sb.from('photos').insert([row]).select();
    if (error) throw error;
    return snakeToCamelRow(Array.isArray(data) ? data[0] : data) as any;
  }

  async deletePhoto(id: number): Promise<boolean> {
    // First, get the photo to retrieve its image URL (file path)
    const { data: photoData, error: selectError } = await this.sb.from('photos').select('*').eq('id', id).maybeSingle();
    if (selectError) throw selectError;
    
    if (!photoData) {
      return false; // Photo not found
    }

    // Delete from storage if imageUrl exists
    if (photoData.image_url) {
      try {
        // imageUrl is in format "bucket/path/to/file" or just "path/to/file"
        let filePath = photoData.image_url;
        
        // If it includes the bucket name, extract just the path
        if (filePath.startsWith('photos/')) {
          filePath = filePath.substring('photos/'.length);
        }

        const { error: deleteStorageError } = await this.sb.storage
          .from('photos')
          .remove([filePath]);

        if (deleteStorageError) {
          console.error('Failed to delete photo from storage:', deleteStorageError);
          // Continue with database deletion even if storage deletion fails
        }
      } catch (storageErr) {
        console.error('Storage deletion error:', storageErr);
        // Continue with database deletion
      }
    }

    // Delete from database
    const { error: deleteDbError } = await this.sb.from('photos').delete().eq('id', id);
    if (deleteDbError) throw deleteDbError;
    
    return true;
  }

  // Notifications
  async getNotifications(userId: number): Promise<Notification[]> {
    const { data, error } = await this.sb.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) throw error;
    return snakeToCamelArray(data) as any;
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const row = camelToSnakeRow(notification as any);
    const { data, error } = await this.sb.from('notifications').insert([row]).select();
    if (error) throw error;
    return snakeToCamelRow(Array.isArray(data) ? data[0] : data) as any;
  }

  async markNotificationAsRead(id: number): Promise<boolean> {
    const { error } = await this.sb.from('notifications').update({ is_read: true }).eq('id', id);
    if (error) throw error;
    return true;
  }

  // Hotels
  async getHotels(destinationId: number): Promise<Hotel[]> {
    const { data, error } = await this.sb.from('hotels').select('*').eq('destination_id', destinationId);
    if (error) throw error;
    return snakeToCamelArray(data) as any;
  }

  async getHotel(id: number): Promise<Hotel | undefined> {
    const { data, error } = await this.sb.from('hotels').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data ? snakeToCamelRow(data) as any : undefined;
  }

  async createHotel(hotel: InsertHotel): Promise<Hotel> {
    const row = camelToSnakeRow(hotel as any);
    const { data, error } = await this.sb.from('hotels').insert([row]).select();
    if (error) throw error;
    return snakeToCamelRow(Array.isArray(data) ? data[0] : data) as any;
  }

  // Places
  async getPlaces(destinationId: number): Promise<Place[]> {
    const { data, error } = await this.sb.from('places').select('*').eq('destination_id', destinationId);
    if (error) throw error;
    return snakeToCamelArray(data) as any;
  }

  async getPlace(id: number): Promise<Place | undefined> {
    const { data, error } = await this.sb.from('places').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data ? snakeToCamelRow(data) as any : undefined;
  }

  async createPlace(place: InsertPlace): Promise<Place> {
    const row = camelToSnakeRow(place as any);
    const { data, error } = await this.sb.from('places').insert([row]).select();
    if (error) throw error;
    return snakeToCamelRow(Array.isArray(data) ? data[0] : data) as any;
  }

  // Reviews
  async getReviews(hotelId?: number, placeId?: number): Promise<Review[]> {
    let q = this.sb.from('reviews').select('*');
    if (hotelId) q = q.eq('hotel_id', hotelId);
    if (placeId) q = q.eq('place_id', placeId);
    const { data, error } = await q;
    if (error) throw error;
    return snakeToCamelArray(data) as any;
  }

  async getReview(id: number): Promise<Review | undefined> {
    const { data, error } = await this.sb.from('reviews').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data ? snakeToCamelRow(data) as any : undefined;
  }

  async createReview(review: InsertReview): Promise<Review> {
    const row = camelToSnakeRow(review as any);
    const { data, error } = await this.sb.from('reviews').insert([row]).select();
    if (error) throw error;
    return snakeToCamelRow(Array.isArray(data) ? data[0] : data) as any;
  }

  async updateReview(id: number, reviewUpdate: Partial<Review>): Promise<Review | undefined> {
    const row = camelToSnakeRow(reviewUpdate as any);
    const { data, error } = await this.sb.from('reviews').update(row).eq('id', id).select();
    if (error) throw error;
    const updated = Array.isArray(data) ? data[0] : data;
    return updated ? snakeToCamelRow(updated) as any : undefined;
  }

  async deleteReview(id: number): Promise<boolean> {
    const { error } = await this.sb.from('reviews').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  // Budgets
  async getBudgets(tripId: number): Promise<Budget[]> {
    const { data, error } = await this.sb.from('budgets').select('*').eq('trip_id', tripId);
    if (error) throw error;
    return snakeToCamelArray(data) as any;
  }

  async getBudget(id: number): Promise<Budget | undefined> {
    const { data, error } = await this.sb.from('budgets').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data ? snakeToCamelRow(data) as any : undefined;
  }

  async getBudgetByTrip(tripId: number): Promise<Budget | undefined> {
    const { data, error } = await this.sb.from('budgets').select('*').eq('trip_id', tripId).limit(1).maybeSingle();
    if (error) throw error;
    return data ? snakeToCamelRow(data) as any : undefined;
  }

  async createBudget(budget: InsertBudget): Promise<Budget> {
    const row = camelToSnakeRow(budget as any);
    const { data, error } = await this.sb.from('budgets').insert([row]).select();
    if (error) throw error;
    return snakeToCamelRow(Array.isArray(data) ? data[0] : data) as any;
  }

  async updateBudget(id: number, budgetUpdate: Partial<Budget>): Promise<Budget | undefined> {
    const row = camelToSnakeRow(budgetUpdate as any);
    const { data, error } = await this.sb.from('budgets').update(row).eq('id', id).select();
    if (error) throw error;
    const updated = Array.isArray(data) ? data[0] : data;
    return updated ? snakeToCamelRow(updated) as any : undefined;
  }

  async deleteBudget(id: number): Promise<boolean> {
    const { error } = await this.sb.from('budgets').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  // Expenses
  async getExpenses(tripId: number): Promise<Expense[]> {
    const { data, error } = await this.sb.from('expenses').select('*').eq('trip_id', tripId);
    if (error) throw error;
    return snakeToCamelArray(data) as any;
  }

  async getExpensesByBudget(budgetId: number): Promise<Expense[]> {
    const { data, error } = await this.sb.from('expenses').select('*').eq('budget_id', budgetId);
    if (error) throw error;
    return snakeToCamelArray(data) as any;
  }

  async getExpense(id: number): Promise<Expense | undefined> {
    const { data, error } = await this.sb.from('expenses').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data ? snakeToCamelRow(data) as any : undefined;
  }

  async createExpense(expense: InsertExpense): Promise<Expense> {
    const row = camelToSnakeRow(expense as any);
    const { data, error } = await this.sb.from('expenses').insert([row]).select();
    if (error) throw error;
    return snakeToCamelRow(Array.isArray(data) ? data[0] : data) as any;
  }

  async updateExpense(id: number, expenseUpdate: Partial<Expense>): Promise<Expense | undefined> {
    const row = camelToSnakeRow(expenseUpdate as any);
    const { data, error } = await this.sb.from('expenses').update(row).eq('id', id).select();
    if (error) throw error;
    const updated = Array.isArray(data) ? data[0] : data;
    return updated ? snakeToCamelRow(updated) as any : undefined;
  }

  async deleteExpense(id: number): Promise<boolean> {
    const { error } = await this.sb.from('expenses').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  // Currency rates
  async getCurrencyRate(baseCurrency: string, targetCurrency: string): Promise<CurrencyRate | undefined> {
    const { data, error } = await this.sb.from('currency_rates').select('*').eq('base_currency', baseCurrency).eq('target_currency', targetCurrency).maybeSingle();
    if (error) throw error;
    return data ? snakeToCamelRow(data) as any : undefined;
  }

  async createOrUpdateCurrencyRate(rate: InsertCurrencyRate): Promise<CurrencyRate> {
    const row = camelToSnakeRow(rate as any);
    const { data, error } = await this.sb.from('currency_rates').upsert([row], { onConflict: ['base_currency','target_currency'] }).select();
    if (error) throw error;
    return snakeToCamelRow(Array.isArray(data) ? data[0] : data) as any;
  }
}

// Export storage: prefer SupabaseStorage when service key is present, otherwise fall back to MemStorage
// HybridStorage: use SupabaseStorage only for trip-related methods; use MemStorage for everything else.
class HybridStorage implements IStorage {
  private mem: MemStorage;
  private sb?: SupabaseStorage;

  constructor() {
    this.mem = new MemStorage();
    try {
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE;
      const supabaseUrl = process.env.SUPABASE_URL;
      
      console.log('[storage] HybridStorage constructor:');
      console.log('  - SUPABASE_URL:', supabaseUrl ? '✓ SET' : '✗ NOT SET');
      console.log('  - SERVICE_ROLE_KEY:', serviceKey ? `✓ SET (length: ${serviceKey.length})` : '✗ NOT SET');
      
      if (serviceKey && supabaseUrl) {
        this.sb = new SupabaseStorage();
        console.log('[storage] ✓ SupabaseStorage initialized - data will be stored in Supabase');
      } else {
        console.log('[storage] ✗ SupabaseStorage NOT initialized - data will be stored in memory only');
        console.log('[storage] Missing:', !supabaseUrl ? 'SUPABASE_URL' : '', !serviceKey ? 'SUPABASE_SERVICE_ROLE_KEY' : '');
      }
    } catch (err) {
      console.warn('[storage] ✗ Failed to initialize SupabaseStorage:', err);
      this.sb = undefined;
    }
  }

  // User operations -> Supabase if available, else mem
  async getUser(id: number) {
    if (this.sb) return this.sb.getUser(id);
    return this.mem.getUser(id);
  }
  async getUserByUid(uid: string) {
    if (this.sb) return this.sb.getUserByUid(uid);
    return this.mem.getUserByUid(uid);
  }
  async createUser(user: InsertUser) {
    if (this.sb) return this.sb.createUser(user);
    return this.mem.createUser(user);
  }
  async updateUser(id: number, user: Partial<User>) {
    if (this.sb) return this.sb.updateUser(id, user);
    return this.mem.updateUser(id, user);
  }
  

  // Destinations -> Supabase if available, else mem
  async getDestinations() {
    if (this.sb) return this.sb.getDestinations();
    return this.mem.getDestinations();
  }
  async getDestination(id: number) {
    if (this.sb) return this.sb.getDestination(id);
    return this.mem.getDestination(id);
  }
  async createDestination(destination: InsertDestination) {
    if (this.sb) return this.sb.createDestination(destination);
    return this.mem.createDestination(destination);
  }

  // Trip operations -> prefer SupabaseStorage when available, else mem
  async getTrips(userId: number) {
    if (this.sb) return this.sb.getTrips(userId);
    return this.mem.getTrips(userId);
  }
  async getTrip(id: number) {
    if (this.sb) return this.sb.getTrip(id);
    return this.mem.getTrip(id);
  }
  async createTrip(trip: InsertTrip) {
    if (this.sb) return this.sb.createTrip(trip);
    return this.mem.createTrip(trip);
  }
  async updateTrip(id: number, trip: Partial<Trip>) {
    if (this.sb) return this.sb.updateTrip(id, trip);
    return this.mem.updateTrip(id, trip);
  }
  async deleteTrip(id: number) {
    if (this.sb) return this.sb.deleteTrip(id);
    return this.mem.deleteTrip(id);
  }

  // Itineraries -> Supabase if available, else mem
  async getItineraries(tripId: number) {
    if (this.sb) return this.sb.getItineraries(tripId);
    return this.mem.getItineraries(tripId);
  }
  async getItinerary(id: number) {
    if (this.sb) return this.sb.getItinerary(id);
    return this.mem.getItinerary(id);
  }
  async createItinerary(itinerary: InsertItinerary) {
    if (this.sb) return this.sb.createItinerary(itinerary);
    return this.mem.createItinerary(itinerary);
  }
  async updateItinerary(id: number, itinerary: Partial<Itinerary>) {
    if (this.sb) return this.sb.updateItinerary(id, itinerary);
    return this.mem.updateItinerary(id, itinerary);
  }
  async deleteItinerary(id: number) {
    if (this.sb) return this.sb.deleteItinerary(id);
    return this.mem.deleteItinerary(id);
  }

  // Photos -> Supabase if available, else mem
  async getPhotos(userId: number) {
    if (this.sb) return this.sb.getPhotos(userId);
    return this.mem.getPhotos(userId);
  }
  async getTripPhotos(tripId: number) {
    if (this.sb) return this.sb.getTripPhotos(tripId);
    return this.mem.getTripPhotos(tripId);
  }
  async getPhoto(id: number) {
    if (this.sb) return this.sb.getPhoto(id);
    return this.mem.getPhoto(id);
  }
  async createPhoto(photo: InsertPhoto) {
    if (this.sb) return this.sb.createPhoto(photo);
    return this.mem.createPhoto(photo);
  }
  async deletePhoto(id: number) {
    if (this.sb) return this.sb.deletePhoto(id);
    return this.mem.deletePhoto(id);
  }

  // Notifications -> mem
  getNotifications(userId: number) { return this.mem.getNotifications(userId); }
  createNotification(notification: InsertNotification) { return this.mem.createNotification(notification); }
  markNotificationAsRead(id: number) { return this.mem.markNotificationAsRead(id); }

  // Hotels/Places/Reviews/Budgets/Expenses/Currency -> mem
  getHotels(destinationId: number) { return this.mem.getHotels(destinationId); }
  getHotel(id: number) { return this.mem.getHotel(id); }
  createHotel(hotel: InsertHotel) { return this.mem.createHotel(hotel); }

  getPlaces(destinationId: number) { return this.mem.getPlaces(destinationId); }
  getPlace(id: number) { return this.mem.getPlace(id); }
  createPlace(place: InsertPlace) { return this.mem.createPlace(place); }

  getReviews(hotelId?: number, placeId?: number) { return this.mem.getReviews(hotelId, placeId); }
  getReview(id: number) { return this.mem.getReview(id); }
  createReview(review: InsertReview) { return this.mem.createReview(review); }
  updateReview(id: number, review: Partial<Review>) { return this.mem.updateReview(id, review); }
  deleteReview(id: number) { return this.mem.deleteReview(id); }

  getBudgets(tripId: number) { return this.mem.getBudgets(tripId); }
  getBudget(id: number) { return this.mem.getBudget(id); }
  getBudgetByTrip(tripId: number) { return this.mem.getBudgetByTrip(tripId); }
  createBudget(budget: InsertBudget) { return this.mem.createBudget(budget); }
  updateBudget(id: number, budget: Partial<Budget>) { return this.mem.updateBudget(id, budget); }
  deleteBudget(id: number) { return this.mem.deleteBudget(id); }

  getExpenses(tripId: number) { return this.mem.getExpenses(tripId); }
  getExpensesByBudget(budgetId: number) { return this.mem.getExpensesByBudget(budgetId); }
  getExpense(id: number) { return this.mem.getExpense(id); }
  createExpense(expense: InsertExpense) { return this.mem.createExpense(expense); }
  updateExpense(id: number, expense: Partial<Expense>) { return this.mem.updateExpense(id, expense); }
  deleteExpense(id: number) { return this.mem.deleteExpense(id); }

  getCurrencyRate(baseCurrency: string, targetCurrency: string) { return this.mem.getCurrencyRate(baseCurrency, targetCurrency); }
  createOrUpdateCurrencyRate(rate: InsertCurrencyRate) { return this.mem.createOrUpdateCurrencyRate(rate); }
}

let storageInstance: IStorage | null = null;

function getStorage(): IStorage {
  if (!storageInstance) {
    storageInstance = new HybridStorage();
    console.log('[storage] Using HybridStorage: users, destinations, trips, itineraries, photos -> Supabase (if configured), other data -> MemStorage');
  }
  return storageInstance;
}

export const storage = {
  getUser: (id: number) => getStorage().getUser(id),
  getUserByUid: (uid: string) => getStorage().getUserByUid(uid),
  createUser: (user: InsertUser) => getStorage().createUser(user),
  updateUser: (id: number, user: Partial<User>) => getStorage().updateUser(id, user),
  
  getDestinations: () => getStorage().getDestinations(),
  getDestination: (id: number) => getStorage().getDestination(id),
  createDestination: (destination: InsertDestination) => getStorage().createDestination(destination),
  
  getTrips: (userId: number) => getStorage().getTrips(userId),
  getTrip: (id: number) => getStorage().getTrip(id),
  createTrip: (trip: InsertTrip) => getStorage().createTrip(trip),
  updateTrip: (id: number, trip: Partial<Trip>) => getStorage().updateTrip(id, trip),
  deleteTrip: (id: number) => getStorage().deleteTrip(id),
  
  getItineraries: (tripId: number) => getStorage().getItineraries(tripId),
  getItinerary: (id: number) => getStorage().getItinerary(id),
  createItinerary: (itinerary: InsertItinerary) => getStorage().createItinerary(itinerary),
  updateItinerary: (id: number, itinerary: Partial<Itinerary>) => getStorage().updateItinerary(id, itinerary),
  deleteItinerary: (id: number) => getStorage().deleteItinerary(id),
  
  getPhotos: (userId: number) => getStorage().getPhotos(userId),
  getTripPhotos: (tripId: number) => getStorage().getTripPhotos(tripId),
  getPhoto: (id: number) => getStorage().getPhoto(id),
  createPhoto: (photo: InsertPhoto) => getStorage().createPhoto(photo),
  deletePhoto: (id: number) => getStorage().deletePhoto(id),
  
  getNotifications: (userId: number) => getStorage().getNotifications(userId),
  createNotification: (notification: InsertNotification) => getStorage().createNotification(notification),
  markNotificationAsRead: (id: number) => getStorage().markNotificationAsRead(id),
  
  getHotels: (destinationId: number) => getStorage().getHotels(destinationId),
  getHotel: (id: number) => getStorage().getHotel(id),
  createHotel: (hotel: InsertHotel) => getStorage().createHotel(hotel),
  
  getPlaces: (destinationId: number) => getStorage().getPlaces(destinationId),
  getPlace: (id: number) => getStorage().getPlace(id),
  createPlace: (place: InsertPlace) => getStorage().createPlace(place),
  
  getReviews: (hotelId?: number, placeId?: number) => getStorage().getReviews(hotelId, placeId),
  getReview: (id: number) => getStorage().getReview(id),
  createReview: (review: InsertReview) => getStorage().createReview(review),
  updateReview: (id: number, review: Partial<Review>) => getStorage().updateReview(id, review),
  deleteReview: (id: number) => getStorage().deleteReview(id),
  
  getBudgets: (tripId: number) => getStorage().getBudgets(tripId),
  getBudget: (id: number) => getStorage().getBudget(id),
  getBudgetByTrip: (tripId: number) => getStorage().getBudgetByTrip(tripId),
  createBudget: (budget: InsertBudget) => getStorage().createBudget(budget),
  updateBudget: (id: number, budget: Partial<Budget>) => getStorage().updateBudget(id, budget),
  deleteBudget: (id: number) => getStorage().deleteBudget(id),
  
  getExpenses: (tripId: number) => getStorage().getExpenses(tripId),
  getExpensesByBudget: (budgetId: number) => getStorage().getExpensesByBudget(budgetId),
  getExpense: (id: number) => getStorage().getExpense(id),
  createExpense: (expense: InsertExpense) => getStorage().createExpense(expense),
  updateExpense: (id: number, expense: Partial<Expense>) => getStorage().updateExpense(id, expense),
  deleteExpense: (id: number) => getStorage().deleteExpense(id),
  
  getCurrencyRate: (baseCurrency: string, targetCurrency: string) => getStorage().getCurrencyRate(baseCurrency, targetCurrency),
  createOrUpdateCurrencyRate: (rate: InsertCurrencyRate) => getStorage().createOrUpdateCurrencyRate(rate),
} as IStorage;
