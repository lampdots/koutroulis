// custom.js - Υπολογισμός τιμής προσφοράς και αποστολή email με EmailJS v4

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS v4
    emailjs.init('34r-WzdF4wWkbgCcU'); // Αντικατάστησε με το public key σου από το Dashboard

    const form = document.getElementById('interestForm');
    const hoursSelect = document.getElementById('hours');
    const photosSelect = document.getElementById('photos');
    const resultDiv = document.getElementById('result');

    function calculatePrice() {
        let hours = hoursSelect.value;
        let photos = photosSelect.value;
        let price = 0;

        if (hours === 'all') {
            price += 250;
        } else if (hours) {
            price += 40 + (parseInt(hours) - 1) * 30;
        }

        if (photos) {
            let numPhotos = parseInt(photos);
            if (numPhotos > 50) {
                price += (numPhotos - 50) * 1.2;
            }
        }

        if (hours && photos) {
            resultDiv.innerHTML = '<b>Ενδεικτική τιμή:</b> ' + price.toFixed(2) + '€';
        } else {
            resultDiv.innerHTML = '';
        }
    }

    hoursSelect.addEventListener('change', calculatePrice);
    photosSelect.addEventListener('change', calculatePrice);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = form.name.value.trim();
        const date = form.date ? form.date.value : '';
        const hours = form.hours ? form.hours.value : '';
        const photos = form.photos ? form.photos.value : '';

        if (!name) {
            resultDiv.textContent = 'Παρακαλώ συμπληρώστε το όνομά σας.';
            resultDiv.style.color = 'red';
            return;
        }

        let extra = '';
        if (hours) extra += '\nΏρες: ' + hours;
        if (photos) extra += '\nΦωτογραφίες: ' + photos;

        console.log('Προσπάθεια αποστολής email μέσω EmailJS...');

        emailjs.send('service_e4tf667', 'template_cq4g998', {
            from_name: name,
            event_date: date,
            extra_info: extra
        })
        .then(function(response) {
            console.log('EmailJS: Το email εστάλη επιτυχώς!', response.status, response.text);
            resultDiv.innerHTML = 'Το αίτημά σας εστάλη με επιτυχία! Θα επικοινωνήσουμε σύντομα.';
            resultDiv.style.color = 'green';
            form.reset();
        }, function(error) {
            console.error('EmailJS: Σφάλμα αποστολής!', error);
            resultDiv.innerHTML = 'Σφάλμα αποστολής. Δοκιμάστε ξανά.';
            resultDiv.style.color = 'red';
        });
    });
});
