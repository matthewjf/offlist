var React = require('react'),
    MarkerStore = require('../../stores/marker_store'),
    TextTruncate = require('react-text-truncate');

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

  render: function() {
    var hoverTransp = (this.state.isHovered ? 'hover z-depth-3' : '');
    var product = this.props.product;

    var productUrl = (product.img_urls ? product.img_urls[0] : '');

    return(

    <li className='card product-item'
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
      <div className='card-image'>
          <img src={productUrl} />
      </div>
      <div className='card-content'>
        <span className='card-title grey-text text-darken-3'>
          {product.title}
        </span>
      </div>
      <div className='truncated description'>
        <TextTruncate
          line={1}
          truncateText="…"
          text={product.description}
          showTitle={true}
          raf={true}
          />
      </div>
      <div className={hoverTransp}></div>

    </li>
  );
  }
});
