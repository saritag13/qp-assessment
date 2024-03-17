import express from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from "passport";
import session from 'express-session';
import dotenv from 'dotenv';
import { initPassport,isAuthenticated } from "./middleware/passport";

// Import the PostsRoutes from the post.routes file
import itemsRoutes from "./routes/items.route";
import userRouter from "./routes/users.route";
import indexRouter from "./routes/index.route";
import orderRouter from "./routes/orders.route";

// Create an instance of the Express
const app = express();
dotenv.config();


// Define the port to listen on
const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.text());
app.use(passport.initialize());
const sessionKey:any =  process.env.JWT_TOKEN_SECRET;
app.use(session({
  secret: sessionKey,
  resave: false,
  saveUninitialized: false,
}));

// app.use(passport.session());
// app.use((req, res, next) => {

//   //parse the string if req.body is a json string
//   if (typeof (req.body) == 'string') {
//     req.body = JSON.parse(req.body);
//   }
//   next();
// });
initPassport(app);


// Use the PostsRoutes for any routes starting with /posts
app.use('/login',passport.authenticate('local'), indexRouter);

// app.use('/api', isAuthenticated);
app.use('/api/items', itemsRoutes);
app.use('/users', userRouter);
app.use('/api/orders', orderRouter);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});