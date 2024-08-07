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
import { SignInSchema, SingInSchemaType } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "./GoogleButton";
import API from "@/lib/api";
import LoadingButton from "@/components/LoadingButton";
import PasswordInput from "@/components/PasswordInput";

const SignIn = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const form = useForm<SingInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      gmail: "",
      password: "",
    },
  });

  const onSubmit = async (values: SingInSchemaType) => {
    setError("");

    try {
      await API.post("/users/sign-in", values);

      navigate("/");
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
          className="space-y-4 max-w-[400px] mx-auto mt-20"
        >
          <h1 className="text-3xl font-semibold text-center">Sign in</h1>
          {error && <p className="text-center text-destructive">{error}</p>}
          <FormField
            control={form.control}
            name="gmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <FormField
                control={form.control}
                name="keep_signed_in"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id="signed"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <Label htmlFor="signed">Keep me signed in</Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Link className="text-sm text-blue" to="/auth/reset-password">
              Forgot password?
            </Link>
          </div>
          <LoadingButton
            disabled={!form.formState.isValid}
            loading={form.formState.isSubmitting}
            className="w-full"
            type="submit"
          >
            Continue with email
          </LoadingButton>
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-gray-300"></div>
            <p>or use one of these options</p>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>
          <div className="flex flex-col space-y-3">
            <GoogleButton />
          </div>
          <h1 className="flex items-center justify-center gap-3 text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/auth/sign-up" className="text-blue">
              Register
            </Link>
          </h1>
        </form>
      </Form>
    </main>
  );
};

export default SignIn;
