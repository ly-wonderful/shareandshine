import Home from './pages/Home';
import About from './pages/About';
import PastEvents from './pages/PastEvents';
import UpcomingEvents from './pages/UpcomingEvents';
import JoinUs from './pages/JoinUs';
import MemberForm from './pages/MemberForm';
import PartnerForm from './pages/PartnerForm';
import AdminLogin from './pages/AdminLogin';
import AdminPastEvents from './pages/AdminPastEvents';
import EventRegistrationForm from './pages/EventRegistrationForm';
import Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "About": About,
    "PastEvents": PastEvents,
    "UpcomingEvents": UpcomingEvents,
    "JoinUs": JoinUs,
    "member-form": MemberForm,
    "partner-form": PartnerForm,
    "admin-login": AdminLogin,
    "admin-past-events": AdminPastEvents,
    "event-register/:eventId": EventRegistrationForm,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: Layout,
};