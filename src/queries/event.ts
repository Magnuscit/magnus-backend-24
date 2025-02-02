const fetchEvents = "SELECT id, name, fee FROM events;";

const fetchEventName = "SELECT name from events WHERE id = $1";

// const addTeamMembers = `
//    INSERT INTO team_members (email, clg_name, phone_no, event_id, team_leader_email)
//    VALUES %L;
// `;

const EventQueries = {
  fetchEvents,
  fetchEventName,
  // addTeamMembers,
};

export default EventQueries;
