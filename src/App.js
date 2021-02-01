import './App.css';
import Navbar from "./component/Navbar";
import Browse from "./component/Browse";
import Search from "./component/Search";
import MangaChapter from "./component/MangaChapter"
import Manga from "./component/Manga"
import Home from "./component/Home"
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth/signin" exact component={SignIn} />
          <Route path="/auth/signup" exact component={SignUp} />
          <Route path="/browse" exact component={Browse} />
          <Route path="/search" exact component={Search} />
          <Route path='/:lang/:manga_tile' exact component={MangaChapter} />
          <Route path='/:lang/:manga_tile/:chapter' exact component={Manga} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
