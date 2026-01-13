export const validate = (schema) => (req, res, next) => {
    try {
        const validated = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        // safely assign validated data back to req
        if (validated.body) req.body = validated.body;
        if (validated.query) {
            try { req.query = validated.query; } catch (e) { /* ignore read-only */ }
        }
        if (validated.params) {
            try { req.params = validated.params; } catch (e) { /* ignore read-only */ }
        }

        next();
    } catch (error) {
        if (error.errors) {
            return res.status(400).json({
                status: 'error',
                message: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
            });
        }
        console.error('[ValidationError]', error);
        next(error);
    }
};
