(function() {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>CSSInject Properties</legend>
				<table>
					<tr>
						<td>Custom CSS</td>
						<td><textarea id="builder_customCSS" rows="4" cols="40"></textarea></td>
					</tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
		<style>
		:host {
			display: block;
			padding: 1em;
		}
		</style>
	`;

	class CSSInjectBuilderPanel extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({ mode: "open" });
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
				detail: {
					properties: {
						customCSS: this.customCSS
					}
				}
			}));
		}

		set customCSS(newCSS) {
			this._shadowRoot.getElementById("builder_customCSS").value = newCSS;
		}

		get customCSS() {
			return this._shadowRoot.getElementById("builder_customCSS").value;
		}
	}

	customElements.define("com-sap-sample-cssinject-builder", CSSInjectBuilderPanel);
})();