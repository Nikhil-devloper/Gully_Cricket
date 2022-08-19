import React, { useState } from "react";
import "../styles/global.css";
import AppContext from '../Components/AppContext';

function MyApp({ Component, pageProps }) {

  const [overCount, setOverChange] = useState(3);
  const [resetCount, setResetCount] = useState(0);

  const resetGame = () => {
    setResetCount(prevCount => prevCount+1);
  }

  return (
    <AppContext.Provider
      value={{
        overCount: overCount,
        setOverChange: setOverChange,
        resetCount: resetCount,
        resetGame: resetGame
      }}
    >
      <div>
        <div></div>
        <div>
          <Component {...pageProps} />
        </div>
        <div></div>
      </div>

    </AppContext.Provider>
  )
}

export default (MyApp);
