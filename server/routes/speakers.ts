import { Router } from 'express';
import { db } from '../db/database';

const router = Router();

router.get('/', (req, res) => {
    try {
        const speakers = db.prepare(`
      SELECT s.*, o.name as organization_name 
      FROM speakers s 
      LEFT JOIN organizations o ON s.organization_id = o.id
      ORDER BY s.name ASC
    `).all();
        res.json(speakers);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', (req, res) => {
    try {
        const speaker: any = db.prepare(`
            SELECT s.*, o.name as organization_name
            FROM speakers s
            LEFT JOIN organizations o ON s.organization_id = o.id
            WHERE s.id = ?
        `).get(req.params.id);

        if (!speaker) return res.status(404).json({ error: 'Speaker not found' });

        const events = db.prepare(`
            SELECT e.* 
            FROM events e
            JOIN event_speakers es ON e.id = es.event_id
            WHERE es.speaker_id = ?
            ORDER BY e.date ASC
        `).all(req.params.id);

        res.json({ ...speaker, events });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
