import express from "express"
import { condition, configs, getlog } from "./index.js";

var app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.get("/configs/:id",configs)
app.get("/status/:id",condition)
app.get("/logs",getlog)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  