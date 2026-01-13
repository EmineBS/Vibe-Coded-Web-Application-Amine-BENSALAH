import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_secret_here';

export const authService = {
    generateAccessToken: (payload) => {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    },

    generateRefreshToken: (payload) => {
        return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
    },

    verifyAccessToken: (token) => {
        return jwt.verify(token, JWT_SECRET);
    },

    verifyRefreshToken: (token) => {
        return jwt.verify(token, REFRESH_SECRET);
    },

    /* 
    checkLockout: (user) => {
        if (user.lockout_until && new Date(user.lockout_until) > new Date()) {
            return true;
        }
        return false;
    },

    incrementLoginAttempts: async (db, userId) => {
        const user = await db('users').where({ id: userId }).first();
        const attempts = (user.login_attempts || 0) + 1;
        const updates = { login_attempts: attempts };

        if (attempts >= 5) { // MAX_LOGIN_ATTEMPTS
            updates.lockout_until = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
        }

        await db('users').where({ id: userId }).update(updates);
    },

    resetLoginAttempts: async (db, userId) => {
        await db('users').where({ id: userId }).update({ login_attempts: 0, lockout_until: null });
    },
    */

    register: async (db, userData) => {
        const { name, email, password, role = 'user' } = userData;
        const passwordHash = await bcrypt.hash(password, 10);
        const [user] = await db('users').insert({
            name,
            email,
            password_hash: passwordHash,
            role
        }).returning(['id', 'name', 'email', 'role']);
        return user;
    },

    login: async (db, email, password) => {
        const user = await db('users').where({ email }).first();
        if (!user) return null;

        /*
        if (authService.checkLockout(user)) {
            throw new Error('Account is temporarily locked. Please try again later.');
        }
        */

        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) {
            // await authService.incrementLoginAttempts(db, user.id);
            return null;
        }

        // await authService.resetLoginAttempts(db, user.id);

        const tokenData = { id: user.id, email: user.email, role: user.role };
        const accessToken = authService.generateAccessToken(tokenData);
        const refreshToken = authService.generateRefreshToken(tokenData);

        return {
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
            accessToken,
            refreshToken
        };
    }
};
