import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  bodyParser.json({
    limit: "16kb",
  })
);

app.use(
  cors({
    origin: "http://localhost:8080", // Allow requests only from your frontend
    methods: ["GET", "POST", "PATCH", "DELETE"], // Specify allowed methods
    credentials: true, // If your requests include credentials
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

//Import Routes

import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import likeRoutes from "./routes/like.routes.js";
import followRoutes from "./routes/follow.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/comment", commentRoutes);
app.use("/api/v1/like", likeRoutes);
app.use("/api/v1/follow", followRoutes);

export { app };
