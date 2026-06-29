import "./Login.module.css";
import "boxicons/css/boxicons.min.css"

function Login() {
  return (
    <main className="container">
      <form>
        <h1>Login</h1>

        <div className="input-box">
          <input type="email" placeholder="Usuário" />
          <i className="bx bxs-user"></i>
        </div>

        <div className="input-box">
          <input type="password" placeholder="Senha" />
          <i className="bx bxs-lock-alt"></i>
        </div>

        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Lembrar senha
          </label>

          <a href="#">Esqueci a senha</a>
        </div>

        <button type="submit" className="login">
          Login
        </button>

        <div className="register">
          <p>
            Não tem conta? <a href="#">Cadastre-se</a>
          </p>
        </div>
      </form>
    </main>
  );
}

export default Login