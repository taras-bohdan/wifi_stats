import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import StatisticsContainer from './Statistics/Stats.container';
import UsersListContainer from './UsersTable/UserList.container';
import NavBar from './NavBar/NavBar.container';
import ConfigPanelContainer from './ConfigPanel/ConfigPanel.container';

class App extends Component {
  // Remove server-side injected CSS
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <ConfigPanelContainer />
        <Switch>
          <Route exact path="/" component={StatisticsContainer} />
          <Route exact path="/statistics" component={StatisticsContainer} />
          <Route exact path="/usersList" component={UsersListContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
