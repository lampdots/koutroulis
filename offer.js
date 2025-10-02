document.addEventListener('DOMContentLoaded', function () {
    // Αρχικοποίηση EmailJS με το Public Key σου
    emailjs.init("nllXVakVvC6CrMvp5");

    const form = document.getElementById('interestForm');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = form.name.value.trim();
        const date = form.date ? form.date.value : '';
        let extra = '';
        if (form.hours) extra += '\nΏρες: ' + form.hours.value;
        if (form.photos) extra += '\nΦωτογραφίες: ' + form.photos.value;

        // Έλεγχος για κενό όνομα
        if (!name) {
            resultDiv.textContent = 'Παρακαλώ συμπληρώστε το όνομά σας.';
            resultDiv.style.color = 'red';
            return;
        }

        // Δεδομένα που θα σταλούν
        const templateParams = {
            from_name: name,
            event_date: date,
            extra_info: extra
        };

        console.log("Αποστολή δεδομένων:", templateParams);

        // Αποστολή μέσω EmailJS
        emailjs.send('service_e4tf667', 'template_cq4g998', templateParams)
            .then(function (response) {
                console.log('EmailJS: Το email εστάλη επιτυχώς!', response.status, response.text);
                resultDiv.textContent = 'Το αίτημά σας εστάλη με επιτυχία! Θα επικοινωνήσουμε σύντομα.';
                resultDiv.style.color = 'green';
                form.reset();
            })
            .catch(function (error) {
                console.error('EmailJS: Σφάλμα αποστολής!', error);
                resultDiv.textContent = 'Σφάλμα αποστολής. Δοκιμάστε ξανά.';
                resultDiv.style.color = 'red';
            });
    });
});
