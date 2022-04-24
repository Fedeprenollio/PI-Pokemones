/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
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
});

describe('Pokemon routes', () => {
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
});



// it('POST responde con un error si la potencia es inválido', function () {
//   // model.addCategory('Celulares')
//   // model.addProduct('S20', 'Samsung', 'Celulares', 8)
//   return supertest
//     .post('pokemons')
//     .send({
//       name: 'pikachu',
//       hp: 9,
//       attack: 9000,
//       defense:2,
//       speed: 4,
//       height:7,
//       weight: 44,
//       types: "fire"

//     })
//     .expect(400)
//     .expect('Content-Type', /json/)
//     .expect(function (res) {
//       expect(res.body).to.deep.eql({ error: 'Ataque invalido' })
//       expect(model.getReviews('pikachu')).to.have.length(0)
//     })
// })

