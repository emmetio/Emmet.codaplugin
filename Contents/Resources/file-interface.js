emmet.define('file', function(require, _) {
	var context;
	return {
		setContext: function(ctx) {
			context = ctx;
		},

		read: function(path, size, callback) {
			var args = _.rest(arguments);
			callback = _.last(args);
			args = _.initial(args);
			if (!args.length) {
				size = 0;
			}
			var content = context.read_ofSize(path, 0);
			if (content) {
				callback(null, String(content));
			} else {
				callback('ObjC error');
			}
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
