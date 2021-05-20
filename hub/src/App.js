import "./App.scss";
import { Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Tickets from "./Pages/Tickets";

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


    </div>
  );
}

export default App;
