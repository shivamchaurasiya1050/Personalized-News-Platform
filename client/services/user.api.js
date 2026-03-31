import API from "./api";

// ================= FEED =================
export const getPersonalizedFeed = (page, limit) =>
  API.get("/feed/personalized", {
    params: { page, limit },
  });

export const getCategoryFeed = (tab, page, limit) =>
  API.get(`/feed/category/${tab}`, {
    params: { page, limit },
  });

export const updateCategoryFeed = (data) =>
  API.put(`/user/preferences`, data);

// ================= SAVED =================
export const getSavedArticles = () => API.get("/user/saved");

export const toggleSaveArticle = (articleId) =>
  API.post("/user/save", { articleId });

// ================= ADS =================
export const trackAdView = (id) => API.post(`/ad/view/${id}`);

export const trackAdClick = (id) => API.post(`/ad/click/${id}`);
// ================= USER =================
export const registerUser = (data) => API.post(`/auth/register`,data);
export const loginUser = (data) => API.post(`/auth/login`,data);
export const loggedInUser = () => API.get(`/auth/me`);