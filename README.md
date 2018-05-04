# Vimeo to Youtube Migrator

This app migrates all of your Vimeo videos to Youtube.
In order for both part of this migration to work, you must set
some access keys in the `.env` file at the root of this project.

You must create a Vimeo app in order to access the private video you have stored.

## Setup

1. Create a new Vimeo API app

  Login as your Vimeo user, and head to this page: https://developer.vimeo.com/apps. Create an new app, and copy rhe

  Create an app. It needs a 'callback URL', set it to `http://localhost:8284?callback`. Once created, turn on 'Implicit Grant Workflow'.

2. Run the app

  Run `node index.js`, it will authenticate your with your Vimeo account with the app you just created.

  Once you've accepted, the `VIMEO_ACCESS_KEY` is added automatically to the `.env` file. The app will then quit.
