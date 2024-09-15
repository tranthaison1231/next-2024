"use client";
import { Input } from "@/core/components/atoms/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { LoginSchema } from "@/core/schemas/login";
import { toast } from "sonner";
import InputPassword from "@/core/components/molecules/InputPassword";
import { LoadingButton } from "@/core/components/molecules/LoadingButton";
import { Label } from "@/core/components/atoms/label";

export default function LoginContainer() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      toast.success("Login successfully!");
      push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 px-1 lg:px-4 w-full flex flex-col gap-4"
    >
      <h1 className="text-2xl text-medium text-center">Login</h1>
      <Label name="Email">
        <Input
          placeholder="Enter your email "
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-destructive text-sm">
            {errors.email?.message}
          </span>
        )}
      </Label>
      <Label name="Password">
        <InputPassword
          label="Password"
          placeholder="Enter your password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password?.message && (
          <span className="text-destructive text-sm">
            {errors.password?.message}
          </span>
        )}
      </Label>
      <LoadingButton className="mt-8 w-full" type="submit" loading={isLoading}>
        Sign in
      </LoadingButton>
    </form>
  );
}
