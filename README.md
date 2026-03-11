# Pet Shop - E-commerce Platform for Pet Supplies

A full-stack e-commerce web application for purchasing pet supplies, built with Angular and CoreUI template on the frontend, and Node.js/Express/PostgreSQL on the backend.

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
- Secure user registration with password hashing
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
- PostgreSQL
- express-session + connect-pg-simple
- bcrypt (password hashing)
- CORS

## Project Structure
```
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
│       │       │   ├── artikli.component.ts
│       │       │   ├── artikli.component.html
│       │       │   ├── artikli.component.scss
│       │       │   └── routes.ts
│       │       ├── dashboard/
│       │       │   ├── dashboard.component.ts
│       │       │   ├── dashboard.component.html
│       │       │   ├── dashboard.component.scss
│       │       │   └── routes.ts
│       │       ├── korisnici/
│       │       │   ├── korisnici.component.ts
│       │       │   ├── korisnici.component.html
│       │       │   ├── korisnici.component.scss
│       │       │   └── routes.ts
│       │       └── pages/
│       │           ├── login/
│       │           │   ├── login.component.ts
│       │           │   ├── login.component.html
│       │           │   └── login.component.scss
│       │           ├── register/
│       │           │   ├── register.component.ts
│       │           │   ├── register.component.html
│       │           │   └── register.component.scss
│       │           └── routes.ts
│       ├── assets/
│       ├── scss/
│       ├── index.html
│       └── angular.json
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
- Node.js LTS (v18.19+ or v20.09+)
- PostgreSQL
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
DB_HOST=localhost
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=petshop_db
DB_PORT=5432
SESSION_SECRET=petshop-secret
PORT=3000
```

4. Create PostgreSQL database and tables:
```sql
CREATE DATABASE petshop_db;

\c petshop_db;

-- Users table
CREATE TABLE korisnik (
    idkorisnik SERIAL PRIMARY KEY,
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
    idartikl SERIAL PRIMARY KEY,
    sifra INTEGER UNIQUE DEFAULT nextval('artikl_sifra_seq'),
    naziv VARCHAR(255) NOT NULL,
    cijena DECIMAL(10, 2) NOT NULL,
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
or
```bash
ng serve
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

### Products (Artikli)
- `GET /artikl` - Get all products
- `POST /artikl` - Create new product (superuser only)
- `DELETE /artikl/:id` - Delete product (superuser only)

## Database Schema

### korisnik (Users)
- `idkorisnik` - Primary key (auto-increment)
- `ime` - First name
- `prezime` - Last name
- `email` - Unique email address
- `password` - Hashed password (bcrypt)
- `role` - User role (user/superuser)

### artikl (Products)
- `idartikl` - Primary key (auto-increment)
- `sifra` - Unique product code (starts at 1000, auto-increment)
- `naziv` - Product name
- `cijena` - Product price

### dokument (Orders/Documents)
- `iddokument` - Primary key (auto-increment)
- `do_broj` - Document/order number
- `do_datum` - Document date
- `do_datum_izrade` - Creation timestamp
- `do_iznos` - Total order amount
- `korisnik_idkorisnik` - Foreign key to users table

### dokumentstavke (Order Items)
- `iddokumentstavke` - Primary key (auto-increment)
- `ds_kolicina` - Item quantity
- `ds_cijena` - Price per item
- `artikl_idartikl` - Foreign key to products table
- `dokument_iddokument` - Foreign key to documents table

### session (Sessions)
- `sid` - Session ID (primary key)
- `sess` - Session data (JSON)
- `expire` - Session expiration timestamp

## Authentication Flow

1. **Registration**: User creates account → Backend hashes password with bcrypt → Stores in PostgreSQL
2. **Login**: User submits credentials → Backend validates password → Creates server-side session in PostgreSQL → Returns session cookie to frontend
3. **Protected Routes**: 
   - Frontend sends session cookie automatically with each request
   - Backend middleware verifies session existence and validity
   - Role guard checks user permissions for admin-only actions
   - Expired sessions are automatically cleaned up

## Important Notes

### Frontend (CoreUI Template)
- Built on CoreUI Free Angular Admin Template
- CoreUI v5 uses directive-based modal syntax (`c-modal`) instead of component-based approach
- Using old v4 modal tags will break the UI
- Template provides responsive layout, navigation, and UI components
- Custom components added: confirm-modal for delete confirmations
- SCSS used for custom styling

### Backend & Security
- Superuser role required for user and product management
- All passwords hashed with bcrypt before storage
- Sessions stored securely in PostgreSQL with automatic expiration
- CORS configured to allow frontend-backend communication with credentials
- Input validation implemented on all forms
- SQL injection protection through parameterized queries

### Business Logic
- Product codes (sifra) start at 1000 and auto-increment
- Confirmation modals displayed before any delete operation

### Planned Features
- Shopping cart functionality (UI elements present but not functional)

## Credits

**Frontend Template**: CoreUI Free Angular Admin Template
- Created by Łukasz Holeczek and CoreUI team
- Licensed under MIT
- Repository: https://github.com/coreui/coreui-free-angular-admin-template

**Custom Development**: Tea

## Author

Tea 

## License

This project is for educational and portfolio purposes.

Frontend template (CoreUI) is MIT licensed - Copyright 2024 creativeLabs Łukasz Holeczek.
Custom backend and modifications are developed by Tea for educational purposes.