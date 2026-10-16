import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../Components/NavBar/NavBar";
import styles from "./Login.module.css";
import bgImg from "../../../assets/headerimg.png";
import "boxicons/css/boxicons.min.css";
import { apiLogin } from "../../../api";

function Login() {
  const [saindo, setSaindo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  function handleVoltar(e) {
    e.preventDefault();
    setSaindo(true);
    setTimeout(() => navigate("/"), 400);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiLogin(email, senha);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <main
        className={styles.container}
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <form className={`${styles.form} ${saindo ? styles.saindo : ""}`} onSubmit={handleSubmit}>
          <a href="/" onClick={handleVoltar} className={styles.voltar}>
             ← Voltar
          </a>

          <h1>Login</h1>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <div className={styles.inputBox}>
            <input
              type="email"
              placeholder="Usu\u00e1rio"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="bx bxs-user"></i>
          </div>

          <div className={styles.inputBox}>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <div className={styles.rememberForgot}>
            <label>
              <input type="checkbox" />
              Lembrar senha
            </label>
            <a href="#">Esqueci a senha</a>
          </div>

          <button type="submit" className={styles.login} disabled={loading}>
            {loading ? "Entrando..." : "Login"}
          </button>

          <div className={styles.register}>
            <p>
              N\u00e3o tem conta? <a href="/Cadastro">Cadastre-se</a>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Login;