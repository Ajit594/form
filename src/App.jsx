import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './Form';
import Details from './Details';

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          minHeight: '100vh',
          minWidth: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f0f2f5',
        }}
      >
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
