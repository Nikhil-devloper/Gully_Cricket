import React from "react";
import Layout from "./Layout";


const Wrapper = (Component,isHide) => {
  const HOCcheck = (props) => {  
    
    console.log('isHide -->',isHide)
    console.log('props -->',props)

    if(isHide) {
      return <Component {...props} />
    }
    return (      
        <Layout>
          <Component {...props} />
        </Layout>      
    );
  };

  return HOCcheck;
};

export default Wrapper;
