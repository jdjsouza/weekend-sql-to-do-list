const express = require('express');
const router = express.Router();
const pg = require('pg');

const pool = new pg.Pool({
  database: 'weekend-to-do-app',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 10000,
});

// GET
router.get('/', (req, res) => {
  console.log('in /tasks GET');
  let queryText = `SELECT * FROM "tasks";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows); // send result back, will be an array
    })
    .catch((error) => {
      console.log(`Error in GET /tasks ${error}`); // stuff is broked
      res.sendStatus(500);
    });
});

// POST
router.post('/', (req, res) => {
  console.log(`In /tasks POST with`, req.body);
  const taskToAdd = req.body;
  const queryText = `INSERT INTO "tasks" ("task", "completed") VALUES ($1, $2);`;
  pool
    .query(queryText, [taskToAdd.task, taskToAdd.completed])
    .then((response) => {
      console.log(response);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error in POST /tasks ${error}`);
      res.sendStatus(500);
    });
});

// PUT
router.put('/update/:id', (req, res) => {
  console.log('in tasks:id PUT');
  const id = req.params.id;
  const taskStatus = req.body;
  const queryText = `UPDATE "tasks" SET "completed" = $1 WHERE "id" = $2;`;
  pool
    .query(queryText, [taskStatus.completed, id])
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('error', err);
      res.sendStatus(500);
    });
});

// DELETE
router.delete('/:id', (req, res) => {
  console.log('in delete');
  const taskId = req.params.id;
  const queryText = `DELETE FROM "tasks" WHERE id=$1;`;
  const queryArrayData = [taskId];

  pool
    .query(queryText, queryArrayData)
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
