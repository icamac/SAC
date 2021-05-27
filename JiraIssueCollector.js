(function() {
  let template = document.createElement("template");
  template.innerHTML = `
    <style>
    :host {
      border-radius: 25px;
      border-width: 4px;
      border-color: black;
      border-style: solid;
      display: block;
    }
    
    div#issueCollectorButton {
    	height: 100%;
    	width: 100%;
    }
    </style>
    <div id="issueCollectorButton">Feedback</div>
  `;

	class IssueCollector extends HTMLElement {
		constructor() {
			super();
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			this._props = {};
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("color" in changedProperties) {
				this.style["background-color"] = changedProperties["color"];
			}
			if ("opacity" in changedProperties) {
				this.style["opacity"] = changedProperties["opacity"];
			}
			if ("collectorId" in changedProperties) {
				
			}
		}
	}

	customElements.define("com-csiro-jira-issuecollector", IssueCollector);
})();