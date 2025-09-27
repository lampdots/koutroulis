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
        // 1. Πρόσθεσε στο <head> του html σου:
        // <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
        // <script>emailjs.init('user_xxxxxxxxxxxxxxxxx');</script>
        // 2. Φτιάξε λογαριασμό στο https://www.emailjs.com/ και δημιούργησε service/template
        // 3. Βάλε τα δικά σου service_id, template_id, user_id παρακάτω:

        /*
        emailjs.send('service_xxxxx', 'template_xxxxx', {
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
        */

        // Για demo, εμφανίζουμε μήνυμα επιτυχίας
        resultDiv.textContent = 'Το αίτημά σας καταχωρήθηκε! Θα επικοινωνήσουμε σύντομα.';
        resultDiv.style.color = 'green';
        form.reset();
    });
});
