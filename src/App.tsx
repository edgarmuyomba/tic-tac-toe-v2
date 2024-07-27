import styles from './App.module.scss';
import Board from './components/board/board';
import Header from './components/header/header';

function App() {

  return (
    <div className={styles.container}>
      <Header />
      <Board />
    </div>
  )
}

export default App
