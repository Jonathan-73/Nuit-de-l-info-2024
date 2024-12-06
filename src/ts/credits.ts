interface Contributor {
  name: string;
  role: string;
  message: string;
}

const contributors: Contributor[] = [
    { name: "Anastasios Tsiompanidis", role: "Αρχιπρογραμματιστής", message: "Κατασκευάζοντας λύσεις με πάθος." },
    { name: "Jonathan Dumaz", role: "Σχεδιάστρια UI/UX", message: "Δημιουργώντας όμορφες εμπειρίες." },
    { name: "Julien Pierson", role: "Μηχανικός QA", message: "Εξασφαλίζοντας την ομαλή λειτουργία όλων." },
    { name: "Charles Damaggio-Crozier", role: "Αναλυτής Δεδομένων", message: "Αποκρυπτογραφώντας τα δεδομένα για καλύτερες αποφάσεις." },
    { name: "Mathieu Moiroux", role: "Υπεύθυνος Έργου", message: "Διαχειρίζοντας τις λεπτομέρειες με ακρίβεια." },
    { name: "Antony Cosnay", role: "Μηχανικός Ασφαλείας", message: "Διατηρώντας τα πάντα ασφαλή και αξιόπιστα." },
    { name: "Noah Kohrs", role: "Επιστήμονας Μηχανικής Μάθησης", message: "Κατανοώντας τον κόσμο μέσω αλγορίθμων." },
    { name: "Alexis Noel", role: "Αρχιτέκτονας Λογισμικού", message: "Σχεδιάζοντας λύσεις για το μέλλον." },
    { name: "Swan Auvergne", role: "Υπεύθυνη Περιεχομένου", message: "Δημιουργώντας ιστορίες που αξίζουν να ειπωθούν." },
    { name: "Romain Bouche", role: "Διαχειριστής Βάσης Δεδομένων", message: "Οργανώνοντας δεδομένα με αποτελεσματικότητα." },
    { name: "Noé Flechon", role: "Μηχανικός Υποδομών", message: "Χτίζοντας γερά θεμέλια για εφαρμογές." },
    { name: "Pierre Schuller", role: "Μηχανικός Frontend", message: "Ζωντανεύοντας τα σχέδια." },
    { name: "Clément Charrière", role: "Μηχανικός Backend", message: "Διασφαλίζοντας τη λειτουργικότητα του συστήματος." },
    { name: "Antonin Chabeaudy", role: "Μηχανικός Εξυπηρέτησης", message: "Διασφαλίζοντας άριστη εμπειρία για τους χρήστες." },
  ];

const getInitials = (name: string): string => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");
  return initials.toUpperCase();
};

const container = document.getElementById("credits-container") as HTMLElement;

const createContributorCard = (contributor: Contributor): string => {
  return `
      <div class="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
        <div class="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
          ${getInitials(contributor.name)}
        </div>
        <h2 class="text-xl font-semibold text-center">${contributor.name}</h2>
        <p class="text-gray-400 text-center text-sm">${contributor.role}</p>
        <p class="mt-4 text-center text-gray-300 italic">${
          contributor.message
        }</p>
      </div>
    `;
};

contributors.forEach((contributor) => {
  container.innerHTML += createContributorCard(contributor);
});
