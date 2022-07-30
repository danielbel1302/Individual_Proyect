import MainPage from "./Components/MainPage.jsx";
import "./App.css";
import "normalize.css";
import { Route, Switch } from "react-router-dom";
import LoadingPage from "./Components/LoadingPage.jsx";
import Country from "./Components/Country.jsx";
import CreateActivity from "./Components/CreateActivity.jsx";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/home/create">
          <CreateActivity />
        </Route>
        <Route
          exact
          path="/home/:id"
          render={({ match }) => <Country match={match}></Country>}
        />
        <Route path="/home">
          <LoadingPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
