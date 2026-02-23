import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerationSchema } from "../../../Schema/AuthSchema";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthAlert from "../../../Components/AuthAlert/AuthAlert";
import {
  FaMale,
  FaFemale,
  FaUser,
  FaAt,
  FaCalendarAlt,
  FaLock,
} from "react-icons/fa";

export default function Register() {
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "male",
      password: "",
      rePassword: "",
    },
  });

  const selectedGender = watch("gender");

  async function submitRegister(values) {
    setLoading(true);
    setMsg(undefined);
    try {
      const { data } = await axios.post(
        "https://route-posts.routemisr.com/users/signup",
        values,
      );
      if (data.success) {
        setMsg("success");
        localStorage.setItem("token", data.data.token);
        navigate("/");
      }
    } catch (err) {
      const serverError =
        err?.response?.data?.errors || "Registration failed. Try again.";
      setMsg(serverError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
      <div className="text-center sm:text-start mb-8">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
          Create Account
        </h2>
        <p className="mt-2 text-sm font-medium text-gray-500">
          Join our community today.
        </p>
      </div>

      <form onSubmit={handleSubmit(submitRegister)} className="space-y-5">
        {/* Row 1: Name & Username */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
              Full Name
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <FaUser size={16} />
              </span>
              <input
                {...register("name")}
                placeholder="John Doe"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5"
                type="text"
              />
            </div>
            {errors.name && (
              <p className="text-[11px] font-bold text-red-500 ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
              Username
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <FaAt size={16} />
              </span>
              <input
                {...register("username")}
                placeholder="johndoe123"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5"
                type="text"
              />
            </div>
            {errors.username && (
              <p className="text-[11px] font-bold text-red-500 ml-1">
                {errors.username.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
            Email Address
          </label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
              <FaAt size={16} />
            </span>
            <input
              {...register("email")}
              placeholder="example@mail.com"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5"
              type="email"
            />
          </div>
          {errors.email && (
            <p className="text-[11px] font-bold text-red-500 ml-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Date of Birth & Gender Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
              Date of Birth
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <FaCalendarAlt size={16} />
              </span>
              <input
                {...register("dateOfBirth")}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:bg-white focus:border-blue-600"
                type="date"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
              Gender
            </label>
            <div className="flex gap-3">
              <label
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border cursor-pointer transition-all ${selectedGender === "male" ? "bg-blue-50 border-blue-600 text-blue-600 font-bold" : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"}`}
              >
                <input
                  type="radio"
                  {...register("gender")}
                  value="male"
                  className="hidden"
                />
                <FaMale /> Male
              </label>
              <label
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border cursor-pointer transition-all ${selectedGender === "female" ? "bg-pink-50 border-pink-600 text-pink-600 font-bold" : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"}`}
              >
                <input
                  type="radio"
                  {...register("gender")}
                  value="female"
                  className="hidden"
                />
                <FaFemale /> Female
              </label>
            </div>
          </div>
        </div>

        {/* Passwords Row */}
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
              Password
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <FaLock size={14} />
              </span>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-3 pl-11 pr-10 text-sm outline-none transition-all focus:bg-white focus:border-blue-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] font-bold text-red-500 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">
              Confirm Password
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <FaLock size={14} />
              </span>
              <input
                {...register("rePassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-3 pl-11 pr-10 text-sm outline-none transition-all focus:bg-white focus:border-blue-600"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.rePassword && (
              <p className="text-[11px] font-bold text-red-500 ml-1">
                {errors.rePassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Register button */}
        <button
          className="w-full mt-4 rounded-2xl bg-blue-600 py-4 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 active:scale-[0.98] disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Creating your account..." : "Get Started Now"}
        </button>

        {msg && (
          <AuthAlert
            type={msg === "success" ? "success" : "error"}
            message={msg}
          />
        )}
      </form>
    </div>
  );
}
