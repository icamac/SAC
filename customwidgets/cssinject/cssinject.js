(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style id="dynamic-styles"></style>
	`;

	class CSSInject extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({ mode: "open" });
			shadowRoot.appendChild(template.content.cloneNode(true));

			// Style element for dynamic CSS
			this.dynamicStyle = shadowRoot.querySelector("#dynamic-styles");

			this._props = {};
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("customCSS" in changedProperties) {
				this.updateCustomCSS(changedProperties["customCSS"]);
			}
		}

		// Function to update custom CSS
		updateCustomCSS(css) {
			this.dynamicStyle.textContent = css;
		}
	}

	customElements.define("com-sap-sample-cssinject", CSSInject);
})();
