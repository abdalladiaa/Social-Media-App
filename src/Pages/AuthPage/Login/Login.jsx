import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../../../Schema/AuthSchema";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { User, KeyRound, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import AuthAlert from "../../../Components/AuthAlert/AuthAlert";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState();
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function submitLogin(values) {
    setLoading(true);
    setMsg(undefined);
    try {
      const { data } = await axios.post(
        "https://route-posts.routemisr.com/users/signin",
        values,
      );
      if (data.success) {
        setMsg("success");
        localStorage.setItem("token", data.data.token);
        setToken(data.data.token);
        toast.success("Login Successfully");
        navigate("/");
      }
    } catch (err) {
      const serverError = err?.response?.data?.errors;
      setMsg(serverError || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Header */}
      <div className="mb-10 text-center sm:text-start">
        <h2 className="text-3xl font-black tracking-tight text-gray-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm font-medium text-gray-500">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(submitLogin)} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="ml-1 text-xs font-bold uppercase tracking-wider text-gray-700">
            Email Address
          </label>
          <div className="group relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-600">
              <User size={18} strokeWidth={2.5} />
            </span>
            <input
              {...register("email")}
              placeholder="name@example.com"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-3.5 pl-12 pr-4 text-sm text-gray-900 shadow-sm outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/5"
              type="email"
            />
          </div>
          {errors.email && (
            <p className="ml-1 animate-pulse text-xs font-bold text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Password
            </label>
          </div>
          <div className="group relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-600">
              <KeyRound size={18} strokeWidth={2.5} />
            </span>
            <input
              {...register("password")}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-3.5 pl-12 pr-12 text-sm text-gray-900 shadow-sm outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/5"
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="ml-1 animate-pulse text-xs font-bold text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-blue-600 py-4 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Authenticating...</span>
            </div>
          ) : (
            <span className="flex items-center gap-2">
              Log In
              <ArrowRight
                size={16}
                strokeWidth={3}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          )}
        </button>
        {msg && (
          <AuthAlert
            type={msg === "success" ? "success" : "error"}
            message={msg}
          />
        )}
      </form>

      {/* Footer Link */}
      <div className="mt-8 border-t border-gray-100 pt-6 text-center">
        <p className="text-sm font-medium text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="font-bold text-blue-600 hover:underline"
          >
            Create one for free
          </Link>
        </p>
      </div>
    </div>
  );
}
