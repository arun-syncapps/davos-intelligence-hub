import Database from 'better-sqlite3';
import path from 'path';

const dbPath = process.env.DATABASE_PATH || path.resolve(__dirname, 'davos.db');

export const db = new Database(dbPath, { verbose: console.log });

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT CHECK(role IN ('admin', 'host', 'guest')),
    created_at DATETIME,
    headline TEXT,
    about TEXT,
    location TEXT,
    industry TEXT,
    profile_url TEXT,
    background_image_url TEXT,
    avatar_url TEXT,
    company TEXT,
    job_title TEXT
  );

  CREATE TABLE IF NOT EXISTS organizations (
    id TEXT PRIMARY KEY,
    name TEXT,
    type TEXT,
    description TEXT,
    website TEXT,
    logo_url TEXT
  );

  CREATE TABLE IF NOT EXISTS speakers (
    id TEXT PRIMARY KEY,
    name TEXT,
    title TEXT,
    organization_id TEXT,
    bio TEXT,
    image_url TEXT,
    linkedin_url TEXT
  );

  CREATE TABLE IF NOT EXISTS venues (
    id TEXT PRIMARY KEY,
    name TEXT,
    address TEXT,
    coordinates TEXT,
    capacity INTEGER,
    access_type TEXT,
    description TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    date TEXT,
    start_time TEXT,
    end_time TEXT,
    venue_id TEXT,
    organization_id TEXT,
    host_id TEXT,
    category TEXT,
    type TEXT,
    registration_link TEXT,
    image_url TEXT,
    FOREIGN KEY(host_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS event_speakers (
    event_id TEXT,
    speaker_id TEXT,
    PRIMARY KEY (event_id, speaker_id)
  );

  CREATE TABLE IF NOT EXISTS registrations (
    id TEXT PRIMARY KEY,
    event_id TEXT,
    user_id TEXT,
    user_name TEXT,
    user_email TEXT,
    status TEXT,
    created_at DATETIME,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS experiences (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    title TEXT,
    company TEXT,
    location TEXT,
    start_date TEXT,
    end_date TEXT,
    description TEXT,
    current INTEGER DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS educations (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    school TEXT,
    degree TEXT,
    field_of_study TEXT,
    start_date TEXT,
    end_date TEXT,
    description TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS connections (
    id TEXT PRIMARY KEY,
    requester_id TEXT,
    recipient_id TEXT,
    status TEXT CHECK(status IN ('pending', 'accepted', 'rejected')),
    created_at DATETIME,
    FOREIGN KEY(requester_id) REFERENCES users(id),
    FOREIGN KEY(recipient_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    author_id TEXT,
    content TEXT,
    image_url TEXT,
    created_at DATETIME,
    FOREIGN KEY(author_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    post_id TEXT,
    author_id TEXT,
    content TEXT,
    created_at DATETIME,
    FOREIGN KEY(post_id) REFERENCES posts(id),
    FOREIGN KEY(author_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS likes (
    post_id TEXT,
    user_id TEXT,
    created_at DATETIME,
    PRIMARY KEY(post_id, user_id),
    FOREIGN KEY(post_id) REFERENCES posts(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS profile_views (
    id TEXT PRIMARY KEY,
    viewer_id TEXT,
    viewed_id TEXT,
    created_at DATETIME,
    FOREIGN KEY(viewer_id) REFERENCES users(id),
    FOREIGN KEY(viewed_id) REFERENCES users(id)
  );
`);
