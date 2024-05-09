module.exports = function(grunt, options) {
	return {
		debug: {
			options: {
//				root : process.cwd()
			},
			files: {
				'<%=distPath%>/<%=currentProject%>.js.map': ['<%=distPath%>/<%=currentProject%>.js']
			}
		},
		release: {
			options: {
//				root : process.cwd()
			},
			files: {
				'<%=distPath%>/<%=currentProject%>.js.map': ['<%=distPath%>/<%=currentProject%>.js']
			}
		}
	}
};