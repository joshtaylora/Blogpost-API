# Blogpost-API

## node-api
This directory contains the NodeJS TypeScript application that utilizes the Express back-end framework to provide the API that the frontend Angular application utilizes.
The src directory contains the <strong>BlogPostAPI_DB.db</strong> file that serves as the SQLite3 database that services the API.


## angular-app
* proxy.conf.json will redirect api calls from the angular application to the express server running on port 3000 
  * User <code>ng serve --proxy-config proxy.conf.json</code> to run the angular app
