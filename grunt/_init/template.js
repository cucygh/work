exports.description = "This will creat a project using namespaces";
exports.notes = "This project mainly include js、css、img";
exports.warnOn = "{Gruntfile.js}";
exports.template = function (grunt, init, done) {
	init.process({}, [], function (err, props) {
		var files = init.filesToCopy({});
		init.copyAndProcess(files);
		done();
	});
};
