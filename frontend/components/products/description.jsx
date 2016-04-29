var React = require('react');
var TimeAgo = require('react-timeago').default;

module.exports = React.createClass({
  componentWillReceiveProps: function(){
    debugger;
    this.setState({});
  },

  render: function(){
    return(
      <div className='detail-description'>
        <div className='right'>
          <TimeAgo className='grey-text' date={this.props.created} />
        </div>
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
