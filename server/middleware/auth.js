import jwt from "jsonwebtoken";
import cors from "cors"; // Import the cors middleware

// const corsOptions = {
//   // Define your CORS options here
//   origin: "http://localhost:3001", // Change this to the specific origin you want to allow
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
    // const corsMiddleware = cors(corsOptions);
    // corsMiddleware(req, res, next);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
