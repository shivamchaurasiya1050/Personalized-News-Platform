"use client";
import { useForm } from "react-hook-form";
import API from "../../services/api";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { loggedInUser, updateCategoryFeed } from "@/services/user.api";

export default function Preferences() {
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await loggedInUser();
        const user = res.data.data;
        (user.preferences || []).forEach((p) => {
          setValue(p, true);
        });
      } catch (err) {
        console.log("Error loading preferences");
      }
    };

    fetchUser();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const selected = Object.keys(data).filter((k) => data[k]);

      if (selected.length === 0) {
        return toast.error("Please select at least one category");
      }

       await updateCategoryFeed({
      preferences: selected,
    });

      toast.success("Preferences updated!");

      router.push("/");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Update Your Interests</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* OPTIONS */}
          <div className="mb-3">

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                {...register("tech")}
              />
              <label className="form-check-label">Tech</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                {...register("business")}
              />
              <label className="form-check-label">Business</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                {...register("general")}
              />
              <label className="form-check-label">General</label>
            </div>

          </div>
          <button
            type="submit"
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading ? "Saving..." : "Update Preferences"}
          </button>
        </form>
      </div>
    </div>
  );
}