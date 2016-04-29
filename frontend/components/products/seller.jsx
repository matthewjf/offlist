var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
      <div className='seller card'>
        <div className='detail-seller valign-wrapper'>
          <span className='seller'>
            <b>Seller:  </b>
          </span>
          <a className='right-align' href='#'>{this.props.seller.username}</a>
        </div>
      </div>
    );
  }
});
