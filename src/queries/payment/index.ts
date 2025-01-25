const insertPayment = `
  INSERT INTO payments (id, created_at)
  VALUES ($1, $2)
`;

const insertUserEvents = `
  INSERT INTO users_events (event_id, user_email, payment_id, paid)
  VALUES %L
`;

const PaymentQueries = {
  insertPayment,
  insertUserEvents,
};

export default PaymentQueries;
