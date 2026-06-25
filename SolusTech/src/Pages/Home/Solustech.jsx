import styles from './Solustech.module.css';
import NavBar from '../../Components/NavBar/NavBar';

function Solustech() {
  return (
    <>
      <NavBar />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2>
            Reduza até 95% da sua conta de luz.
            Fazendo o plano anual da SolusTech conte com um sistema inteligente exclusivo para uma casa mais eficiente e moderna.
          </h2>

          <p className={styles.subtitulo}>
            Instale painéis solares com a SolusTech — orçamento rápido e exclusivo.
          </p>

          <button className={styles.botao}>Faça seu orçamento agora</button>
        </div>
      </section>

      <section className={styles.resto}>
        <h2>Resto do site</h2>
        <p>.........</p>
      </section>
    </>
  );
}

export default Solustech;