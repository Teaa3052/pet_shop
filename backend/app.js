import express from 'express';
import session from 'express-session';
import cors from 'cors';
import pool from './db.js';
import connectPgSimple from 'connect-pg-simple';

import authRoutes from './routes/auth.routes.js';
import korisnikRoutes from './routes/korisnik.routes.js';
import artikliRoutes from './routes/artikli.routes.js';

const app = express(); 

const PgSession = connectPgSimple(session);

const allowedOrigins = [
    'http://localhost:4200',
    process.env.FRONTEND_URL
].filter(Boolean);

app.options('*', cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json());

app.use(session({
    store: new PgSession({
        pool: pool,
        tableName: 'session'
    }),
    secret: process.env.SESSION_SECRET || 'petshop-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

app.use('/api/auth', authRoutes);
app.use('/api/korisnik', korisnikRoutes);
app.use('/api/artikli', artikliRoutes);

app.get('/', (req, res) => {
    res.send('Backend is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
    console.log('Allowed origins:', allowedOrigins);
    console.log(`Backend running on port ${PORT}`);
});

pool.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => console.error("Database connection error: ", err));