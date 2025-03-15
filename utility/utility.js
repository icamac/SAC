class Utility extends HTMLElement {
	constructor() {
		super();
		this._init();
	}

	_init() {
		// Expose methods for SAC scripting
		this._methods = {
			generateUUID: this.generateUUID.bind(this),
			formatDate: this.formatDate.bind(this),
			getEnvironment: this.getEnvironment.bind(this)
		};
	}

	// Generate a UUID
	generateUUID() {
		return crypto.randomUUID();
	}

	// Format a date into a specific format
	formatDate(date, format) {
		const d = new Date(date);
		if (isNaN(d.getTime())) return "Invalid date";

		const options = { year: "numeric", month: "2-digit", day: "2-digit" };
		return new Intl.DateTimeFormat("en-GB", options).format(d);
	}

	// Determine the environment based on the host
getEnvironment() {
    const host = window.location.host;
    const subdomain = host.split(".")[0]; // Extracts the first part of the hostname

    if (subdomain === "csiro-q") return "Dev";
    if (subdomain === "csiro-q-1") return "QA";
    if (subdomain === "csiro-1") return "Prod";

    return "Unknown";
}

	// Expose methods for SAC
	getMethods() {
		return this._methods;
	}
}

customElements.define("com-csiro-utility", Utility);
