import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/database';
import shortnerRoute from "./routes/shortner";

const app = express();

connectDB();

// Express configuration
app.set("port", process.env.PORT || 3200);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enable cors
app.use(cors());
app.options('*', cors);

app.use("/", shortnerRoute);


const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;