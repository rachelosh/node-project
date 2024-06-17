import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import { Routes, Route } from 'react-router';
import Donations from './Donations';
import AddDonation from './AddDonation';
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="Donations" element={<Donations />} />
        <Route path="AddDonation" element={<AddDonation />} />
      </Routes>
    </>
  );
}

export default App;
