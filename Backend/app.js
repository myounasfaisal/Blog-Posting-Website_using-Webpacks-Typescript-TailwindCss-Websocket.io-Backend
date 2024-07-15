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
    origin: process.env.ORGINN,
    credentials: true,
  })
);

//Import Routes

export { app };
