const Postgrator = require('postgrator');
 
const postgrator = new Postgrator({
  migrationDirectory: __dirname + '/../migrations',
  driver: 'pg',
  host: 'postgres',
  port: 5432,
  database: 'dns_manager',
  username: 'postgres',
  password: 'passw0rd',
  // Schema table name. Optional. Default is schemaversion
  // If using Postgres, schema may be specified using . separator
  // For example, { schemaTable: 'schema_name.table_name' }
  schemaTable: 'schemaversion'
})

postgrator
.migrate()
.then(appliedMigrations => console.log('Applied migrations:', appliedMigrations))
.catch(error => console.log('Can\'t apply migrations:', error))

const express = require('express');
const app = express();
app.use(express.json());
const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'postgres',
    database: 'dns_manager',
    password: 'passw0rd',
    port: 5432,
});
//LIST ALL DOMAINS
app.get('/v1/domains', async (request, reply) => {
    try {
        const result = await pool.query('SELECT * FROM domains');

        reply.json(result.rows);
    } catch (error) {
        reply
            .status(503)
            .json({ message: 'Service unavailable.' });
    }
});

//CREATE NEW DOMAIN
app.post('/v1/domains', async (request, reply) => {
    const payload = request.body;
    const text = 'INSERT INTO domains(name, master, last_check, type, notified_serial, account) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
    const values = [
        payload.name,
        payload.master,
        payload.last_check, 
        payload.type, 
        payload.notified_serial, 
        payload.account 
    ];

    try {
        const result = await pool.query(text, values);
        reply.json(result.rows);
    } catch (error) {
        reply
            .status(503)
            .json({ message: 'Service unavailable.' });
    }
});

//RETRIEVE AN EXISTING DOMAIN
app.get('/v1/domains/:domain', async (request, reply) => {
    const { domain } = request.params;
    const text = 'SELECT * FROM domains WHERE name = $1';
    const values = [ domain ];

    try {
        const result = await pool.query(text, values);
        reply.json(result.rows);
    } catch (error) {
        reply
            .status(503)    
            .json({ message: 'Uknown domain.' });
        } 
});

//DELETE A DOMAIN
app.delete('/v1/domains/:domain', async (request, reply) => {
    const { domain } = request.params;
    const text = 'DELETE * FROM domains WHERE name = $1';
    const values = [ domain ];

    try {
        const result = await pool.query(text, values);
        reply.json(result.rows);
    } catch (error) {
        reply
            .status(503)
            .json({ message: 'Uknown domain.' });
    }
});

//LIST ALL DOMAIN RECORDS
app.get('/v1/domains/:domain/records', async (request, reply) => {
    const { domain } = request.params;
    const text = 'SELECT * FROM records WHERE name = $1';
    const values = [ domain ];


    try {
        const result = await pool.query(text, values);
        reply.json(result.rows);
    } catch (error) {
        reply
            .status(503)
            .json({ message: 'Service unavailable.' });
    }
});

//CREATE A NEW DOMAIN RECORD
app.post('/v1/domains/:domain/records', async (request, reply) => {
    const payload = request.body;
    const domain_id = await pool.query('SELECT id FROM domains WHERE name = $1', values);
    const text = 'INSERT INTO records(domain_id, name, type, content, ttl, prio, ordername, auth) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [ 
        
        payload.name,
        payload.type,
        payload.content,
        payload.ttl,
        payload.prio,
        payload.ordername,
        payload.auth 
    ];
    
    try {
        const result = await pool.query(text, values);
        reply.json(result.rows);
    } catch (error) {
        reply
            .status(503)
            .json({ message: 'Service unavailable.' });
    }
});

//RETRIEVE AN EXISTING DOMAIN RECORD
app.get('/v1/domains/:domain/records/:record_id', async (request, reply) => {
    const { payload } = request.params;

    const text = 'SELECT * FROM records WHERE name = $1 WHERE id = $2' ;
    const values = [ 
        payload.domain,
        payload.record_id
    ];


    try {
        const result = await pool.query(text, values);
        reply.json(result.rows);
    } catch (error) {
        reply
            .status(503)
            .json({ message: 'Service unavailable.' });
    }
});

//UPDATE A DOMAIN RECORD
// ...

//DELETE A DOMAIN RECORD
// ...

app.listen(3000, () => {
    console.log('Service "dns-manager" started listening on 3000 port.');
});
