let mongoose = require('mongoose');
var path = require('path');


module.exports = function (grunt) {
	
	/**
	*
	* Gruntfile oriented to js bundles creation to which we could want to associate a spip dependencies list and inherent deployment logic
	* command : grunt build-debug --verbose --bundle MP4Parser --config-debug --stack
	*
	*/
//	console.log(grunt.cli.options, process.argv);

	grunt.file.setBase('../');
	const selfPath = '_formantCoreBundler-master';
	const tasksPath = 'tasks';

	const rootPath = 'codebase/', 
		gruntFilesPath = '_Grunt_files/';
	let basePath, currentBundle;
	const distPath = selfPath + '/build';
	
	currentBundle = 'formantCore';
	currentName = grunt.cli.options.name;
	
	// Generic case of a wrongly typed command line : explain the syntax
	if ((typeof currentBundle === 'undefined' || !currentBundle)
			&& (typeof currentName === 'undefined' || !currentName)
			&& grunt.cli.tasks[0] !== 'bundleCSSFonts'
			&& grunt.cli.tasks[0] !== 'roughDBupdate') {
		console.error('Error : no bundle name to build. ', 'usage : --bundle projectName OR --lib projectName OR --server serverName OR --name componentName AND call task "newSomething" or "deploySomething" or "watch"')
		return;
	}
	
	if (grunt.cli.tasks[0] === 'newCoreComponent') {
		basePath = rootPath + gruntFilesPath + '_coreComponent/';
		require("grunt-load-gruntfile")(grunt,{requireResolution: true});
		grunt.loadGruntfile(basePath);
		return;
	}
	else
		basePath = selfPath + '/src';

	
	var bundleConfig = grunt.file.readJSON(selfPath + '/' + currentBundle + '.json');
	if (!bundleConfig) {
		console.error('Error : no bundle content given.', 'Please create the file "' + selfPath + '/' + currentBundle + '.json"')
		return;
	}
    
	var folderArray = bundleConfig.content;
	
	var configPath = [], browserifyPath = [];
	folderArray.forEach(function(val, key) {
		configPath.push(path.join(process.cwd(), rootPath + val));
		browserifyPath.push(rootPath + val);
	});
	configPath.push(path.join(process.cwd(), selfPath + '/' + tasksPath));
	
	var pkg = grunt.file.readJSON(selfPath + '/package.json');
	pkg.main = path.join(process.cwd(), selfPath + '/src/main.js');
	
    require('load-grunt-config')(grunt, {
        // path to config.js & task.js files, defaults to grunt dir
        configPath: configPath,
//		overridePath: path.join(process.cwd(), basePath + currentBundle + '/grunt-config-' + currentBundle),
		init : true,
		data : {
			rootPath : rootPath,
			basePath : basePath,
			distPath : distPath,
			currentProject : currentBundle,
			pathToProject : selfPath,
			browserifyPath : browserifyPath,
		},
		postProcess : function (config) {
			config.package = pkg;
			return config;
		}
	});
	
	grunt.registerTask('default', ['browserify:debug', 'exorcise:debug']);
//	grunt.registerTask('build-debug',   ['execute:debug', 'browserify:debug', 'exorcise:debug', 'copy:localRelease']);
//	grunt.registerTask('build-localRelease',   ['execute:debug', 'browserify:release', 'terser:release', 'copy:localRelease']);
	

//	mongoose.connection.watch().on('change', function() {
//		console.log('>>>>>>>>>>>>>>>>> change to db <<<<<<<<<<<<<<<<<<<<<');
//		grunt.file.delete(basePath + currentBundle + '/js/' + currentBundle + '.debug.js');
//	});
};