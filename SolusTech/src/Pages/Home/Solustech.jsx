import styles from './Solustech.module.css';
import NavBar from '../../Components/NavBar/NavBar';
import heroBg from '../../assets/headerimg.png';
import painelImg from '../../assets/Solar.png';

function Solustech() {
  return (
    <>
      <NavBar />

      <section className={styles.hero} style={{ backgroundImage: `url(${heroBg})` }}>
        <div className={styles.heroContent}>
          <h2>
            Reduza até 95% da sua conta de luz.
            Fazendo o plano anual da SolusTech conte com um sistema inteligente exclusivo para uma casa mais eficiente e moderna.
          </h2>

          <p className={styles.subtitulo}>
            Instale painéis solares com a SolusTech — orçamento rápido e exclusivo.
          </p>

          {/* Botão no hero — adicione o onClick */}
<button className={styles.botao} onClick={() => document.getElementById('orcamento').scrollIntoView({ behavior: 'smooth' })}>
  Faça seu orçamento agora
</button>
        </div>
      </section>

      <section className={styles.sobre}>
        <div className={styles.sobreContainer}>
          <span>Sobre a SolusTech</span>
          <h2>Energia limpa, inteligente e ao seu alcance.</h2>
          <p>A SolusTech nasceu para transformar a forma como você consome energia solar, com tecnologia de ponta, instalação profissional e acompanhamento contínuo.</p>
        </div>

        {/* Imagem lateral */}
        <img src={painelImg} alt="Imagem sobre a SolusTech" className={styles.sobreImg} />
      </section>

     <section className={styles.beneficios}>
  <span className={styles.beneficiosLabel}>BENEFÍCIOS</span>
  <h2 className={styles.beneficiosTitulo}>Vantagens que você sente no dia a dia</h2>

  <div className={styles.cardsContainer}>

    <div className={styles.card}>
      <img src={painelImg} alt="Economia" className={styles.cardIcon} />
      <h3>Economia real</h3>
      <p>Reduza sua conta de luz em até 95% com energia solar.</p>
    </div>

    <div className={styles.card}>
      <img src={painelImg} alt="Energia limpa" className={styles.cardIcon} />
      <h3>Energia limpa</h3>
      <p>Contribua para um futuro sustentável com energia renovável.</p>
    </div>

    <div className={styles.card}>
      <img src={painelImg} alt="Valorização" className={styles.cardIcon} />
      <h3>Valorização do imóvel</h3>
      <p>Imóveis com sistema solar são mais valorizados no mercado.</p>
    </div>

    <div className={styles.card}>
      <img src={painelImg} alt="Monitoramento" className={styles.cardIcon} />
      <h3>Monitoramento inteligente</h3>
      <p>Acompanhe sua geração e consumo em tempo real pelo app.</p>
    </div>
  </div>
</section>

      <section className={styles.funcionamento}>
  <span className={styles.funcionamentoLabel}>COMO FUNCIONA</span>
  <h2 className={styles.funcionamentoTitulo}>Simples, rápido e sem complicação</h2>

  <div className={styles.cardsContainer}>

    <div className={styles.card}>
      <div className={styles.stepNumber}>1</div>
      <div className={`${styles.cardIcon} ${styles.iconOrcamento}`} />
      <h3>Solicite seu orçamento</h3>
      <p>Preencha o formulário e receba uma proposta personalizada.</p>
    </div>

    <div className={styles.card}>
      <div className={styles.stepNumber}>2</div>
      <div className={`${styles.cardIcon} ${styles.iconCrescimento}`} />
      <h3>Análise personalizada</h3>
      <p>Fazemos um estudo do seu consumo e do seu imóvel.</p>
    </div>

    <div className={styles.card}>
      <div className={styles.stepNumber}>3</div>
      <div className={`${styles.cardIcon} ${styles.iconInstalacao}`} />
      <h3>Instalação profissional</h3>
      <p>Nossa equipe instala seu sistema com segurança e qualidade.</p>
    </div>

    <div className={styles.card}>
      <div className={styles.stepNumber}>4</div>
      <div className={`${styles.cardIcon} ${styles.iconSuporte}`} />
      <h3>Acompanhamento contínuo</h3>
      <p>Monitoramos seu sistema e garantimos a melhor performance.</p>
    </div>

  </div>
</section>
     <section className={styles.servicos}>
  <span className={styles.servicosLabel}>NOSSOS SERVIÇOS</span>
  <h2 className={styles.servicosTitulo}>Soluções para diferentes necessidades</h2>

  <div className={styles.servicosContainer}>

    <div className={styles.servicoCard}>
      <div className={styles.servicoOverlay}>
        <h3>Residencial</h3>
        <p>Soluções completas para sua casa e sua família.</p>
        <button className={styles.servicoBtn}>Saiba mais →</button>
      </div>
    </div>

    <div className={styles.servicoCard}>
      <div className={styles.servicoOverlay}>
        <h3>Comercial</h3>
        <p>Energia solar para empresas que querem economizar mais.</p>
        <button className={styles.servicoBtn}>Saiba mais →</button>
      </div>
    </div>

    <div className={styles.servicoCard}>
      <div className={styles.servicoOverlay}>
        <h3>Plano Anual</h3>
        <p>Plano exclusivo com monitoramento e suporte completo.</p>
        <button className={styles.servicoBtn}>Saiba mais →</button>
      </div>
    </div>

  </div>
</section>

<section id="orcamento" className={styles.orcamento}>
  <div className={styles.orcamentoTexto}>
    <span className={styles.orcamentoLabel}>FAÇA SEU ORÇAMENTO</span>
    <h2>Pronto para economizar com energia solar?</h2>
    <p>Preencha o formulário ao lado e receba um orçamento rápido e exclusivo para o seu imóvel.</p>
  </div>

  <div className={styles.orcamentoForm}>
    <input className={styles.input} type="text" placeholder="Nome completo" />
    <input className={styles.input} type="email" placeholder="E-mail" />
    <input className={styles.input} type="tel" placeholder="Telefone" />
    <input className={styles.input} type="text" placeholder="Cidade" />
    <button className={styles.botaoOrcamento}>Quero meu orçamento</button>
  </div>
</section>

     <section className={styles.footer}>
  <div className={styles.footerTop}>

    <div className={styles.footerLogo}>
      <h3>SolusTech</h3>
      <p>Energia limpa e inteligente para um futuro melhor.</p>
      <div className={styles.footerRedes}>
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
        <a href="#">WhatsApp</a>
        <a href="#">LinkedIn</a>
      </div>
    </div>

    <div className={styles.footerColuna}>
      <h4>Navegação</h4>
      <a href="#">Início</a>
      <a href="#">Orçamento</a>
      <a href="#">Minha Casa</a>
      <a href="#">Login</a>
    </div>

    <div className={styles.footerColuna}>
      <h4>Serviços</h4>
      <a href="#">Residencial</a>
      <a href="#">Comercial</a>
      <a href="#">Plano Anual</a>
    </div>

    <div className={styles.footerColuna}>
      <h4>Empresa</h4>
      <a href="#">Sobre nós</a>
      <a href="#">Blog</a>
      <a href="#">Contato</a>
    </div>

    <div className={styles.footerColuna}>
      <h4>Contato</h4>
      <p>(11) 99999-9999</p>
      <p>contato@solustech.com.br</p>
      <p>São Paulo - SP</p>
    </div>

  </div>

  <div className={styles.footerBottom}>
    <p>© 2025 SolusTech. Todos os direitos reservados.</p>
  </div>
</section>
    </>
  );
}

export default Solustech;