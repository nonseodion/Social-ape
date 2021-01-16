import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import jwt_decode from "jwt-decode";
import AuthRoute from "./utils/AuthRoute";
import axios from "axios";

//MUI stuff
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import themeFile from "./utils/theme";

//Redux
import store from "./redux/store";
import { Provider } from "react-redux";

//pages
import Home from "./pages/home";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import User from "./pages/user";

//Redux stuffs
import { SET_UNAUTHENTICATED } from "./redux/types";
import { getUserData } from "./redux/actions/userActions";

const theme = createMuiTheme(themeFile);

let token = localStorage.FBIdToken;
if (token) {
  var decoded = jwt_decode(token);
  if (decoded.exp * 1000 < Date.now()) {
    store.dispatch({
      type: SET_UNAUTHENTICATED,
    });
  } else {
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <AuthRoute path="/signup" exact component={Signup} />
                <AuthRoute path="/signin" exact component={Signin} />
                <Route path="/" exact component={Home} />
                <Route path="/users/:handle" exact component={User} />
                <Route
                  path="/users/:handle/screams/:screamId"
                  exact
                  component={User}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
