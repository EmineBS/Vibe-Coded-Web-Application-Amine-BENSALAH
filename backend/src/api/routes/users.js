import express from 'express';
import { validate } from '../../middleware/validate.js';
import { z } from 'zod';

const registerSchema = z.object({
    body: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(8),
        role: z.enum(['user', 'admin']).optional(),
    }),
});

const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
});

export const userRoutes = (db, authService) => {
    const router = express.Router();

    router.post('/register', validate(registerSchema), async (req, res, next) => {
        try {
            const user = await authService.register(db, req.body);
            res.status(201).json({ status: 'success', data: user });
        } catch (err) {
            if (err.code === '23505') { // Unique constraint violation
                return res.status(400).json({ status: 'error', message: 'Email already registered' });
            }
            next(err);
        }
    });

    router.post('/login', validate(loginSchema), async (req, res, next) => {
        try {
            const result = await authService.login(db, req.body.email, req.body.password);
            if (!result) {
                return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
            }
            res.json({ status: 'success', data: result });
        } catch (err) {
            /*
            if (err.message.includes('locked')) {
                return res.status(403).json({ status: 'error', message: err.message });
            }
            */
            next(err);
        }
    });

    return router;
};
