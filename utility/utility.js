class Utility extends HTMLElement {
	constructor() {
		super();
		this._init();
	}

	_init() {
		this._methods = {
			generateUUID: this.generateUUID.bind(this),
			formatDate: this.formatDate.bind(this),
			getEnvironment: this.getEnvironment.bind(this),
			mapProperty: this.mapProperty.bind(this)
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

	getEnvironment() {
		const host = window.location.host;
		const subdomain = host.split(".")[0];

		if (subdomain === "csiro-q") return "Dev";
		if (subdomain === "csiro-q-1") return "QA";
		if (subdomain === "csiro-1") return "Prod";

		return "Unknown";
	}

	// Map an array of objects to a string array based on the given property
	mapProperty(array, property) {
		if (!Array.isArray(array)) return "Invalid input: Expected an array";
		if (typeof property !== "string") return "Invalid input: Property must be a string";

		return array.map(item => item[property] || null); // Return property values or null if missing
	}

	getMethods() {
		return this._methods;
	}
}

customElements.define("com-csiro-utility", Utility);
