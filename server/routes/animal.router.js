const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated,} = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText =`SELECT * FROM "animals" WHERE "user_id"=$1 ORDER BY "tag_number";`
  pool.query(queryText,[req.user.id]).then(result => res.send(result.rows))
  .catch(e => {
    console.log('error getting animals', e);
    res.sendStatus(500);
  })
});


//post to /api/animal/cow this is used to post a new cow to the database
router.post('/cow', rejectUnauthenticated, (req, res) => {
  // console.log(req.body);
  console.log(req.user);
  console.log('adding a cow with tag number', req.body.tag_number);
  let body = req.body;
  let values = [body.dam_id,
  body.sire_id,
  body.tag_number,
  body.gender,
  req.user.id,
  body.birth_date,
  (body.disposition === '' ? null : body.disposition),
  body.calving_ease,
  body.castrated,
  body.birthweight,
  body.calf,
  body.close_to_calving
  ]
  let queryText = ` INSERT INTO "animals" 
    ("dam_id", "sire_id", "tag_number", "gender", "user_id", "birth_date", "disposition", "calving_ease", "castrated", "birthweight",  "calf", "close_to_calving" )
    VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`
  pool.query(queryText, values).then(result => {
    res.send({ animal_id: result.rows[0].animal_id });
    console.log(result.rows[0].animal_id)
  }).catch(err => {
    console.log('error posting cow', err);
    res.sendStatus(500);
  })
});//end post route to /api/animal/cow


//post to /api/animal/calf this is used to post a new calf to the database
router.post('/calf', rejectUnauthenticated, (req, res) => {
  // console.log(req.body);
  console.log(req.user);
  console.log('adding a calf with tag number', req.body.tag_number);
  let body = req.body;
  let values = [
    body.dam_id,
    body.sire_id,
    body.tag_number,
    body.gender,
    req.user.id,
    body.birth_date,
    (body.calving_ease === '' ? null: body.calving_ease),
    body.castrated,
    (body.birthweight === '' ? null: body.birthweight),
    body.calf,
    (body.status === '' ? null: body.status),
  ];
  let queryText = ` INSERT INTO "animals" 
    ("dam_id", "sire_id", "tag_number", "gender", "user_id", "birth_date", "calving_ease", "castrated", "birthweight",  "calf", "status" )
    VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`
  pool.query(queryText, values).then(result => {
    res.send({ animal_id: result.rows[0].animal_id });
    console.log(result.rows[0].animal_id)
  }).catch(err => {
    console.log('error posting cow', err);
    res.sendStatus(500);
  })
});//end post route to /api/animal/cow

//get request to get notes on specific animal.
router.get('/note/:id', rejectUnauthenticated,(req, res) => {
  let queryText = `SELECT * FROM "notes" WHERE "animal_id"=$1;`
  pool.query(queryText, [req.params.id]).then(result => res.send(result.rows)).catch(e =>{
    console.log('error getting notes', e);
    res.sendStatus(500);
  });
});//end get route to /api/animal/note/:id


//post route to /api/animal/note this is used to add a note to an animal
router.post('/note', rejectUnauthenticated, (req, res) => {
  let queryText = `INSERT INTO "notes" ("note", "animal_id") VALUES ($1, $2);`
  pool.query(queryText, [req.body.note, req.body.animal_id]).then(result => res.sendStatus(201)).catch(e => {
    console.log('error posting note', e);
    res.sendStatus(500);
  })
});//end post route to /api/animal/note


//put route to update close_to_calving
router.put('/close', rejectUnauthenticated, (req, res)=> {
  let queryText = `UPDATE "animals" SET "close_to_calving"=$1 WHERE "animal_id"=$2 AND "user_id"=$3;`
  pool.query(queryText, [req.body.close_to_calving, req.body.animal_id, req.user.id]).then(result => res.sendStatus(200))
  .catch(e => {
    console.log('error updating close to calving', e);
    res.sendStatus(500);
  })
});// end put route to /api/animal/close


//put route to update archived
router.put('/archive', rejectUnauthenticated, (req, res) => {
  let queryText = `UPDATE "animals" SET "archived"=$1, "date_archived"=$2 WHERE "animal_id"=$3 AND "user_id"=$4;`
  pool.query(queryText, [req.body.archived, req.body.date_archived, req.body.animal_id, req.user.id]).then(result => res.sendStatus(200))
    .catch(e => {
      console.log('error updating close to calving', e);
      res.sendStatus(500);
    })
});// end put route to /api/animal/archive

module.exports = router;
