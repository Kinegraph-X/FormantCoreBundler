module.exports = function (grunt, options) {
	
		return {
		sourceMapCopyPerso: {
			files : [
				{
					expand: true,
					cwd: '<%=pathToProject%>',
					src: [
						'<%=currentProject%>.js.map',
						],
					dest: '<%=npmModuleDeployPath%>',
					filter: 'isFile'
				}
			]
		},
		sourceMapCopy: {
			files : [
				{
					expand: true,
					cwd: '<%=pathToProject%>',
					src: [
						'<%=currentProject%>.js.map',
						],
					dest: '<%=nodeModuleDeployPath%>',
					filter: 'isFile'
				}
			]
		}
	};
}