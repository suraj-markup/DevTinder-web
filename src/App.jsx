import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Body from "./Pages/Body";
import Profile from "./Pages/Profile";
import Feed from "./Pages/Feed";
import store from "./utils/store";
import { Provider } from "react-redux";
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
          </Route>
        </Routes>
      </Router>
    </Provider>
    </>
  );
}

export default App;
