// custom.js - Υπολογισμός τιμής προσφοράς (με παροχές/checkboxes) και αποστολή email με EmailJS v4

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS v4
    emailjs.init('34r-WzdF4wWkbgCcU'); // Αντικατάστησε με το public key σου από το Dashboard

    const form = document.getElementById('interestForm');
    const resultDiv = document.getElementById('result');

    // ΝΕΟ: Πεδία/στοιχεία για παροχές
    const servicesFieldset = document.getElementById('services'); // <fieldset id="services"> ... </fieldset>

    let finalPrice = 0;

    // ===== ΝΕΑ ΣΥΝΑΡΤΗΣΗ ΥΠΟΛΟΓΙΣΜΟΥ ΤΙΜΗΣ ΜΕ CHECKBOXES =====
    function calculatePrice() {
        if (!servicesFieldset) {
            // Αν δεν υπάρχει το fieldset, καθάρισε εμφάνιση και βγες
            finalPrice = 0;
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

        // Εμφάνιση ενδεικτικής τιμής αν έχει επιλεγεί έστω μία παροχή
        if (checked.length > 0) {
            resultDiv.innerHTML = '<b>Ενδεικτική τιμή:</b> ' + price.toFixed(2) + '€';
            resultDiv.style.color = ''; // reset τυχόν κόκκινο/πράσινο
        } else {
            resultDiv.innerHTML = '';
        }
    }

    // ===== ΑΚΡΟΑΣΤΗΣ ΑΛΛΑΓΩΝ ΣΤΙΣ ΠΑΡΟΧΕΣ =====
    if (servicesFieldset) {
        servicesFieldset.addEventListener('change', calculatePrice);
        // Αρχικός υπολογισμός
        calculatePrice();
    }

    // ===== ΥΠΟΒΟΛΗ ΦΟΡΜΑΣ (ίδια ροή, απλώς στέλνουμε τις επιλεγμένες παροχές) =====
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = form.name.value.trim();
        const date = form.date ? form.date.value : '';
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();

        if (!name) {
            resultDiv.textContent = 'Παρακαλώ συμπληρώστε το όνομά σας.';
            resultDiv.style.color = 'red';
            return;
        }

        // Συγκρότηση περιγραφής επιλεγμένων παροχών για το email
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
            phone: phone
        })
        .then(function(response) {
            console.log('EmailJS: Το email εστάλη επιτυχώς!', response.status, response.text);
            resultDiv.innerHTML = 'Το αίτημά σας εστάλη με επιτυχία! Θα επικοινωνήσουμε σύντομα.';
            resultDiv.style.color = 'green';
            form.reset();
            // Μετά το reset, μηδενίζουμε και την τιμή που φαίνεται
            calculatePrice();
        }, function(error) {
            console.error('EmailJS: Σφάλμα αποστολής!', error);
            resultDiv.innerHTML = 'Σφάλμα αποστολής. Δοκιμάστε ξανά.';
            resultDiv.style.color = 'red';
        });
    });
});
