var React = require('react');
var hashHistory = require('react-router').hashHistory,
    Dotdotdot = require('react-dotdotdot'),
    TimeAgo = require('react-timeago').default,
    Carousel = require('../carousel'),
    ClientActions = require('../../actions/client_actions');

/* global Materialize */

module.exports = React.createClass({
  productLink: function() {
    hashHistory.push('listings/' + this.props.product.id);
  },

  deleteProduct: function(e) {
    e.preventDefault();
    ClientActions.deleteProduct(this.props.product.id, this.deleteSuccess);
  },

  deleteSuccess: function() {
    Materialize.toast('Listing removed!', 4000, 'red-text');
  },

  editProduct: function(e) {
    e.preventDefault();
    hashHistory.push('listings/' + this.props.product.id + '/edit');
  },

  titleLink: function() {
    $('#title' + this.props.product.id).addClass('orange-text text-darken-2');
  },

  titleRemove: function() {
    $('#title' + this.props.product.id).removeClass('orange-text text-darken-2');
  },

  render: function() {
    var product = this.props.product;

    return <li className="account-product grey lighten-5 collection-item row">
              <div className='product-image col s12 m4 l3'>
                <Carousel images={product.img_urls} />
              </div>
              <div className='product-content col s12 m5 l7'>
                <div
                    className='title-wrapper'
                    onClick={this.productLink}
                    onMouseEnter={this.titleLink}
                    onMouseLeave={this.titleRemove}>
                  <Dotdotdot clamp={1} >
                    <h5 className='title' id={'title' + product.id}>
                      {product.title}
                    </h5>
                  </Dotdotdot>
                </div>
                <div className='split-row'>
                  <div>
                    <span className='grey-text'> added </span>
                    <TimeAgo className='grey-text' date={product.created_at} />
                  </div>
                  <div><b>Ask price: </b>{'$' + product.price}</div>
                </div>
                <div className='section'>
                  <Dotdotdot clamp={2} >
                    {product.description}
                  </Dotdotdot>
                </div>
              </div>
              <div className='product-manage col m3 s12 l2'>
                <div className='btn-row'>
                <button
                  className="btn light-blue darken-1 waves-effect waves-light"
                  type="submit"
                  name="action"
                  onClick={this.editProduct}>
                    edit
                </button>
                <button
                  className="btn red darken-1 waves-effect waves-light"
                  type="submit"
                  name="action"
                  onClick={this.deleteProduct}>
                    remove
                </button>
                </div>
              </div>
            </li>;
  }
});
