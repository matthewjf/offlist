var React = require('react');
var Carousel = require('nuka-carousel');

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
        <Carousel>
          {images}
        </Carousel>
      </div>
    );
  }
});
