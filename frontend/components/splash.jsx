var React = require('react'),
    hashHistory = require('react-router').hashHistory,
    CurrentUserState = require("../mixins/current_user_state");

module.exports = React.createClass({
  mixins: [CurrentUserState],

  buy: function() {
    hashHistory.push('/listings');
  },

  sell: function() {
    if (!this.state.currentUser) {
      $('#login-modal').openModal();
    }
    setTimeout($('#demo').trigger('click'), 300);
    setTimeout(hashHistory.push('/account'), 10000);
  },

  render: function(){
    return(
      <div className='splash-wrapper'>
        <div id='splash'>
          <div className='welcome'>
            <h1 className='title orange-text text-darken-2'>OffList</h1>
            <h5 className='slogan'>Buy  ·  Sell  ·  Simple</h5>
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
