import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Header from './components/Header';
import Footer from './components/Footer';
import Chat from './components/Chat';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleFret from './pages/SingleFret';
import MyFrets from './pages/MyFrets';
import FretBuilder from './pages/FretBuilder';
import Forum from './pages/Forum';
import Signup from './pages/Signup';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh app-container">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/forum" component={Forum} />
              <Route exact path="/fret-builder" component={FretBuilder} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/my-frets/:username?" component={MyFrets} />
              <Route exact path="/fret/:id" component={SingleFret} />

              <Route component={NoMatch} />
            </Switch>
          </div>
          <Chat></Chat>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
