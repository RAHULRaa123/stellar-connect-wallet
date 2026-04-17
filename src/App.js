import './App.css';
import { useState, createContext } from 'react';
import Header from './components/Header';
import SendFeedback from './components/SendFeedback';
import FetchFeedback from './components/FetchFeedback';

export const pubKeyData = createContext();

function App() {
  const [pubKey, setPubKey] = useState("");

  return (
    <div className="App">

      <Header setPubKey={setPubKey} />

      <p>
        {pubKey ? "Connected: " + pubKey : "Not Connected"}
      </p>

      <pubKeyData.Provider value={pubKey}>
        <SendFeedback />
        <FetchFeedback />
      </pubKeyData.Provider>

    </div>
  );
}

export default App;