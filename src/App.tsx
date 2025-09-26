import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Pipeline from './pages/Pipeline/Pipeline';
import Diligence from './pages/Diligence/Diligence';
import Portfolio from './pages/Portfolio/Portfolio';
import Network from './pages/Network/Network';
import Inbox from './pages/Inbox/Inbox';
import Settings from './pages/Settings/Settings';
import CommandPalette from './components/CommandPalette/CommandPalette';
import { AppProvider } from './context/AppContext';

function App() {
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  // Global keyboard shortcut handler
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#0D0D0D] text-white">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pipeline" element={<Pipeline />} />
              <Route path="/diligence/:id?" element={<Diligence />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/network" element={<Network />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
          
          <CommandPalette 
            isOpen={showCommandPalette} 
            onClose={() => setShowCommandPalette(false)} 
          />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;