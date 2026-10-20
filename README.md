# Pet Shop - E-commerce Platform for Pet Supplies

A full-stack e-commerce web application for purchasing pet supplies, built with Angular 18 and CoreUI template on the frontend, and Node.js/Express/PostgreSQL on the backend.

## Live Demo

- **Frontend:** https://pet-shop-phi-six.vercel.app
- **Backend:** https://pet-shop-c1mj.onrender.com

## Features

### User Management

- User registration and authentication
- Session-based login system
- Role-based access control (user vs superuser)
- User profile management
- Superuser can manage all users

### Product (Artikl) Management

- Browse all available pet products
- Add new products (superuser only)
- Delete products with confirmation modal (superuser only)
- Products feature unique codes starting at 1000
- Form validation for all product inputs

### Authentication & Authorization

- Secure user registration with password hashing (bcryptjs)
- Session-based authentication stored in PostgreSQL
- Role-based UI (different views for users and superusers)
- Route guards protecting admin-only pages
- Automatic session expiration

### UI / UX

- Built with CoreUI Angular v5 free template
- Clean, responsive layout optimized for all devices
- Consistent modal dialogs for all critical actions
- Protected routes with role-based navigation
- Professional admin dashboard interface

## Technologies Used

**Frontend**

- Angular 18
- CoreUI Angular v5 (Free Admin Template)
- TypeScript
- RxJS
- Angular Router Guards
- SCSS for styling

**Backend**

- Node.js
- Express
- PostgreSQL (Supabase)
- express-session + connect-pg-simple
- bcryptjs (password hashing)
- CORS

**Hosting**

- Frontend: Vercel
- Backend: Render
- Database: Supabase (PostgreSQL)

## Project Structure

<pre>
Pet_shop/
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── guards/
│       │   │   └── role.guard.ts
│       │   ├── icons/
│       │   ├── layout/
│       │   │   └── default-layout/
│       │   │       └── _nav.js
│       │   ├── services/
│       │   │   ├── artikli.service.ts
│       │   │   ├── auth.service.ts
│       │   │   └── korisnici.service.ts
│       │   ├── shared/
│       │   │   └── confirm-modal/
│       │   │       ├── confirm-modal.component.ts
│       │   │       ├── confirm-modal.component.html
│       │   │       └── confirm-modal.component.scss
│       │   └── views/
│       │       ├── artikli/
│       │       ├── dashboard/
│       │       ├── korisnici/
│       │       └── pages/
│       │           ├── login/
│       │           └── register/
│       ├── environments/
│       │   ├── environment.ts
│       │   └── environment.development.ts
│       ├── assets/
│       ├── scss/
│       └── index.html
│
└── backend/
    ├── controllers/
    │   ├── artikliController.js
    │   ├── authController.js
    │   ├── korisnikController.js
    │   └── orderController.js
    ├── middleware/
    │   ├── auth.middleware.js
    │   ├── requireRole.js
    │   └── validateRequest.js
    ├── models/
    │   ├── artiklModel.js
    │   ├── narudzbaModel.js
    │   └── userModel.js
    ├── routes/
    │   ├── artikli.routes.js
    │   ├── auth.routes.js
    │   ├── korisnik.routes.js
    │   └── order.routes.js
    ├── app.js
    ├── db.js
    ├── .env
    └── package.json
</pre>

## Installation & Local Setup

### Prerequisites

- Node.js LTS (v18.19+ or v20.09+)
- PostgreSQL or Supabase account
- Angular CLI (v18.0.0+)

### Backend Setup

1. Navigate to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file in `backend/` folder:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
SESSION_SECRET=your-secret-here
NODE_ENV=development
PORT=3000
```

4. Start backend server:

```bash
npm start
```

Backend runs on `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
ng serve
```

The app will be available at `http://localhost:4200`

## Deployment

### Backend (Render)

1. Connect GitHub repo to Render → New Web Service
2. Set **Root Directory** to `backend`
3. **Build command:** `npm install`
4. **Start command:** `npm start`
5. Add environment variables:
   - `DATABASE_URL` — Supabase connection string (Session Pooler, port 5432)
   - `SESSION_SECRET` — random secret string
   - `FRONTEND_URL` — Vercel frontend URL
   - `NODE_ENV` — `production`

### Frontend (Vercel)

1. Connect GitHub repo to Vercel → New Project
2. Set **Root Directory** to `frontend`
3. **Build command:** `ng build`
4. **Output directory:** `dist/[project-name]/browser`
5. Production API URL is set in `src/environments/environment.ts`

### Database (Supabase)

- PostgreSQL database hosted on Supabase
- Schema imported via `pg_dump` backup using `psql` CLI with Session Pooler connection
- Connection uses SSL (`rejectUnauthorized: false`)

## Database Schema

### korisnik (Users)

