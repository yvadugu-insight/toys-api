# HapiJS Authentication Sample

This sample project demonstrates how to set up a user authentication API with Hapi.js using JSON Web Tokens. There are several endpoints exposed in the sample, including user login and signup, along with an example of a protected `instructors` resource.


## Installation and Running the App

Clone the repo, then: 

```bash
npm install
node server.js
```

The app will be served at `localhost:3001`.

## Local Setup

To setup the API locally, you will need to run MongoDB or have an MLab instance. Create a `.env` file and populate it with the following values:

```bash
SECRET_KEY=<secret_key>
MLAB_USER=<mlab_user>
MLAB_PASSWORD=<secret_key>
MLAB_DOMAIN=<domain>
MLAB_DB=<database>
```

