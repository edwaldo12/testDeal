import "dotenv/config.js";
import express, {json} from "express";
import cors from "cors";
import routes from "./src/routes/routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false  }));

app.use(cors());
app.use(routes);
app.use(json())

app.listen(PORT, () => {
  console.info(`App is listening at http://localhost:${PORT}`);
});
