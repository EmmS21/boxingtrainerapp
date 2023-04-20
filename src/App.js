import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import { ContextProvider } from './context/Context'
import Timeline from './pages/Timeline'

function App() {
  return (
    <ContextProvider>
      <Timeline/>
    </ContextProvider>
  );
}

export default App;
