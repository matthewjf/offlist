var React = require('react'),
    hashHistory = require('react-router').hashHistory;

module.exports = React.createClass({
  buy: function() {
    hashHistory.push('/listings');
  },

  sell: function() {
    hashHistory.push('/listings');
  },

  render: function(){
    return(
      <div className='splash-wrapper'>
        <div id='splash'>
          <div className='welcome'>
            <h1 className='title orange-text text-darken-2'>OffList</h1>
            <h5 className='slogan'>Buy  ·  Sell  ·  Easy</h5>
          </div>
          <button onClick={this.buy}
            className='waves-effect waves-light btn btn-large'>
            BUY
          </button>
          <button onClick={this.sell}
            className='waves-effect waves-light btn btn-large'>
            SELL
          </button>
        </div>
      </div>
    );
  }
});
