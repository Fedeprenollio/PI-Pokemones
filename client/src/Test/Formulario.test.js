

// import React from "react";

// import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// import configureStore from "redux-mock-store";
// import { Provider } from "react-redux";
// import { MemoryRouter } from "react-router-dom";
// import thunk from "redux-thunk";
// import isReact from "is-react";

// import * as data from "../../db.json";
// import Creation from "../componentes/Creation";
// import * as actions from "../redux/actions";

// configure({ adapter: new Adapter() });

// describe("<Creation />", () => {
//   const state = {pokemon: [],
//     allPokemonsForFilter: [],
//     types: [],
//     detail: [],
//     pokemonBD: [] };
//   const mockStore = configureStore([thunk]);
//   const { postPokemones } = actions;

//   beforeAll(() => expect(isReact.classComponent(Creation)).toBeFalsy());

//   // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
//   // También fijate que vas a tener que usar algunos hooks. Tanto de React como de Redux!
//   // Los hooks de React si o si los tenes que usar "React.useState", "React.useEffect". El test no los reconoce
//   // cuando se hace destructuring de estos métodos === test no corren.
//   describe("Estructura", () => {
//     let postPokemones;
//     let store = mockStore(state);
//     beforeEach(() => {
//       postPokemones = mount(
//         <Provider store={store}>
//           <MemoryRouter initialEntries={["/created"]}>
//             <Creation />
//           </MemoryRouter>
//         </Provider>
//       );
//     });

//     it("Debería renderizar un form", () => {
//       expect(postPokemones.find("form")).toHaveLength(1);
//     });

//     it('Debería renderizar un label con el texto "Name: "', () => {
//       expect(postPokemones.find("label").at(0).text()).toEqual("Name: ");
//     });

//     it('Debería renderizar un input con la propiedad "name" igual a "name"', () => {
//       expect(postPokemones.find('input[name="name"]')).toHaveLength(1);
//     });

//     it('Debería renderizar un label con el texto "Region: "', () => {
//       expect(postPokemones.find("label").at(1).text()).toEqual("Region: ");
//     });

//     it('Debería renderizar un input con la propiedad "name" igual a "region"', () => {
//       expect(postPokemones.find('input[name="region"]')).toHaveLength(1);
//     });

//     it('Debería renderizar un label con el texto "Words: "', () => {
//       expect(postPokemones.find("label").at(2).text()).toEqual("Words: ");
//     });

//     it('Debería renderizar un input con la propiedad "name" igual a "words"', () => {
//       expect(postPokemones.find('input[name="words"]')).toHaveLength(1);
//     });

//     it('Debería renderizar un button con "type" igual a "submit" y con texto "Create"', () => {
//       expect(postPokemones.find('button[type="submit"]')).toHaveLength(1);
//       expect(postPokemones.find("button").at(0).text()).toEqual("Create");
//     });
//   });


// });
