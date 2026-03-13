import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db/database';
import eventRoutes from './routes/events';
import speakerRoutes from './routes/speakers';
import organizationRoutes from './routes/organizations';
import venueRoutes from './routes/venues';
import registrationRoutes from './routes/registrations';
import authRoutes from './routes/auth';
import hostRoutes from './routes/host';
import adminRoutes from './routes/admin';
import userRoutes from './routes/user';
import networkRoutes from './routes/network';

const app = express();
const port = process.env.PORT || 5001;

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/host', hostRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/network', networkRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/speakers', speakerRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/register', registrationRoutes);

// Serve Static Files in Production
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// Handle React Routing
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
