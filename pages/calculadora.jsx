import Header from '../src/components/header';
import Footer from '../src/components/footer';
import Menu from '../src/components/menu';
import { Calculadora } from '../src/components/Calculadora';
import { CalculadoraProvider } from '../src/contexts/CalculadoraContext';

export default function CalculadoraPage(){
  return (

      <div>
          <Header title={"Calculadora de previsão de lucros em marketplaces"}/>
          <Menu/>
    
          <main>
            <CalculadoraProvider teste="teste do urnau de providers">
                <Calculadora/>
            </CalculadoraProvider>
          </main>
    
          <Footer/>
      </div>
  );
}