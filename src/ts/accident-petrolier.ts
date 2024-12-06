import petrolier from "../assets/accident-petrolier/Petrolier.svg";
import blessure from "../assets/accident-petrolier/Humain.svg";
import { App } from "./app";

/**
 * 
 * Cet évènement représente un accident de porte-conteneur.
 * 
 * Le pétrole qui s'écoule est équivalent à une toxine, comme lorsqu'on se
 * coupe en coupant un verre qui contenait des bactéries.
 * 
 * Le but du jeu est de "laver la plaie", soit nettoyer la marée noire.
 * 
 */

export class AccidentPetrolierApp extends App {

    private petrolierCont = document.createElement("div");
    private petrolierSvg?: SVGElement;
    private bateau?: SVGElement;
    private flaquePetrole?: SVGElement;
    private flammesPetrole?: SVGElement;
    private epongesPetrole?: SVGElement;

    private humainCont = document.createElement("div");
    private humainSVG?: SVGElement;
    private couteau?: SVGElement;
    private cercleAlcool?: SVGCircleElement;
    private cercleFeu?: SVGCircleElement;
    private sang?: SVGElement;
    private bras?: SVGElement;

    private text = document.createElement("div");

    private hoverEnabled = false;
    private clicked = false;

    private compris = document.createElement("button");


    constructor (container: HTMLElement) {

        super(container);
        
        container.append(this.elem);   

        this.elem.classList.add(
            "flex", "flex-col-reverse", "lg:flex-row",
            "bg-[rgba(4,147,255,.3)]", 
            "p-2", "rounded-lg",
            "border-[1px]", "border-black", "relative",
            "before:content-['']", "before:absolute",
            "before:pointer-events-none", "before:border-[1px]", "before:rounded-lg", 
            "before:border-[rgba(255,255,255,.5)]", "before:top-[1px]", "before:bottom-[1px]",
            "before:left-[1px]", "before:right-[1px]", "before:bg-transparent",  
        );

        this.elem.innerHTML = "Chargement ..."

        this.load().then(() => this.animateIn())

    }

    public async load () {
        
        let bateau = await fetch(petrolier)
        this.petrolierCont.innerHTML = await bateau.text();
        
        let humain = await fetch(blessure);
        this.humainCont.innerHTML = await humain.text();
        
        this.elem.innerHTML = ""
        this.setup();

    }

    protected setup () {

        this.petrolierSvg = <SVGElement>this.petrolierCont.querySelector("svg");
        this.petrolierSvg.classList.add("h-96", "w-96")

        this.bateau = <SVGElement>this.petrolierSvg.querySelector("#layer3");
        this.flaquePetrole = <SVGElement>this.petrolierSvg.querySelector("#layer6");
        this.flammesPetrole = <SVGElement>this.petrolierSvg.querySelector("#layer9")
        this.epongesPetrole = <SVGElement>this.petrolierSvg.querySelector("#layer11")

        this.humainSVG = <SVGElement>this.humainCont.querySelector("svg");
        this.humainSVG.classList.add("w-96", "h-96")
        this.couteau = <SVGElement>this.humainSVG.querySelector("#layer13");
        this.cercleAlcool = <SVGCircleElement>this.humainSVG.querySelector("#path13")
        this.cercleFeu = <SVGCircleElement>this.humainSVG.querySelector("#path13-6")
        this.sang = <SVGElement>this.humainSVG.querySelector("#layer16")
        this.bras = <SVGElement>this.humainSVG.querySelector("#g12")

        this.cercleAlcool.classList.add("opacity-0", "hover:opacity-100")
        this.cercleFeu.classList.add("opacity-0", "hover:opacity-100")

        this.reset();

        this.elem.append(this.petrolierCont);
        this.elem.append(this.humainCont);
        this.elem.append(this.text)

        this.humainCont.classList.add(
            "border-[1px]", "border-black", "border-b-[0px]",
            "relative",
            "rounded-t-md", "hover:rounded-t-md",
            "lg:rounded-r-md", "lg:rounded-tl-none",
            "lg:border-l-[0px]", "lg:border-b-[1px]"
        )
        this.humainCont.addEventListener("mousemove", e => this.hover(e))


        this.petrolierCont.classList.add(
            "border-[1px]", "border-black", "border-t-[0px]",
            "relative",
            "rounded-b-md", "hover:rounded-b-md",
            "lg:rounded-l-md", "lg:rounded-br-none",
            "lg:border-r-[0px]", "lg:border-t-[1px]",
        )

        this.text.classList.add(
            "absolute", 
            "top-2", "left-2",
            "justify-center", "items-center", 'flex', "flex-col",
            "bg-[rgba(0,0,0,.7)]", 'text-white', 
            'font-semibold', 'text-lg',
            "h-96", "w-96", "border-[1px]", "border-black",
            "transition-all", "transition-ease",
            "backdrop-blur", "lg:translate-y-0",
            "p-2.5", "text-center"
        )

        this.cercleAlcool.onclick = () => this.clickAlcool();
        this.cercleFeu.onclick = () => this.clickFeu();

        this.compris.innerText = "J'ai compris";
        this.compris.classList.add(
            "text-white", "bg-blue-700", "font-semibold", "p-2.5",
            "rounded-md", "hover:bg-blue-600", "active:bg-blue-800"
        );
        this.compris.onclick = () => this.done()

    }

