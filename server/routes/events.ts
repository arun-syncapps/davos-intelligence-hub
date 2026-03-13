import { Router } from 'express';
import { db } from '../db/database';

const router = Router();

router.get('/', (req, res) => {
    try {
        const { date, category } = req.query;

        let query = 'SELECT * FROM events WHERE 1=1';
        const params: string[] = [];

        if (date) {
            query += ' AND date = ?';
            params.push(date as string);
        }

        if (category) {
            query += ' AND category = ?';
            params.push(category as string);
        }

        query += ' ORDER BY date ASC, start_time ASC';

        const events = db.prepare(query).all(...params);
        res.json(events);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', (req, res) => {
    try {
        const event = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });

        const speakers = db.prepare(`
      SELECT s.* FROM speakers s 
      JOIN event_speakers es ON s.id = es.speaker_id 
      WHERE es.event_id = ?
    `).all(req.params.id);

        const venue = db.prepare('SELECT * FROM venues WHERE id = ?').get((event as any).venue_id);
        const organization = db.prepare('SELECT * FROM organizations WHERE id = ?').get((event as any).organization_id);

        res.json({ ...event, speakers, venue, organization });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
