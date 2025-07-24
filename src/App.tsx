import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import './App.css';
import ShowDetails from "./pages/ShowDetails/ShowDetails";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shows/:id" element={<ShowDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