    public reset () {
        if (
            !this.bateau || 
            !this.flaquePetrole ||
            !this.flammesPetrole ||
            !this.epongesPetrole ||
            !this.couteau ||
            !this.cercleAlcool ||
            !this.cercleFeu ||
            !this.sang ||
            !this.bras
        ) return;

        this.bateau.style.transformOrigin = "25% 50%";
        this.bateau.style.transition = "all ease 1s";
        this.bateau.style.transform = "rotate(0deg) translate(-100%)";

        this.flaquePetrole.style.opacity = "0%";
        this.flaquePetrole.style.transition = "all ease 3s";
        
        this.flammesPetrole.style.opacity = "0%";
        this.flammesPetrole.style.transition = "all ease-in 0.5s";

        this.epongesPetrole.style.filter = "saturate(1) contrast(1)";
        this.epongesPetrole.style.transform = "translate(0, -100%)";
        this.epongesPetrole.style.transition = "all ease 1s";
        
        this.couteau.style.transform = "translate(0%)";
        this.couteau.style.transition = "all ease 1s";

        this.cercleAlcool.style.transition = "all ease 0.1s";
        this.cercleFeu.style.transition = "all ease 0.1s";
        
        this.sang.style.transition = "all ease 0.5s";
        this.sang.style.opacity = "0%"

        this.bras.style.transition = "all ease 1s";
        this.bras.style.transformOrigin = "100% 35%";
        this.bras.style.transform = "rotate(-50deg)";

        this.msgBottom();
        this.hoverEnabled = false;

    }

    public async animateIn () {
        if (
            !this.bateau || 
            !this.flaquePetrole ||
            !this.bras || !this.couteau || !this.sang
        ) return;

        this.reset();
        this.bateau.style.transition = "all linear 5s";
        await this.sleep(10);

        this.bateau.style.transform = "rotate(0deg) translate(0%)";
        await this.sleep(4500);

        this.bras.style.transform = "rotate(-0deg)";
        await this.sleep(500);

        this.bateau.style.transition = "all ease 2s";
        this.coule();
        this.couteau.style.transform = "translate(0, 100%)"
        await this.sleep(250);

        this.sang.style.opacity = "100%"
        await this.sleep(1500)

        this.msgBottom(AccidentMessages.Intro)
        this.hoverEnabled = true;

    }

    private hover (evt: MouseEvent) {

        if (!this.hoverEnabled || this.clicked) return;

        if (evt.target == this.cercleAlcool) {
            this.msgBottom(AccidentMessages.Alcool)
        } else if (evt.target == this.cercleFeu) {
            this.msgBottom(AccidentMessages.Feu)
        } else {
            this.msgBottom(AccidentMessages.Intro)
        }

    }

