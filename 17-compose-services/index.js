'use strict';

require('dotenv').config()

const states = require('./data/states.json');

const process = require('process');
const express = require('express');
const MongoClient = require("mongodb").MongoClient;

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

async function run() {
  const client = await MongoClient.connect(process.env.DB_URI);;
  const database = client.db(process.env.DB_NAME);
  await insertData(database);

  // App
  const app = express();
  app.get('/', async (req, res) => {
    const result = await database.collection('states').find({}).toArray();      
    res.send(result);
  });

  app.listen(PORT, HOST);
  console.log(`Running on http://${HOST}:${PORT}`);

}

async function insertData(database) {
  const statesCollection = database.collection('states');
  await statesCollection.insertMany(states);
}

process.on('SIGINT', () => {
  process.exit(0);
});

run();
