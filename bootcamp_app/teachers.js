const { Pool } = require('pg');
const process = require('process');

const pool = new Pool ({
  user: 'vagrant',
  password: '123', 
  host: 'localhost',
  database: 'bootcampx'
});

pool.query (` 
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
ORDER BY teacher; `
)
.then(res => {
  for (let obj of res.rows) {
    console.log(`${obj.cohort}: ${obj.teacher}`);
  }
})
.catch(err => {
  console.error('query error', err.stack)
});