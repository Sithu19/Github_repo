import React, { useEffect, useState } from "react";
import StarIcon from "../assets/icons/star-svgrepo-com.svg";
import { CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

export const Repo = () => {
  const [repoData, setRepoData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const pageMax = 34;

  useEffect(() => {
    setLoading(true);
    let last10day = new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000);
    let endpoint = `https://api.github.com/search/repositories?q=created:%3e${last10day.getFullYear()}-${
      last10day.getMonth() + 1
    }-${last10day.getDate()}&amp;sort=stars&amp;order=desc&per_page=30&page=1`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((result) => {
        if (result.items && result.items.length > 0) {
          setRepoData(result.items);
          setHasMore(pageCount + 1 === pageMax ? false : true);
          setLoading(false);
        } else {
          if (result.message.includes("API rate limit exceeded")) {
            setHasMore(false);
            alert("Sorry, Data limit reached! Please try again later.");
          }
        }
      });
  }, []);

  const handlePageAdd = () => {
    const nextPage = pageCount + 1;
    let last10day = new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000);
    let endpoint = `https://api.github.com/search/repositories?q=created:%3e${last10day.getFullYear()}-${
      last10day.getMonth() + 1
    }-${last10day.getDate()}&amp;sort=stars&amp;order=desc&per_page=30&page=${nextPage}`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.items && result.items.length > 0) {
          setRepoData([...repoData, ...result.items]);
          setPageCount(nextPage);
          setHasMore(nextPage === pageMax ? false : true);
        } else {
          if (result.message.includes("API rate limit exceeded")) {
            setHasMore(false);
            alert("Sorry, Data limit reached! Please try again later.");
          }
        }
      });
    console.log("calling");
  };

  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }
  return (
    <div>
      <div className="Repo_title">Trending Repos</div>
      {loading ? (
        <div className="repo_loader_box">
          <CircularProgress />
        </div>
      ) : (
        <div className="Repo_scroll_box" id="scrollableDiv">
          <InfiniteScroll
            dataLength={repoData ? repoData.length : 0}
            scrollableTarget="scrollableDiv"
            loader={
              <div className="loader" key="loader">
                <CircularProgress />
              </div>
            }
            next={() => handlePageAdd()}
            hasMore={hasMore}
          >
            {repoData.length > 0 &&
              repoData.map((i, index) => (
                <div className="Repo_main_box" key={index}>
                  <div className="Repo_main_box_title">
                    {i.name ? i.name : "-"}
                  </div>
                  <div className="Repo_main_box_detail">
                    {i.description ? i.description : "-"}
                  </div>
                  <div className="Repo_main_box_child_item_box">
                    <div className="Repo_main_box_child_item">
                      <img
                        className="Repo_main_box_child_item_icon"
                        src={
                          i.owner && i.owner.avatar_url
                            ? i.owner.avatar_url
                            : ""
                        }
                      />
                      {i.owner && i.owner.login ? i.owner.login : "-"}
                    </div>
                    <div className="Repo_main_box_child_item">
                      <img
                        src={StarIcon}
                        className="Repo_main_box_child_item_icon"
                      />
                      {i.stargazers_count ? kFormatter(i.stargazers_count) : 0}
                    </div>
                  </div>
                </div>
              ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};
