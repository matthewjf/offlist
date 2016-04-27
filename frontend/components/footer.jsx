var React = require('react');
module.exports = React.createClass({
  render: function() {
    return (
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Splashy</h5>
              <p className="grey-text text-lighten-4">
                Buying and selling locally produced goods, locally
              </p>

            </div>
            <div className="col l3 s12">
              <h5 className="white-text">Connect</h5>
              <ul>
                <li><a className="white-text" href="#!">About</a></li>
                <li><a className="white-text" href="#!">Contact</a></li>
                <li><a className="white-text" href="#!">Blog</a></li>
                <li><a className="white-text" href="#!">Profile</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
});
