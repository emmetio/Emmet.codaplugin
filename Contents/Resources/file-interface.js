emmet.define('file', function(require, _) {
	var context;
	return {
		setContext: function(ctx) {
			context = ctx;
		},

		_parseParams: function(args) {
			var params = {
				path: args[0],
				size: -1
			};

			args = _.rest(args);
			params.callback = _.last(args);
			args = _.initial(args);
			if (args.length) {
				params.size = args[0];
			}

			return params;
		},

		read: function(path, size, callback) {
			var params = this._parseParams(arguments);
			var content = context.read_ofSize(params.path, 0);
			params.callback(content ? null : 'ObjC error', content);
		},

		readText: function(path, size, callback) {
			var params = this._parseParams(arguments);
			var content = context.readText(params.path);
			params.callback(content ? null : 'ObjC error', String(content || ''));
		},

		locateFile: function(baseFile, fileName) {
			 return fileName ? context.locateFile_relativeTo(fileName, baseFile) : null;
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
