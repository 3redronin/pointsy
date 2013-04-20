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

To run tests, install [PhantomJS](http://phantomjs.org/download.html) and set environment variable PHANTOMJS_BIN to point to the PhantomJS executable. Then run:

    grunt test

See the [Karma documentation](http://karma-runner.github.io/0.8/config/browsers.html) on configuring browsers for more info.

Deployment
----------

Run:

    grunt

This will output the website in dist/