// custom.js - Υπολογισμός τιμής προσφοράς με βάση τις επιλογές του χρήστη

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('interestForm');
    const hoursSelect = document.getElementById('hours');
    const photosSelect = document.getElementById('photos');
    const resultDiv = document.getElementById('result');

    function calculatePrice() {
        let hours = hoursSelect.value;
        let photos = photosSelect.value;
        let price = 0;

        // Υπολογισμός τιμής βάσει ωρών
        if (hours === 'all') {
            price += 250; // Ολοήμερη
        } else if (hours) {
            price += 40 + (parseInt(hours) - 1) * 30; // 1η ώρα 40€, κάθε επιπλέον +30€
        }

        // Υπολογισμός τιμής βάσει φωτογραφιών
        if (photos) {
            let numPhotos = parseInt(photos);
            if (numPhotos > 50) {
                price += (numPhotos - 50) * 1.2; // Κάθε επιπλέον φωτογραφία πάνω από 50: +1.2€
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
        // Εδώ μπορεί να προστεθεί αποστολή email
        resultDiv.innerHTML += '<br>Το αίτημά σας καταχωρήθηκε! Θα επικοινωνήσουμε σύντομα.';
        resultDiv.style.color = 'green';
        form.reset();
    });
});
