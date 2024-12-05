/* Script pour gérer l'affichage des sections */

/* ------------------------------------------------------------ */
/* Variables globales */

// Définition des sections principales de la page web à afficher
let sectionsName = [
    ["Accueil", "#home"],
    ["Section 1", "#section-1"],
    ["Section 2", "#section-2"],
    ["Section 3", "#section-3"],
    ["Section 4", "#section-4"],
    ["Section 5", "#section-5"],
    ["Section 6", "#section-6"],
    ["Section 7", "#section-7"],
    ["Section 8", "#section-8"],
    ["Section 9", "#section-9"],
    ["Section 10", "#section-10"],
    ["Section 11", "#section-11"],
    ["Contributeurs", "#contributors"]
];

// Liste des contributeurs
const contributors = [
    { profession: "Étudiant", firstName: "Julien", lastName: "Pierson", avatar: "img/avatars/unknown2.svg" },
    { profession: "Étudiant", firstName: "Clément", lastName: "Charrière", avatar: "img/avatars/clément.svg" },
    { profession: "Étudiant", firstName: "Anastasios", lastName: "Tsiompanidis", avatar: "img/avatars/unknown4.svg" },
    { profession: "Étudiant", firstName: "Charles", lastName: "Damaggio", avatar: "img/avatars/unknown1.svg" },
    { profession: "Étudiant", firstName: "Mathieu", lastName: "Moiroux", avatar: "img/avatars/unknown2.svg" },
    { profession: "Étudiant", firstName: "Antony", lastName: "Cosnay", avatar: "img/avatars/unknown3.svg" },
    { profession: "Étudiant", firstName: "Noah", lastName: "Kohrs", avatar: "img/avatars/unknown4.svg" },
    { profession: "Étudiant", firstName: "Alexis", lastName: "Noel", avatar: "img/avatars/unknown1.svg" },
    { profession: "Étudiant", firstName: "Swan", lastName: "Auvergne", avatar: "img/avatars/unknown2.svg" },
    { profession: "Étudiant", firstName: "Baptiste", lastName: "Maheut", avatar: "img/avatars/unknown3.svg" },
    { profession: "Étudiant", firstName: "Romain", lastName: "Bouche", avatar: "img/avatars/unknown4.svg" },
    { profession: "Étudiant", firstName: "Noé", lastName: "Fléchon", avatar: "img/avatars/unknown1.svg" },
    { profession: "Étudiant", firstName: "Pierre", lastName: "Schuller", avatar: "img/avatars/unknown2.svg" },
    { profession: "Étudiant", firstName: "Antonin", lastName: "Chabeaudy", avatar: "img/avatars/unknown3.svg" },
    { profession: "Étudiant", firstName: "Thaïs", lastName: "Alves", avatar: "img/avatars/unknown4.svg" },
];

/* ------------------------------------------------------------ */
/* Functions */

// Ajout des liens de navigation dans le header
function add_link_sections_in_header() {
    const headerNav = document.getElementById('header-nav');
    sectionsName.forEach(([sectionName, sectionId]) => {
        const link = document.createElement('a');
        link.href = sectionId;
        link.innerText = sectionName;
        link.className = 'nav-link';
        headerNav.appendChild(link);
    });
}

/* Gestion des clics pour afficher/masquer les sections avec transition */
function init_sections_event() {
    const headerHeight = document.querySelector('header').offsetHeight;
    const allSections = document.querySelectorAll('section');
    const links = document.querySelectorAll('#header-nav a');

    // Ajouter un événement de clic à chaque lien de navigation
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Trouver la section active et la section cible
            const activeSection = document.querySelector('section.active');
            const targetSection = document.querySelector(link.getAttribute('href'));

            // Si une section est active et différente de la cible
            if (activeSection && activeSection !== targetSection) {
                // Masquer la section active avec animation
                activeSection.classList.remove('active');
                activeSection.classList.add('bounce-out');

                // Supprimer la classe après la fin de l'animation
                activeSection.addEventListener('animationend', () => {
                    activeSection.classList.remove('bounce-out');
                    activeSection.style.display = 'none'; // Masquer complètement
                }, { once: true });
            }

            // Afficher la section cible avec animation
            targetSection.style.display = 'block'; // Afficher avant d'ajouter l'animation
            targetSection.classList.add('active');

            // Ajouter l'animation d'entrée
            targetSection.classList.add('bounce-in');

            // Supprimer la classe d'animation après la fin
            targetSection.addEventListener('animationend', () => {
                targetSection.classList.remove('bounce-in');
            }, { once: true });
        });
    });

    // Activer la première section par défaut
    const firstSection = allSections[0];
    firstSection.style.display = 'block';
    firstSection.classList.add('active');
}

// Ajouter la liste des contributeurs dans la section des contributeurs
function add_contributors_to_section() {
    const contributorsList = document.getElementById('contributors-list');
    contributors.forEach(contributor => {
        const contributorDiv = document.createElement('div');
        contributorDiv.classList.add('contributor');
        contributorDiv.innerHTML = `
            <table>
            <tr>
            <td><img src="${contributor.avatar}" alt="${contributor.firstName} ${contributor.lastName}" class="contributor-avatar"></td>
            <td>
            <h3>${contributor.firstName} ${contributor.lastName}</h3>
            <p>${contributor.profession}</p>
            <td>
            </tr>
            </table>
        `;
        contributorsList.appendChild(contributorDiv);
    });
}

// Redimensionner les sections pour qu'elles prennent la hauteur de la fenêtre
function resize_sections() {
    const sections = document.querySelectorAll('section');
    const headerHeight = document.querySelector('header').offsetHeight;
    const footerHeight = document.querySelector('footer').offsetHeight;
    console.log(window.innerHeight - headerHeight - footerHeight);
    sections.forEach(section => {
        section.style.height = 'auto';
        section.style.height = (window.innerHeight - headerHeight - footerHeight) + 'px';
        console.log(section.style.height);
    });
}

/* ------------------------------------------------------------ */

/* Init */
function initSectionsAndBackground() {
    add_link_sections_in_header();
    init_sections_event();
    add_contributors_to_section();
    resize_sections();
}


/* ------------------------------------------------------------ */
/* Events listeners */

// Mettre à jour la hauteur des sections
window.addEventListener('resize', () => {
    resize_sections();
});

// Appel de la fonction avec `DOMContentLoaded`
window.addEventListener('DOMContentLoaded', () => {
    initSectionsAndBackground();
});


/* ------------------------------------------------------------ */
