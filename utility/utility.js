class Utility extends HTMLElement {
	constructor() {
		super();
		this._init();
	}

	_init() {
		this._methods = {
			generateUUID: this.generateUUID.bind(this),
			formatDate: this.formatDate.bind(this),
			getEnvironment: this.getEnvironment.bind(this)
		};
	}

	generateUUID() {
		return crypto.randomUUID();
	}

	formatDate(date, format) {
		const d = new Date(date);
		if (isNaN(d.getTime())) return "Invalid date";

		const options = { year: "numeric", month: "2-digit", day: "2-digit" };
		return new Intl.DateTimeFormat("en-GB", options).format(d);
	}

	// Updated function to check only the subdomain
	getEnvironment() {
		const host = window.location.host;
		const subdomain = host.split(".")[0]; // Extracts only the first part

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
