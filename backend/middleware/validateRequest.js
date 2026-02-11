export const validateRegister = (req, res, next) => {
    const { ime, email, password } = req.body;

    if (!ime || !email || !password) {
        return res.status(400).json ({ message: "All fields are required!" });
    }

    if (!email.includes('@')) {
        return res.status(400).json ({ message: "Invalid email format!" });
    }

    if (password < 8) {
        return res.status(400).json ({ message: "Password is too short!" })
    }

    next();
}

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json ({ message: "Email and password required!" })
    }
    next()
}