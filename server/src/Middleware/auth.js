import jwt from "jsonwebtoken";

export const isAuthenticated  = (req, res, next) => {
  const token = req.cookies.token;

      if (!token) {
        res.status(401).json({ message: "Not logged in" });
        return;
      }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const optionalAuthenticate = (req, _res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    req.user = null;
    next();
    return;
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    req.user = null;
  }
  next();
};