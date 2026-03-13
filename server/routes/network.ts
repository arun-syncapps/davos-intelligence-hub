import { Router } from 'express';
import { db } from '../db/database';
import { authenticateToken } from './auth';

const router = Router();

router.use(authenticateToken);

// Get all users in the community with pagination
router.get('/members', (req: any, res) => {
    try {
        const query = req.query.q || '';
        let members: any[];
        if (query) {
             members = db.prepare(`
                SELECT id, name, headline, location, avatar_url, company, job_title 
                FROM users 
                WHERE name LIKE ? OR headline LIKE ? OR company LIKE ?
                ORDER BY created_at DESC
             `).all(`%${query}%`, `%${query}%`, `%${query}%`);
        } else {
             members = db.prepare(`
                SELECT id, name, headline, location, avatar_url, company, job_title 
                FROM users 
                ORDER BY created_at DESC 
             `).all();
        }
        res.json(members);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get a specific user's public profile
router.get('/members/:id', (req: any, res) => {
    try {
        const user = db.prepare('SELECT id, name, headline, about, location, industry, profile_url, background_image_url, avatar_url, company, job_title FROM users WHERE id = ?').get(req.params.id) as any;
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        const experiences = db.prepare('SELECT * FROM experiences WHERE user_id = ? ORDER BY start_date DESC').all(req.params.id);
        const educations = db.prepare('SELECT * FROM educations WHERE user_id = ? ORDER BY start_date DESC').all(req.params.id);
        
        // Check connection status
        const connection = db.prepare('SELECT * FROM connections WHERE (requester_id = ? AND recipient_id = ?) OR (requester_id = ? AND recipient_id = ?)').get(req.user.id, req.params.id, req.params.id, req.user.id);

        res.json({
            ...user,
            experiences,
            educations,
            connectionStatus: connection ? (connection as any).status : 'none'
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Connect with a user
router.post('/connect/:id', (req: any, res) => {
    try {
        if (req.user.id === req.params.id) {
             return res.status(400).json({ error: 'Cannot connect with yourself' });
        }
        db.prepare('INSERT INTO connections (id, requester_id, recipient_id, status, created_at) VALUES (?, ?, ?, ?, ?)').run(
             `conn-${Date.now()}`,
             req.user.id,
             req.params.id,
             'pending',
             new Date().toISOString()
        );
        res.json({ message: 'Connection request sent' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Create a post
router.post('/posts', (req: any, res) => {
    try {
        const { content, image_url } = req.body;
        db.prepare('INSERT INTO posts (id, author_id, content, image_url, created_at) VALUES (?, ?, ?, ?, ?)').run(
             `post-${Date.now()}`,
             req.user.id,
             content,
             image_url || null,
             new Date().toISOString()
        );
        res.json({ message: 'Post created' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get feed (posts)
router.get('/feed', (req: any, res) => {
    try {
        const posts = db.prepare(`
            SELECT p.*, u.name as author_name, u.headline as author_headline, u.avatar_url as author_avatar_url
            FROM posts p
            JOIN users u ON p.author_id = u.id
            ORDER BY p.created_at DESC
        `).all();
        
        const feed = posts.map((p: any) => {
            const likes = db.prepare('SELECT COUNT(*) as count FROM likes WHERE post_id = ?').get(p.id) as any;
            const userLiked = db.prepare('SELECT 1 FROM likes WHERE post_id = ? AND user_id = ?').get(p.id, req.user.id);
            const comments = db.prepare(`
                SELECT c.*, u.name as author_name, u.avatar_url as author_avatar_url 
                FROM comments c 
                JOIN users u ON c.author_id = u.id 
                WHERE c.post_id = ? 
                ORDER BY c.created_at ASC
            `).all(p.id);
            
            return {
                ...p,
                likes_count: likes.count,
                user_liked: !!userLiked,
                comments
            };
        });
        
        res.json(feed);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Like/Unlike a post
router.post('/posts/:id/like', (req: any, res) => {
    try {
        const existingLike = db.prepare('SELECT * FROM likes WHERE post_id = ? AND user_id = ?').get(req.params.id, req.user.id);
        if (existingLike) {
            db.prepare('DELETE FROM likes WHERE post_id = ? AND user_id = ?').run(req.params.id, req.user.id);
            res.json({ message: 'Post unliked', liked: false });
        } else {
            db.prepare('INSERT INTO likes (post_id, user_id, created_at) VALUES (?, ?, ?)').run(req.params.id, req.user.id, new Date().toISOString());
            res.json({ message: 'Post liked', liked: true });
        }
    } catch (err: any) {
         res.status(500).json({ error: err.message });
    }
});

export default router;
