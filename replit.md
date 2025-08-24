# Wanderlust - Travel Planner

## Overview

Wanderlust is a comprehensive travel planning web application that allows users to discover destinations, plan trips, create detailed itineraries, and manage their travel memories through photo galleries. The application combines a React-based frontend with an Express.js backend, utilizing Firebase for authentication and storage, and PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built using React with TypeScript and follows a modern component-based architecture:

- **UI Framework**: React with TypeScript for type safety and better developer experience
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod for validation
- **Build Tool**: Vite for fast development and optimized production builds

The application uses a monorepo structure with shared TypeScript schemas between client and server, ensuring type consistency across the full stack.

### Backend Architecture
The server is built with Express.js and follows RESTful API principles:

- **Runtime**: Node.js with TypeScript using ES modules
- **API Framework**: Express.js with structured route handlers
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Schema Validation**: Zod schemas shared between client and server
- **Session Management**: Express sessions with PostgreSQL session store

The backend implements a storage abstraction layer that supports both in-memory storage (for development) and PostgreSQL (for production), allowing for flexible deployment options.

### Database Design
The application uses PostgreSQL as the primary database with the following core entities:

- **Users**: Stores user profile information linked to Firebase authentication
- **Destinations**: Catalog of travel destinations with metadata
- **Trips**: User-created trip plans with dates and destination associations
- **Itineraries**: Detailed day-by-day activity plans for trips
- **Photos**: User-uploaded images associated with trips or general travel
- **Notifications**: System-generated alerts and reminders for users

The database schema is managed through Drizzle migrations, ensuring version-controlled schema evolution.

### Authentication & Authorization
Authentication is handled through Firebase Authentication supporting multiple providers:

- **Email/Password**: Traditional username/password authentication
- **Social Login**: Google and Facebook OAuth integration
- **Session Management**: Server-side sessions for API security
- **Protected Routes**: Client-side route protection based on authentication state

User sessions are persisted using PostgreSQL session storage, providing scalable session management across server instances.

### File Storage Strategy
The application implements a hybrid storage approach:

- **User Photos**: Firebase Storage for scalable file hosting with CDN benefits
- **Destination Images**: Static assets served through the application
- **Profile Pictures**: Firebase Storage with fallback to default avatars

This approach balances performance, scalability, and cost considerations for different types of media assets.

## External Dependencies

### Cloud Services
- **Firebase**: Authentication, file storage, and push notifications
- **PostgreSQL**: Primary database (Neon serverless in production)

### Development Tools
- **Drizzle Kit**: Database schema management and migrations
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundling for production builds

### UI/UX Libraries
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Consistent icon library
- **Date-fns**: Date manipulation and formatting utilities

### API & Data Management
- **TanStack Query**: Server state synchronization and caching
- **React Hook Form**: Performant form handling with minimal re-renders
- **Zod**: Runtime type validation and schema parsing

The application is designed for deployment on Replit with development-friendly features like hot module replacement and error overlays, while maintaining production-ready architecture patterns.