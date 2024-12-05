export class GameContent {
    #gameContainer: HTMLElement;
    #background: HTMLImageElement;
    #canvas: HTMLCanvasElement;
    #ctx: CanvasRenderingContext2D;
    #circle: { x: number; y: number; radius: number };
    #svgImage: HTMLImageElement;
    #svgWidth: number;
    #svgHeight: number;
    #svgOffsetX: number;  // Décalage du terrain SVG
    #svgOffsetY: number;  // Décalage du terrain SVG
    #proportion: number;  // Proportion d'agrandissement du SVG
    #svgImageBackground: HTMLImageElement;

    // Variables pour le déplacement avec la souris
    #isDragging: boolean = false;
    #startX: number = 0;
    #startY: number = 0;

    constructor() {
        this.#background = new Image();
        this.#gameContainer = document.createElement("div");
        this.#canvas = document.createElement("canvas");
        this.#ctx = this.#canvas.getContext("2d")!;  // Assurer que le contexte 2D est disponible
        this.#circle = { x: 400, y: 400, radius: 20 };
        this.#svgImage = new Image();
        this.#svgWidth = 0;
        this.#svgHeight = 0;
        this.#svgOffsetX = 0;
        this.#svgOffsetY = 0;
        this.#proportion = 1;  // La proportion d'agrandissement du SVG
        this.#svgImageBackground = new Image();

        this.initializeGame();
        this.addEventListeners();
    }

    private initializeGame(): void {
        // Créer des promesses pour charger toutes les images
        const backgroundImagePromise = new Promise<void>((resolve, reject) => {
            this.#background.src = "assets/sand.jpg";
            this.#background.onload = () => {
                console.log("Image de fond chargée");
                resolve();
            };
            this.#background.onerror = reject;
        });
    
        const svgImageBackgroundPromise = new Promise<void>((resolve, reject) => {
            this.#svgImageBackground.src = "assets/sea.jpg";
            this.#svgImageBackground.onload = () => {
                console.log("Image de fond du SVG chargée");
                resolve();
            };
            this.#svgImageBackground.onerror = reject;
        });
    
        const svgImagePromise = this.loadSVG("assets/human-body.svg");
    
        // Attendre que toutes les ressources soient chargées avant de dessiner
        Promise.all([backgroundImagePromise, svgImageBackgroundPromise, svgImagePromise]).then(() => {
            console.log("Toutes les images et le SVG sont chargés");
            this.draw(); // Commencer à dessiner une fois que tout est prêt
        }).catch((error) => {
            console.error("Erreur lors du chargement des ressources", error);
        });
    
        // Configurer le canvas pour qu'il occupe toute la fenêtre
        this.#canvas.width = window.innerWidth;
        this.#canvas.height = window.innerHeight;
    
        // Ajouter le conteneur de jeu
        this.#gameContainer.classList.add("game-container");
        this.#gameContainer.appendChild(this.#canvas);
    
        // Ajouter le conteneur de jeu au DOM (dans le body ou un autre conteneur)
        document.body.insertAdjacentElement("afterbegin", this.#gameContainer);
    }

    // Fonction pour charger et convertir un SVG en image
    private loadSVG(svgPath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            fetch(svgPath)
                .then(response => response.text())
                .then(svgText => {
                    const parser = new DOMParser();
                    const svgDocument = parser.parseFromString(svgText, "image/svg+xml");
                    this.#svgWidth = parseInt(svgDocument.documentElement.getAttribute("width")!);
                    this.#svgHeight = parseInt(svgDocument.documentElement.getAttribute("height")!);
    
                    this.#svgImage.onload = () => {
                        console.log("SVG chargé et prêt à être affiché");
                        resolve();
                    };
    
                    this.#svgImage.src = svgPath;
                })
                .catch((error) => {
                    console.error("Erreur lors du chargement du SVG", error);
                    reject(error);
                });
        });
    }

    private extractSVGPaths(): SVGPathElement[] {
        const svgElement = this.#gameContainer.querySelector("svg");
        if (!svgElement) {
            console.error("SVG non trouvé dans le DOM");
            return [];
        }
    
        // Extraire les éléments <path> du SVG
        const paths = Array.from(svgElement.querySelectorAll("path")) as SVGPathElement[];
        return paths;
    }   
    

    private getPathCoordinates(path: SVGPathElement): { x: number; y: number }[] {
        const length = path.getTotalLength();
        const coordinates: { x: number; y: number }[] = [];
        
        for (let i = 0; i < length; i++) {
            const point = path.getPointAtLength(i);
            coordinates.push({ x: point.x, y: point.y });
        }
        return coordinates;
    }

    private getCircleCoordinates(circle: SVGCircleElement): { cx: number; cy: number; r: number } {
        return {
            cx: parseFloat(circle.getAttribute("cx")!),
            cy: parseFloat(circle.getAttribute("cy")!),
            r: parseFloat(circle.getAttribute("r")!)
        };
    }

    private distanceToSegment(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
        const lineLengthSquared = (bx - ax) ** 2 + (by - ay) ** 2;
        if (lineLengthSquared === 0) return Math.sqrt((px - ax) ** 2 + (py - ay) ** 2);
        
        const t = Math.max(0, Math.min(1, ((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / lineLengthSquared));
        const nearestX = ax + t * (bx - ax);
        const nearestY = ay + t * (by - ay);
        
        return Math.sqrt((px - nearestX) ** 2 + (py - nearestY) ** 2);
    }
    
    private isCollision(newX: number, newY: number): boolean {
        // Extraire les chemins du SVG
        const paths = this.extractSVGPaths();
    
        // Vérifier la collision avec chaque segment de chaque chemin
        for (const path of paths) {
            const coordinates = this.getPathCoordinates(path);
    
            for (let i = 0; i < coordinates.length - 1; i++) {
                const ax = coordinates[i].x;
                const ay = coordinates[i].y;
                const bx = coordinates[i + 1].x;
                const by = coordinates[i + 1].y;
    
                const distance = this.distanceToSegment(newX, newY, ax, ay, bx, by);
    
                // Si la distance est inférieure au rayon du cercle, il y a une collision
                if (distance < this.#circle.radius) {
                    console.log("Collision détectée avec le segment:", ax, ay, bx, by);
                    return true;  // Il y a une collision
                }
            }
        }
    
        return false;  // Aucune collision détectée
    }

    private draw(): void {
        // Effacer l'ancien dessin
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    
        // Dessiner l'image de fond pour qu'elle couvre tout le canvas
        this.#ctx.drawImage(this.#background, 0, 0, this.#canvas.width, this.#canvas.height);
    
        // Calculer l'offset du SVG pour centrer le cercle
        const centerX = this.#canvas.width / 2;
        const centerY = this.#canvas.height / 2;
    
        // Mettre à jour les offsets du SVG pour garder le cercle au centre
        this.#svgOffsetX = centerX - (this.#circle.x * this.#proportion);
        this.#svgOffsetY = centerY - (this.#circle.y * this.#proportion);
    
        // Dessiner l'image de fond (sea.jpg) comme un motif
        if (this.#svgImageBackground.complete) {
            const pattern = this.#ctx.createPattern(this.#svgImageBackground, "repeat");
    
            // Appliquer le motif comme remplissage pour le SVG
            this.#ctx.fillStyle = pattern!;
        }
    
        // Dessiner le SVG redimensionné avec les offsets
        if (this.#svgImage.complete) {
            this.#ctx.drawImage(
                this.#svgImage,
                0, 0, this.#svgWidth, this.#svgHeight, // Source (dimensions du SVG)
                this.#svgOffsetX, this.#svgOffsetY, this.#canvas.width * this.#proportion, this.#canvas.height * this.#proportion // Destination (position du SVG avec décalage)
            );
        }
    
        // Dessiner le cercle dans les coordonnées du canvas
        this.#ctx.beginPath();
        this.#ctx.arc(this.#circle.x, this.#circle.y, this.#circle.radius, 0, Math.PI * 2);
        this.#ctx.fillStyle = "red";
        this.#ctx.fill();
        this.#ctx.closePath();
    }
    
    private addEventListeners() {
        window.addEventListener("keydown", (event) => {
            const step = 5;
            let newX = this.#circle.x;
            let newY = this.#circle.y;
    
            // Calculer les nouvelles coordonnées du cercle en fonction de la touche pressée
            switch (event.key) {
                case "ArrowUp":
                    newY = this.#circle.y - step;
                    break;
                case "ArrowDown":
                    newY = this.#circle.y + step;
                    break;
                case "ArrowLeft":
                    newX = this.#circle.x - step;
                    break;
                case "ArrowRight":
                    newX = this.#circle.x + step;
                    break;
            }
    
            // Vérifier les collisions avec le chemin avant de déplacer le cercle
            if (!this.isCollision(newX, newY)) {
                // Mettre à jour la position du cercle uniquement si aucune collision n'est détectée
                this.#circle.x = newX;
                this.#circle.y = newY;
            } else {
                console.log("Collision détectée. Le cercle ne peut pas être déplacé.");
            }
    
            // Redessiner après le déplacement
            this.draw();
        });
    
        // Redimensionner le canvas lorsque la fenêtre est redimensionnée
        window.addEventListener("resize", () => {
            this.#canvas.width = window.innerWidth;
            this.#canvas.height = window.innerHeight;
            this.draw();  // Redessiner après le redimensionnement
        });
    }
    

    public getGameContainer(): HTMLElement {
        return this.#gameContainer;
    }
}