| Column     | Type                | Description                |
| ---------- | ------------------- | -------------------------- |
| idkorisnik | SERIAL PK           | Primary key                |
| ime        | VARCHAR(100)        | First name                 |
| prezime    | VARCHAR(100)        | Last name                  |
| email      | VARCHAR(255) UNIQUE | Email address              |
| password   | VARCHAR(255)        | Hashed password (bcryptjs) |
| role       | VARCHAR(20)         | User role (user/superuser) |
| created_at | TIMESTAMP           | Creation timestamp         |

### artikl (Products)

| Column     | Type           | Description                   |
| ---------- | -------------- | ----------------------------- |
| idartikl   | SERIAL PK      | Primary key                   |
| sifra      | INTEGER UNIQUE | Product code (starts at 1000) |
| naziv      | VARCHAR(255)   | Product name                  |
| cijena     | DECIMAL(10,2)  | Product price                 |
| created_at | TIMESTAMP      | Creation timestamp            |

### dokument (Orders)

| Column              | Type        | Description           |
| ------------------- | ----------- | --------------------- |
| iddokument          | SERIAL PK   | Primary key           |
| do_broj             | VARCHAR(50) | Order number          |
| do_datum            | DATE        | Order date            |
| do_datum_izrade     | TIMESTAMP   | Creation timestamp    |
| do_iznos            | NUMERIC     | Total amount          |
| korisnik_idkorisnik | INTEGER FK  | Reference to korisnik |

### dokumentstavke (Order Items)

| Column              | Type          | Description           |
| ------------------- | ------------- | --------------------- |
| iddokumentstavke    | SERIAL PK     | Primary key           |
| ds_kolicina         | INTEGER       | Quantity              |
| ds_cijena           | NUMERIC(10,2) | Price per item        |
| artikl_idartikl     | INTEGER FK    | Reference to artikl   |
| dokument_iddokument | INTEGER FK    | Reference to dokument |

### session (Sessions)

| Column | Type       | Description     |
| ------ | ---------- | --------------- |
| sid    | VARCHAR PK | Session ID      |
| sess   | JSON       | Session data    |
| expire | TIMESTAMP  | Expiration time |

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register new user     |
| POST   | `/api/auth/login`    | Login user            |
| POST   | `/api/auth/logout`   | Logout user           |
| GET    | `/api/auth/me`       | Check current session |

### Users (`/api/korisnik`)

| Method | Endpoint            | Description     | Access    |
| ------ | ------------------- | --------------- | --------- |
| GET    | `/api/korisnik`     | Get all users   | Superuser |
| DELETE | `/api/korisnik/:id` | Delete user     | Superuser |

### Products (`/api/artikli`)

| Method | Endpoint           | Description        | Access    |
| ------ | ------------------ | ------------------ | --------- |
| GET    | `/api/artikli`     | Get all products   | All       |
| POST   | `/api/artikli`     | Create new product | Superuser |
| DELETE | `/api/artikli/:id` | Delete product     | Superuser |

## Authentication Flow

1. **Registration:** User creates account → Backend hashes password with bcryptjs → Stores in PostgreSQL
2. **Login:** User submits credentials → Backend validates password → Creates server-side session in PostgreSQL → Returns session cookie to frontend
3. **Protected Routes:**
   - Frontend sends session cookie automatically with each request (`withCredentials: true`)
   - Backend middleware verifies session existence and validity
   - Role guard checks user permissions for admin-only actions
   - Expired sessions are automatically cleaned up

## Important Notes

### Frontend (CoreUI Template)

- Built on CoreUI Free Angular Admin Template
- CoreUI v5 uses directive-based modal syntax (`c-modal`) instead of component-based approach
- Angular environment files (`environment.ts` / `environment.development.ts`) used for API URL configuration — no hardcoded `localhost` URLs in service files

### Backend & Security

- Superuser role required for user and product management
- All passwords hashed with `bcryptjs` (cross-platform compatible, no native bindings)
- Sessions stored securely in PostgreSQL with automatic expiration
- CORS configured to allow both local development and production Vercel frontend
- `cookie.secure` and `cookie.sameSite` adjusted automatically based on `NODE_ENV`
- Input validation implemented on all forms
- SQL injection protection through parameterized queries
- `SESSION_SECRET` stored as environment variable (not hardcoded)

### Business Logic

- Product codes (`sifra`) start at 1000 and auto-increment via PostgreSQL sequence
- Confirmation modals displayed before any delete operation

### Planned Features

- Shopping cart functionality (UI elements present but not yet functional)

## Credits

**Frontend Template:** CoreUI Free Angular Admin Template

- Created by Łukasz Holeczek and CoreUI team
- Licensed under MIT
- Repository: https://github.com/coreui/coreui-free-angular-admin-template

**Custom Development:** Tea

## Author

Tea

## License

This project is for educational and portfolio purposes.
Frontend template (CoreUI) is MIT licensed - Copyright 2024 creativeLabs Łukasz Holeczek.
Custom backend and modifications are developed by Tea for educational purposes.
