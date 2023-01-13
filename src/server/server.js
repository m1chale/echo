/** Express router providing user related routes
 * @module src/server
 * @requires express
 * @requires body-parser
 * @requires cors
 */

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const recordings = [];

const port = 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("src/client"));

app.listen(port, listening);

function listening() {
  console.log(`Server is up and listening on port: ${port} ...`);
}
