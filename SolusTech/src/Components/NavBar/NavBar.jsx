import styles from './NavBar.module.css';

function NavBar() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <h1>SolusTech</h1>
        <ul>
          <li className={styles.inicio}>Inicio</li>
          <li >Compre sua Placa</li>
          <li>Minha Casa</li>
          <li className={styles.login}>Login</li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;