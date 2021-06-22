import "./css/App.scss";
import { Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Tickets from "./Pages/Tickets";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";
import Header from "./components/Header";
import Conversations from "./Pages/Conversations";
import Join from './components/Join';
import Chat from './components/Chat';

function App() {
  return (
    <div>
      <Route
        exact
        path="/signup"
        render={(props) => {
          return <Signup {...props} />;
        }}
      />
            <Route
        exact path="/login"
        render={(props) => {
          return <Login {...props} />;
        }}
      />

            <Route
        exact path="/dashboard"
        render={(props) => {
          return <Dashboard {...props} />;
        }}
      />
                  <Route
        exact path="/tickets"
        render={(props) => {
          return <Tickets {...props} />;
        }}
      />
                  <Route
        exact path="/contacts"
        render={(props) => {
          return <Contact {...props} />;
        }}
      />
                  <Route
        exact path="/conversations"
        render={(props) => {
          return <Conversations {...props} />;
        }}
      />

<Route path="/join" exact component={Join} />
<Route path="/chat" exact component={Chat} />


    </div>
  );
}

export default App;
