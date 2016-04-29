var React = require('react');

module.exports = React.createClass({
  componentWillReceiveProps: function(){
    this.setState({});
  },

  render: function(){
    return(
      <div className='detail-description'>
        <h5>Description</h5>
        <p>
          {this.props.description}
        </p>
      </div>
    );
  }
});
