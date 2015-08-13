"use strict";

var fs = require('fs'),
	CLIError = require('./error.js'),
	vars = require('./vars.js'),
	submodulename = process.argv[2] || "help",
	submodule = function(){},
	submoduleargs = process.argv.slice(3),
	legal_submodule_names=[];

function good(stuff){
	if (typeof stuff !== 'undefined') {
		console.log(stuff);	
	}
};

function bad(errorOrString){
	var error;
	if (typeof errorOrString === 'string') {
		error = new Error(errorOrString);
	} else if ( errorOrString instanceof Error ) {
		error = errorOrString;
	} else {
		error = Error('Badly Invoked Error with type: ' + typeof errorOrString);
		console.error(errorOrString);
	}
	throw new CLIError(error);
};

function main(){
	switch (submodulename) {
		case 'some-illegal-submodule-name':
		vars.error = new Error('Submodule exists but cannot be legally invoked');
		break;
		default:
		submodule(submodulename,submoduleargs,vars).then(good).catch(bad);
		break;
	}
}

fs.readdir( __dirname + '/commands',function(err,files){
	if (err) {
		throw new CLIError(err);
	}
	legal_submodule_names = files.map(function(fylename){
		return fylename.replace(/\.js$/,'');
	});
	if (legal_submodule_names.indexOf(submodulename) > -1) {
		submodule = require('./commands/'+submodulename);
	} else {
		vars.error = new Error('Submodule ' + submodulename + ' does not exist');
		submodule = require('./commands/help');
	}
	main();
});