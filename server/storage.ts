import { 
  users, type User, type InsertUser,
  destinations, type Destination, type InsertDestination,
  trips, type Trip, type InsertTrip,
  itineraries, type Itinerary, type InsertItinerary,
  photos, type Photo, type InsertPhoto,
  notifications, type Notification, type InsertNotification
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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private destinations: Map<number, Destination>;
  private trips: Map<number, Trip>;
  private itineraries: Map<number, Itinerary>;
  private photos: Map<number, Photo>;
  private notifications: Map<number, Notification>;
  
  private currentUserId: number;
  private currentDestinationId: number;
  private currentTripId: number;
  private currentItineraryId: number;
  private currentPhotoId: number;
  private currentNotificationId: number;

  constructor() {
    this.users = new Map();
    this.destinations = new Map();
    this.trips = new Map();
    this.itineraries = new Map();
    this.photos = new Map();
    this.notifications = new Map();
    
    this.currentUserId = 1;
    this.currentDestinationId = 1;
    this.currentTripId = 1;
    this.currentItineraryId = 1;
    this.currentPhotoId = 1;
    this.currentNotificationId = 1;
    
    // Add sample destinations
    this.seedDestinations();
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
    const user: User = { ...insertUser, id };
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
    const newDestination: Destination = { ...destination, id };
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
    const newTrip: Trip = { ...trip, id };
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
    const newItinerary: Itinerary = { ...itinerary, id };
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
    const newPhoto: Photo = { ...photo, id };
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
    const newNotification: Notification = { ...notification, id };
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

  // Seed data
  private seedDestinations() {
    const destinations: InsertDestination[] = [
      {
        name: "Paris",
        country: "France",
        description: "Experience the city of love with its iconic landmarks and romantic atmosphere.",
        imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
        rating: 5,
        category: "City"
      },
      {
        name: "Rome",
        country: "Italy",
        description: "Explore ancient ruins and experience the rich history of the Eternal City.",
        imageUrl: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        rating: 5,
        category: "Historical"
      },
      {
        name: "Santorini",
        country: "Greece",
        description: "Enjoy breathtaking sunsets and stunning views of the Aegean Sea.",
        imageUrl: "https://images.unsplash.com/photo-1582050041567-9cfdd330d545?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        rating: 5,
        category: "Beach"
      },
      {
        name: "New York",
        country: "USA",
        description: "Explore the city that never sleeps with its iconic skyline and vibrant atmosphere.",
        imageUrl: "https://images.unsplash.com/photo-1543832923-44667a44c804?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        rating: 5,
        category: "City"
      },
      {
        name: "Kyoto",
        country: "Japan",
        description: "Experience the traditional side of Japan with ancient temples and beautiful gardens.",
        imageUrl: "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        rating: 5,
        category: "Cultural"
      },
      {
        name: "Barcelona",
        country: "Spain",
        description: "Discover the unique architecture of Gaudi and enjoy the Mediterranean lifestyle.",
        imageUrl: "https://images.unsplash.com/photo-1602002418082-dd4a3693d2c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        rating: 5,
        category: "Architecture"
      },
      {
        name: "Bali",
        country: "Indonesia",
        description: "Explore tropical beaches, volcanic mountains, and unique cultural experiences.",
        imageUrl: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
        rating: 5,
        category: "Beach"
      },
      {
        name: "Tokyo",
        country: "Japan",
        description: "Discover the perfect blend of traditional culture and futuristic cityscape.",
        imageUrl: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
        rating: 5,
        category: "City"
      }
    ];

    destinations.forEach(destination => {
      this.createDestination(destination);
    });
  }
}

export const storage = new MemStorage();
