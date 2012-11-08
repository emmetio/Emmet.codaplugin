emmet.define('file', function(require, _) {
	var context;
	return {
		setContext: function(ctx) {
			context = ctx;
		},

		read: function(path) {
			return String(context.read(path));
		},

		locateFile: function(baseFile, fileName) {
			return context.locateFile_relativeTo(fileName, baseFile);
		},

		createPath: function(basePath, fileName) {
			return context.createPath_relativeTo(fileName, baseFile);
		},

		save: function(file, content) {
			return content.save_atPath(content, file);
		},

		getExt: function(file) {
			var m = (file || '').match(/\.([\w\-]+)$/);
			return m ? m[1].toLowerCase() : '';
		}
	};
});
