class Utility extends HTMLElement {
	constructor() {
		super();
		this._init();
	}

	_init() {
		this._methods = {
			generateUUID: this.generateUUID.bind(this),
			getEnvironment: this.getEnvironment.bind(this)
		};
	}

	generateUUID() {
		return crypto.randomUUID();
	}

	getEnvironment() {
		const host = window.location.host;
		const subdomain = host.split(".")[0];

		if (subdomain === "csiro-q") return "Dev";
		if (subdomain === "csiro-q-1") return "QA";
		if (subdomain === "csiro-1") return "Prod";

		return "Unknown";
	}

	getMethods() {
		return this._methods;
	}
}

customElements.define("com-csiro-utility", Utility);
