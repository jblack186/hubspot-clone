import "./css/App.scss";
import { Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Tickets from "./Pages/Tickets";
import Login from "./Pages/Login";
import Test from "./Test";

function App() {
  return (
    <div className="signupContainer">
      <Route
        exact
        path="/signup"
        render={(props) => {
          return <Signup {...props} />;
        }}
      />
            <Route
        exact
        path="/login"
        render={(props) => {
          return <Login {...props} />;
        }}
      />

            <Route
        exact
        path="/dashboard"
        render={(props) => {
          return <Dashboard {...props} />;
        }}
      />
                  <Route
        exact
        path="/tickets"
        render={(props) => {
          return <Tickets {...props} />;
        }}
      />

<Route
        exact
        path="/test"
        render={(props) => {
          return <Test {...props} />;
        }}
      />




    </div>
  );
}

export default App;
