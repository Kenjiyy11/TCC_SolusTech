import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../../Components/NavBar/NavBar.jsx';


const produtos = [
  {
    img: 'https://http2.mlstatic.com/D_NQ_NP_795830-MLB53945602467_022023-O.webp',
    titulo: 'Painel Solar 400W Monocristalino',
    preco: 'R$ 899,00',
  },
  {
    img: 'https://minhacasasolar.fbitsstatic.net/img/p/kit-8-unidades-de-painel-solar-280w-policristalino-resun-82350/268846-1.jpg?w=400&h=400&v=no-value',
    titulo: 'Kit 8 Painéis 280W Policristalino',
    preco: 'R$ 4.990,00',
  },
  {
    img: 'https://www.fontesdeenergia.com.br/imagens/mpi/comprar-placa-solar-01.jpg',
    titulo: 'Placa Solar Residencial 350W',
    preco: 'R$ 1.199,00',
  },
];

const secoes = [
  { titulo: 'Mais Vendidas', produtos },
  { titulo: 'Placas Solares', produtos },
  { titulo: 'Kits Completos', produtos },
  { titulo: 'Promoções', produtos },
];

function CardProduto({ img, titulo, preco }) {
  return (
    <div className="col d-flex justify-content-center mb-4">
      <div className="card shadow-sm" style={{ width: '22rem', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f8f8', padding: '16px' }}>
          <img
            src={img}
            alt={titulo}
            style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain', transition: 'transform 0.3s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: '15px', fontWeight: 600, color: '#1f1f1f' }}>{titulo}</h5>
          <p style={{ color: 'rgba(215, 162, 70, 1)', fontWeight: 700, fontSize: '18px', margin: '6px 0 12px' }}>{preco}</p>
          <a href="#" className="btn w-100" style={{ backgroundColor: 'rgba(215, 162, 70, 1)', color: '#000', fontWeight: 600, borderRadius: '8px', border: 'none' }}>
            Saiba Mais
          </a>
        </div>
      </div>
    </div>
  );
}

function Loja() {
  return (
    <div style={{ fontFamily: "'Rubik', sans-serif", backgroundColor: '#fff' }}>

      {/* Navbar */}
      <NavBar />

      {/* Banner */}
      <div style={{
        height: '400px',
        background: 'linear-gradient(135deg, #141414 0%, #2a2a2a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        textAlign: 'center',
        padding: '0 20px',
      }}>
        <span style={{ color: 'rgba(215,162,70,1)', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase' }}>Energia Solar</span>
        <h1 style={{ color: '#fff', fontSize: '42px', fontWeight: 700, maxWidth: '600px', lineHeight: 1.2 }}>
          Painéis solares para um futuro sustentável
        </h1>
        <p style={{ color: '#aaa', fontSize: '16px' }}>As melhores soluções em energia solar para sua casa e empresa.</p>
        <a href="#produtos" style={{
          marginTop: '8px',
          backgroundColor: 'rgba(215,162,70,1)',
          color: '#000',
          padding: '12px 32px',
          borderRadius: '10px',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '16px',
        }}>Ver Produtos</a>
      </div>

      {/* Seções de Produtos */}
      <div id="produtos" style={{ padding: '60px 40px' }}>
        {secoes.map((secao, i) => (
          <div key={i} style={{ marginBottom: '60px' }}>
            <h2 style={{
              textAlign: 'center',
              color: '#1f1f1f',
              fontSize: '28px',
              fontWeight: 700,
              marginBottom: '8px',
            }}>{secao.titulo}</h2>
            <div style={{ width: '50px', height: '3px', backgroundColor: 'rgba(215,162,70,1)', margin: '0 auto 36px' }} />
            <div className="row row-cols-1 row-cols-md-3 justify-content-center gx-3">
              {secao.produtos.map((p, j) => (
                <CardProduto key={j} {...p} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#111', color: '#aaa', textAlign: 'center', padding: '24px', fontSize: '13px' }}>
        © 2025 SolusTech. Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default Loja;
