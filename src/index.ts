import express, {Express} from "express";
import dotenv from "dotenv";
import notesRouter from "./routes/notes.router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(notesRouter);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});

/*
version: "3.8"
services:
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_USER: admin
      POSTGRES_DB: notes-app
    volumes:
      - ./pgdata:/var/lib/postgresql/data
    ports:
      - '5432:5432'
  web:
    image:
 */