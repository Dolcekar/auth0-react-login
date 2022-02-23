import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import { createCart } from "./components/Cart/cartHandler";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

// async function putMetadata(user_id, token, data) {
//   try {
//     await fetch("https://dev-djgc80yi.us.auth0.com/api/v2/users/" + user_id, {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ user_metadata: data })
//     });
//   } catch (e) {
//     console.log(e);
//   }
// }

const App = () => {
  const { error, isLoading } = useAuth0();

  useEffect(() => {
    createCart();
  }, []);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id='app' className='d-flex flex-column h-100'>
        <NavBar />
        <Switch>
          s
          <Route path='/' exact component={Home} />
          {/* <Route path="/cart" exact component={Cart} /> */}
          <Route path='/profile' component={Profile} />
          <Route path='/external-api' component={ExternalApi} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
