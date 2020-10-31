const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();



router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "pastures" WHERE "user_id"=$1;`
    pool.query(queryText, [req.user.id]).then(result => res.send(result.rows)).catch(e => {
        console.log('error getting pastures', e);
        res.sendStatus(500);
    });
});

router.get('/records', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "pasture_records" 
JOIN "animals" ON "animals"."animal_id" = "pasture_records"."animal_id"
JOIN "pastures" ON "pastures"."pasture_id" = "pasture_records"."pasture_id"
WHERE "pasture_records"."user_id"=$1 AND "date_out" is null;`;
    pool.query(queryText, [req.user.id]).then(result => res.send(result.rows)).catch(e => {
        console.log('error getting pasture records', e);
        res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, (req, res) =>{
    let queryText= `INSERT INTO "pastures" ("pasture_name", "user_id") VALUES ($1, $2);`
    pool.query(queryText, [ req.body.pasture_name , req.user.id]).then(result => res.sendStatus(201)).catch(e => {
        console.log('error posting pasture', e);
        res.sendStatus(500);
    })
})

router.post('/records', rejectUnauthenticated, (req, res) => {
    let queryText = `INSERT INTO "pasture_records" ("pasture_id", "date_in", "animal_id", "user_id", "tag_number") VALUES ($1, $2, $3, $4, $5);`;
    let values = [
        req.body.pasture_id,
        req.body.date_in,
        req.body.animal_id,
        req.user.id,
        req.body.tag_number,
    ];
    pool.query(queryText, values).then(result => res.sendStatus(201)).catch(e => {
        console.log('error posting pasture record', e);
        res.sendStatus(500);
    });
});

router.put('/records', rejectUnauthenticated, (req, res) => {
    let queryText = `UPDATE "pasture_records" SET "date_out"=$1 WHERE "pasture_record_id"=$2;`;
    pool.query(queryText, [req.body.date_out, req.body.pasture_record_id]).then(result => res.sendStatus(200)).catch(e => {
        console.log('error updating pasture record', e);
        res.sendStatus(500);
    });
});




module.exports = router;