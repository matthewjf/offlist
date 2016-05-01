var React = require('react'),
    OfferStore = require('../../stores/offer_store'),
    ClientActions = require('../../actions/client_actions');

/* global Materialize */

var OfferForm = React.createClass({
  closeModal: function(e){
    if (e)
      e.preventDefault();
    $('#offer-modal').closeModal();
    this.resetState();
  },

	getInitialState: function(){
		return {amount: '', product_id: '', comment: ''};
	},

  setAmount: function(e) {
    this.setState({amount: e.target.value});
  },

  setComment: function(e) {
    this.setState({comment: e.target.value});
  },

  resetState: function() {
    this.setState({amount:'', comment: ''});
  },

  componentDidMount: function(){
    this.setState({product_id: this.props.productId});
  },

  componentWillReceiveProps: function(){
    this.setState({product_id: this.props.productId});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    ClientActions.createOffer(this.state, this.submitSuccess);
  },

  submitSuccess: function(){
    Materialize.toast('Offer submitted!', 4000, 'green-text');
    this.closeModal();
  },

  form: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <section>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                type="text"
                value={this.state.amount}
                onChange={this.setAmount}
                id='amount' />
              <label id='amount-label' htmlFor='amount'>Amount</label>
            </div>
          </div>

          <div className='row'>
            <div className='input-field col s12'>
              <textarea
                id='comment'
                type='text'
                className='materialize-textarea'
                value={this.state.comment}
                onChange={this.setComment}
              />
            <label htmlFor='comment'>Comment (optional)</label>
            </div>
          </div>
        </section>
        <div className='btn-row row'>
        <div className='col s12'>
          <button
            className="waves-effect waves-light btn right">
            Make Offer
          </button>
          <button
            className='waves-effect waves-ripple btn-flat right'
            onClick={this.closeModal}>cancel
          </button>
        </div>
        </div>
      </form>
    );
  },

	render: function(){

		return (
			<div id="offer-form">
				<div id="offer-modal" className="modal">
			     <div className="modal-content">
			       <h4>Make Offer</h4>
             {this.form()}
			     </div>
			   </div>
			</div>
		);
	}
});

$(document).ready(function(){
  $('.modal-trigger').leanModal();
});

module.exports = OfferForm;
