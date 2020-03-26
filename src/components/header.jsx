import React, { Component } from "react";
import { Link } from "react-router-dom";
import Earth from "../assets/Earth.png";
import Specific from "../assets/specific.png";
import $ from "jquery";

export default class header extends Component {
  componentDidMount() {
    $(".header__tabs--worldStats--tabs--icon").addClass("rotate");
  }

  render() {
    return (
      <div className="header">
        <div className="header__label">
          <div className="header__label--text">COVID - 19</div>
        </div>
        <ul className="header__tabs">
          <Link
            to="/world"
            className="header__tabs--worldStats"
            onClick={() => {
              console.log("World tag is clicked");
              $(".header__tabs--country--tabs--icon").removeClass("rotate");
              $(".header__tabs--worldStats--tabs--icon").removeClass("rotate");
              $(".header__tabs--worldStats--tabs--icon").addClass("rotate");
            }}
          >
            <li className="header__tabs--worldStats--tabs">
              <img
                className="header__tabs--worldStats--tabs--icon"
                alt="world icon"
                src={Earth}
              ></img>
            </li>
          </Link>
          <Link
            to="/country"
            className="header__tabs--country"
            onClick={() => {
              console.log("Country/Region is clicked");
              $(".header__tabs--worldStats--tabs--icon").removeClass("rotate");
              $(".header__tabs--country--tabs--icon").removeClass("rotate");

              $(".header__tabs--country--tabs--icon").addClass("rotate");
            }}
          >
            <li className="header__tabs--country--tabs">
              <img
                className="header__tabs--country--tabs--icon"
                alt="specific icon"
                src={Specific}
              ></img>
            </li>
          </Link>
        </ul>
      </div>
    );
  }
}
