// index.js - Add your JavaScript code below

document.addEventListener('DOMContentLoaded', function() {
    // Ενεργοποίηση κουμπιού όταν επιλεγεί προσφορά
    const offersForm = document.getElementById('offersForm');
    const offerInputs = offersForm.querySelectorAll('input[name="offer"]');
    const submitBtn = document.getElementById('submitBtn');
    const offerLabels = offersForm.querySelectorAll('.offer');

    offerInputs.forEach((input, idx) => {
        input.addEventListener('change', function() {
            // Ενεργοποίηση κουμπιού
            submitBtn.disabled = false;
            // Highlight στην επιλεγμένη προσφορά
            offerLabels.forEach(label => label.classList.remove('selected'));
            offerLabels[idx].classList.add('selected');
        });
    });

    offersForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const selected = offersForm.querySelector('input[name="offer"]:checked');
        if (selected) {
            // Μεταφορά στη σωστή σελίδα προσφοράς
            switch(selected.value) {
                case 'basic': window.location.href = 'basic.html'; break;
                case 'premium': window.location.href = 'premium.html'; break;
                case 'deluxe': window.location.href = 'deluxe.html'; break;
                case 'custom': window.location.href = 'custom.html'; break;
                default: alert('Σφάλμα επιλογής προσφοράς.');
            }
        }
    });
});
