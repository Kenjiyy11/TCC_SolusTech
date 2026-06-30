import styles from "./login.module.css";
import "boxicons/css/boxicons.min.css";

function Login() {
  return (
    <main className={styles.container}>
      <form className={styles.form}>
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
  );
}

export default Login;