export function requireAuth(req, res, next) {

    console.log("=== AUTH DEBUG ===");
    console.log("Session ID:", req.sessionID);
    console.log("Session:", req.session);
    console.log("User:", req.session.user);

    if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated!" });
    }

    next();
}