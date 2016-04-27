var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <header>
        <nav className="white" role="navigation">
          <div className="nav-wrapper container">
            <a id="logo-container" href="" className="brand-logo">
              <img id='logo' src="/logo.png" />
              splashy
            </a>
            <ul className="right hide-on-med-and-down">
              <li><a href="#">Sign Up</a></li>
              <li><a href="#">Log In</a></li>
            </ul>

            <ul id="nav-mobile" className="side-nav">
              <li><a href="#">Sign Up</a></li>
              <li><a href="#">Log In</a></li>
            </ul>
            <a href="#" data-activates="nav-mobile" className="button-collapse">
              <i className="material-icons">menu</i>
            </a>
          </div>
        </nav>
      </header>
    );
  }

});
