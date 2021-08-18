import Header from '../src/components/header';
import Footer from '../src/components/footer';
import Menu from '../src/components/menu';
import styles from '../styles/Home.module.css';
import '../styles/pages/calculadora.module.css';
// import { Calculadora } from '../src/components/Calculadora';
// import { CalculadoraProvider } from '../src/contexts/CalculadoraContext';

export default function FreteCubagemPage() {
  return (

    <div>
      <Header title={"Calculadora de Frete Ponderado."} />
      <Menu />

      <main>
        <p></p>
        <div className="container">
          <h1 className={styles.title}>
            Bem Vindo ao Calculador de Frete Ponderado, faça as médias dos seus custos de envio!
          </h1>

          <p className={styles.description}>
            Frete Ponderado em Desenvolvimento!
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}