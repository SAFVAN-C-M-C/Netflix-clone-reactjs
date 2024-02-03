import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './Pages/Home';
import { AuthContextProvider } from './context/AuthContext';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Account from './Pages/Account';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <AuthContextProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={
            <ProtectedRoute auth={true}>
              <Login />
            </ProtectedRoute>
          } />
          <Route path='/signup' element={
            <ProtectedRoute auth={true}>
              <Signup />
            </ProtectedRoute>} />
          <Route path='/account' element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>} />
          <Route path='*' element={<h1>404 Page not found</h1>} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
