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
	            // Check if the current value is an array
	            if (Array.isArray(value)) {
	                // If it's an array, map through the array to extract the property from each object
	                return value.map(subItem => {
	                    // Check if the subItem is an object and traverse for the nested property
	                    let subValue = subItem;
	                    for (let subProp of properties.slice(1)) {
	                        subValue = subValue ? subValue[subProp] : undefined;
	                    }
	                    return subValue ?? null;
	                }).join(';');  // Join the array values into a single string
	            } else {
	                // If not an array, continue traversing the properties as usual
	                value = value ? value[prop] : undefined;
	            }
	        }
	
	        // If the value is not found, return null
	        return value ?? null;
	    });
	}

	getMethods() {
		return this._methods;
	}
}

customElements.define("com-csiro-utility", Utility);
