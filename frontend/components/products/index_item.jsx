var React = require('react'),
    MarkerStore = require('../../stores/marker_store'),
    Dotdotdot = require('react-dotdotdot'),
    hashHistory = require('react-router').hashHistory;

/* global google */

module.exports = React.createClass({
  getInitialState: function() {
    return {isHovered: false};
  },

  onMouseEnter: function() {
    this.setState({isHovered: true});
    var marker = MarkerStore.all()[this.props.product.id];
    if (marker)
      marker.setIcon('https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png');
  },

  onMouseLeave: function() {
    this.setState({isHovered: false});
    var marker = MarkerStore.all()[this.props.product.id];
    if (marker)
      marker.setIcon('https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png');
  },

  openDetail: function(){
    hashHistory.push("/products/" + this.props.product.id);
  },

  render: function() {
    var hoverTransp = (this.state.isHovered ? 'hover' : '');
    var product = this.props.product;

    var productUrl = (product.img_urls ? product.img_urls[0] : '');

    return(

    <li className='card product-item hoverable'
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.openDetail}>
        <div className='card-price right'>
          {'$' + product.price}
        </div>
      <div className='card-image'>
          <img src={productUrl} />
      </div>

      <div className='card-content'>
        <span className='card-title grey-text text-darken-3'>
          {product.title}
        </span>
      </div>
      <div className='truncated description'>
        <Dotdotdot clamp={1}>{product.description}</Dotdotdot>
      </div>
      <div className={hoverTransp + ' waves-effect waves-light'}></div>

    </li>
  );
  }
});
