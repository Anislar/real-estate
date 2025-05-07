import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { connectDb } from './db/client';
import { logger, env } from './utils';

// --------------------------> Initialize App <--------------------------
const app = express();

// --------------------------> Middleware <--------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cors());

// --------------------------> Routes <--------------------------
app.get('/', (_req, res) => {
  res.send('✅ This is the home route');
});

// You can modularize your routes like this later:
// app.use('/api/users', userRoutes);

// --------------------------> Server & DB Init <--------------------------
const startServer = async () => {
  try {
    await connectDb();

    const port = env.PORT || 3010;
    app.listen(port, () => {
      logger.info(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
