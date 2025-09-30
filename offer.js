// offer.js - Υποβολή φόρμας και αποστολή email μέσω EmailJS ή παρόμοιας υπηρεσίας

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('interestForm');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = form.name.value.trim();
        const date = form.date ? form.date.value : '';
        // Μπορεί να υπάρχουν και άλλα πεδία (π.χ. hours, photos)
        let extra = '';
        if (form.hours) extra += '\nΏρες: ' + form.hours.value;
        if (form.photos) extra += '\nΦωτογραφίες: ' + form.photos.value;

        if (!name) {
            resultDiv.textContent = 'Παρακαλώ συμπληρώστε το όνομά σας.';
            resultDiv.style.color = 'red';
            return;
        }

        // --- EmailJS ---
        // Συμπλήρωσε τα παρακάτω με τα δικά σου στοιχεία:
        // service_id: το id του email service σου (π.χ. gmail)
        // template_id: το id του template (π.χ. template_cq4g98)
        // user_id/public key: το public key σου (π.χ. user_xxxxxxxxxxxxxxxxx)
        emailjs.send('service_e4f667', 'template_cq4g98', {
            to_email: 'lampdotshua@gmail.com',
            from_name: name,
            event_date: date,
            extra_info: extra
        })
        .then(function() {
            resultDiv.textContent = 'Το αίτημά σας εστάλη με επιτυχία! Θα επικοινωνήσουμε σύντομα.';
            resultDiv.style.color = 'green';
            form.reset();
        }, function(error) {
            resultDiv.textContent = 'Σφάλμα αποστολής. Δοκιμάστε ξανά.';
            resultDiv.style.color = 'red';
        });
    });
});
