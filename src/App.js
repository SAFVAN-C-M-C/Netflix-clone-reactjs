import { Routes,Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './Pages/Home';

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </>
  );
}

export default App;
