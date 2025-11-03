import Home from './pages/Home';
import About from './pages/About';
import PastEvents from './pages/PastEvents';
import UpcomingEvents from './pages/UpcomingEvents';
import JoinUs from './pages/JoinUs';
import Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "About": About,
    "PastEvents": PastEvents,
    "UpcomingEvents": UpcomingEvents,
    "JoinUs": JoinUs,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: Layout,
};