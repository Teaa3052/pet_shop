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

### Authentication & Roles
- Role-based UI (superuser vs regular user)
- Protected actions based on user role

### UI / UX
- Built with CoreUI Angular v5
- Clean, responsive layout
- Consistent modal dialogs for all critical actions

## Technologies Used

**Frontend**
- Angular
- CoreUI Angular v5
- TypeScript
- RxJS

**Backend**
- REST API

## Project Structure
```
src/
├── app/
│   ├── services/
│   │   ├── korisnici.service.ts
│   │   └── artikli.service.ts
│   ├── views/
│   │   ├── korisnici/
│   │   │   ├── korisnici.component.ts
│   │   │   └── korisnici.component.html
│   │   └── artikli/
│   │       ├── artikli.component.ts
│   │       └── artikli.component.html
│   └── shared/
│       └── components/
│           └── confirm-modal/
│               ├── confirm-modal.component.ts
│               └── confirm-modal.component.html
└── assets/
```

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm start
```

The app will be available at `http://localhost:4200`

## Backend API Requirements

The frontend expects a REST API with the following endpoints:

**Users**
- `GET /korisnici` - Get all users
- `POST /korisnici` - Create new user
- `DELETE /korisnici/:id` - Delete user

**Items (Artikli)**
- `GET /artikli` - Get all items
- `POST /artikli` - Create new item
- `DELETE /artikli/:id` - Delete item

## Important Notes

- CoreUI Angular v5 uses directive-based modal syntax (`c-modal`) instead of component-based approach
- Using old v4 modal tags will break the UI
- Superuser role is required for item management
- Form validation is implemented on all input forms
- Confirmation modals are displayed before any delete operation

## Author

Tea - Frontend Developer specializing in Angular & CoreUI

## License

This project is for educational and portfolio purposes.