import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import jwt_decode from "jwt-decode";
import AuthRoute from "./utils/AuthRoute";

//MUI stuff
import {
  createMuiTheme,
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

const theme = createMuiTheme(themeFile);

let authenticated;
let token = localStorage.FBIdToken;
debugger;
if (token) {
  var decoded = jwt_decode(token);
  if (decoded.exp * 1000 < Date.now()) {
    authenticated = false;
  } else {
    authenticated = true;
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
                <AuthRoute
                  path="/signup"
                  authenticated={authenticated}
                  exact
                  component={Signup}
                />
                <AuthRoute
                  path="/signin"
                  authenticated={authenticated}
                  exact
                  component={Signin}
                />
                <Route path="/" exact component={Home} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
