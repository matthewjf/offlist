var React = require('react'),
    ReactDOM = require('react-dom');

var Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    hashHistory = require('react-router').hashHistory;


var ProductList = require('./components/search'),
    Header = require('./components/layout/header'),
    Footer = require('./components/layout/footer'),
    LoginForm = require('./components/login_form'),
    SignupForm = require('./components/signup_form'),
    ProductForm = require('./components/products/product_form'),
    ProductDetail = require('./components/products/product_detail'),
    UserDetail = require('./components/users/user_detail'),
    SellerDetail = require('./components/users/seller_detail'),
    Splash = require('./components/splash');

var App = React.createClass({
  render: function(){
    return (
        <div id='app'>
          <Header />
          <main>
            <LoginForm />
            <SignupForm />
            {this.props.children}
          </main>
        </div>
    );
  }
});

var Rtr = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Splash} />
      <Route path='listings/new' component={ProductForm} />
      <Route path='listings' component={ProductList} />
      <Route path='listings/:listingId' component={ProductDetail} />
      <Route path='listings/:listingId/edit' component={ProductForm} />
      <Route path='users/:userId' component={SellerDetail} />
      <Route path='account' component={UserDetail} />
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('root');
  ReactDOM.render(Rtr, root);
});
