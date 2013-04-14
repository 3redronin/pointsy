Dev setup
---------

Install the command tools globally:

    npm install -g yo grunt-cli bower

Install the npm and bower dependencies

    npm install && bower install --dev

Dev dance
---------

To start a web server, open the project, and have live updates from your IDE, just run:

    grunt server

If Chrome doesn't open, trying setting CHROME_BIN to point to Chrome.

Deployment
----------

Run:

    grunt

This will output the website in dist/