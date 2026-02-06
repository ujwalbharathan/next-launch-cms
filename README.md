# NextLaunchCMS - AI Health Coach Landing Page

A modern, animated landing page built with Next.js, GSAP, and MongoDB, featuring a full-featured admin panel for content management.

## Features

### Landing Page
- **Smooth Scrolling**: Implemented using Lenis for buttery-smooth scroll experience
- **GSAP Animations**: 
  - Hero section with timeline animations
  - Scroll-triggered animations for all sections
  - Stagger effects on cards and elements
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dynamic Content**: All content is editable from the admin panel
- **SEO Optimized**: Proper meta tags and semantic HTML

### Admin Panel
- **Secure Authentication**: Login system with bcrypt password hashing
- **Content Management**: Edit all sections of the landing page
- **Real-time Updates**: Changes appear instantly on the landing page
- **Clean UI**: Modern, intuitive interface

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom utilities
- **Animations**: GSAP with ScrollTrigger
- **Smooth Scroll**: Lenis
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: bcryptjs

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed and running locally, OR use MongoDB Atlas (cloud)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NextLaunchCMS
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Edit `.env` and configure:
```env
MONGODB_URI=mongodb://localhost:27017/nextlaunchcms
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Admin Access

### Demo Credentials
- **Email**: admin@example.com
- **Password**: admin123

### Admin Panel URL
Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin panel.

## Project Structure

```
NextLaunchCMS/
├── app/
│   ├── admin/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Admin dashboard
│   │   └── page.tsx               # Admin login
│   ├── api/
│   │   ├── auth/
│   │   │   └── login/
│   │   │       └── route.ts       # Authentication API
│   │   └── content/
│   │       └── route.ts           # Content CRUD API
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Landing page
├── components/
│   ├── admin/                     # Admin panel components
│   │   ├── AboutTab.tsx           # About section editor
│   │   ├── BrandingTab.tsx        # Branding editor
│   │   ├── ClientTab.tsx          # Clients editor
│   │   ├── FAQsTab.tsx            # FAQs editor
│   │   ├── FooterTab.tsx          # Footer editor
│   │   ├── HeroTab.tsx            # Hero section editor
│   │   ├── OfferTab.tsx           # Offer/CTA editor
│   │   └── TestimonialsTab.tsx    # Testimonials editor
│   ├── common/                    # Shared components
│   │   └── Loader.tsx             # Loading spinner
│   └── website/                   # Landing page components
│       ├── About.tsx              # About section
│       ├── Clients.tsx            # Clients/partners section
│       ├── CTA.tsx                # Call-to-action section
│       ├── FAQ.tsx                # FAQ section
│       ├── Footer.tsx             # Footer section
│       ├── Header.tsx             # Header/navigation
│       ├── Hero.tsx               # Hero section
│       ├── SmoothScroll.tsx       # Smooth scroll wrapper
│       └── Testimonials.tsx       # Testimonials section
├── lib/
│   └── mongodb.ts                 # MongoDB connection
├── models/
│   ├── Admin.ts                   # Admin model
│   └── Content.ts                 # Content model
├── public/                        # Static assets
│   ├── logo.png                   # App logo
│   ├── Hero_image.png             # Hero background
│   └── ...                        # Other images
├── types/
│   └── global.d.ts                # TypeScript declarations
├── .env                           # Environment variables (create this)
├── next.config.mjs                # Next.js configuration
├── package.json                   # Dependencies
├── tailwind.config.ts             # Tailwind configuration
└── tsconfig.json                  # TypeScript configuration
```

## Key Features Explained

### GSAP Animations
- **Hero Section**: Timeline animation with sequential reveals
- **Scroll Animations**: All sections animate on scroll using ScrollTrigger
- **Stagger Effects**: Cards and list items animate with delays

### Smooth Scrolling
- Implemented using Lenis library
- Custom easing function for natural feel
- RAF (RequestAnimationFrame) loop for smooth performance

### Content Management
- All content stored in MongoDB
- Real-time updates without rebuild
- Simple REST API for CRUD operations

## Building for Production

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/nextlaunchcms |
| ADMIN_EMAIL | Default admin email | admin@example.com |
| ADMIN_PASSWORD | Default admin password | admin123 |
