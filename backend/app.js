import express from 'express';
import session from 'express-session';
import cors from 'cors';
import pool from './db.js';
import connectPgSimple from 'connect-pg-simple';


import authRoutes from './routes/auth.routes.js';
import korisnikRoutes from './routes/korisnik.routes.js';
import artikliRoutes from './routes/artikli.routes.js';
//import cartRoutes from './routes/cart.routes.js';
//import orderRoutes from './routes/order.routes.js';

const app = express(); 

const PgSession = connectPgSimple(session);

app.use(cors ({
    origin: 'http://localhost:4200',
    credentials: true
}));

app.use(express.json());

app.use(session({
    store: new PgSession({
        pool: pool,
        tableName: 'session'
    }),
    secret: 'petshop-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax'
    }
}));

app.use('/api/auth', authRoutes);
app.use('/api/korisnik', korisnikRoutes);
app.use('/api/artikli', artikliRoutes);
//app.use('/cart', cartRoutes)
//app.use('/order', orderRoutes);

app.listen(3000, () => {
    console.log('Backend running on http://localhost:3000');
});

pool.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => console.error("Database connection error: ", err))


app.get('/', (req, res) => {
  res.send('Backend is running');
});

