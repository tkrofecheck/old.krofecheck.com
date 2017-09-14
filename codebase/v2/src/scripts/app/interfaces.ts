export interface dataFiles {
	about: string;
	nav: string;
	portfolio: string;
	resume: string;
}

export interface requireCfgShim {
	[key: string]: Object;
}

export interface requireCfg {
	baseUrl: string;
	findNestedDependencies: boolean;
	paths: {
		app: string
	};
	shim: requireCfgShim;
}