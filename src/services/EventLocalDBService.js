export default class EventService {
  createEvent(event) {
    try {
      const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
      const id = Date.now().toString();
      const newEvent = { id, ...event };
      existingEvents.push(newEvent);
      localStorage.setItem("events", JSON.stringify(existingEvents));
      return id;
    } catch (error) {
      console.error("Error creating event:", error);
      return null;
    }
  }

  getEventById(eventId) {
    try {
      const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
      const event = existingEvents.find((event) => event.id === eventId);
      return event || null;
    } catch (error) {
      console.error(`Error retrieving event ${eventId}:`, error);
      return null;
    }
  }

  updateEvent(eventId, updatedEvent) {
    try {
      let existingEvents = JSON.parse(localStorage.getItem("events")) || [];
      existingEvents = existingEvents.map((event) => {
        if (event.id === eventId) {
          return { ...event, ...updatedEvent };
        }
        return event;
      });
      localStorage.setItem("events", JSON.stringify(existingEvents));
      return true;
    } catch (error) {
      console.error(`Error updating event ${eventId}:`, error);
      return false;
    }
  }
}
