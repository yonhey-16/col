
import Detalle from './componentes /Detalle';
import Favoritos from './componentes /Favoritos';
import Home from './componentes /Home';
import Informativa from './componentes /Informativa';
import Mapa from './componentes /Mapa';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Detalle />
      <Favoritos />
      <Home />
      <Informativa />
      <Mapa />
    </>
  )
}

export default App
