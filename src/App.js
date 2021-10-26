import logo from './logo.svg';
import Shipping from "./pages/Shipping"
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

function App() {
  return (
    <Router>
        <Shipping />
    </Router>
  );
}

export default App;
