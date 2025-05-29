(function() { 
	let template = document.createElement("template");
	template.innerHTML = ``;  // No shadow DOM content here

	class CSSInject extends HTMLElement {
		constructor() {
			super(); 
			// No shadow root, so no need to attach shadow DOM
		}

		// Apply CSS when properties are updated
		onCustomWidgetBeforeUpdate(changedProperties) {
			if ("customCSS" in changedProperties) {
				this._customCSS = changedProperties["customCSS"];
			}
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("customCSS" in changedProperties) {
				this.updateGlobalCSS(this._customCSS);
				this.dispatchEvent(new Event("onCSSChange"));
			}
		}

		// Updates the injected CSS in the global document
		updateGlobalCSS(css) {
			let styleTag = document.getElementById('custom-widget-styles');
			
			// Create a new style tag if it doesn't exist
			if (!styleTag) {
				styleTag = document.createElement('style');
				styleTag.id = 'custom-widget-styles'; // Unique ID to avoid duplication
				document.head.appendChild(styleTag);
			}
// Comment
			// Set the CSS content
			styleTag.textContent = css;
		}

		// Method: Set CSS (called by SAC)
		setCustomCSS(css) {
			this._customCSS = css;
			this.updateGlobalCSS(css);
			this.dispatchEvent(new Event("onCSSChange"));
		}

		// Method: Get CSS (called by SAC)
		getCustomCSS() {
			return this._customCSS;
		}
	}

	customElements.define("com-sap-sample-cssinject", CSSInject);
})();
