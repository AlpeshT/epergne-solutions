import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import { ProviderDetail } from './Pages/ProviderDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/provider-detail/:provider" element={<ProviderDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
