export function requireRole(...roles) {
    return (req, res, next) => {

        if (!req.session.user) {
            return res.status(401).json({
                message: "Not authenticated"
            });
        }

        const { role } = req.session.user;

        if (!roles.includes(role)) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        next();
    };
}