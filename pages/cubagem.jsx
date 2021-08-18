import Header from '../src/components/header';
import Footer from '../src/components/footer';
import Menu from '../src/components/menu';
import styles from '../styles/Home.module.css';
import '../styles/pages/calculadora.module.css';
// import { Calculadora } from '../src/components/Calculadora';
// import { CalculadoraProvider } from '../src/contexts/CalculadoraContext';

export default function CubagemPage() {
  return (

    <div>
      <Header title={"Calculadora de Cubagem para envios"} />
      <Menu />

      <main>
        <div className="container">
          <h1 className={styles.title}>
            Bem Vindo ao Calculador de Cubagem, a melhor forma para calcular o custo de envio de seu produto!
          </h1>

          <p className={styles.description}>
            Cálculadora de Cubagem em desenvolvimento!
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}