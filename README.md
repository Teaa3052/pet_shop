# User & Items Management App

Angular + CoreUI + REST API - A modern, responsive web application for managing users and items, built with Angular and CoreUI. The app communicates with a backend REST API to fetch, create, and delete data.

## Features

### User Management
- Display all users
- Add a new user
- Delete a user with confirmation modal
- Form validation
- Prevent deletion of superuser accounts

### Item (Artikl) Management
- Display all items
- Add a new item
- Delete an item with confirmation modal
- Item management available only to superusers
- Form validation

### Document & Order Management
- Create documents (orders)
- Track document items
- Manage order history

### Authentication & Authorization
- User registration
- User login
- Session-based authentication
- Role-based access control (user vs superuser)
- Route guards for protected pages

### UI / UX
- Built with CoreUI Angular v5
- Clean, responsive layout
- Consistent modal dialogs for all critical actions
- Protected routes with role-based navigation

## Technologies Used

**Frontend**
- Angular
- CoreUI Angular v5
- TypeScript
- RxJS
- Angular Router Guards

**Backend**
- Node.js
- Express
- PostgreSQL
- express-session + connect-pg-simple
- bcrypt
- CORS

## Project Structure
```
Pet_shop/
├── frontend/
│   └── src/
│       └── app/
│           ├── guards/
│           │   └── role.guard.ts
│           ├── services/
│           │   ├── artikli.service.ts
│           │   ├── auth.service.ts
│           │   └── korisnici.service.ts
│           ├── shared/
│           │   └── confirm-modal/
│           │       ├── confirm-modal.component.ts
│           │       ├── confirm-modal.component.html
│           │       └── confirm-modal.component.scss
│           ├── views/
│           │   ├── artikli/
│           │   │   ├── artikli.component.ts
│           │   │   ├── artikli.component.html
│           │   │   ├── artikli.component.scss
│           │   │   └── routes.ts
│           │   ├── dashboard/
│           │   │   ├── dashboard.component.ts
│           │   │   ├── dashboard.component.html
│           │   │   ├── dashboard.component.scss
│           │   │   └── routes.ts
│           │   └── korisnici/
│           │       ├── korisnici.component.ts
│           │       ├── korisnici.component.html
│           │       ├── korisnici.component.scss
│           │       └── routes.ts
│           └── pages/
│               ├── login/
│               │   ├── login.component.ts
│               │   ├── login.component.html
│               │   └── login.component.scss
│               ├── register/
│               │   ├── register.component.ts
│               │   ├── register.component.html
│               │   └── register.component.scss
│               └── routes.ts
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
```

## Installation & Setup

### Prerequisites
- Node.js (v14.x or later)
- PostgreSQL
- Angular CLI

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
DB_HOST=localhost
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=your_database_name
DB_PORT=5432
SESSION_SECRET=petshop-secret
PORT=3000
```

4. Create PostgreSQL database and tables:
```sql
CREATE DATABASE your_database_name;

\c your_database_name;

-- Users table
CREATE TABLE korisnik (
    id SERIAL PRIMARY KEY,
    ime VARCHAR(100) NOT NULL,
    prezime VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Items table with custom sequence starting at 1000
CREATE SEQUENCE artikl_sifra_seq START WITH 1000;

CREATE TABLE artikl (
    id SERIAL PRIMARY KEY,
    sifra INTEGER UNIQUE DEFAULT nextval('artikl_sifra_seq'),
    naziv VARCHAR(255) NOT NULL,
    cijena DECIMAL(10, 2) NOT NULL,
    opis TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents (Orders) table
CREATE TABLE dokument (
    iddokument SERIAL PRIMARY KEY,
    do_broj VARCHAR(50),
    do_datum DATE,
    do_datum_izrade TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    do_iznos NUMERIC,
    korisnik_idkorisnik INTEGER REFERENCES korisnik(id) ON DELETE CASCADE
);

-- Document items table
CREATE TABLE dokumentstavke (
    iddokumentstavke SERIAL PRIMARY KEY,
    ds_kolicina INTEGER,
    ds_cijena NUMERIC(10, 2),
    artikl_idartikl INTEGER REFERENCES artikl(id) ON DELETE CASCADE,
    dokument_iddokument INTEGER REFERENCES dokument(iddokument) ON DELETE CASCADE
);

-- Sessions table
CREATE TABLE session (
    sid VARCHAR PRIMARY KEY,
    sess JSON NOT NULL,
    expire TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL
);

CREATE INDEX idx_session_expire ON session (expire);
```

5. Start backend server:
```bash
node app.js
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
npm start
```

The app will be available at `http://localhost:4200`

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Users (Korisnici)
- `GET /korisnik` - Get all users (superuser only)
- `POST /korisnik` - Create new user (superuser only)
- `DELETE /korisnik/:id` - Delete user (superuser only)

### Items (Artikli)
- `GET /artikl` - Get all items
- `POST /artikl` - Create new item (superuser only)
- `DELETE /artikl/:id` - Delete item (superuser only)

## Database Schema

### korisnik (Users)
- `id` - Primary key
- `ime` - First name
- `prezime` - Last name
- `email` - Unique email
- `password` - Hashed password
- `uloga` - Role (user/superuser)

### artikl (Items)
- `id` - Primary key
- `sifra` - Unique item code (starts at 1000)
- `naziv` - Item name
- `cijena` - Price
- `opis` - Description

### dokument (Orders)
- `iddokument` - Primary key
- `do_broj` - Document number
- `do_datum` - Document date
- `do_datum_izrade` - Creation timestamp
- `do_iznos` - Total amount
- `korisnik_idkorisnik` - Foreign key to users

### dokumentstavke (Order Items)
- `iddokumentstavke` - Primary key
- `ds_kolicina` - Quantity
- `ds_cijena` - Price per item
- `artikl_idartikl` - Foreign key to items
- `dokument_iddokument` - Foreign key to documents

## Authentication Flow

1. **Register**: User creates account → Backend hashes password with bcrypt → Stores in PostgreSQL
2. **Login**: User submits credentials → Backend validates → Creates server-side session → Returns session cookie
3. **Protected Routes**: Frontend sends session cookie with each request → Backend middleware verifies session → Role guard checks user permissions

## Important Notes

- CoreUI Angular v5 uses directive-based modal syntax (`c-modal`) instead of component-based approach
- Using old v4 modal tags will break the UI
- Superuser role is required for user and item management
- Form validation is implemented on all input forms
- Confirmation modals are displayed before any delete operation
- CORS is configured to allow frontend-backend communication with credentials
- Sessions are stored in PostgreSQL database with automatic expiration
- Role guards protect admin-only routes
- Item codes (sifra) start at 1000 and auto-increment
- Shopping cart functionality is planned for future implementation

## Author

Tea

## License

This project is for educational and portfolio purposes.