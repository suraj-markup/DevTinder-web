import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Body from "./Pages/Body";
import Profile from "./Pages/Profile";
import Feed from "./Pages/Feed";
import Signup from "./Pages/Signup";
import store from "./utils/store";
import { Provider } from "react-redux";
import Connections from "./Pages/Conections";
import Requests from "./Pages/Requests";
function App() {
  return (
    <>
    <Provider store={store}>

      <Router basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
    </>
  );
}

export default App;
