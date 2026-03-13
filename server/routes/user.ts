import { Router } from 'express';
import { db } from '../db/database';
import { authenticateToken } from './auth';

const router = Router();

router.use(authenticateToken);

router.get('/registrations', (req: any, res) => {
    try {
        const registrations = db.prepare(`
      SELECT r.id, r.status, e.title, e.date, e.start_time, e.image_url 
      FROM registrations r
      JOIN events e ON r.event_id = e.id
      WHERE r.user_id = ?
      ORDER BY e.date ASC
    `).all(req.user.id);

        res.json(registrations);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/profile', (req: any, res) => {
    try {
        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id) as any;
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        const experiences = db.prepare('SELECT * FROM experiences WHERE user_id = ? ORDER BY start_date DESC').all(req.user.id);
        const educations = db.prepare('SELECT * FROM educations WHERE user_id = ? ORDER BY start_date DESC').all(req.user.id);
        const connections = db.prepare('SELECT * FROM connections WHERE requester_id = ? OR recipient_id = ?').all(req.user.id, req.user.id);
        
        delete user.password;
        
        res.json({
            ...user,
            experiences,
            educations,
            connections
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/profile', (req: any, res) => {
    try {
        const { headline, about, location, industry, profile_url, background_image_url, avatar_url, company, job_title } = req.body;
        db.prepare(`
            UPDATE users SET 
                headline = ?, about = ?, location = ?, industry = ?, profile_url = ?, background_image_url = ?, avatar_url = ?, company = ?, job_title = ?
            WHERE id = ?
        `).run(
            headline || null, 
            about || null, 
            location || null, 
            industry || null, 
            profile_url || null, 
            background_image_url || null, 
            avatar_url || null, 
            company || null, 
            job_title || null, 
            req.user.id
        );
        res.json({ message: 'Profile updated' });
    } catch (err: any) {
         res.status(500).json({ error: err.message });
    }
});

export default router;
