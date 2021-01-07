const { Pool } = require('pg');
const process = require('process');

const pool = new Pool ({
  user: 'vagrant',
  password: '123', 
  host: 'localhost',
  database: 'bootcampx'
});

const cohort = process.argv[2] || 'JUL02';
const values = [cohort]

pool.query (` 
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
ORDER BY teacher;`,
values
)
.then(res => {
  for (let obj of res.rows) {
    console.log(`${obj.cohort}: ${obj.teacher}`);
  }
})
.catch(err => {
  console.error('query error', err.stack)
});