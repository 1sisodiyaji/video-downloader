import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const [videoURL, setVideoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [type, setType] = useState(null);
  const [data, setData] = useState("");
  const [pinterest, setPinterest] = useState(" ");

  const handleSearch = async () => {
    setErrors("");
    setLoading(true);
    if (!videoURL) {
      setLoading(false);
      setErrors("Please fill the Video Link");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8081/video-downloader",
        { url: videoURL }
      );
      setLoading(false);
      console.log(response); 
      setPinterest(response.data.data); 
      setData(response.data.data.data);
      setType(response.data.type);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching video:", error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="container mt-5">
          <h1 className="text-center text-warning">Video Downloader</h1>
          <div className="row">
            <p className="text-danger text-start">{errors}</p>
            <input
              type="url"
              className="w-100 rounded-4 p-3 my-3"
              style={{ fontSize: "1.2rem" }}
              placeholder="Enter video URL"
              value={videoURL}
              required
              onChange={(e) => setVideoURL(e.target.value)}
            />
            <button
              className="btn btn-block bg-dark text-warning text-capitalize p-3"
              style={{ fontSize: "1.4rem" }}
              disabled={!videoURL}
              onClick={handleSearch}
            >
              {loading ? "Searching..." : "Search 🔍"}
            </button>

            {type && (
              <div className="text-center">
                {type === "Youtube" && (
                  <div className="row my-2">
                    <h3 className="mt-4 text-light text-decoration-underline">
                      <i className="fi fi-brands-youtube text-danger"></i>{" "}
                      {type} 
                    </h3>
                    <div className="col-lg-2 col-0"></div>

                    <div className="col-lg-8 col-12">
                      <div
                        className="card p-1"
                        style={{ background: "#06153d" }}
                      >
                        <img
                          src={data.thumbnail}
                          alt="thubnail"
                          title={data.title}
                          className="img-fluid"
                          style={{ height: "400px" }}
                        />
                        <p className="text-light">{data.title}</p>
                        <div className="row my-3">
                          <div className="col-1"></div>
                          <div className="col-10">
                            <Link to={data.video_hd} target="blank">
                              <div
                                className="btn w-100 border border-warning rounded-8 p-3 text-light"
                                style={{ fontSize: "1.2rem" }}
                              >
                                Video {data.quality}
                                <i className="fi fi-sr-cloud-download-alt mx-1"></i>{" "}
                                {data.video_size}
                              </div>
                            </Link>
                            <Link to={data.audio} target="blank">
                              <div
                                className="btn w-100 border border-warning rounded-8 p-3 my-2 text-light"
                                style={{ fontSize: "1.2rem" }}
                              >
                                Audio
                                <i className="fi fi-sr-cloud-download-alt mx-1"></i>{" "}
                                {data.audio_size}
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-2 col-0"></div>
                  </div>
                )}

                {type === "Instagram" && (
                  <div className="row my-2">
                    <h3 className="mt-4 text-success text-decoration-underline">
                      <i className="fi fi-brands-instagram text-warning"></i>{" "}
                      {type}
                    </h3>
                    <div className="col-lg-2 col-0"></div>

                    <div className="col-lg-8 col-12">
                      <div
                        className="card p-1"
                        style={{ background: "#06153d" }}
                      >
                        <img
                          src={data[0].thumbnail}
                          alt="thubnail"
                          title={data[0].title}
                          className="img-fluid"
                          style={{ height: "500px" }}
                        />
                        <div className="row my-3">
                          <div className="col-1"></div>
                          <div className="col-10">
                            <Link to={data[0].url}>
                              <div
                                className="btn w-100 border border-warning rounded-8 p-3 text-light text-capitalize"
                                style={{ fontSize: "1.2rem" }}
                              >
                                Download{" "}
                                <i className="fi fi-sr-cloud-download-alt mx-1"></i>
                              </div>{" "}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-2 col-0"></div>
                  </div>
                )}

                {type === "Google_Drive" && (
                  <div className="row my-2">
                    <h3 className="mt-4 text-success text-decoration-underline">
                      <i className="fi fi-sr-folder-open"></i> {type}
                    </h3>
                    <div className="col-lg-2 col-0"></div>

                    <div className="col-lg-8 col-12">
                      <div
                        className="card p-1"
                        style={{ background: "#06153d" }}
                      >
                        <img
                          src="https://static.toiimg.com/thumb/msid-105546012,width-400,resizemode-4/105546012.jpg"
                          alt="thubnail"
                          title={data[0].title}
                          className="img-fluid"
                          style={{ height: "400px" }}
                        />
                        <div className="row my-3">
                          <div className="col-1"></div>
                          <div className="col-10">
                            <Link to={data}>
                              <div
                                className="btn w-100 border border-warning rounded-8 p-3 text-light text-capitalize"
                                style={{ fontSize: "1.2rem" }}
                              >
                                Download{" "}
                                <i className="fi fi-sr-cloud-download-alt mx-1"></i>
                              </div>{" "}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-2 col-0"></div>
                  </div>
                )}

                {type === "Facebook" && (
                  <div className="row my-2">
                    <h3 className="mt-4 text-success text-decoration-underline">
                      <i className="fi fi-brands-facebook text-primary"></i>{" "}
                      {type}
                    </h3>

                    <div className="col-lg-6 col-12">
                      <div
                        className="card p-1"
                        style={{ background: "#06153d" }}
                      >
                        <img
                          src={data[0].thumbnail}
                          alt="thubnail"
                          title={data[0].title}
                          className="img-fluid"
                          style={{ height: "400px" }}
                        />
                        <div className="row my-3">
                          <div className="col-1"></div>
                          <div className="col-10">
                            <Link to={data[0].url}>
                              <div
                                className="btn w-100 border border-warning rounded-8 p-3 text-light text-capitalize"
                                style={{ fontSize: "1.2rem" }}
                              >
                                Download{" "}
                                <i className="fi fi-sr-cloud-download-alt mx-1"></i>
                                <p>{data[0].resolution}</p>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-12">
                      <div
                        className="card p-1"
                        style={{ background: "#06153d" }}
                      >
                        <img
                          src={data[1].thumbnail}
                          alt="thubnail"
                          title={data[1].title}
                          className="img-fluid"
                          style={{ height: "400px" }}
                        />
                        <div className="row my-3">
                          <div className="col-1"></div>
                          <div className="col-10">
                            <Link to={data[1].url}>
                              <div
                                className="btn w-100 border border-warning rounded-8 p-3 text-light text-capitalize"
                                style={{ fontSize: "1.2rem" }}
                              >
                                Download{" "}
                                <i className="fi fi-sr-cloud-download-alt mx-1"></i>
                                <p>{data[1].resolution}</p>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {type === "Pinterest" && (
                  <div className="row my-2">
                    {pinterest}
                    <h3 className="mt-4 text-success text-decoration-underline">
                      <i className="fi fi-brands-facebook text-primary"></i>{" "}
                      {type}
                    </h3>

                    <div className="col-lg-6 col-12">
                      <div
                        className="card p-1"
                        style={{ background: "#06153d" }}
                      >
                        <img
                          src={pinterest.thumbnail}
                          alt="thubnail"
                          title={pinterest.title}
                          className="img-fluid"
                          style={{ height: "400px" }}
                        />
                        <div className="row my-3">
                          <div className="col-1"></div>
                          <div className="col-10">
                            <Link to={pinterest.url}>
                              <div
                                className="btn w-100 border border-warning rounded-8 p-3 text-light text-capitalize"
                                style={{ fontSize: "1.2rem" }}
                              >
                                Download{" "}
                                <i className="fi fi-sr-cloud-download-alt mx-1"></i>
                                <p>{data.image}</p>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-12">
                      <div
                        className="card p-1"
                        style={{ background: "#06153d" }}
                      >
                        <img
                          src={data[1].thumbnail}
                          alt="thubnail"
                          title={data[1].title}
                          className="img-fluid"
                          style={{ height: "400px" }}
                        />
                        <div className="row my-3">
                          <div className="col-1"></div>
                          <div className="col-10">
                            <Link to={data[1].url}>
                              <div
                                className="btn w-100 border border-warning rounded-8 p-3 text-light text-capitalize"
                                style={{ fontSize: "1.2rem" }}
                              >
                                Download{" "}
                                <i className="fi fi-sr-cloud-download-alt mx-1"></i>
                                <p>{data[1].resolution}</p>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}


                
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
