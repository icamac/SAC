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
	    if (!array) {
	        return [];
	    }
	
	    if (!Array.isArray(array)) {
	        throw new Error("mapProperty: The first argument must be an array.");
	    }
	
	    // Safely map the top-level property for each item in the array
	    return array.map(item => {
	        // Directly access the top-level property
	        const value = item ? item[property] : undefined;
	
	        // If the value is an array, join it as a string (if it contains simple values)
	        if (Array.isArray(value)) {
	            return value.join(', ');
	        }
	
	        // Return the value or null if undefined
	        return value ?? null;
	    });
	}

	getMethods() {
		return this._methods;
	}
}

customElements.define("com-csiro-utility", Utility);
