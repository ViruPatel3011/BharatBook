import React, { useContext } from "react";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Flag from "./components/FlagSection/Flag";
import Subscription from "./components/SubscriptionSection/Videos";
import MarketPlace from "./components/MarketPlaceSection/MarketPlace";
import UserPage from "./components/UserSection/UserPage";
import Friends from "./components/Friends/Friends";
import Messenger from "./components/Messenger/Messenger";
import Savedpage from "./components/Saved/Savedpage";
import Feed from "./components/Feed/Feed";
import Memories from "./components/Memories/Memories";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Profile from "./Pages/Profile/Profile";
import Page from "./Utils/route";
import Layout from "./components/Layout/Layout";
import Registration from "./Pages/Registration/Registration";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Notification from "./components/Notification/Notification";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuggestedFriends from "./components/Friends/SuggestedFriends";
import YourFriends from "./components/Friends/YourFriends";
import FriendsRequest from "./components/Friends/FriendsRequest";
import { EmailContext } from "./Context/EmailContext";
import { LOCAL_STORAGE } from "./Utils/enums";

interface ProtectedRouteProps {
  render: () => JSX.Element;
}

const App: React.FC = () => {
  const { email } = useContext(EmailContext);

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    render: Render,
  }) => {
    const isAuthenticated =
      localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN) !== null;
    return isAuthenticated ? <Render /> : <Navigate to={Page.LOGIN_PAGE} />;
  };

  const ProtectedRouteSet: React.FC<ProtectedRouteProps> = ({
    render: Render,
  }) => {
    return email ? <Render /> : <Navigate to={Page.LOGIN_PAGE} />;
  };
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path={Page.LOGIN_PAGE} element={<Login toast={toast} />} />
          <Route path={Page.REGISTRATION_PAGE} element={<Registration />} />
          <Route path={Page.FORGOTPASS_PAGE} element={<ForgotPassword />} />
          <Route
            path={Page.RESETPASS_PAGE}
            element={<ProtectedRouteSet render={() => <ResetPassword />} />}
          />
          <Route
            path={Page.LAYOUT_PAGE}
            element={<ProtectedRoute render={() => <Layout />} />}
          >
            <Route path={Page.HOME_PAGE} element={<Home />}>
              <Route index element={<Feed />} />
              <Route path={Page.FLAG_PAGE} element={<Flag />} />
              <Route path={Page.SUBSCRIPTION_PAGE} element={<Subscription />} />
              <Route path={Page.MARKETPLACE_PAGE} element={<MarketPlace />} />
              <Route path={Page.GROUPS_PAGE} element={<UserPage />} />
              <Route path={Page.FRIENDS_PAGE} element={<Friends />}>
                <Route
                  index
                  path={Page.FRIENDS_PAGE}
                  element={<FriendsRequest />}
                />
                <Route
                  path={Page.SUGGESTED_PAGES}
                  element={<SuggestedFriends />}
                />
                <Route path={Page.YOUR_FRIENDS} element={<YourFriends />} />
              </Route>

              <Route path={Page.MESSENGER_PAGE} element={<Messenger />} />
              <Route path={Page.MEMORIES_PAGE} element={<Memories />} />
              <Route path={Page.SAVED_PAGE} element={<Savedpage />} />
              <Route path={Page.NOTIFICATION_PAGE} element={<Notification />} />
            </Route>
            <Route path={Page.PROFILE_PAGE} element={<Profile />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </React.Fragment>
  );
};

export default App;
