var React = require('react');

var UserActions = require("../../actions/user_actions"),
    OfferStore = require('../../stores/offer_store'),
    ReceivedOfferItem = require('./received_offer_item'),
    MadeOfferItem = require('./made_offer_item');

// var _statuses = ['Pending', 'Declined', 'Approved'];

module.exports = React.createClass({
  getInitialState: function(){
    return {madeOffers: [], receivedOffers: []};
  },

  getAllOffers: function(){
    this.setMadeOffers(OfferStore.madeOffers());
    this.setReceivedOffers(OfferStore.receivedOffers());
  },

  setMadeOffers: function(offers) {
    this.setState({
      madeOffers: this.statusOffers(offers)
    });
  },

  setReceivedOffers: function(offers) {
    this.setState({
      receivedOffers: this.statusOffers(offers)
    });
  },

  statusOffers: function(offers) {
    if (offers) {
      var pending = offers.filter(function(offer) {
        return (offer.status === 'Pending');
      });
      var declined = offers.filter(function(offer) {
        return (offer.status === 'Declined');
      });
      var approved = offers.filter(function(offer) {
        return (offer.status === 'Approved');
      });
      return (
        {
          pending: pending,
          declined: declined,
          approved: approved
        }
      );
    } else {
      return '';
    }
  },

  componentDidMount: function(){
    this.offerListener = OfferStore.addListener(this.getAllOffers);
  },

  componentDidUpdate: function() {
    $(document).ready(function(){
      $('.collapsible').collapsible({
        accordion : false
      });
    });
  },

  componentWillUnmount: function() {
    this.offerListener.remove();
  },

  offersList: function(offers) {
    return offers.map(function(offer){
      return  <ReceivedOfferItem key={offer.id} offer={offer} />;
    });
  },

  receivedPendingOffersList: function() {
    var receivedOffers = this.state.receivedOffers;
    if (receivedOffers && receivedOffers.pending && receivedOffers.pending.length > 0)
      return this.offersList(receivedOffers.pending);
    else
      return <p className='grey lighten-5'>no pending offers</p>;
  },

  receivedAcceptedOffersList: function() {
    var receivedOffers = this.state.receivedOffers;
    if (receivedOffers && receivedOffers.accepted && receivedOffers.accepted.length > 0)
      return this.offersList(receivedOffers.accepted);
    else
      return <p className='grey lighten-5'>no accepted offers</p>;
  },

  receivedDeclinedOffersList: function() {
    var receivedOffers = this.state.receivedOffers;
    if (receivedOffers && receivedOffers.declined && receivedOffers.declined.length > 0)
      return this.offersList(receivedOffers.declined);
    else
      return <p className='grey lighten-5'>no declined offers</p>;
  },

  madePendingOffersList: function() {
    var madeOffers = this.state.madeOffers;
    if (madeOffers && madeOffers.pending && madeOffers.pending.length > 0)
      return this.offersList(madeOffers.pending);
    else
      return <p className='grey lighten-5'>no pending offers</p>;
  },

  madeAcceptedOffersList: function() {
    var madeOffers = this.state.madeOffers;
    if (madeOffers && madeOffers.accepted && madeOffers.accepted.length > 0)
      return this.offersList(madeOffers.accepted);
    else
      return <p className='grey lighten-5'>no accepted offers</p>;
  },

  madeDeclinedOffersList: function() {
    var madeOffers = this.state.madeOffers;
    if (madeOffers && madeOffers.declined && madeOffers.declined.length > 0)
      return this.offersList(madeOffers.declined);
    else
      return <p className='grey lighten-5'>no declined offers</p>;
  },

  receivedOffersSection: function(offers) {
    return (
      <ul className="collapsible" data-collapsible="expandable">
        <li>
          <div className="collapsible-header">
            Pending
          </div>
          <div className="collapsible-body">
            <ul className='collection'>
              {this.receivedPendingOffersList()}
            </ul>
          </div>
        </li>
        <li>
          <div className="collapsible-header">Accepted</div>
          <div className="collapsible-body">
            <ul className='collection'>
              {this.receivedAcceptedOffersList()}
            </ul>
          </div>
        </li>
        <li>
          <div className="collapsible-header">
            Declined
          </div>
          <div className="collapsible-body">
            <ul className='collection'>
              {this.receivedDeclinedOffersList()}
            </ul>
          </div>
        </li>
      </ul>
    );
  },

  madeOffersSection: function(offers) {
    return (
      <ul className="collapsible" data-collapsible="expandable">
        <li>
          <div className="collapsible-header">Pending</div>
          <div className="collapsible-body">
            <ul className='collection'>
              {this.madePendingOffersList()}
            </ul>
          </div>
        </li>
        <li>
          <div className="collapsible-header">Accepted</div>
          <div className="collapsible-body">
            <ul className='collection'>
              {this.madeAcceptedOffersList()}
            </ul>
          </div>
        </li>
        <li>
          <div className="collapsible-header">Declined</div>
          <div className="collapsible-body">
            <ul className='collection'>
              {this.madeDeclinedOffersList()}
            </ul>
          </div>
        </li>
      </ul>
    );
  },


  render: function(){
    return <div className='user-offers'>
      <h5>Offers Received</h5>
      {this.receivedOffersSection()}

      <div className='row'></div>
      <h5>Offers Made</h5>
      {this.madeOffersSection()}
    </div>;
  }
});
