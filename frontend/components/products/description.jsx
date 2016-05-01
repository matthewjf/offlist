var React = require('react');
var TimeAgo = require('react-timeago').default;

module.exports = React.createClass({
  componentWillReceiveProps: function(){
    this.setState({});
  },

  render: function(){
    var time = (
      this.props.created ?
        <TimeAgo className='grey-text' date={this.props.created} /> : <span />
    );
    return(
      <div className='detail-description'>
        <div className='right'>
          <span className='grey-text'> added </span>
          {time}
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
