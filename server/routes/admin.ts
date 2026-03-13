import { Router } from 'express';
import { db } from '../db/database';
import { authenticateToken } from './auth';

const router = Router();

// Middleware to check admin role
const checkAdmin = (req: any, res: any, next: any) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin privileges required' });
    }
    next();
};

router.use(authenticateToken, checkAdmin);

router.get('/stats', (req, res) => {
    try {
        const stats = {
            users: (db.prepare('SELECT COUNT(*) as count FROM users').get() as any).count,
            events: (db.prepare('SELECT COUNT(*) as count FROM events').get() as any).count,
            venues: (db.prepare('SELECT COUNT(*) as count FROM venues').get() as any).count,
            registrations: (db.prepare('SELECT COUNT(*) as count FROM registrations').get() as any).count,
            connections: (db.prepare('SELECT COUNT(*) as count FROM connections').get() as any).count,
            posts: (db.prepare('SELECT COUNT(*) as count FROM posts').get() as any).count,
            profile_views: (db.prepare('SELECT COUNT(*) as count FROM profile_views').get() as any).count
        };
        res.json(stats);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/users', (req, res) => {
    try {
        const users = db.prepare('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC').all();
        res.json(users);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/users/:id/role', (req: any, res) => {
    try {
        const { role } = req.body;
        db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, req.params.id);
        res.json({ message: 'Role updated' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/users/:id', (req: any, res) => {
    try {
        const { name, email } = req.body;
        db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?').run(name, email, req.params.id);
        res.json({ message: 'User updated' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/users/:id', (req: any, res) => {
    try {
        // delete from registrations as well
        db.prepare('DELETE FROM registrations WHERE user_id = ?').run(req.params.id);
        db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/events', (req, res) => {
    try {
        const events = db.prepare('SELECT id, title, category, host_id, date FROM events ORDER BY date DESC').all();
        // join with host names
        const eventsWithHosts = events.map((e: any) => {
            const host: any = e.host_id ? db.prepare('SELECT name FROM users WHERE id = ?').get(e.host_id) : { name: 'Unknown' };
            return { ...e, host_name: host ? host.name : 'Unknown' };
        });
        res.json(eventsWithHosts);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/events/:id', (req, res) => {
    try {
        db.prepare('DELETE FROM events WHERE id = ?').run(req.params.id);
        res.json({ message: 'Event deleted' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
