var React = require('react');

module.exports = React.createClass({
  componentWillReceiveProps: function(){
    this.setState({});
  },

  render: function(){
    return(
      <div className='detail-description'>
        <span className="card-title grey-text text-darken-4">
          {this.props.title}
        </span>
        <p>
          {this.props.description}
        </p>
      </div>
    );
  }
});
