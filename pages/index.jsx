import styles from '../styles/Home.module.css';
import Header from '../src/components/header';
import Footer from '../src/components/footer';
import Menu from '../src/components/menu';
import '../styles/pages/calculadora.module.css';


export default function Home() {
  return (
    <div className={styles.container}>
      <Header title={"Precificador | Sistema para Cálculo da Previsão de Lucros por Venda em Marketplaces"}/>
      <Menu/>

      <main className={styles.main}>
        <div className="container">
          <h1 className={styles.title}>
            Bem Vindo ao Calculador de Preços
          </h1>

          <p className={styles.description}>
            Um sistema desenvolvido para simular o lucro por vendas em marketplaces!
          </p>
        </div>
      </main>

      <Footer/>
    </div>
  )
}
