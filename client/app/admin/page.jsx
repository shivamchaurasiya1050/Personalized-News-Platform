"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AdminSidebar from "../../components/AdminSidebar";

import {
  getAgents,
  createAgent,
  updateAgent,
  deleteAgentApi,
  getAds,
  createAd,
  updateAd,
  deleteAdApi,
  getAnalytics
} from "../../services/admin.api";

export default function Admin() {
  const [section, setSection] = useState("agents");
  const [analytics, setAnalytics] = useState([]);
  const [agents, setAgents] = useState([]);
  const [ads, setAds] = useState([]);

  const [editingAgent, setEditingAgent] = useState(null);
  const [editingAd, setEditingAd] = useState(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      rssUrl: "",
      category: "",
      interval: "",
      title: "",
      imageUrl: "",
      targetLink: ""
    }
  });

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const [agentRes, adRes, analyticsRes] = await Promise.all([
        getAgents(),
        getAds(),
        getAnalytics()
      ]);

      setAgents(agentRes.data);
      setAds(adRes.data);
      setAnalytics(analyticsRes.data);
    } catch {
      toast.error("Failed to load data");
    }
  };

  // ================= AGENT =================

  const saveAgent = async (data) => {
    try {
      if (editingAgent) {
        await updateAgent(editingAgent._id, data);
        toast.success("Agent updated!");
      } else {
        await createAgent(data);
        toast.success("Agent created!");
      }

      const res = await getAgents();
      setAgents(res.data);

      reset({ name: "", rssUrl: "", category: "", interval: "" });
      setEditingAgent(null);

    } catch {
      toast.error("Something went wrong!");
    }
  };

  const deleteAgent = async (id) => {
    try {
      await deleteAgentApi(id);
      setAgents(prev => prev.filter(a => a._id !== id));
      toast.success("Agent deleted!");
    } catch {
      toast.error("Delete failed!");
    }
  };

  // ================= ADS =================

  const saveAd = async (data) => {
    try {
      if (editingAd) {
        await updateAd(editingAd._id, data);
        toast.success("Ad updated!");
      } else {
        await createAd(data);
        toast.success("Ad created!");
      }

      const res = await getAds();
      setAds(res.data);

      reset({ title: "", imageUrl: "", targetLink: "", category: "" });
      setEditingAd(null);

    } catch {
      toast.error("Something went wrong!");
    }
  };

  const deleteAd = async (id) => {
    try {
      await deleteAdApi(id);
      setAds(prev => prev.filter(a => a._id !== id));
      toast.success("Ad deleted!");
    } catch {
      toast.error("Delete failed!");
    }
  };

  const cancelEdit = () => {
    reset({
      name: "",
      rssUrl: "",
      category: "",
      interval: "",
      title: "",
      imageUrl: "",
      targetLink: ""
    });

    setEditingAgent(null);
    setEditingAd(null);
    toast("Edit cancelled");
  };

  return (
    <div className="d-flex flex-column flex-md-row">

      {/* Sidebar */}
      <div className="sidebar-wrapper">
  <AdminSidebar section={section} setSection={setSection} />
</div>

      {/* Content */}
      <div className="flex-grow-1 p-3 p-md-4">

        <h2 className="mb-4 text-center text-md-start">Admin Dashboard</h2>

        {/* ================= AGENTS ================= */}
        {section === "agents" && (
          <div className="card p-3 shadow-sm">

            <h4 className="mb-3">RSS Agents</h4>

            <form className="row g-2 mb-3" onSubmit={handleSubmit(saveAgent)}>

              <div className="col-12 col-md-3">
                <input className="form-control" {...register("name")} placeholder="Name" autoComplete="off"/>
              </div>

              <div className="col-12 col-md-3">
                <input className="form-control" {...register("rssUrl")} placeholder="RSS URL" autoComplete="off"/>
              </div>

              <div className="col-12 col-md-2">
                <input className="form-control" {...register("category")} placeholder="Category" autoComplete="off"/>
              </div>

              <div className="col-12 col-md-2">
                <input className="form-control" {...register("interval")} placeholder="Interval" autoComplete="off"/>
              </div>

              <div className="col-12 col-md-2">
                <button className="btn btn-dark w-100">
                  {editingAgent ? "Update" : "Create"}
                </button>
              </div>

              {editingAgent && (
                <div className="col-12 col-md-2">
                  <button type="button" className="btn btn-secondary w-100" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              )}

            </form>

            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map(a => (
                    <tr key={a._id}>
                      <td>{a.name}</td>
                      <td>{a.category}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => {
                            setEditingAgent(a);
                            reset(a);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteAgent(a._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ================= ADS ================= */}
        {section === "ads" && (
          <div className="card p-3 shadow-sm">

            <h4 className="mb-3">Ads</h4>

            <form className="row g-2 mb-3" onSubmit={handleSubmit(saveAd)}>

              <div className="col-12 col-md-3">
                <input className="form-control" {...register("title")} placeholder="Title" autoComplete="off"/>
              </div>

              <div className="col-12 col-md-3">
                <input className="form-control" {...register("imageUrl")} placeholder="Image URL" autoComplete="off"/>
              </div>

              <div className="col-12 col-md-3">
                <input className="form-control" {...register("targetLink")} placeholder="Link" autoComplete="off"/>
              </div>

              <div className="col-12 col-md-2">
                <input className="form-control" {...register("category")} placeholder="Category" autoComplete="off"/>
              </div>

              <div className="col-12 col-md-1">
                <button className="btn btn-dark w-100">
                  {editingAd ? "Update" : "Add"}
                </button>
              </div>

              {editingAd && (
                <div className="col-12 col-md-2">
                  <button type="button" className="btn btn-secondary w-100" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              )}

            </form>

            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ads.map(a => (
                    <tr key={a._id}>
                      <td>{a.title}</td>
                      <td>{a.category}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => {
                            setEditingAd(a);
                            reset(a);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteAd(a._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ================= ANALYTICS ================= */}
        {section === "analytics" && (
          <div className="card p-3 shadow-sm">

            <h4 className="mb-3">Analytics</h4>

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Ad ID</th>
                    <th>Views</th>
                    <th>Clicks</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.map((a, i) => (
                    <tr key={i}>
                      <td>{a._id}</td>
                      <td>{a.views}</td>
                      <td>{a.clicks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}