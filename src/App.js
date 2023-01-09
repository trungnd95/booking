import { Route, Routes } from 'react-router-dom';
import { Home, Hotel, List, Login } from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
