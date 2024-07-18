document.addEventListener('DOMContentLoaded', () => {
    const rsvpButtons = document.querySelectorAll('.rsvp-btn');
  
    rsvpButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        const eventId = event.target.getAttribute('data-id');
  
        const response = await fetch(`/rsvps/${eventId}`, {
          method: 'POST',
        });
  
        if (response.ok) {
          document.location.reload();
        } else {
          alert('Failed to RSVP');
        }
      });
    });
  });
  