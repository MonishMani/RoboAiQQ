import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RoboticsKitPage from './pages/RoboticsKitPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/robotics-kit" element={<RoboticsKitPage />} />
      </Routes>
    </div>
  );
}

export default App;
