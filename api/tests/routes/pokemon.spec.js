/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const { request } = require('../../src/app.js');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'pikachuu',
  hp:20,
  attack:20,
  defense:20,
  speed:20,
  height:30,
  weight:22
};

describe('Pokemon routes', () => {
  it('should do something', async () => {
    // do your testing
    before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
    beforeEach(() => Pokemon.sync({ force: true })
      .then(() => Pokemon.create(pokemon)));
    describe('GET /pokemons', () => {
      it('should get 200', () =>
        agent.get('/pokemons').expect(200)
        
      );
    });

  }).timeout(15000)
  
  describe('GET /type', () => {
    it('responds with 200', (done) =>{
      
      agent.get('/type').expect(200);
      done()
    })
  })
  
  describe('GET /pokemons/:id', () => {
    it('responds with 200', (done) =>{
      agent.get('/pokemons/2').expect(200);
      done()
    })
  })

   describe('GET /pokemons/:id', () => {
    it('responds with 404', (done) =>{
      agent.get('/pokemonss/2').expect(404);
      done()
    })
  });

  describe('GET /pokemons/:id', () => {
    it('responds with 404', (done) =>{
      agent.get('/pokemons/asd45').expect(404);
      done()
    })

  describe('POST /pokemons', () => {
    it('responds with 200', (done) =>{
      agent.post('/pokemons').expect(200);
      done()
    })
  })
 
  })


});




