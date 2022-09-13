import './App.css';
import Header from './components/template/Header'
import Footer from './components/template/Footer'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import your route components too

import Start from './components/pages/Start'
import History from './components/pages/History'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Start />}>
          </Route>
          <Route path="history" element={<History />}>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
