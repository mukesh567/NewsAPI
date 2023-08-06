import React, { Component } from "react";

export class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, Newsurl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card" >
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: '1' }}>
            {source}
          </span>
          <img src={!imageUrl ? "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202108/shilpa-shetty_0_1200x768.jpeg?2k28bmzMUSobyObTsyciSTIc_yLg.dPN&size=770" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title"> {title}....</h5>
            <p className="card-text">{description}....</p>
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={Newsurl} target="_blank" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
