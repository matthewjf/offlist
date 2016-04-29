var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
      <div className='offer card'>
        <div className='detail-offer valign-wrapper'>
          <span className='valign'>
            <b>Ask price:  </b>{'$' + this.props.price}
          </span>
          <button className="waves-effect waves-light btn right">Offer</button>
        </div>
      </div>
    );
  }
});
