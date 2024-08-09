document.addEventListener('DOMContentLoaded', function() {
    const shows = JSON.parse(document.getElementById('shows-data').textContent);
    const showSelect = document.getElementById('shows');
    const timingsContainer = document.getElementById('timings-container');
    const showTitle = document.getElementById('show-title');
    const showDescription = document.getElementById('show-description');

    showSelect.addEventListener('change', function() {
        const selectedShow = shows.find(show => show.id == this.value);
        renderTimings(selectedShow.timings);
        showTitle.textContent = selectedShow.name;
        showDescription.textContent = selectedShow.description;
    });

    function renderTimings(timings) {
        timingsContainer.innerHTML = '';
        timings.forEach(timing => {
            const radioBtn = document.createElement('input');
            radioBtn.type = 'radio';
            radioBtn.name = 'timing';
            radioBtn.value = timing;
            timingsContainer.appendChild(radioBtn);

            const label = document.createElement('label');
            label.textContent = timing;
            timingsContainer.appendChild(label);

            const br = document.createElement('br');
            timingsContainer.appendChild(br);
        });
    }

    document.getElementById('booking-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        fetch('/book', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = `/confirmation?show_id=${data.show_id}&timing=${data.timing}`;
        });
    });

    // Initialize the first show timings on page load
    renderTimings(shows[0].timings);
});
