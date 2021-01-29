import './App.css';
import Navbar from "./component/Navbar";
import Browse from "./component/Browse";
import Search from "./component/Search";
import MangaChapter from "./component/MangaChapter"
import Manga from "./component/Manga"
import Home from "./component/Home"

import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/browse" exact component={Browse} />
          <Route path="/search" exact component={Search} />
          <Route path='/:manga_tile' exact component={MangaChapter} />
          <Route path='/:manga_tile/:chapter' exact component={Manga} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
