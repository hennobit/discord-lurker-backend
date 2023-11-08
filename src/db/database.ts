import * as sqlite3 from 'sqlite3';

const db = new sqlite3.Database('src/user_info.db');

export { db };