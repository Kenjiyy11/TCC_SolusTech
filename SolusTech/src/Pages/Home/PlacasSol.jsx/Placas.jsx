import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import CardProduto from "../components/CardProduto";

const produtos = [
  {
    id: 1,
    nome: "Placa Solar 550W",
    imagem:
      "https://http2.mlstatic.com/D_NQ_NP_795830-MLB53945602467_022023-O.webp",
  },
  {
    id: 2,
    nome: "Kit Painel Solar",
    imagem:
      "https://minhacasasolar.fbitsstatic.net/img/p/kit-8-unidades-de-painel-solar-280w-policristalino-resun-82350/268846-1.jpg?w=400&h=400&v=no-value",
  },
  {
    id: 3,
    nome: "Painel Fotovoltaico",
    imagem:
      "https://www.fontesdeenergia.com.br/imagens/mpi/comprar-placa-solar-01.jpg",
  },
];

function Home() {
  return (
    <>
      <Navbar />
      <Carousel />

      <div className="container mt-5">
        <h2 className="text-center mb-4">Mais Vendidas</h2>

        <div className="row">
          {produtos.map((produto) => (
            <CardProduto key={produto.id} produto={produto} />
          ))}
        </div>

        <h2 className="text-center mt-5 mb-4">Placas Solares</h2>

        <div className="row">
          {produtos.map((produto) => (
            <CardProduto key={produto.id + 10} produto={produto} />
          ))}
        </div>

        <div className="row mt-4">
          {produtos.map((produto) => (
            <CardProduto key={produto.id + 20} produto={produto} />
          ))}
        </div>

        <div className="row mt-4">
          {produtos.map((produto) => (
            <CardProduto key={produto.id + 30} produto={produto} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home