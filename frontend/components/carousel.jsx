var React = require('react');
var Carousel = require('nuka-carousel');

var Decorators = [{
  component: React.createClass({
    handleClick: function handleClick(e) {
      e.preventDefault();
      this.props.previousSlide();
    },
    getButtonStyles: function getButtonStyles(disabled) {
      return {
        border: 0,
        background: 'rgba(0,0,0,0.4)',
        color: 'white',
        padding: 10,
        outline: 0,
        opacity: disabled ? 0.3 : 1,
        cursor: 'pointer'
      };
    },
    render: function(){
      return <button
          onClick={this.handleClick} style={this.getButtonStyles(this.props.currentSlide === 0)}>
        <i className="white-text material-icons">chevron_left</i>
      </button>;
    }
  }),
  position: 'CenterLeft'
},
{
  component: React.createClass({
    handleClick: function handleClick(e) {
      e.preventDefault();
      this.props.nextSlide();
    },
    getButtonStyles: function getButtonStyles(disabled) {
      return {
        border: 0,
        background: 'rgba(0,0,0,0.4)',
        color: 'white',
        padding: 10,
        outline: 0,
        opacity: disabled ? 0.3 : 1,
        cursor: 'pointer'
      };
    },
    render: function(){
      return <button
          onClick={this.props.nextSlide} style={this.getButtonStyles(this.props.currentSlide + this.props.slidesToScroll >= this.props.slideCount)}>
          <i className="white-text material-icons">chevron_right</i>
        </button>;
    }
  }),
  position: 'CenterRight'
}];


module.exports = React.createClass({
  mixins: [Carousel.ControllerMixin],

  componentWillReceiveProps: function(){
    this.setState({});
  },

  render: function() {
    var images;
    if (this.props.images) {
       images = this.props.images.map(function(url){
        return <img key={url} src={url}/>;
      });
    } else {
      images = '';
    }

    return (
      <div className='carousel-wrapper'>
        <Carousel decorators={Decorators}>
          {images}
        </Carousel>
      </div>
    );
  }
});
