import "./App.scss";
import { Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";

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

    </div>
  );
}

export default App;
