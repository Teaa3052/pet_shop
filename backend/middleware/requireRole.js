export function requireRole(...roles)  {
    return (req, res, next) => {
        if (!req.session.user) {
            return res.status(401).json({ message: "Unauthorized"})
        }
        if (!roles.includes(req.session.user.role)) {
            return res.status(403).json({ message: "Forbidden: INsufficient permission"});
        }
        next();
    };
}