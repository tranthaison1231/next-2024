"use client";
import { Input } from "@/core/components/atoms/input";
import { Label } from "@/core/components/atoms/label";
import InputPassword from "@/core/components/molecules/InputPassword";
import { LoadingButton } from "@/core/components/molecules/LoadingButton";
import { RegisterSchema } from "@/core/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error);
      }

      toast.success("Registered successfully");
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="mt-10 px-1 lg:px-4 w-full flex flex-col gap-4"
    >
      <Label name="Email">
        <Input placeholder="Enter your email " {...register("email")} />
        {errors.email?.message && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </Label>
      <Label name="Password">
        <InputPassword
          label="Password"
          placeholder="Enter password"
          {...register("password")}
        />
        {errors.password?.message && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </Label>
      <LoadingButton className="mt-8 w-full" type="submit" loading={isLoading}>
        Register
      </LoadingButton>
    </form>
  );
}
