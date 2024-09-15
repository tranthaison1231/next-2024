"use client";

import {
  forwardRef,
  type InputHTMLAttributes,
  type LegacyRef,
  useState,
} from "react";
import { Input } from "@/core/components/atoms/input";
import { Eye, EyeOff } from "lucide-react";

interface InputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  className?: string;
}

const InputPassword = forwardRef(
  (
    { placeholder = "Enter your password", ...props }: InputPasswordProps,
    ref: LegacyRef<HTMLInputElement> | undefined,
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
      <>
        <Input
          ref={ref}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 top-6 right-0 pr-3 flex items-center text-secondary cursor-pointer"
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </>
    );
  },
);

export default InputPassword;
