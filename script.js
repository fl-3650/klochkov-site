document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    
    // Validate inputs
    if (!name || !phone) {
        alert('Please fill in all fields.');
        return;
    }

    // Send data to the server
    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phone })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Email sent successfully!');
        } else {
            alert('Failed to send email. Try again later.');
        }
    })
    .catch(error => {
        alert('Error occurred: ' + error.message);
    });
});
