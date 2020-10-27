const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated,} = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText =`SELECT * FROM "animals" WHERE "user_id"=$1;`
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
  body.disposition,
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
router.post('/calf', (req, res) => {
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


//post route to /api/animal/note this is used to add a note to an animal
router.post('/note', (req, res) => {
  let queryText = `INSERT INTO "notes" ("note", "animal_id") VALUES ($1, $2)`
  pool.query(queryText, [req.body.note, req.body.animal_id]).then(result => res.sendStatus(201)).catch(e => {
    console.log('error posting note', e);
    res.sendStatus(500);
  })
});//end post route to /api/animal/note

module.exports = router;
