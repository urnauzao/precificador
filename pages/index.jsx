import styles from '../styles/Home.module.css';
import {Button} from 'primereact/button';
import Header from '../src/components/header';
import Footer from '../src/components/footer';
import Menu from '../src/components/menu';
import '../styles/pages/calculadora.module.css';


export default function Home() {
  return (
    <div className={styles.container}>
      <Header title={"Create Next App"}/>
      <Menu/>

      <main className={styles.main}>
        <div className="container">
          <h1 className={styles.title}>
            Bem Vindo ao Calculador de Preços
          </h1>

          <p className={styles.description}>
            Um sistema desenvolvido para simular o lucro por vendas em marketplaces!
          </p>

          {/* <div className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h3>Documentation &rarr;</h3>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h3>Learn &rarr;</h3>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className={styles.card}
            >
              <h3>Examples &rarr;</h3>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
            >
              <h3>Deploy &rarr;</h3>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div> */}
        </div>
      </main>

      <Footer/>
    </div>
  )
}
