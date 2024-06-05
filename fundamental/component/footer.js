class FooterBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._style = document.createElement ('style');

    }

    _updateStyle() {
        this._style.textContent = `
        :host {
            display:block;
        }

        div {
            padding: 24px 20px;
            text-align: center;
            background-color: #B59F84;
            color: beige;
            border-top-left-radius:15px;
            border-top-righet-radius:15px;
            font-size: 1.7rem;
        }

        ;`
    }

    _emptyContent() {
        this.shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
        <div> 
        Buku Catatanku &copy; 2024
        </div>
        `;
    }
}

customElements.define('footer-note', FooterBar);