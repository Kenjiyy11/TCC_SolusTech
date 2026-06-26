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



      <section className={styles.sobre}>
        <div className={styles.sobreContainer}> 
         <span>Sobre a SolusTech</span>
          <h2>Energia limpa, inteligente e ao seu alcance.</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas rem, consectetur dolorem blanditiis id voluptates nam, nesciunt nihil modi reiciendis cum libero, quisquam autem sit. Commodi iste itaque excepturi reprehenderit?</p>

{/*imagem lateral*/ }

        </div>
      </section>


<section className={styles.beneficios}>
{/* beneficios que a solustech tem*/ }
</section>

<section className={styles.funcionamento}>
{/* funcionamento da solusetch*/ }
</section>

<section className={styles.serviços}>
{/* serviçoes oferecidos*/ }
</section>

<section className={styles.orcamento}>
{/* orçamento*/ }
</section>

<section className={styles.footer}>
{/* footer*/ }
</section>

    </>
  );
}

export default Solustech;