import MainPage from "./Components/MainPage.jsx";
import "./App.css";
import "normalize.css";
import { Route } from "react-router-dom";
import LoadingPage from "./Components/LoadingPage.jsx";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route exact path="/homePage">
        <LoadingPage />
      </Route>
    </div>
  );
}

export default App;
