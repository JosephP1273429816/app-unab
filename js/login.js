document.addEventListener('DOMContentLoaded', function() {
    var inputs = document.querySelectorAll('input[required]');
    inputs.forEach(function(input) {
        input.addEventListener('invalid', function() {
            this.setCustomValidity('Por favor complete este campo.');
        });
        input.addEventListener('input', function() {
            this.setCustomValidity('');
        });
    });
});