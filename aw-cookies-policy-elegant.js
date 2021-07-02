import { PolymerElement, html } from "../aw_polymer_3/polymer/polymer-element.js";
class AwCookiesPolicyElegant extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    position: relative;
                }

                .container {
                    position: fixed;
                    left: -50vh;
                    bottom: -50vh;
                    left: 0;
                    bottom: 0;
                    width: 50vh;
                    height: 50vh;
                    background: var(--aw-cookies-policy-background-color, white);
                    border-radius: 0 100% 0 0;
                    box-shadow: var(--aw-cookies-policy-box-shadow, 0 0 10px #999999);
                    transform: scale(0, 0);
                    display: flex;
                    flex-flow: row wrap;
                    align-items: center;
                }

                .container[show] {
                    animation: show_landscape 0.4s forwards;
                }

                .container[hide] {
                    animation: hide_landscape 0.4s forwards;
                }

                .int {
                    position: relative;
                    flex-grow: 0;
                    flex-basis: auto;
                    padding: 40% 17vh 10px 20px;
                }

                .message {
                    position: relative;
                    padding: 0 0 20px 0;
                    color: var(--aw-cookies-policy-message-color, #333333);
                }

                .message a {
                    color: var(--aw-cookies-policy-link-color, var(--aw-primary-color, #888888));
                    text-decoration: none;
                }

                .message a:hover {
                    text-decoration: underline;
                }

                .button {
                    position: relative;
                }

                .button span {
                    color: var(--aw-cookies-policy-ok-color, #333333);
                    font-size: 30px;
                    font-weight: bold;
                    transition: color 0.3s;
                    cursor: pointer;
                }

                .button span:hover {
                    color: var(--aw-cookies-policy-ok-color-hv, var(--aw-primary-color, #888888));
                }

                @media (max-width: 600px) and (orientation: portrait) {
                    .container {
                        left: -90vw;
                        bottom: -90vw;
                        width: 90vw;
                        height: 90vw;
                    }

                    .container[show] {
                        animation: show_portrait 0.4s forwards;
                    }

                    .container[hide] {
                        animation: hide_portrait 0.4s forwards;
                    }
                }

                @keyframes show_landscape {
                    from {
                        left: -50vh;
                        bottom: -50vh;
                        transform: scale(0, 0);
                    }

                    to {
                        left: 0;
                        bottom: 0;
                        transform: scale(1, 1);
                    }
                }
                @keyframes hide_landscape {
                    from {
                        left: 0;
                        bottom: 0;
                        transform: scale(1, 1);
                    }

                    to {
                        left: -50vh;
                        bottom: -50vh;
                        transform: scale(0.5, 0.5);
                    }
                }
                @keyframes show_portrait {
                    from {
                        left: -95vw;
                        bottom: -95vw;
                        transform: scale(0, 0);
                    }

                    to {
                        left: 0;
                        bottom: 0;
                        transform: scale(1, 1);
                    }
                }
                @keyframes hide_portrait {
                    from {
                        left: 0;
                        bottom: 0;
                        transform: scale(1, 1);
                    }

                    to {
                        left: -95vw;
                        bottom: -95vw;
                        transform: scale(0.5, 0.5);
                    }
                }
            </style>
            <div class="container">
                <div class="int">
                    <div class="message"></div>
                    <div class="button">
                        <span on-click="_accept">OK</span>
                    </div>
                </div>
            </div>
        `;
    }
    static get properties() {
        return { lang: { type: String, value: "es" } };
    }
    connectedCallback() {
        super.connectedCallback();
        this.removeAttribute("unresolved");
        this._get_text();
        this._check_cookies_policy();
    }
    _get_text() {
        let element = this.querySelector("text"),
            text = "";
        if (element) {
            text = element.innerHTML;
        } else {
            text = this._get_default_text();
        }
        this.shadowRoot.querySelector(".message").innerHTML = text;
    }
    _get_default_text() {
        if ("es" == this.lang) {
            return "Al navegar por este sitio aceptas nuestra pol\xEDtica de cookies.";
        } else if ("ca" == this.lang) {
            return "En navegar per aquest lloc acceptes la nostra pol\xEDtica de cookies.";
        } else if ("eu" == this.lang) {
            return "Gune hau arakatuz gero, gure cookien politika onartzen duzu.";
        } else if ("ga" == this.lang) {
            return "Ao navegar neste sitio, acepta a nosa pol\xEDtica de cookies.";
        } else if ("fr" == this.lang) {
            return "En naviguant sur ce site, vous acceptez notre politique de cookies.";
        } else if ("de" == this.lang) {
            return "Durch das Durchsuchen dieser Website akzeptieren Sie unsere Cookies-Richtlinien.";
        } else if ("it" == this.lang) {
            return "Navigando in questo sito accetti la nostra politica sui cookie.";
        } else if ("pt" == this.lang) {
            return "Ao navegar neste site, voc\xEA aceita nossa pol\xEDtica de cookies.";
        } else {
            return "By browsing this site you accept our cookies policy.";
        }
    }
    _check_cookies_policy() {
        if (!localStorage.awcookiespolicy || "denied" == localStorage.awcookiespolicy) {
            localStorage.awcookiespolicy = "denied";
            this._show();
        } else {
            this.parentElement.removeChild(this);
        }
    }
    _show() {
        this.shadowRoot.querySelector(".container").setAttribute("show", "");
    }
    _accept() {
        localStorage.awcookiespolicy = "accept";
        this.shadowRoot.querySelector(".container").setAttribute("hide", "");
        setTimeout(() => {
            this.parentElement.removeChild(this);
        }, 1e3);
    }
}
window.customElements.define("aw-cookies-policy-elegant", AwCookiesPolicyElegant);
