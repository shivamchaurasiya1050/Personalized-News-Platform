import API from "./api";

// ================= AGENTS =================
export const getAgents = () => API.get("/admin/agent");
export const createAgent = (data) => API.post("/admin/agent", data);
export const updateAgent = (id, data) => API.put(`/admin/agent/${id}`, data);
export const deleteAgentApi = (id) => API.delete(`/admin/agent/${id}`);

// ================= ADS =================
export const getAds = () => API.get("/admin/ads");
export const createAd = (data) => API.post("/admin/ads", data);
export const updateAd = (id, data) => API.put(`/admin/ads/${id}`, data);
export const deleteAdApi = (id) => API.delete(`/admin/ads/${id}`);

// ================= ANALYTICS =================
export const getAnalytics = () => API.get("/ad/admin/analytics");