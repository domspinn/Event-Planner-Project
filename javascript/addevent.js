
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

// initializing the Google API client
function initClient() {
    gapi.client.init({
        apiKey: '',
        clientId: '',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar.events"
    }).then(() => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
            // Loads calendar and list events after authentication
            loadCalendar();
            listEvents();
        });
    });
}

// allows enduser to add a new event to the calendar
function addEvent() {
    const event = {
        'summary': document.getElementById('event-title').value,
        'description': document.getElementById('event-description').value,
        'start': {
            'date': document.getElementById('event-date').value,
            'timeZone': 'America/New_York'
        },
        'end': {
            'date': document.getElementById('event-date').value,
            'timeZone': 'America/New_York'
        }
    };

    gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
    }).then(response => {
        console.log('Event created: ', response.result.htmlLink);
        listEvents();
    });
}

// Adding event listener to the "Post" button
document.getElementById('post-event').addEventListener('click', addEvent);

// Function to load and render the calendar
function loadCalendar() {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let weeks = [[]];
    let weekIndex = 0;

    // Fill the first week with empty days until the first day of the month
    for (let i = 0; i < firstDay; i++) {
        weeks[weekIndex].push('');
    }

    // Fill the calendar with days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        if (weeks[weekIndex].length === 7) {
            weeks.push([]);
            weekIndex++;
        }
        weeks[weekIndex].push(day);
    }

    // Fill the last week with empty days until the end of the week
    while (weeks[weekIndex].length < 7) {
        weeks[weekIndex].push('');
    }

    const source = document.getElementById('calendar-template').innerHTML;
    const template = Handlebars.compile(source);
    const context = { month: 'July', year: year, days: days, weeks: weeks };
    const html = template(context);
    document.getElementById('calendar').innerHTML = html;
}

// listing any current events from the Calendar
function listEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(response => {
        const events = response.result.items;
        const source = document.getElementById('events-template').innerHTML;
        const template = Handlebars.compile(source);
        const context = { events: events };
        const html = template(context);
        document.getElementById('events-list').innerHTML = html;
    });
}

// allows enduser to edit an existing event
function editEvent(id, summary, date, description) {
    document.getElementById('edit-event-title').value = summary;
    document.getElementById('edit-event-date').value = date;
    document.getElementById('edit-event-description').value = description;
    document.getElementById('edit-event-form').style.display = 'block';

    // Set the onclick function for the update button
    document.getElementById('update-event').onclick = function () {
        updateEvent(id);
    };

    // Set the onclick function for the cancel button
    document.getElementById('cancel-edit').onclick = function () {
        document.getElementById('edit-event-form').style.display = 'none';
    };
}

// Allows enduser to update an existing event in the calendar
function updateEvent(id) {
    const event = {
        'summary': document.getElementById('edit-event-title').value,
        'description': document.getElementById('edit-event-description').value,
        'start': {
            'date': document.getElementById('edit-event-date').value,
            'timeZone': 'America/Los_Angeles'
        },
        'end': {
            'date': document.getElementById('edit-event-date').value,
            'timeZone': 'America/Los_Angeles'
        }
    };

    gapi.client.calendar.events.update({
        'calendarId': 'primary',
        'eventId': id,
        'resource': event
    }).then(response => {
        console.log('Event updated: ', response.result.htmlLink);
        document.getElementById('edit-event-form').style.display = 'none';
        listEvents();
    });
}

// Allows enduser to delete an existing event from the calendar
function deleteEvent(id) {
    gapi.client.calendar.events.delete({
        'calendarId': 'primary',
        'eventId': id
    }).then(response => {
        console.log('Event deleted');
        listEvents();
    });
}

handleClientLoad();