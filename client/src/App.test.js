import { render, screen } from '@testing-library/react';
import App from './App';


beforeEach(()=>{
  render(<App />);
})

test('Renderizar saludo', () => {
 
  // screen.debug()
  const title = screen.getByText( "Bienvenidos a la pokeApi");
  expect(title).toBeInTheDocument();
});


test('Renderizar texto del boton', () => {
 
  //screen.debug()
  const title = screen.getByText( /ingresar/i);
  expect(title).toBeInTheDocument();
});

test("Debe haber un boton ingresar", () => {
  
  //screen.debug()
  const btn = screen.getByRole( "button", {name: /ingresar/i} );
  expect(btn).toBeInTheDocument();
});

