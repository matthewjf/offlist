var React = require('react'),
    ReactDOM = require('react-dom');

var Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    browserHistory = require('react-router').browserHistory;


var Search = require('./components/search'),
    Header = require('./components/header'),
    Footer = require('./components/footer');

var App = React.createClass({
  render: function(){
    return (
        <div id='app'>
          <Header />
          <main>
            {this.props.children}
          </main>
        </div>
    );
  }
});

var Rtr = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Search} />
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('root');
  ReactDOM.render(Rtr, root);
});
