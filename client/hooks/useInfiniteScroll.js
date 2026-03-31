import { useEffect } from "react";

export default function useInfiniteScroll(loadMore) {
  useEffect(() => {
    const handle = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);
}