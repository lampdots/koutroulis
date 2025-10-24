// custom.js - Υπολογισμός τιμής προσφοράς (με παροχές/checkboxes) και αποστολή email με EmailJS v4

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS v4
    emailjs.init('34r-WzdF4wWkbgCcU'); // Αντικατάστησε με το public key σου από το Dashboard

    const form = document.getElementById('interestForm');
    const resultDiv = document.getElementById('result');
    const servicesFieldset = document.getElementById('services');
    const totalAmountEl = document.getElementById('totalAmount');

    let finalPrice = 0;

    function calculatePrice() {
        if (!servicesFieldset) {
            finalPrice = 0;
            if (totalAmountEl) totalAmountEl.textContent = '0';
            if (resultDiv) resultDiv.innerHTML = '';
            return;
        }

        const checked = servicesFieldset.querySelectorAll('input[type="checkbox"][name="service"]:checked');
        let price = 0;
        checked.forEach(chk => {
            const p = Number(chk.getAttribute('data-price')) || 0;
            price += p;
        });

        finalPrice = price;

        // Ενημέρωση εμφανιζόμενου συνόλου
        if (totalAmountEl) {
            totalAmountEl.textContent = price.toFixed(2).replace('.', ',');
        }

        // Προαιρετική ενδεικτική τιμή στο κάτω πλαίσιο
        if (checked.length > 0) {
            if (resultDiv) {
                resultDiv.innerHTML = '<b>Ενδεικτική τιμή:</b> ' + price.toFixed(2) + '€';
                resultDiv.style.color = '';
            }
        } else {
            if (resultDiv) resultDiv.innerHTML = '';
        }
    }

    // Υπολογισμός σε κάθε αλλαγή επιλογής
    if (servicesFieldset) {
        servicesFieldset.addEventListener('change', calculatePrice);
        calculatePrice(); // αρχικός υπολογισμός
    }

    // Υποβολή φόρμας (ίδια ροή EmailJS – στέλνουμε τις επιλεγμένες παροχές και το σύνολο)
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = form.name.value.trim();
        const date = form.date ? form.date.value : '';
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const location = form.location ? form.location.value.trim() : '';

        if (!name) {
            resultDiv.textContent = 'Παρακαλώ συμπληρώστε το όνομά σας.';
            resultDiv.style.color = 'red';
            return;
        }

        // Συγκρότηση περιγραφής επιλεγμένων παροχών
        let extra = '';
        if (servicesFieldset) {
            const checked = servicesFieldset.querySelectorAll('input[type="checkbox"][name="service"]:checked');
            if (checked.length > 0) {
                extra += '\nΠαροχές:\n';
                checked.forEach(chk => {
                    const label = chk.closest('label');
                    const line = label ? label.textContent.trim() : chk.value;
                    extra += '• ' + line + '\n';
                });
            } else {
                extra += '\nΠαροχές: Καμία\n';
            }
        }

        console.log('Προσπάθεια αποστολής email μέσω EmailJS...');

        emailjs.send('service_e4tf667', 'template_cq4g998', {
            from_name: name,
            event_date: date,
            extra_info: extra,
            price: finalPrice.toFixed(2) + '€',
            email: email,
            phone: phone,
            location: location
        })
        .then(function(response) {
            console.log('EmailJS: Το email εστάλη επιτυχώς!', response.status, response.text);
            resultDiv.innerHTML = 'Το αίτημά σας εστάλη με επιτυχία! Θα επικοινωνήσουμε σύντομα.';
            resultDiv.style.color = 'green';
            form.reset();
            calculatePrice(); // μηδενίζει την τιμή/εμφάνιση
        }, function(error) {
            console.error('EmailJS: Σφάλμα αποστολής!', error);
            resultDiv.innerHTML = 'Σφάλμα αποστολής. Δοκιμάστε ξανά.';
            resultDiv.style.color = 'red';
        });
    });
});