    private async clickAlcool () {

        if (!this.hoverEnabled) return;
        this.clicked = true;

        this.msgTop(AccidentMessages.Eponger);
        await this.sleep(1000);

        await this.animateSuck();

        this.text.append(this.compris)

    }

    private async clickFeu () {

        if (!this.hoverEnabled) return;
        this.clicked = true;

        this.msgTop(AccidentMessages.Bruler);
        await this.sleep(1000);

        await this.animateFire();

        this.text.append(this.compris)

    }

    public async animateSuck () {
        if (
            !this.bateau || 
            !this.flaquePetrole ||
            !this.flammesPetrole ||
            !this.epongesPetrole
        ) return;
        
        this.eponges();
        await this.sleep(1000);

        this.epongesSuck();
        await this.sleep(3000);

    }

    public async animateFire () {
        if (
            !this.bateau || 
            !this.flaquePetrole ||
            !this.flammesPetrole ||
            !this.epongesPetrole
        ) return;
        
        this.flames()
        await this.sleep(250)

        this.flaquePetrole.style.opacity = "0%";
        await this.sleep(1000);
        
        this.flames()
        await this.sleep(250)

    }

    public coule (coule: boolean = true) {

        if (!this.bateau || !this.flaquePetrole) return;

        if (!coule) {
            this.bateau.style.transform = "rotate(0deg)";
            this.flaquePetrole.style.opacity = "0%";
        } else {
            this.bateau.style.transform = "rotate(20deg)";
            this.flaquePetrole.style.opacity = "100%";
        }

    }

    public eponges (eponges: boolean = true) {
        if (
            !this.bateau || 
            !this.flaquePetrole ||
            !this.flammesPetrole ||
            !this.epongesPetrole
        ) return;

        if (eponges) {
            this.epongesPetrole.style.transform = "translate(0, 0%)";
        } else {
            this.epongesPetrole.style.transform = "translate(0, -100%)";
        }
        
    }

    public epongesSuck (suck: boolean = true) {
        if (
            !this.bateau || 
            !this.flaquePetrole ||
            !this.flammesPetrole ||
            !this.epongesPetrole
        ) return;

        if (suck) {
            this.epongesPetrole.style.filter = "saturate(0) contrast(2)";
            this.flaquePetrole.style.opacity = "0%";
        } else {
            this.epongesPetrole.style.filter = "saturate(1) contrast(1)";
            this.flaquePetrole.style.opacity = "100%";
        }
    }

    public flames (flames: boolean = true) {
        if (
            !this.bateau || 
            !this.flaquePetrole ||
            !this.flammesPetrole ||
            !this.epongesPetrole
        ) return;

        if (flames) {
            this.flammesPetrole.style.opacity = "100%";
        } else {
            this.flammesPetrole.style.opacity = "0%";
        }

    }

    public msgTop (text?: string) {

        this.text.classList.toggle("rounded-b-md", false)
        this.text.classList.toggle("lg:rounded-r-md", false)
        this.text.classList.toggle("lg:rounded-br-none", false)
        this.text.classList.toggle("rounded-t-md", true)
        this.text.classList.toggle("rounded-l-md", true)
        this.text.classList.toggle("rounded-tr-none", true)

        this.text.classList.toggle("translate-y-full", false);
        this.text.classList.toggle("translate-y-0", true);

        this.text.classList.toggle("lg:translate-x-0", false);
        this.text.classList.toggle("lg:translate-x-full", true);
        this.text.classList.toggle("lg:translate-y-0", true);

        if (!text) {
            this.text.innerHTML = "";
            this.text.style.opacity = "0%";
            return;
        }

        this.text.innerHTML = text;
        this.text.style.opacity = "100%";

    }

