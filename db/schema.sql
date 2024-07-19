DROP DATABASE IF EXISTS event_planner_db;
CREATE DATABASE event_planner_db;

-- Drop tables if they exist
DROP TABLE IF EXISTS rsvps;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Create events table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date TIMESTAMP NOT NULL,
    location VARCHAR(255) NOT NULL,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- Create rsvps table
CREATE TABLE rsvps (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE,
    eventId INTEGER REFERENCES events(id) ON DELETE CASCADE
);
