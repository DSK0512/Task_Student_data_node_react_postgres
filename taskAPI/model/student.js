const db = require("../database");

// SQL SCHEMA QUERY

// CREATE TABLE students (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     email VARCHAR(100) UNIQUE NOT NULL,
//     dob DATE NOT NULL
// );

// CREATE TABLE marks (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     student_id INT NOT NULL,
//     subject VARCHAR(100) NOT NULL,
//     mark INT NOT NULL,
//     FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
// );

class Student {
  static async create(data) {
    const query = `INSERT INTO students (name, email, dob, age) VALUES ('${data.name}', '${data.email}', '${data.dob}', '${data.age}')`;
    await db.query(query);
    return { code: 200, message: "Inserted Successfully" };
  }

  static async findAll() {
    // console.log(db)
    const query =
      "SELECT * FROM public.students WHERE isdeleted = false ORDER BY id DESC";
    let rows = await db.query(query);
    return rows.rows;
  }

  static async findById(id) {
    const query = `
      SELECT 
    students.id AS student_id,
    students.name AS student_name,
    marks.subject,
    marks.mark
FROM 
    students
LEFT JOIN 
    marks
ON 
    students.id = marks.student_id
    WHERE students.id = ${id}
    `;
    const rows = await db.query(query);

    return { code: 200, message: "Request Acknowledged", data: rows.rows };
  }

  static async update(id, data) {
    const query =
      "UPDATE students SET name = ?, email = ?, dob = ? WHERE id = ?";
    await db.execute(query, [data.name, data.email, data.dob, id]);
  }

  static async delete(id) {
    const query = `UPDATE students SET isdeleted = TRUE WHERE id = ${id}`;
    // const query = `DELETE FROM students WHERE id = ${id}`;
    await db.query(query);
    return "Deleted Successfully";
  }
}

module.exports = Student;
