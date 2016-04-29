var React = require('react'),
    hashHistory = require('react-router').hashHistory;

module.exports = React.createClass({
  sellerClick: function(){
    hashHistory.push("/users/" + this.props.seller.id);
  },

  render: function(){
    return(
      <div className='seller card'>
        <div className='detail-seller valign-wrapper'>
          <span className='seller'>
            <b>Seller:  </b>
          </span>
          <a className='seller-link right-align' onClick={this.sellerClick}>
            {this.props.seller.username}
          </a>
        </div>
      </div>
    );
  }
});
