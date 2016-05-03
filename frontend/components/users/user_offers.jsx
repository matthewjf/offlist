var React = require('react');

var UserActions = require("../../actions/user_actions"),
    OfferStore = require('../../stores/offer_store'),
    ReceivedOfferItem = require('./received_offer_item'),
    MadeOfferItem = require('./made_offer_item');

// var _statuses = ['Pending', 'Declined', 'Accepted'];

module.exports = React.createClass({
  getInitialState: function(){
    return {madeOffers: [], receivedOffers: []};
  },

  getAllOffers: function(){
    this.setState({
      madeOffers: this.setMadeOffers(OfferStore.madeOffers()),
      receivedOffers: this.setReceivedOffers(OfferStore.receivedOffers())
    });
  },

  setMadeOffers: function(offers) {
    return this.statusOffers(offers);
  },

  setReceivedOffers: function(offers) {
    return this.statusOffers(offers);
  },

  statusOffers: function(offers) {
    if (offers) {
      var pending = offers.filter(function(offer) {
        return (offer.status === 'Pending');
      });
      var declined = offers.filter(function(offer) {
        return (offer.status === 'Declined');
      });
      var accepted = offers.filter(function(offer) {
        return (offer.status === 'Accepted');
      });
      return (
        {
          pending: pending,
          declined: declined,
          accepted: accepted
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

  receivedOffersList: function(offers) {
    return offers.map(function(offer){
      return  <ReceivedOfferItem key={offer.id} offer={offer} />;
    });
  },

  madeOffersList: function(offers) {
    return offers.map(function(offer){
      return  <MadeOfferItem key={offer.id} offer={offer} />;
    });
  },

  emptyOffersList: function(offerType) {
    return <li className="account-product grey lighten-5 collection-item row">
        <div className='offer-content col s6 m3 l2 grey-text text-darken-1'>
          <em>no {offerType} offers</em>
        </div>
      </li>;
  },

  receivedPendingOffersList: function() {
    var receivedOffers = this.state.receivedOffers;
    if (receivedOffers && receivedOffers.pending && receivedOffers.pending.length > 0)
      return this.receivedOffersList(receivedOffers.pending);
    else
      return this.emptyOffersList('pending');
  },

  receivedAcceptedOffersList: function() {
    var receivedOffers = this.state.receivedOffers;
    if (receivedOffers && receivedOffers.accepted && receivedOffers.accepted.length > 0)
      return this.receivedOffersList(receivedOffers.accepted);
    else
      return this.emptyOffersList('accepted');
  },

  receivedDeclinedOffersList: function() {
    var receivedOffers = this.state.receivedOffers;
    if (receivedOffers && receivedOffers.declined && receivedOffers.declined.length > 0)
      return this.receivedOffersList(receivedOffers.declined);
    else
      return this.emptyOffersList('declined');
  },

  madePendingOffersList: function() {
    var madeOffers = this.state.madeOffers;
    if (madeOffers && madeOffers.pending && madeOffers.pending.length > 0)
      return this.madeOffersList(madeOffers.pending);
    else
      return this.emptyOffersList('pending');
  },

  madeAcceptedOffersList: function() {
    var madeOffers = this.state.madeOffers;
    if (madeOffers && madeOffers.accepted && madeOffers.accepted.length > 0)
      return this.madeOffersList(madeOffers.accepted);
    else
      return this.emptyOffersList('accepted');
  },

  madeDeclinedOffersList: function() {
    var madeOffers = this.state.madeOffers;
    if (madeOffers && madeOffers.declined && madeOffers.declined.length > 0)
      return this.madeOffersList(madeOffers.declined);
    else
      return this.emptyOffersList('declined');
  },

  receivedOffersSection: function(offers) {
    return (
      <ul className="collapsible" data-collapsible="expandable">
        <li>
          <div className="collapsible-header waves-effect active">
            <b>Pending</b>
          </div>
          <div className="collapsible-body">
            <ul className='collection'>
              {this.receivedPendingOffersList()}
            </ul>
          </div>
        </li>
        <li>
          <div className="collapsible-header waves-effect">
            <b>Accepted</b>
          </div>
          <div className="collapsible-body">
            <ul className='collection'>
              {this.receivedAcceptedOffersList()}
            </ul>
          </div>
        </li>
        <li>
          <div className="collapsible-header waves-effect">
            <b>Declined</b>
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
          <div className="collapsible-header waves-effect">
            <b>Pending</b>
          </div>
          <div className="collapsible-body">
            <ul className='collection'>
              {this.madePendingOffersList()}
            </ul>
          </div>
        </li>
        <li>
          <div className="collapsible-header waves-effect">
            <b>Accepted</b>
          </div>
          <div className="collapsible-body">
            <ul className='collection'>
              {this.madeAcceptedOffersList()}
            </ul>
          </div>
        </li>
        <li>
          <div className="collapsible-header waves-effect">
            <b>Declined</b>
          </div>
          <div className="collapsible-body">
            <ul className='collection'>
              {this.madeDeclinedOffersList()}
            </ul>
          </div>
        </li>
      </ul>
    );
  },

  renderTest: function() {
    if (this.state.receivedOffers)
    var offers = this.state.receivedOffers.filter(function(offer) {
      return (offer.status === 'Pending');
    });
    return offers.length;
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
