/** Express router providing user related routes
 * @module src/server
 * @requires express
 * @requires body-parser
 * @requires cors
 */

import { doGrammarCorrection } from "./grammar-corrector";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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

async function doGrammarCorrectionAsync(request, response) {
  const recordingCorrected = await doGrammarCorrection(response.body.recording);

  const recordingData = {
    email: request.body.email,
    recording: recordingCorrected,
    timeStamp: Date.now(),
  };

  response.send(recordingData);
}

/**
 * Route accepting single recording.
 * @name post/recording
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
app.post("/api/recording", (request, response) =>
  doGrammarCorrectionAsync(request, response)
);
