import { Router } from 'express';
import { db } from '../db/database';

const router = Router();

router.get('/', (req, res) => {
    try {
        const organizations = db.prepare('SELECT * FROM organizations ORDER BY name ASC').all();
        res.json(organizations);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', (req, res) => {
    try {
        const org: any = db.prepare('SELECT * FROM organizations WHERE id = ?').get(req.params.id);
        if (!org) return res.status(404).json({ error: 'Organization not found' });

        const events = db.prepare('SELECT * FROM events WHERE organization_id = ? ORDER BY date ASC').all(req.params.id);
        const speakers = db.prepare('SELECT * FROM speakers WHERE organization_id = ? ORDER BY name ASC').all(req.params.id);

        res.json({ ...org, events, speakers });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
