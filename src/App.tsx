import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import './App.css';
import ShowDetails from "./pages/ShowDetails/ShowDetails";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shows/:id" element={<ShowDetails />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
