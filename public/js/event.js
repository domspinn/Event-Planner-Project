document.addEventListener('DOMContentLoaded', () => {
    const createEventForm = document.querySelector('#create-event-form');
    const deleteButtons = document.querySelectorAll('.delete-event-btn');
  
    if (createEventForm) {
      createEventForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const title = document.querySelector('#event-title').value.trim();
        const date = document.querySelector('#event-date').value.trim();
        const time = document.querySelector('#event-time').value.trim();
        const location = document.querySelector('#event-location').value.trim();
  
        if (title && date && time && location) {
          const response = await fetch('/events', {
            method: 'POST',
            body: JSON.stringify({ title, date, time, location }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.replace('/events');
          } else {
            alert('Failed to create event');
          }
        }
      });
    }
  
    deleteButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        const eventId = event.target.getAttribute('data-id');
  
        const response = await fetch(`/events/${eventId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          document.location.reload();
        } else {
          alert('Failed to delete event');
        }
      });
    });
  });
  