import React from 'react';
import Home from './features/home/Home';
import Header from './features/header/Header';
import Footer from './features/footer/Footer';
import 'react-loading-skeleton/dist/skeleton.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
