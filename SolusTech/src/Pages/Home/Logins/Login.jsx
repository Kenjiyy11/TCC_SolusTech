import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../Components/NavBar/NavBar";
import styles from "./login.module.css";
import bgImg from "../../../assets/headerimg.png";
import "boxicons/css/boxicons.min.css";

function Login() {
  const [saindo, setSaindo] = useState(false);
  const navigate = useNavigate();

  function handleVoltar(e) {
    e.preventDefault();
    setSaindo(true);
    setTimeout(() => navigate("/"), 400);
  }

  return (
    <div>
     

      <main
        className={styles.container}
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <form className={`${styles.form} ${saindo ? styles.saindo : ""}`}>
          <a href="/" onClick={handleVoltar} className={styles.voltar}>
            ← Voltar
          </a>

          <h1>Login</h1>

          <div className={styles.inputBox}>
            <input type="email" placeholder="Usuário" />
            <i className="bx bxs-user"></i>
          </div>

          <div className={styles.inputBox}>
            <input type="password" placeholder="Senha" />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <div className={styles.rememberForgot}>
            <label>
              <input type="checkbox" />
              Lembrar senha
            </label>
            <a href="#">Esqueci a senha</a>
          </div>

          <button type="submit" className={styles.login}>
            Login
          </button>

          <div className={styles.register}>
            <p>
              Não tem conta? <a href="#">Cadastre-se</a>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Login;