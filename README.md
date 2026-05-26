# SOLARO — Solar Energy for Bangladesh

A full-stack e-commerce and business management platform for selling solar panels and home kits to Bangladeshi families. Built with Next.js 14, Prisma, and PostgreSQL.

---

## Features

### Customer-Facing
- **Product catalog** — browse solar panels, batteries, inverters, home kits, and accessories with detailed specs, savings estimates, and image galleries
- **Solar savings calculator** — interactive tool to estimate energy savings and recommend the right system based on usage
- **District coverage map** — shows delivery and installation availability across all 64 districts of Bangladesh
- **Cart & checkout** — full cart flow with support for Cash on Delivery, bKash, Nagad, Rocket, and bank transfer
- **User accounts** — registration, email verification, login, two-factor authentication, password reset, and profile management
- **Product reviews** — customers can submit and read reviews per product

### Admin Panel (`/admin`)
- **Dashboard** — overview of orders, revenue, customers, and leads with charts (Recharts)
- **Products** — create, edit, and manage product listings with rich text descriptions (Tiptap) and image uploads (UploadThing / ImageKit)
- **Orders** — view and update order status and payment status
- **Customers** — customer directory with order history and spend tracking
- **Leads** — CRM-style lead pipeline with status, priority, and assignment
- **Districts** — manage coverage and solar potential data per district
- **Reviews** — approve or reject submitted product reviews
- **Users** — manage admin users with role-based permissions
- **Analytics** — traffic and sales analytics
- **Settings** — site-wide configuration
- **Notifications** 

### User Dashboard (`/dashboard`)
- Order history and status tracking
- Profile and account settings

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | JavaScript / JSX |
| Styling | Tailwind CSS, shadcn/ui, Radix UI |
| Animations | Framer Motion |
| Database | PostgreSQL (Neon) via Prisma ORM |
| Auth | Custom session-based auth with bcryptjs |
| State | Zustand (cart, checkout), TanStack Query (server state) |
| Rich Text | Tiptap |
| File Uploads | UploadThing, ImageKit |
| Real-time | Pusher |
| Email | Nodemailer (Gmail) |
| Caching | Upstash Redis |
| Charts | Recharts |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- A PostgreSQL database (e.g. [Neon](https://neon.tech))

### Installation

```bash
# Clone the repo
git clone https://github.com/sakhawatkabir/solaro/
cd solaro

# Install dependencies
pnpm install
```

### Environment Variables

Create a `.env` file in the root with the following keys:

```env
# Database
DATABASE_URL="postgresql://..."

# Email (Gmail)
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# File uploads
UPLOADTHING_TOKEN=
```

### Database Setup

```bash
# Push schema to database
pnpm db:push

# Or run migrations
pnpm db:migrate

# Seed initial data
pnpm db:seed

# Open Prisma Studio (GUI)
pnpm db:studio
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build & Production

```bash
pnpm build
pnpm start
```

---
