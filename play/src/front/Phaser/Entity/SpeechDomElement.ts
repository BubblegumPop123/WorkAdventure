import { get } from "svelte/store";
import LL from "../../../i18n/i18n-svelte";

export class SpeechDomElement extends Phaser.GameObjects.DOMElement {
    private timeoutDestroyText: NodeJS.Timeout | null = null;
    constructor(
        public readonly id: string,
        text: string,
        scene: Phaser.Scene,
        x = -1,
        y = -50,
        public readonly callback = () => this.destroy()
    ) {
        // Create SVG white triangle with border radius and add the text "space"
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "20");
        svg.setAttribute("height", "10");
        svg.setAttribute("viewBox", "0 0 20 10");
        svg.style.marginRight = "2px";
        svg.style.marginLeft = "2px";
        svg.style.fill = "white";
        svg.style.borderRadius = "2px";
        svg.style.border = "1px solid white";
        svg.style.padding = "2px";
        svg.style.boxSizing = "border-box";
        svg.style.backgroundColor = "white";

        // Create text element
        const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textElement.setAttribute("x", "50%");
        textElement.setAttribute("y", "50%");
        textElement.setAttribute("text-anchor", "middle");
        textElement.setAttribute("dominant-baseline", "middle");
        textElement.style.fontSize = "10px";
        textElement.style.fill = "black";
        textElement.style.fontWeight = "bold";
        textElement.textContent = "SPACE";
        svg.appendChild(textElement);

        // Create span element
        const span = document.createElement("span");
        span.innerHTML = text.replace(get(LL).trigger.spaceKeyboard(), svg.outerHTML);
        span.id = `spanText-${id}`;
        span.classList.add("characterTriggerAction");
        span.addEventListener("click", callback);

        super(
            scene,
            x,
            y,
            span,
            `z-index:10; background-color: #00000080; color: #ffffff; padding: 5px; border-radius: 5px; font-size: 9px; cursor: pointer; backdrop-filter: blur(8px);`
        );
        this.setAlpha(0);
    }

    public play(textX: number, textY: number, duration: number, callback?: (id: string) => void) {
        if (this.timeoutDestroyText) clearTimeout(this.timeoutDestroyText);
        this.scene?.tweens.add({
            targets: this,
            props: {
                alpha: 1,
                y: textY,
                x: textX,
            },
            ease: "Power2",
            duration: 1000,
            onComplete: () => {
                if (duration < 1) return;
                this.timeoutDestroyText = setTimeout(() => {
                    this.destroy();
                    if (callback) callback(this.id);
                }, duration);
            },
        });
    }
}
