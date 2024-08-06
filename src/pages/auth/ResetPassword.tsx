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
import { Input } from "@/components/ui/input";
import { ResetPasswordSchema, ResetPasswordSchemaType } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import API from "@/lib/api";
import LoadingButton from "@/components/LoadingButton";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      gmail: "",
    },
  });

  const onSubmit = async (values: ResetPasswordSchemaType) => {
    setError("");

    try {
      await API.post("/users/reset-password", values);

      navigate(`/auth/check-inbox?gmail=${values.gmail}`);
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
            Forgot your password?
          </h1>
          <p className="text-center">
            We&apos;ll send you a link to reset it. Enter your email address
            used for My Dream Place
          </p>
          {error && <p className="text-center text-destructive">{error}</p>}
          <FormField
            control={form.control}
            name="gmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Email address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...field}
                    type="email"
                  />
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
            Send Reset Link
          </LoadingButton>
        </form>
      </Form>
    </main>
  );
};

export default ResetPassword;
