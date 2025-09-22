"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CircleWhite, EyeCloseIcon, EyeIcon } from "@/src/assets/icons";
import Button from "@/src/components/button/Button";
import Checkbox from "@/src/components/form-elements/Checkbox";
import Input from "@/src/components/form-elements/InputField";
import Label from "@/src/components/form-elements/Label";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe: isChecked }),
      });

      const result = await res.json();
      if (result?.success || res.ok) {
        toast.success(result.message);
        // Cookie will be set by API
        router.push("/admin");
      } else {
        toast.error(result.message || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-4">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Admin Sign In
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Enter your credentials to access the admin panel
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label>
                Email <span className="text-error-500">*</span>
              </Label>
              {/* <Input placeholder="admin@happyhomes.com" type="email" /> */}
              <Input
                placeholder="admin@happyhomes.com"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>
            <div>
              <Label>
                Password <span className="text-error-500">*</span>
              </Label>
              <div className="relative">
                {/* <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                /> */}
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <span
                  onClick={() => password && setShowPassword(!showPassword)}
                  className={`absolute z-30 -translate-y-1/2 ${password ? "cursor-pointer" : ""} right-4 top-1/2`}
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                  )}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox checked={isChecked} onChange={setIsChecked} />
                <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                  Keep me logged in
                </span>
              </div>
              {/* <Link
                href="/admin/reset-password"
                className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Forgot password?
              </Link> */}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <Button type="submit" className="w-full" size="sm" disabled={loading}>
              {loading && (
                <span className="animate-spin">
                  <CircleWhite />
                </span>
              )}
              Sign in to Admin Panel
            </Button>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to main site
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;