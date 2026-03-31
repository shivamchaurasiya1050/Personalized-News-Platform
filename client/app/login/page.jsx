"use client";
import { useForm } from "react-hook-form";
import API, { setToken } from "../../services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { loggedInUser,loginUser } from "@/services/user.api";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //  AUTO REDIRECT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/feed");
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await loginUser(data);

      const token = res.data.token;
      const role = res.data.data.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setToken(token);

      toast.success("Login successfully!");
      if (role === "admin") {
        return router.push("/admin");
      }
      const user = await loggedInUser();

      if (!user?.data?.data?.preferences || user?.data?.data?.preferences?.length === 0) {
        router.push("/preferences"); // first time
      } else {
        router.push("/feed"); // returning user
      }
    } catch (err) {
      toast.error("Invalid email or password ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup link */}
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => router.push("/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}
