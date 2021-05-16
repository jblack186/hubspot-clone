import './App.scss';
import { Route } from "react-router-dom";
import Signup from './Pages/Signup';

function App() {
  return (
    <div className="signupContainer">
            <Route
        exact
        path="/signup"
        render={(props) => {
          return (
            
            <Signup
              {...props}
            />
          );
        }}
      />

    </div>
  );
}

export default App;
