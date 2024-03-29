"use strict";

/**
 * Currently stops a container, but it should actually stop an *app*.
 * @todo  This should actually stop an app and not a container (ie: all the containers associate to a speicific app)
 * @example sjc stop 1
 * @example sjc stop e4f2
 */

var d = require('../../docker-toolbox.js');
var fancy = require('../../fancy');
var restClient = require('../../restClient.js');

var run = function(good,bad) {
    var scope = this, permalink = null;
    d.getContainer(this.args[0],function(err,container) {
        if (err) {
            bad(err);
        } else {
            if (container === null) {
                bad(Error('The container could not be found'));
            } else {
                d.docker.getContainer(container.id).stop(function(err,data) {
                    if (err) {
                        bad(err);
                    } else {
                        permalink = [container.project,container.app,container.branch,container.service,scope.conf.localTLD].join('.');
                        restClient.delete(function(err,ok){
                            good(fancy('The container was stopped','success'));    
                        });
                    }
                });
            }
        }
    });
};

module.exports = function(Command,scope) {
    return new Command(scope,run);
};
