import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class header extends Component {
  render() {
    return (
      <div className="header">
        <ul className="header__tabs">
          <Link to="/world" className="header__tabs--worldStats">
            <li className="header__tabs--worldStats--label">World</li>
          </Link>
          <Link to="/country" className="header__tabs--country">
            <li className="header__tabs--country--label">Country</li>
          </Link>
        </ul>
      </div>
    );
  }
}
