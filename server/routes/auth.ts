import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/database';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const JWT_SECRET = 'davos2026-super-secret';

router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        const user: any = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

        // remove pass
        delete user.password;

        res.json({ token, user });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/register', (req, res) => {
    try {
        const { name, email, password, role = 'guest' } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing fields' });
        }

        const existing: any = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        if (existing) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const id = uuidv4();
        const hash = bcrypt.hashSync(password, 10);

        db.prepare('INSERT INTO users (id, name, email, password, role, created_at) VALUES (?, ?, ?, ?, ?, ?)')
            .run(id, name, email, hash, role, new Date().toISOString());

        const token = jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '24h' });

        res.json({ token, user: { id, name, email, role } });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

export default router;