    public msgBottom (text?: string) {

        this.text.classList.toggle("rounded-b-md", true)
        this.text.classList.toggle("lg:rounded-r-md", true)
        this.text.classList.toggle("lg:rounded-br-none", true)
        this.text.classList.toggle("rounded-t-md", false)
        this.text.classList.toggle("rounded-l-md", false)
        this.text.classList.toggle("rounded-tr-none", false)

        this.text.classList.toggle("translate-y-full", true);
        this.text.classList.toggle("translate-y-0", false);

        this.text.classList.toggle("lg:translate-x-0", true);
        this.text.classList.toggle("lg:translate-x-full", false);
        this.text.classList.toggle("lg:translate-y-0", true);

        if (!text) {
            this.text.innerHTML = "";
            this.text.style.opacity = "0%";
            return;
        }

        this.text.innerHTML = text;
        this.text.style.opacity = "100%";

    }

    private sleep (t: number) {
        return new Promise((res, _) => setTimeout(() => res(true), t))
    }

}

const AccidentMessages = {
    Intro : `
        <span class="text-xl">Vous vous êtes blessé !</span>
        <br>
        <span>Choisissez un outil pour vous soigner.</span>
    `,
    Alcool : `
        <span class="text-xl text-yellow-600">Désinfection</span>
        <br>
        <span>Utilisez l'alcool médical pour désinfecter votre plaie.</span>
    `,
    Feu : `
        <span class="text-xl text-yellow-600">Cautérisation</span>
        <br>
        <span>Faites chauffer le couteau qui vous a blessé pour
            cautériser votre plaie.</span>    
    `,

    Eponger : `
        <span class="text-xl text-yellow-600">Sorption</span>
        <br>
        <span>Des matériaux comme des éponges ou des copeaux de bois sont utilisés pour absorber le pétrole.</span>
        <br>
        <span>
            Pour en savoir plus, vous pouvez consulter un article sur le site de  
            <a class="text-blue-500" target="_blank" rel="noopener noreferrer" href="https://sciencepost.fr/moyen-de-nettoyer-marees-noires-decouvert-accidentellement/" >
                Sciencepost
            </a>.
        </span>
        <br>
    `,
    Bruler : `
        <span class="text-xl text-yellow-600">Incendie contrôlé</span>
        <br>
        <span>Dans certains cas, le pétrole est brûlé pour réduire la quantité de pétrole à traiter.</span>
        <br>
        <span>
            Pour en savoir plus, vous pouvez consulter un article sur le site de  
            <a class="text-blue-500" target="_blank" rel="noopener noreferrer" href="https://www.futura-sciences.com/planete/questions-reponses/pollution-lutter-maree-noire-1114/" >
                Futura Sciences
            </a>.
        </span>
        <br>
    `,
    
};

/** Sources:
 * 
Comment nettoie-on une marée noire ?

Nettoyer une marée noire est un défi colossal qui nécessite plusieurs techniques et beaucoup de coordination. Voici quelques méthodes couramment utilisées :

Barrages flottants : Ces barrages sont déployés pour contenir et concentrer le pétrole à la surface de l'eau. Une fois le pétrole rassemblé, il peut être pompé ou aspiré2.
=> Pas d'équivalent médical (dans mon cas)

Dispersants chimiques : Ces produits chimiques sont utilisés pour briser le pétrole en petites gouttelettes, ce qui facilite sa dégradation par les micro-organismes marins.
=> Equivalent : alcool médical pour désinfecter
=> Pas implémenté par gain de temps

Sorption : Des matériaux comme des éponges ou des copeaux de bois sont utilisés pour absorber le pétrole. Ces matériaux sont ensuite récupérés et traités2.
=> Equivalent : Les éponges des pompiers contre les hémorragies 

Bioremédiation : Cette méthode implique l'utilisation de bactéries spécifiques qui dégradent le pétrole en substances moins nocives.
=> Nope.

Incendie contrôlé : Dans certains cas, le pétrole est brûlé pour réduire la quantité de pétrole à traiter.
=> Equivalent : cotérisation 

Chaque situation est unique et nécessite une évaluation rapide pour déterminer la meilleure approche. La prévention reste la meilleure solution pour éviter les marées noires.
 

==== Besoins ====
SVG porte-conteneur => Un poisson meurs


SVG d'un gens qui se coupe => zoom sur la plaie

 * 
 */