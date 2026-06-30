import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'

function NavBar() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <h1>SolusTech</h1>
        <ul>
          <li className={styles.inicio}>
            <Link to="/Solustech">Inicio</Link>
          </li>
          <li className={styles.Loja}>
            <Link to="/Loja">Compre sua Placa</Link>
          </li>
          <li>Minha Casa</li>
          <li className={styles.login}>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar