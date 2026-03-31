"use client";
import { useEffect, useState, useRef } from "react";
import { setToken } from "../../services/api";
import Navbar from "../../components/Navbar";
import ArticleCard from "../../components/ArticleCard";
import AdCard from "../../components/AdCard";

import {
  getPersonalizedFeed,
  getCategoryFeed,
  getSavedArticles,
  toggleSaveArticle,
  trackAdView,
  trackAdClick
} from "../../services/user.api";

export default function Feed() {
  const [data, setData] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [tab, setTab] = useState("personalized");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const requestRef = useRef(0);

  useEffect(() => {
    setToken(localStorage.getItem("token"));

    setData([]);
    setPage(1);
    setHasMore(true);

    load(1, true);
  }, [tab]);

  const load = async (pageNo = 1, reset = false) => {
    const currentRequest = ++requestRef.current;

    try {
      setLoading(true);

      let res;
      if (tab === "saved") {
        res = await getSavedArticles();

        if (currentRequest !== requestRef.current) return;

        setData(res.data.data);

        const ids = res.data.data.map((item) => item._id);
        setSavedIds(ids);

        setHasMore(false);
      }

      else if (tab === "personalized") {
        res = await getPersonalizedFeed(pageNo, 10);

        if (currentRequest !== requestRef.current) return;

        const newData = res.data.data;

        setData((prev) => (reset ? newData : [...prev, ...newData]));
        setHasMore(pageNo < res.data.pagination.totalPages);
      }


      else {
        res = await getCategoryFeed(tab, pageNo, 10);

        if (currentRequest !== requestRef.current) return;

        const newData = res.data.data;

        setData((prev) => (reset ? newData : [...prev, ...newData]));
        setHasMore(pageNo < res.data.pagination.totalPages);
      }

      setPage(pageNo);
    } catch (err) {
      console.error("Load Error:", err);
    } finally {
      if (currentRequest === requestRef.current) {
        setLoading(false);
      }
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      load(page + 1);
    }
  };

  // 🔥 SAVE / UNSAVE
  const save = async (id) => {
    try {
      const res = await toggleSaveArticle(id);

      const isNowSaved =
        res.data?.isSaved !== undefined
          ? res.data.isSaved
          : !savedIds.includes(id);

      setSavedIds((prev) =>
        isNowSaved ? [...prev, id] : prev.filter((x) => x !== id)
      );

      if (tab === "saved" && !isNowSaved) {
        setData((prev) => prev.filter((item) => item._id !== id));
      }

    } catch (err) {
      console.error("Save error:", err);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const adId = entry.target.dataset.id;

            trackAdView(adId);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const ads = document.querySelectorAll(".track-ad");
    ads.forEach((ad) => observer.observe(ad));

    return () => observer.disconnect();
  }, [data]);
  const handleAdClick = async (id) => {
    try {
      await trackAdClick(id);
    } catch (err) {
      console.error("Ad click error:", err);
    }
  };

  return (
    <div>
      <Navbar tab={tab} setTab={setTab} />

      {loading && page === 1 && (
        <p style={{ textAlign: "center" }}>Loading feed...</p>
      )}

      {data.map((item, i) =>
        item.type === "ad" ? (
          <AdCard key={i} ad={item.data} onClick={handleAdClick} />
        ) : (
          <ArticleCard
            key={i}
            article={item}
            onSave={save}
            isSaved={savedIds.includes(item._id)}
          />
        )
      )}

      {hasMore && tab !== "saved" && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <button
            onClick={loadMore}
            disabled={loading}
            style={{
              backgroundColor: "#22c55e",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
