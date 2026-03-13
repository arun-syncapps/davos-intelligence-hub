import { Router } from 'express';
import { db } from '../db/database';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = 'davos2026-super-secret';

router.post('/', (req, res) => {
    try {
        const { event_id, user_name, user_email } = req.body;

        if (!event_id || !user_name || !user_email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        let user_id = null;

        // Check if auth token is present to link registration
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            try {
                const decoded: any = jwt.verify(token, JWT_SECRET);
                user_id = decoded.id;
            } catch (err) { }
        }

        const registration = {
            id: uuidv4(),
            event_id,
            user_name,
            user_email,
            status: 'pending', // Pending by default to allow Host approval like Luma
            created_at: new Date().toISOString()
        };

        const stmt = db.prepare(`
      INSERT INTO registrations (id, event_id, user_id, user_name, user_email, status, created_at)
      VALUES (@id, @event_id, ?, @user_name, @user_email, @status, @created_at)
    `);

        // SQLite better-sqlite3 handles named parameters (@id) but we mixed named and ?.
        // Fix: use all named or all ?
        db.prepare(`
      INSERT INTO registrations (id, event_id, user_id, user_name, user_email, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(registration.id, registration.event_id, user_id, registration.user_name, registration.user_email, registration.status, registration.created_at);

        res.status(201).json({ message: 'Registration requested. Awaiting host approval.', registration });
    } catch (err: any) {
        if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Already registered for this event' });
        }
        res.status(500).json({ error: err.message });
    }
});

export default router;
