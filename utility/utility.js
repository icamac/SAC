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
	
	    // Safely map the property for nested structures
	    return array.map(item => {
	        // Split the property path by "." to handle nested properties
	        const properties = property.split('.');
	        let value = item;
	
	        // Traverse the object to get the nested property
	        for (let prop of properties) {
	            value = value ? value[prop] : undefined;
	        }
	
	        // If the value is an array of objects, extract the property from each object
	        if (Array.isArray(value)) {
	            // If the array contains objects, extract the specified property from each object
	            return value.map(subItem => {
	                // Traverse subItem for nested properties
	                let subValue = subItem;
	                for (let subProp of properties.slice(1)) {
	                    subValue = subValue ? subValue[subProp] : undefined;
	                }
	                return subValue ?? null;
	            }).join(', ');
	        }
	
	        // If not an array, simply return the value or null
	        return value ?? null;
	    });
	}

	getMethods() {
		return this._methods;
	}
}

customElements.define("com-csiro-utility", Utility);
