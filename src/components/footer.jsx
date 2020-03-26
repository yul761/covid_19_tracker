import React, { Component } from "react";

export default class footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer__description">
          For more information, please preceed to the following link :{" "}
        </div>
        <ul className="footer__helpfulLinks">
          <ol className="footer__helpfulLinks--content">
            WHO :
            <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019">
              https://www.who.int/emergencies/diseases/novel-coronavirus-2019
            </a>
          </ol>

          <ol className="footer__helpfulLinks--content">
            CBC News:
            <a href="https://www.cbc.ca/news/coronavirus-guide-explainer-1.5497009">
              https://www.cbc.ca/news/coronavirus-guide-explainer-1.5497009
            </a>
          </ol>
        </ul>
      </div>
    );
  }
}
