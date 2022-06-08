import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';
import Response from './domain/response.js';
import logger from './util/logger.js';
import httpStatus from './controller/patient.controller.js';

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) =>
    res.send(
        new Response(
            httpStatus.OK.code,
            httpStatus.OK.status,
            'Patient API, v1.0.0 - All Systems Go'
        )
    )
);
app.listen(PORT, () =>
    logger.info(`Server running on: ${ip.address()}:${PORT}`)
);
