"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { registerUser } from "@/services/user.api";

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setErrorMsg("");

      await registerUser(data);
      toast.success("Register successfully!")

      router.push("/login");

    } catch (err) {
      setErrorMsg("Signup failed. Try again.");
      toast.error(err.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">

      <div className="card p-4 shadow" style={{ width: "350px" }}>
        
        <h3 className="text-center mb-3">Signup</h3>

        {errorMsg && (
          <div className="alert alert-danger p-2">{errorMsg}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </div>
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
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required"
                }
              })}
            />
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Signup"}
          </button>

        </form>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}