# echo

Single web application for recording audio and correcting grammar

## Draft

Architecture

Use a monolith

    microservice -> overkill

Frontend

    Framework

        Single Page Web Application

            React or Angular or Vue ?

            For timing reasons just use a single index.html for now

    collect speech

    API Post request

Backend

    nodeJS
        express Server

    1 Convert speech to text
    2 correct grammar
    3 convert corrected grammar text to speech


    DataStorage
        Static Endpoint

        CleanUp
            After Get Request
            TimeStamp

    Response

        Trigger Client
            Server-Sent Events

        API Get request
