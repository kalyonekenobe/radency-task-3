import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import notesRouter from "./routes/notes.router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(notesRouter);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});