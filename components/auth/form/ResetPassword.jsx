"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { passwordPattern } from "./Login";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function ResetPassword(props) {
  // console.log(props.setParams);
  const router = useRouter();
  let tokenError = props.setErrorProps;
  let user = props.setUserProps;
  // let verifiedToken = props.setVerifiedToken;
  // let { setUserProps, setErrorProps, setVerifiedToken } = props;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState("password");
  const [showConfirmPass, setShowConfirmPass] = useState("password");
  const [disableBtn, setDisableBtn] = useState(false);
  const [resting, setResting] = useState(false);

  const confirmPasswordInputRef = useRef(null);

  const handlePassword = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);

    if (inputValue.trim() === "") {
      setDisableBtn(true);
    } else if (!/(?=.*[a-z])/.test(inputValue)) {
      toast.error("Include at least one lowercase letter.");
      setDisableBtn(true);
    } else if (!/(?=.*[A-Z])/.test(inputValue)) {
      toast.error("Include at least one uppercase letter.");
      setDisableBtn(true);
    } else if (!/(?=.*\d)/.test(inputValue)) {
      toast.error("Include at least one digit.");
      setDisableBtn(true);
    } else if (!/(?=.*[@$!%*?&])/.test(inputValue)) {
      toast.error("Include at least one special character (@$!%*?&).");
      setDisableBtn(true);
    } else if (inputValue.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      setDisableBtn(true);
    } else if (!passwordPattern.test(inputValue)) {
      toast.error("Invalid password");
      setDisableBtn(true);
    } else {
      toast.success("Valid password!");
      setDisableBtn(false);
    }
  };

  const handleConfirmPassword = (e) => {
    const cpswd = e.target.value;

    if (cpswd !== password) {
      setDisableBtn(true);
      toast.error("Mismatch password!");
    } else {
      setDisableBtn(false);
      toast.success("Password matched!");
    }
    setConfirmPassword(cpswd);
  };

  useEffect(() => {
    if (tokenError.length > 0) {
      setDisableBtn(true);
    }
  }, [tokenError.length]);

  // handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("password: ", password, "\nConfimePasswrod: ", confirmPassword);

    if ((password.trim() && confirmPassword.trim()) === "") {
      return toast.error("Please create the password");
    }

    try {
      setResting(true);
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          password,
        }),
      });

      if (res.status === 400) {
        toast.error("Something went wrong!");
      }
      if (res.status === 200) {
        router.push("/signIn");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("Error: ", error);
    } finally {
      setDisableBtn(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
        <div className={`input-style flex gap-2 cursor-text`}>
          <input
            type={showPass}
            placeholder="Password"
            disabled={disableBtn || resting}
            required
            value={password}
            onChange={handlePassword}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                confirmPasswordInputRef.current.focus();
              }
            }}
            className="w-full h-full bg-transparent ring-0 border-none outline-none"
          />
          <div
            onClick={() => {
              if (showPass === "text") setShowPass("password");
              else setShowPass("text");
            }}
            className="w-fit h-fit cursor-pointer flex-center gap-1 ease-in-out duration-200"
          >
            {showPass === "text" ? (
              <FaRegEyeSlash
                size={20}
                className="w-full h-full active:scale-75 text-primary-green"
              />
            ) : (
              <FaRegEye size={20} className="w-full h-full active:scale-75" />
            )}
          </div>
        </div>
        <div className={`input-style flex gap-2 cursor-text`}>
          <input
            type={showConfirmPass}
            placeholder="Confirm Password"
            disabled={disableBtn || resting}
            required
            value={confirmPassword}
            onChange={handleConfirmPassword}
            ref={confirmPasswordInputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleGetOtp(e);
              }
            }}
            className="w-full h-full bg-transparent ring-0 border-none outline-none"
          />
          <div
            onClick={() => {
              if (showConfirmPass === "text") setShowConfirmPass("password");
              else setShowConfirmPass("text");
            }}
            className="w-fit h-fit cursor-pointer flex-center gap-1 ease-in-out duration-200"
          >
            {showConfirmPass === "text" ? (
              <FaRegEyeSlash
                size={20}
                className="w-full h-full active:scale-75 text-primary-green"
              />
            ) : (
              <FaRegEye size={20} className="w-full h-full active:scale-75" />
            )}
          </div>
        </div>

        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={disableBtn || resting}
          className={`w-full ${resting && "animate-pulse"}`}
        >
          {resting ? "Resting Password..." : "Rest Passowrd"}
        </Button>

        <div className="w-full text-center mt-6 py-0.5 overflow-hidden">
          {tokenError ? (
            <div className="w-full text-center py-1 text-white bg-red-500 animate-slide-down rounded-lg overflow-hidden">
              {tokenError}
            </div>
          ) : (
            <div className="w-full text-center py-1 text-white bg-primary-green animate-slide-down rounded-lg overflow-hidden">
              Set it secretly!
            </div>
          )}
        </div>
      </form>
    </>
  );
}
