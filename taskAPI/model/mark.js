const db = require('../database');

class Mark {
  static async create(data) {
    const query = 'INSERT INTO marks (student_id, subject, mark) VALUES (?, ?, ?)';
    await db.execute(query, [data.student_id, data.subject, data.mark]);
  }
}

module.exports = Mark;
