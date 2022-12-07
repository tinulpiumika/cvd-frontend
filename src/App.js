//import logo from './logo.svg';
import "./App.css";
import AddDetails from "./components/addDetails";
import { Helmet } from "react-helmet";

//import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    // <Router>
    <div>
      <Helmet>
        <title>CVD Predictor</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {/* <Route path="/add" component={AddDetails}exact/> */}
      <AddDetails />
    </div>
    // </Router>
  );
}

export default App;
