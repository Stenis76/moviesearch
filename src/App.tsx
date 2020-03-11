import React, { CSSProperties } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Firebase, {
  auth,
  createUserProfileDocument
} from "./firebase/firebase.utils";

// components
import SignIn from "./components/sign_in/sign_in";
import SignUp from "./components/sign_up/sign_up";
import Header from "./containers/header/header";
import Sidebar from "./components/sidebar/sidebar";
import MainContent from "./components/main_content/main_content";
import Navbar from "./components/navbar/navbar";
import ErrorBoundary from "./errorBoundary";

const styles: CSSProperties = {
  display: "flex",
  height: "calc(100vh - 80px)"
};

type User = {
  id: string;
  displayName: string;
  email: string;
  createdAt: Date;
};

interface IState {
  currentUser: User | null;
  query: string;
}

class App extends React.Component<{}, IState> {
  private unsubscribeFromAuth: Firebase.Unsubscribe | null = null;

  state = {
    currentUser: null,
    query: ""
  };

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        if (userRef) {
          userRef.onSnapshot(snapshot => {
            const { displayName, email, createdAt } = snapshot.data() as User;
            this.setState({
              currentUser: {
                id: snapshot.id,
                displayName,
                email,
                createdAt
              }
            });
          });
        }
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  setSearchQuery = (query: string) => {
    this.setState({ query: query + "-" + new Date() });
  };

  componentWillUnmount() {
    if (this.unsubscribeFromAuth) {
      this.unsubscribeFromAuth();
    }
  }

  render() {
    const { currentUser, query } = this.state;
    return (
      <ErrorBoundary>
        <>
          <ErrorBoundary>
            <Header setSearchQuery={this.setSearchQuery} />
          </ErrorBoundary>
          <div style={styles}>
            <ErrorBoundary>
              <Sidebar>
                <Navbar currentUser={currentUser} />
              </Sidebar>
            </ErrorBoundary>
            <Switch>
              <Route
                exact
                path="/signin"
                render={() => (currentUser ? <Redirect to="/" /> : <SignIn />)}
              />
              <Route
                exact
                path="/register"
                render={() => (currentUser ? <Redirect to="/" /> : <SignUp />)}
              />
              <Route exact path="/">
                <Redirect from="/" to="trending" />
              </Route>
              <Route path="/trending">
                <MainContent query={query} />
              </Route>
              <Route path="/popular">
                <MainContent query={query} />
              </Route>
              <ErrorBoundary>
                <Route path="/new">
                  <MainContent query={query} />
                </Route>
              </ErrorBoundary>
            </Switch>
          </div>
        </>
      </ErrorBoundary>
    );
  }
}

export default App;
