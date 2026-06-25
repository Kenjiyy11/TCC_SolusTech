

const NavBar = ()  => {

    return (
       
    <div>
   
   <nav className="navbar navbar-expand-lg navbar-light bg-light p-2 rounded shadow-sm w-100">
    <a className="navbar-brand" href="/pizzaria/funcionario/home">
        Solustech
    </a>

    {/* Botão Hamburguer para telas menores */}
    <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
    >
        <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto">
            <li className="nav-item active">
                <a className="nav-link" href="/pizzaria/funcionario/produto">
                    Placas solares
                </a>
            </li>

            <li className="nav-item">
                <a className="nav-link" href="/pizzaria/funcionario/categoria">
                    Serviços
                </a>
            </li>

        
        </ul>

        {/* Botão de Logout alinhado à direita */}
        <button type="button" className="btn btn-primary">
            Logout
        </button>
    </div>
</nav>

        </div>
            
            
            )
            
            
}  

export default NavBar;