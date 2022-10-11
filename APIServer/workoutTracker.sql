DROP DATABASE IF EXISTS workouttracker;

CREATE DATABASE workouttracker;


DROP TABLE IF EXISTS journal;

CREATE TABLE journal (
    tracker_id serial PRIMARY KEY,
    journal_input varchar(200) NOT NULL
);