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

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUid(uid: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
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
  }
}

export const storage = new MemStorage();
