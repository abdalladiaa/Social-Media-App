import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerationSchema } from "../../../Schema/AuthSchema";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthAlert from "../../../Components/AuthAlert/AuthAlert";

export default function Register() {
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
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
      const serverError = err?.response?.data?.errors;
      setMsg(serverError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="rounded-2xl bg-white p-4 sm:p-6">
        <h2 className="text-2xl font-extrabold text-[#0B1733]">
          Create a new account
        </h2>
        <p className="mt-1 text-sm text-[#61708A]">It is quick and easy.</p>

        <form
          onSubmit={handleSubmit(submitRegister)}
          className="mt-5 space-y-3.5"
        >
          {/* Full name */}
          <div>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#61708A]/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user"
                  aria-hidden="true"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx={12} cy={7} r={4} />
                </svg>
              </span>
              <input
                {...register("name")}
                placeholder="Full name"
                className="w-full rounded-xl border bg-[#F7FAFF] py-3 pl-11 pr-4 text-sm text-[#0B1733] outline-none transition focus:bg-white border-[#E2E8F0] focus:border-[#0066FF]"
                type="text"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-[#E23030]">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div className="w-full">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#61708A]/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-at-sign"
                  aria-hidden="true"
                >
                  <circle cx={12} cy={12} r={4} />
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
                </svg>
              </span>
              <input
                {...register("username")}
                placeholder="Username (optional)"
                className="w-full rounded-xl border bg-[#F7FAFF] py-3 pl-11 pr-4 text-sm text-[#0B1733] outline-none transition focus:bg-white border-[#E2E8F0] focus:border-[#0066FF]"
                type="text"
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-sm text-[#E23030]">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="w-full">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#61708A]/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-at-sign"
                  aria-hidden="true"
                >
                  <circle cx={12} cy={12} r={4} />
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
                </svg>
              </span>
              <input
                {...register("email")}
                placeholder="Email address"
                className="w-full rounded-xl border bg-[#F7FAFF] py-3 pl-11 pr-4 text-sm text-[#0B1733] outline-none transition focus:bg-white border-[#E2E8F0] focus:border-[#0066FF]"
                type="email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-[#E23030]">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Date of birth */}
          <div className="w-full">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#61708A]/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-calendar"
                  aria-hidden="true"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width={18} height={18} x={3} y={4} rx={2} />
                  <path d="M3 10h18" />
                </svg>
              </span>
              <input
                {...register("dateOfBirth")}
                placeholder="Date of birth"
                className="w-full rounded-xl border bg-[#F7FAFF] py-3 pl-11 pr-4 text-sm text-[#0B1733] outline-none transition focus:bg-white border-[#E2E8F0] focus:border-[#0066FF]"
                type="date"
              />
            </div>
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-[#E23030]">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="w-full">
            <div className="relative">
              <span className=" pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#61708A]/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-key-round"
                  aria-hidden="true"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                </svg>
              </span>
              <input
                {...register("password")}
                placeholder="Password"
                className="w-full rounded-xl border bg-[#F7FAFF] py-3 pl-11 pr-12 text-sm text-[#0B1733] outline-none transition focus:bg-white border-[#E2E8F0] focus:border-[#0066FF]"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#61708A]/60 hover:text-[#00C2A8] focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-eye-off"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-eye"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-[#E23030]">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Repassword */}
          <div className="w-full">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#61708A]/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-key-round"
                  aria-hidden="true"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                </svg>
              </span>
              <input
                {...register("rePassword")}
                placeholder="Confirm password"
                className="w-full rounded-xl border bg-[#F7FAFF] py-3 pl-11 pr-12 text-sm text-[#0B1733] outline-none transition focus:bg-white border-[#E2E8F0] focus:border-[#0066FF]"
                type={showConfirmPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#61708A]/60 hover:text-[#00C2A8] focus:outline-none"
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-eye-off"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-eye"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.rePassword && (
              <p className="mt-1 text-sm text-[#E23030]">
                {errors.rePassword.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="flex gap-x-5">
            <div className="flex items-center gap-x-3">
              <input
                type="radio"
                {...register("gender")}
                id="male"
                value={"male"}
                defaultChecked
              />
              <label htmlFor="gender" className="text-[#0B1733]">
                male
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                type="radio"
                {...register("gender")}
                id="female"
                value={"female"}
              />
              <label htmlFor="gender" className="text-[#0B1733]">
                female
              </label>
            </div>
            {errors.gender && (
              <p className="mt-1 text-sm text-[#E23030]">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Register button */}
          <button
            className="cursor-pointer w-full rounded-xl bg-[#0066FF] py-3 text-base font-extrabold text-white transition hover:bg-[#00C2A8] disabled:opacity-60"
            disabled={loading}
          >
            {loading ? (
              <>
                <span>Please wait...</span>
              </>
            ) : (
              <span>Create account</span>
            )}
          </button>
          {msg && (
            <AuthAlert
              type={msg === "success" ? "success" : "error"}
              message={msg}
            />
          )}
        </form>
      </div>
    </>
  );
}
