import logo from './logo.svg';
import './App.css';
import { ContextProvider } from './context/Context';
import Timeline from './pages/Timeline';
import CommentsPage from './pages/CommentsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Timeline/>} />
          <Route path="/comments" element={<CommentsPage/>}/>
        </Routes> 
      </Router>
    </ContextProvider>
  );
}

export default App;
