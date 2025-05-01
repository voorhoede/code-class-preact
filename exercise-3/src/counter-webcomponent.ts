class CodeClassCounter extends HTMLElement {
  static observedAttributes = ["count"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  private render() {
    this.shadowRoot.innerHTML = `
      <p>${this.getAttribute("count")}</p>
      <button>-4</button>
    `;

    this.shadowRoot
      .querySelector("button")
      ?.addEventListener("click", () => this.decreaseCount());
  }

  private decreaseCount() {
    this.dispatchEvent(
      new CustomEvent("decrease", {
        detail: {
          newCount: Number(this.getAttribute("count")) - 4,
        },
      }),
    );
  }

  attributeChangedCallback() {
    this.shadowRoot.querySelector("p").textContent = this.getAttribute("count");
  }
}

customElements.define("code-class-counter", CodeClassCounter);
