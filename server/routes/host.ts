import { Router } from 'express';
import { db } from '../db/database';
import { authenticateToken } from './auth';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Middleware to check host role
const checkHost = (req: any, res: any, next: any) => {
    if (req.user.role !== 'host' && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Host privileges required' });
    }
    next();
};

router.use(authenticateToken, checkHost);

router.get('/events', (req: any, res) => {
    try {
        const events = db.prepare('SELECT * FROM events WHERE host_id = ?').all(req.user.id);
        res.json(events);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/events', (req: any, res) => {
    try {
        const { title, description, date, start_time, end_time, venue_id, organization_id, category, type, image_url } = req.body;
        const id = uuidv4();
        const host_id = req.user.id;

        // Auto generate link or leave empty
        const registration_link = '';

        db.prepare(`
      INSERT INTO events (id, title, description, date, start_time, end_time, venue_id, organization_id, host_id, category, type, registration_link, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, title, description, date, start_time, end_time, venue_id, organization_id, host_id, category, type, registration_link, image_url);

        res.status(201).json({ message: 'Event created', id });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/events/:id', (req: any, res) => {
    try {
        const { title, date, start_time, end_time } = req.body;
        const event: any = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
        if (!event || (event.host_id !== req.user.id && req.user.role !== 'admin')) {
            return res.status(403).json({ error: 'Not authorized' });
        }
        db.prepare('UPDATE events SET title = ?, date = ?, start_time = ?, end_time = ? WHERE id = ?')
            .run(title, date, start_time, end_time, req.params.id);
        res.json({ message: 'Event updated' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/events/:id', (req: any, res) => {
    try {
        const event: any = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
        if (!event || (event.host_id !== req.user.id && req.user.role !== 'admin')) {
            return res.status(403).json({ error: 'Not authorized' });
        }
        db.prepare('DELETE FROM registrations WHERE event_id = ?').run(req.params.id);
        db.prepare('DELETE FROM events WHERE id = ?').run(req.params.id);
        res.json({ message: 'Event deleted' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/events/:id/attendees', (req: any, res) => {
    try {
        const event: any = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
        if (!event || (event.host_id !== req.user.id && req.user.role !== 'admin')) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        const attendees = db.prepare('SELECT id, user_name, user_email, status, created_at FROM registrations WHERE event_id = ? ORDER BY created_at DESC').all(req.params.id);
        res.json(attendees);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/events/:eventId/attendees/:id/status', (req: any, res) => {
    try {
        const { status } = req.body; // 'confirmed', 'rejected'

        const event: any = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.eventId);
        if (!event || (event.host_id !== req.user.id && req.user.role !== 'admin')) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        db.prepare('UPDATE registrations SET status = ? WHERE id = ? AND event_id = ?').run(status, req.params.id, req.params.eventId);
        res.json({ message: 'Status updated' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
