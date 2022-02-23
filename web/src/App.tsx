import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Connection from './components/connection/Connection';
import Dashboard from './components/dashboard/Dashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Connection />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
