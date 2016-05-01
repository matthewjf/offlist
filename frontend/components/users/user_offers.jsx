var React = require('react');

var UserActions = require("../../actions/user_actions"),
    OfferStore = require('../../stores/offer_store'),
    ReceivedOfferItem = require('./received_offer_item'),
    MadeOfferItem = require('./made_offer_item');

module.exports = React.createClass({
  getInitialState: function(){
    return {madeOffers: [], receivedOffers: []};
  },

  getAllOffers: function(){
    this.setState({
      madeOffers: OfferStore.madeOffers(),
      receivedOffers: OfferStore.receivedOffers()
    });
  },

  componentDidMount: function(){
    this.offerListener = OfferStore.addListener(this.getAllOffers);
  },

  componentWillUnmount: function() {
    this.offerListener.remove();
  },

  receivedOffersList: function() {
    var receivedOffers = this.state.receivedOffers;
    if (receivedOffers && receivedOffers.length > 0) {
      return receivedOffers.map(function(offer){
        return  <ReceivedOfferItem key={offer.id} offer={offer} />;
      });
    } else {
      return <div></div>;
    }
  },

  madeOffersList: function() {
    var madeOffers = this.state.madeOffers;
    if (madeOffers && madeOffers.length > 0) {
      return madeOffers.map(function(offer){
        return  <MadeOfferItem key={offer.id} offer={offer} />;
      });
    } else {
      return <div></div>;
    }
  },

  render: function(){
    return <div className='user-offers'>
      <h5>Offers Received</h5>
      <ul className='collection'>
        {this.receivedOffersList()}
      </ul>
      <div className='row'></div>
      <h5>Offers Made</h5>
      <ul className='collection'>
        {this.madeOffersList()}
      </ul>
    </div>;
  }
});
