(function() {
	let template = document.createElement("template");
	template.innerHTML = `
		<div class="sapEpmUiFormSection" style="margin:1.5rem">
			<div class="sapEpmUiFormSectionHeader">
				<label class="sapEpmUiFormSectionTitle expandableTitle">CSSInject Properties</label>
			</div>
			<div class="sapEpmUiFormSectionItems">
				<div>
					<textarea id="builder_customCSS" rows="20" style="width:100%; box-sizing: border-box;"></textarea>
				</div>
			</div>
		</div>
		<style>
		/* Custom styling if needed */
		textarea {
			width: 100%;
			padding: 0.5em;
			border: 1px solid #ccc;
			border-radius: 4px;
			font-family: monospace;
			font-size: 0.875em;
		}

		textarea:focus {
			border-color: #0070c0;
			outline: none;
		}
		</style>
	`;

	class CSSInjectBuilderPanel extends HTMLElement {
		constructor() {
			super();
			this.appendChild(template.content.cloneNode(true));

			// Listen for input change on textarea
			this.querySelector("#builder_customCSS")
				.addEventListener("input", this._handleInput.bind(this));

			// Add toggle functionality for expand/collapse
			const header = this.querySelector('.sapEpmUiFormSectionHeader');
			const sectionItems = this.querySelector('.sapEpmUiFormSectionItems');
			header.addEventListener('click', () => {
				sectionItems.classList.toggle('hidden');
			});
		}

		_handleInput(e) {
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
				detail: {
					properties: {
						customCSS: this.customCSS
					}
				}
			}));
		}

		set customCSS(newCSS) {
			this.querySelector("#builder_customCSS").value = newCSS;
		}

		get customCSS() {
			return this.querySelector("#builder_customCSS").value;
		}
	}

	customElements.define("com-sap-sample-cssinject-builder", CSSInjectBuilderPanel);
})();
