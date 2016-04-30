var React = require('react');

var UserActions = require("../../actions/user_actions"),
    CurrentUserState = require("../../mixins/current_user_state"),
    UserStore = require('../../stores/user_store'),
    ProductStore = require('../../stores/product_store');

module.exports = React.createClass({
  mixins: [CurrentUserState],
  getInitialState: function(){
    return {products: []};
  },

  getProducts: function(){
    this.setState({products: ProductStore.all()});
  },

  componentDidMount: function(){
    this.productListener = ProductStore.addListener(this.getProducts);
  },

  componentWillUnmount: function() {
    this.productListener.remove();
  },

  buildProducts: function(){
    return this.state.products.map;
  },

  render: function() {
    var testtext = this.state.products ? this.state.products.length : 0;
    return <ul id='staggered'>
      <h1>{testtext}</h1>
      <li className="section">
        <h5>Section 1</h5>
        <p>Stuff</p>
      </li>
      <div className="divider"></div>
      <li className="section">
        <h5>Section 2</h5>
        <p>Stuff</p>
      </li>
      <div className="divider"></div>
      <li className="section">
        <h5>Section 3</h5>
        <p>Stuff</p>
      </li>
    </ul>;
  }
});
