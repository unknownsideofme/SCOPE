import express from 'express';
import Database from './src/models/dbClass/dbClass.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// --- Connect to DB ---
const db = Database.getInstance();
await db.connect();

// --- Routes ---
app.get('/health', async (req, res) => {
    try {
        await db.client.query('SELECT 1');
        res.status(200).json({
            status: 'ok',
            db: 'connected',
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            db: 'disconnected',
            message: err.message,
        });
    }
});

// --- Start server ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
