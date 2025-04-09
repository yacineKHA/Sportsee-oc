import { Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import UserSelection from './components/UserSelection'
import Dashboard from './pages/Dashboard';



function App() {

  return (
    <div className='app-container'>
      <Routes>
        <Route path="/" element={<UserSelection />} />
        <Route path="/user/:userId" element={<Dashboard />} />
        <Route path='*' element={<UserSelection/>}/>
      </Routes>
    </div>
  );
}

export default App
