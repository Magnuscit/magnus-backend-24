-- CREATE DATABASE magnus;
-- \c magnus;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4(),
    name VARCHAR(50),
    email VARCHAR(50),
    clg_name VARCHAR(100),
    phone_no VARCHAR(20),
    PRIMARY KEY(id),
    UNIQUE (email)
);

CREATE TABLE payments (
  id VARCHAR(100) PRIMARY KEY,
  created_at TIMESTAMPTZ
);

CREATE TABLE events (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100),
    password TEXT,
    fee INTEGER DEFAULT 0
);

-- CREATE TABLE team_members (
--   email VARCHAR(50),
--   clg_name VARCHAR(100),
--   phone_no VARCHAR(20),
--   event_id VARCHAR,
--   team_leader_email VARCHAR,
--   FOREIGN KEY(event_id) REFERENCES events(id),
--   FOREIGN KEY(team_leader_email) REFERENCES users(email),
--   PRIMARY KEY (email, event_id, team_leader_email)
-- );

CREATE TABLE users_events (
    event_id VARCHAR,
    user_email VARCHAR,
    payment_id VARCHAR,
    present BOOLEAN DEFAULT false,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (user_email) REFERENCES users(email),
    FOREIGN KEY (payment_id) REFERENCES payments(id),
    PRIMARY KEY (event_id, user_email)
);

CREATE TABLE admin (
    id VARCHAR(10) PRIMARY KEY,
    password VARCHAR
);
