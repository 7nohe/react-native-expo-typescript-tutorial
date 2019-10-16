import React, { useState } from 'react';
import AppContainer from './src/AppContainer'
import { AppContext } from './src/AppContext'

export default function App() {
  const [favorites, setFavorites] = useState([]);
  return (
    <AppContext.Provider value={{ favorites, setFavorites }}>
      <AppContainer/>
    </AppContext.Provider>
  );
}
