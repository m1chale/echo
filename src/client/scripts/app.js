/** Javascript for Website handling
 * @module website/app
 */

let audioPlayer = null;
let mediaRecorder = null;
let audioChunks = [];

document.addEventListener("DOMContentLoaded", documentLoaded);

/**
 * initializing event listeners
 * @param {Event} event
 */
function documentLoaded(event) {
  const toggleRecording = document.getElementById("toggleRecording");
  toggleRecording.addEventListener("click", toggleRecordingOnClick);

  audioPlayer = document.getElementById("audioPlayer");
}

/**
 * start and stop recording
 * @param {Event} event
 */
async function toggleRecordingOnClick(event) {
  const url = "/api/recording";

  // @TODO: use nicer way to identify recording state (maybe dataset)
  if (event.target.value == "Start recording") {
    console.log("start");
    startRecording();
    event.target.value = "Stop recording";
  } else {
    event.target.value = "Start recording";
    const email = document.getElementById("email");
    const recordingData = {};

    recordingData.email = email.value;
    recordingData.recording = stopRecording();

    const correctedResponse = await uploadRecordingData(url, recordingData);

    showPlayback(correctedResponse.recording);

    email.value = "";
    email.focus();
  }
}

/**
 * record using MediaRecorder
 */
function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.start();

    mediaRecorder.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data);
    });
  });
}

/**
 * stop MediaRecorder
 * @returns {Blob} audioBlob
 */
function stopRecording() {
  mediaRecorder.stop();
  mediaRecorder = null;
  const audioBlob = new Blob(audioChunks);
  audioChunks = null;

  return audioBlob;
}

/**
 * Uploads the recording data to the server
 * @param {string} url
 * @param {object} recordingData
 * @returns {JSON} response from api
 */
async function uploadRecordingData(url, recordingData) {
  const apiRes = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recordingData),
  });

  if (!apiRes?.ok) {
    throw new Error(
      `HTTP Code: ${apiRes?.status} \n Error-Message: ${await apiRes.text()}`
    );
  }

  return await apiRes.json();
}

/**
 * show playback
 * @param {Blob} recording
 */
function showPlayback(recording) {
  audioPlayer.src = window.URL.createObjectURL(recording);
  //audioPlayer.play();
}
