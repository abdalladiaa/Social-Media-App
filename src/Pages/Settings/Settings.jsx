import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaKey, FaShieldAlt } from "react-icons/fa";
import { ChangePasswordSchema } from "../../Schema/AuthSchema";
import axios from "axios";
import { headersObjData } from "../../Helper/HeadersObj";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { setToken } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: { password: "", newPassword: "" },
  });

  async function changePassword(values) {
    try {
      const { data } = await axios.patch(
        "https://route-posts.routemisr.com/users/change-password",
        values,
        headersObjData(),
      );
      if (data.success) {
        localStorage.setItem("token", data.data.token);
        setToken(data.data.token);
        toast.success(data.message);
        reset();
        console.log(data);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }
  console.log(errors);

  return (
    <section className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] overflow-hidden w-full max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="p-6 sm:p-8 border-b border-gray-50">
        <div className="flex items-center gap-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm">
            <FaKey size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black text-[#0B1733] sm:text-2xl">
              Change Password
            </h1>
            <p className="text-sm font-medium text-[#61708A] mt-1">
              Keep your account secure with a strong password.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(changePassword)}
        className="p-6 sm:p-8 space-y-5"
      >
        {/* Current Password */}
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-[#0B1733] ml-1">
            Current Password
          </label>
          <div className="relative group">
            <input
              {...register("password")}
              placeholder="Enter current password"
              className=" w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5"
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="ml-1 mt-1 text-xs font-bold text-red-500 animate-pulse">
              {errors.password.message}
            </p>
          )}
        </div>
        {/* New Password */}
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-[#0B1733] ml-1">
            New Password
          </label>
          <div className="relative group">
            <input
              {...register("newPassword")}
              placeholder="Enter new password"
              className=" w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-800 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5"
              type={showNewPassword ? "text" : "password"}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className=" cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
            >
              {showNewPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.newPassword && (
            <p className="ml-1 text-xs font-bold text-red-500 animate-pulse">
              {errors.newPassword.message}
            </p>
          )}
          <div className="flex items-start gap-2 mt-5 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <FaShieldAlt className="text-slate-400 mt-0.5" size={12} />
            <p className="text-[11px] font-medium text-slate-500 leading-relaxed ">
              Password must be at least 6 characters and include at least one
              uppercase letter, one lowercase letter, and one number.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full cursor-pointer inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </section>
  );
}
