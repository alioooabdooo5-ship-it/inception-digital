# Overview

This is a full-stack web application for a digital marketing consultancy called "Inception" (إنسيبشن). The application serves as a comprehensive business website featuring services, portfolio, client testimonials, and an administrative dashboard. The site is built for Arabic-speaking markets and focuses on digital marketing services including SEO, paid advertising, content creation, and web development.

## Recent Changes (Latest)
- **Complete Service Management Integration (Aug 3, 2025)**: Fixed critical workflow issues in service management system
- **Database Enhancement**: Added 6 new service fields (portfolio_items, features, process_steps, testimonials, packages, faqs)
- **Public-Admin Integration**: Connected enhanced service editor with public service pages (Services.tsx & ServiceDetail.tsx)
- **Enhanced Service Display**: 4 new sections showing features, testimonials, packages, and FAQs on service detail pages
- **Real Data Integration**: Replaced demo data with actual database content across all service pages
- **Workflow Completion**: Full service lifecycle from creation in admin dashboard to public display working seamlessly
- **TypeScript Fixes**: Resolved all type errors and improved data structure consistency
- **Professional SEO System Implementation**: Complete On-Page SEO optimization for all content types
- **Enhanced Article Editor**: Comprehensive SEO suite with 5 tabs (Basic, Social Media, Technical, Content, Analysis)
- **Advanced SEO Features**: Meta tags, canonical URLs, robots settings, Open Graph, Twitter Cards, Schema.org markup

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom design system using shadcn/ui components
- **State Management**: TanStack React Query for server state management
- **UI Components**: Comprehensive component library using Radix UI primitives
- **Rich Text Editing**: TipTap editor for content creation and editing
- **Icons**: Lucide React icons and FontAwesome for enhanced visual elements

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database Layer**: Drizzle ORM configured for PostgreSQL with Neon Database
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **API Structure**: RESTful API design with `/api` prefix routing
- **Development Setup**: Vite integration for hot module replacement and development server

## Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Centralized schema definition in `shared/schema.ts`
- **Migrations**: Database migrations managed via `npm run db:push`
- **Current Tables**: 
  - users (authentication with username/password)
  - articles (content management)
  - services (business services)
  - industries (business sectors)
  - books (digital publications)
  - testimonials (client feedback)
  - contact_forms (user inquiries)
  - media_files (file management)
  - settings (site configuration)

## Content Management & Admin System
- **Admin Dashboard**: Comprehensive CMS with independent authentication system (username: admin, password: admin123)
- **Modular Structure**: Each admin section has its own protected route and dedicated page component
- **Admin Routes**: 
  - `/admin` - Main dashboard with overview
  - `/admin/articles` - Article management
  - `/admin/services` - Service management  
  - `/admin/industries` - Industry management
  - `/admin/books` - Book management
  - `/admin/testimonials` - Testimonial management
  - `/admin/users` - User management
  - `/admin/contact-forms` - Contact form management
  - `/admin/media` - Media file management
  - `/admin/seo` - SEO management tools
  - `/admin/analytics` - Site analytics
  - `/admin/settings` - Site configuration
- **Authentication Flow**: Login redirects to `/admin` dashboard instead of home page
- **Route Protection**: All admin routes require authentication before access
- **Rich Content**: Support for rich text editing with images, tables, and formatting

## Development Workflow
- **Build System**: Vite for frontend bundling and esbuild for backend compilation
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared code
- **Code Organization**: Monorepo structure with shared types and utilities
- **Path Aliases**: Configured aliases for clean imports (@, @shared, @assets)

# External Dependencies

## Database Services
- **Neon Database**: PostgreSQL-compatible serverless database
- **Drizzle Kit**: Database migration and schema management tools

## UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Radix UI**: Accessible component primitives for complex UI elements
- **shadcn/ui**: Pre-built component library built on Radix UI
- **Autoprefixer**: CSS vendor prefixing for browser compatibility

## Development Tools
- **Vite**: Fast build tool with HMR for development
- **ESBuild**: Fast bundler for production builds
- **Replit Integration**: Development environment integration with error overlays
- **TypeScript**: Static type checking and enhanced developer experience

## Content and Media
- **TipTap**: Rich text editor with extensible plugin system
- **FontAwesome**: Icon library for enhanced visual design
- **Image Handling**: Support for various image formats and optimization

## Form Handling
- **React Hook Form**: Performant form handling with validation
- **Hookform Resolvers**: Schema validation integration
- **Zod**: Runtime type validation for form schemas