var React = require('react');
var TimeAgo = require('react-timeago').default;

module.exports = React.createClass({
  componentWillReceiveProps: function(){
    this.setState({});
  },

  render: function(){
    var time;
    if (this.props.created)
      time = <TimeAgo className='grey-text' date={this.props.created} />;
    else
      time = <span/>;

    return(
      <div className='detail-description'>
        <div className='right'>
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
