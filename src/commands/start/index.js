"use strict";

/**
 * Start an app. 
 * @param {String} - appname:branch [ --hard: --soft ]
 * @return {String} - the output produced by the docker after is spins up the container
 * @example sjc start .	# starts the app at the current directory with the currently checkout branch
 * @example sjc start cerebrum	# starts the app called cerebrum regardless of current directory, with the currently checkout out branch
 * @example sjc start cerebrum:CE-167	# start the app "cerebrum" as the "CE-167" branch.
 * @example sjc start cerebrum --hard	# starts the app with no mounting of local directories into the host.
 */

var d = require*('../../docker-toolbox.js').docker;

var run = function(good,bad) {
    good( this.appdef );
};

module.exports = function(Command,scope) { 
    return new Command(scope,run);
};
