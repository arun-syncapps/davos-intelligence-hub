import { Router } from 'express';
import { db } from '../db/database';

const router = Router();

router.get('/', (req, res) => {
    try {
        const venues = db.prepare('SELECT * FROM venues ORDER BY name ASC').all();
        res.json(venues);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', (req, res) => {
    try {
        const venue = db.prepare('SELECT * FROM venues WHERE id = ?').get(req.params.id);
        if (!venue) return res.status(404).json({ error: 'Venue not found' });

        const events = db.prepare('SELECT * FROM events WHERE venue_id = ? ORDER BY date ASC, start_time ASC').all(req.params.id);

        res.json({ ...venue, events });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
