import React from "react";
import Head from "next/head";

//It's advised to follow this pre-defined layout
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

// All static files like icons and json should be placed in the public folder

const Layout = (props) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        <link rel="manifest" href="/manifest.json" />

        <title>Gully Cricket</title>
        <link rel="icon" href="/image/ball.png" />
      </Head>
      <main>
        <div>
          <Header />
          {props.children}          
        </div>
      </main>
    </>
  );
};

export default Layout;
