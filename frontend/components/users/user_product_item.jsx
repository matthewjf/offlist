var React = require('react');
var hashHistory = require('react-router').hashHistory,
    Dotdotdot = require('react-dotdotdot'),
    TimeAgo = require('react-timeago').default,
    Carousel = require('../carousel'),
    ClientActions = require('../../actions/client_actions');

module.exports = React.createClass({
  productLink: function() {
    hashHistory.push('products/' + this.props.product.id);
  },

  deleteProduct: function(e) {
    e.preventDefault();
    ClientActions.deleteProduct(this.props.product.id);
  },

  editProduct: function(e) {
    e.preventDefault();
    hashHistory.push('products/' + this.props.product.id + '/edit');
  },

  render: function() {
    var product = this.props.product;

    return <li className="account-product grey lighten-5 collection-item">
              <div className='product-image'>
                <Carousel images={product.img_urls} />
              </div>
              <div className='product-content'>
                <h5 className='title'>{product.title}</h5>
                <div className='split-row'>
                  <div>
                    <span className='grey-text'> posted </span>
                    <TimeAgo className='grey-text' date={product.created_at} />
                  </div>
                  <div>{'$' + product.price}</div>
                </div>
                <div className='section'>
                  <Dotdotdot clamp={2} >
                    {product.description}
                  </Dotdotdot>
                </div>
              </div>
              <div className='product-manage'>
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
                    delete
                </button>
              </div>
            </li>;
  }
});
