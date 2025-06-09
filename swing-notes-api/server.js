import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Import routes
import userRoutes from './routes/userRoutes.js';
import notesRoutes from './routes/notesRoutes.js';

// Swagger imports
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swagger/swaggerOptions.js';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/notes', notesRoutes);

// Generate Swagger spec from JSDoc comments
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server with clear logs showing localhost URLs
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
});
