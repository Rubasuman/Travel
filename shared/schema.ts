import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User Schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uid: text("uid").notNull().unique(), // Firebase UID
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  photoURL: text("photo_url"),
  displayName: text("display_name"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

// Destinations Schema
export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  city: text("city"),
  description: text("description"),
  imageUrl: text("image_url"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  category: text("category"), // e.g. Beach, City, Mountain, etc.
  address: text("address"),
  mapUrl: text("map_url"),
});

export const insertDestinationSchema = createInsertSchema(destinations).omit({
  id: true,
});

// Trips Schema
export const trips = pgTable("trips", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  destinationId: integer("destination_id").notNull(),
  title: text("title").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  activities: integer("activities").default(0),
  isFavorite: boolean("is_favorite").default(false),
});

export const insertTripSchema = createInsertSchema(trips).omit({
  id: true,
});

// Itinerary Schema
export const itineraries = pgTable("itineraries", {
  id: serial("id").primaryKey(),
  tripId: integer("trip_id").notNull(),
  day: integer("day").notNull(),
  date: timestamp("date").notNull(),
  activities: jsonb("activities").notNull(),
  notes: text("notes"),
});

export const insertItinerarySchema = createInsertSchema(itineraries).omit({
  id: true,
});

// Photos Schema
export const photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  tripId: integer("trip_id"),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  uploadedAt: timestamp("uploaded_at").notNull(),
});

export const insertPhotoSchema = createInsertSchema(photos).omit({
  id: true,
});

// Notifications Schema
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // Flight, Hotel, Weather, etc.
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").notNull(),
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Destination = typeof destinations.$inferSelect;
export type InsertDestination = z.infer<typeof insertDestinationSchema>;

export type Trip = typeof trips.$inferSelect;
export type InsertTrip = z.infer<typeof insertTripSchema>;

export type Itinerary = typeof itineraries.$inferSelect;
export type InsertItinerary = z.infer<typeof insertItinerarySchema>;

export type Photo = typeof photos.$inferSelect;
export type InsertPhoto = z.infer<typeof insertPhotoSchema>;

// Hotels Schema
export const hotels = pgTable("hotels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  destinationId: integer("destination_id").notNull(),
  address: text("address").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  pricePerNight: decimal("price_per_night", { precision: 10, scale: 2 }),
  description: text("description"),
  amenities: jsonb("amenities").default([]),
  imageUrls: jsonb("image_urls").default([]),
  virtual360Url: text("virtual_360_url"),
  website: text("website"),
  phone: text("phone"),
});

export const insertHotelSchema = createInsertSchema(hotels).omit({
  id: true,
});

// Places Schema (Points of Interest)
export const places = pgTable("places", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  destinationId: integer("destination_id").notNull(),
  address: text("address").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
  category: text("category").notNull(), // Restaurant, Attraction, Museum, etc.
  rating: decimal("rating", { precision: 3, scale: 2 }),
  description: text("description"),
  imageUrls: jsonb("image_urls").default([]),
  virtual360Url: text("virtual_360_url"),
  website: text("website"),
  phone: text("phone"),
  openingHours: jsonb("opening_hours"),
  priceRange: text("price_range"), // $, $$, $$$, $$$$
});

export const insertPlaceSchema = createInsertSchema(places).omit({
  id: true,
});

// Reviews Schema
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  hotelId: integer("hotel_id"),
  placeId: integer("place_id"),
  rating: integer("rating").notNull(),
  title: text("title"),
  content: text("content").notNull(),
  imageUrls: jsonb("image_urls").default([]),
  virtual360Url: text("virtual_360_url"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;

export type Hotel = typeof hotels.$inferSelect;
export type InsertHotel = z.infer<typeof insertHotelSchema>;

export type Place = typeof places.$inferSelect;
export type InsertPlace = z.infer<typeof insertPlaceSchema>;

// Budgets Schema
export const budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  tripId: integer("trip_id").notNull(),
  userId: integer("user_id").notNull(),
  totalBudget: decimal("total_budget", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  categories: jsonb("categories").notNull(), // {accommodation: 500, food: 300, transport: 200, etc.}
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const insertBudgetSchema = createInsertSchema(budgets).omit({
  id: true,
});

// Expenses Schema
export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  tripId: integer("trip_id").notNull(),
  userId: integer("user_id").notNull(),
  budgetId: integer("budget_id"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  originalAmount: decimal("original_amount", { precision: 10, scale: 2 }),
  currency: text("currency").notNull().default("USD"),
  originalCurrency: text("original_currency"),
  category: text("category").notNull(), // accommodation, food, transport, activities, shopping, etc.
  description: text("description").notNull(),
  location: text("location"),
  receiptUrl: text("receipt_url"),
  date: timestamp("date").notNull(),
  exchangeRate: decimal("exchange_rate", { precision: 10, scale: 6 }),
  createdAt: timestamp("created_at").notNull(),
});

export const insertExpenseSchema = createInsertSchema(expenses).omit({
  id: true,
});

// Currency Rates Schema (for caching exchange rates)
export const currencyRates = pgTable("currency_rates", {
  id: serial("id").primaryKey(),
  baseCurrency: text("base_currency").notNull(),
  targetCurrency: text("target_currency").notNull(),
  rate: decimal("rate", { precision: 10, scale: 6 }).notNull(),
  lastUpdated: timestamp("last_updated").notNull(),
});

export const insertCurrencyRateSchema = createInsertSchema(currencyRates).omit({
  id: true,
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type Budget = typeof budgets.$inferSelect;
export type InsertBudget = z.infer<typeof insertBudgetSchema>;

export type Expense = typeof expenses.$inferSelect;
export type InsertExpense = z.infer<typeof insertExpenseSchema>;

export type CurrencyRate = typeof currencyRates.$inferSelect;
export type InsertCurrencyRate = z.infer<typeof insertCurrencyRateSchema>;
