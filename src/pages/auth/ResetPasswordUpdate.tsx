import { useState } from "react";
import Logo from "@/components/Logo";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ResetPasswordUpdateSchema,
  ResetPasswordUpdateSchemaType,
} from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import API from "@/lib/api";
import LoadingButton from "@/components/LoadingButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import PasswordInput from "@/components/PasswordInput";

const ResetPasswordUpdate = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const form = useForm<ResetPasswordUpdateSchemaType>({
    resolver: zodResolver(ResetPasswordUpdateSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordUpdateSchemaType) => {
    setError("");

    try {
      await API.post("/users/reset-password-update", { token, ...values });

      navigate("/auth/sign-in");
    } catch (error: any) {
      setError(error?.response?.data);
    }
  };

  return (
    <main className="container h-screen">
      <Logo />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-[400px] mx-auto mt-20"
        >
          <h1 className="text-3xl font-semibold text-center">
            Reset your password in here
          </h1>
          {error && <p className="text-center text-destructive">{error}</p>}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your new password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm your new password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            disabled={!form.formState.isValid}
            loading={form.formState.isSubmitting}
            className="w-full"
            type="submit"
          >
            Reset Password
          </LoadingButton>
        </form>
      </Form>
    </main>
  );
};

export default ResetPasswordUpdate;
