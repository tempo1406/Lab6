import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentManager from './components/StudentManager';
import StudentInformation from './components/StudentInformation';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StudentManager />} />
          <Route path="/student" element={<StudentInformation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
