const App = require('src/core/App');
App.data = {
	stringifiedSources : []
};

const dependancyInjector = require('src/appLauncher/dependancyInjector');

module.exports = {
	App : App,
	appConstants : require('src/appLauncher/appLauncher'),
	CoreTypes : require('src/core/CoreTypes'),
	Components : require('src/core/Component'),
	TemplateFactory : require('src/core/TemplateFactory'),
	TypeManager : require('src/core/TypeManager'),
	Registries : require('src/core/Registries'),
	ReactiveDataset : require('src/core/ReactiveDataset'),
	ComponentSet : require('src/core/ComponentSet'),
	CreateStyle : require('src/core/GenericStyleConstructor'),
	integratedLibs : {
		md5 : require('src/integrated_libs_&_forks/md5.min'),
		Validate : require('src/integrated_libs_&_forks/Validate')
	}
}