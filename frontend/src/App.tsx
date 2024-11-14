import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<h1>Welcome to EcoVoz Frontend</h1>} />
          <Route path="/about" element={<h1>About EcoVoz</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
