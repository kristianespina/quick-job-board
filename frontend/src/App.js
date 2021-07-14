import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./pages/Home"
import JobListing from "./pages/JobListing"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/joblisting">
          <JobListing />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
