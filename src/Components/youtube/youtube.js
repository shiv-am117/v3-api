import React, { Component } from "react";
import "./youtube.css";
import { key } from "../../mykey";
class Youtube extends Component {
  state = {
    song: "",
    allsongs: []
  };
  editsearch = e => {
    this.setState({
      ...this.state,
      song: e.target.value
    });
  };
  search = () => {
    this.setState({
      ...this.state,
      song: ""
    });
    let uri =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
      this.state.song +
      "&key=" +
      key + //your key from google api (youtube v3)
      "maxResults=10&order=viewCount&type=video";
    let res = encodeURI(uri);
    return fetch(res)
      .then(res => res.json())
      .then(song => {
        this.setState({
          ...this.state,
          allsongs: song
        });
      });
  };
  render() {
    return (
      <div className="container">
        <input
          className="in"
          placeholder="type name of song"
          value={this.state.song}
          onChange={e => this.editsearch(e)}
        />
        <button className="but" onClick={() => this.search()}>
          Search
        </button>
        <div className="main">
          <ul className="ul">
            {this.state.allsongs.length !== 0 ? (
              this.state.allsongs.items.map(item => (
                <li key={item.id.videoId} className="contents">
                  <a
                    href={"https://www.youtube.com/watch?v=" + item.id.videoId}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={item.snippet.thumbnails.default.url}
                      alt={item.id.videoId}
                    />
                  </a>
                  <a
                    href={"https://www.youtube.com/watch?v=" + item.id.videoId}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3>{JSON.stringify(item.snippet.title)}</h3>
                  </a>
                  <h6>{item.snippet.description}</h6>
                  <h5>{item.snippet.channelTitle}</h5>
                  <iframe
                    width="300px"
                    height="50px"
                    scrolling="no"
                    title={item.id.videoId}
                    src={
                      "https://www.download-mp3-youtube.com/api/?" +
                      "api_key=Mjk1MTUxNDQ5&format=mp3&video_id=" +
                      item.id.videoId
                    }
                  />
                </li>
              ))
            ) : this.state.song ? (
              <h3 className="text">Loading...</h3>
            ) : (
              <h3 className="text">type the name of song above</h3>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Youtube;
