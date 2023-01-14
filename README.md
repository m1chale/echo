# echo

Single web application for recording audio and correcting grammar.

## Development thoughts

### Architecture

In terms of architecture, I decided to go with a monolith,
as microservices would be a bit of overkill for this exercise and I haven't worked with them architecture before.

### Frontend

For creating the frontend, I initially thought of using a framework like React, Angular or Vue.
Due to time constraints and the fact that I've never created a project using these types of frameworks, I decided to
to work with a single index.html file.

To record the user's voice, I decided to use the MediaStream Recording API.
A quick look at the MDN Web Docs gave me the knowledge I needed to implement it.

I lost valuable time implementing the audio player because I had never used it before and the concepts of implementation were not as clear to me as they were with the MediaSteam API.

### Backend

For the backend, I decided relatively quickly to use NodeJS as the environment and run an express server in it.
Since I'm used to working with the frameworks, I expected to save some time on setup and implementation.

After deciding on the Node environment, I tried to find a way to perform the grammar correction.
After a little research, I came to the conclusion that a possible solution might be to complete the task using the following steps:

1. Convert speech to text
2. Correct grammar
3. Convert text to speech

Given the time limit, I knew I didn't want to spend the time to understand and implement the necessary packages, but rather use a stub.

For storing the data, a quick solution came to mind consisting of a static endpoint.
In order not to overflow the memory, this endpoint could be cleaned up after sending the response or the desired timeout.

For sending the response back to the client, I had the idea of using server-sent events to tell the client that the grammar correction is complete.
The client could then request the corrected recording from the api.
