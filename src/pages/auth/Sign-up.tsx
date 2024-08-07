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
import { SignUpSchema, SignUpSchemaType } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import API from "@/lib/api";
import LoadingButton from "@/components/LoadingButton";
import { ArrowLeftCircle } from "lucide-react";
import PasswordInput from "@/components/PasswordInput";

const SignUp = () => {
  const [nextStep, setNextStep] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      gmail: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpSchemaType) => {
    setError("");

    try {
      await API.post("/users/sign-up", values);

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
          {!nextStep ? (
            <h1 className="text-3xl font-semibold text-center">Register</h1>
          ) : (
            <>
              <h1 className="text-3xl font-semibold text-center">
                Create password
              </h1>
              <p className="text-center">
                Use a minimum of 8 characters, including letters, lowercase
                letters, and numbers.
              </p>
            </>
          )}
          {error && <p className="text-center text-destructive">{error}</p>}
          {nextStep ? (
            <>
              <span
                onClick={() => setNextStep(false)}
                className="text-blue cursor-pointer text-sm flex items-center gap-1"
              >
                <ArrowLeftCircle className="size-4" /> Change email
              </span>
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="*********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
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
          )}

          {nextStep ? (
            <LoadingButton
              disabled={!form.formState.isValid}
              loading={form.formState.isSubmitting}
              className="w-full"
              type={nextStep ? "submit" : "button"}
            >
              Create account
            </LoadingButton>
          ) : (
            <Button
              onClick={() => setNextStep(true)}
              className="w-full"
              type={nextStep ? "button" : "submit"}
            >
              Continue with email
            </Button>
          )}
          {nextStep ? (
            <p>
              By creating an account, you agree with our{" "}
              <span className="text-blue">
                Terms and Conditions and Privacy Statement.
              </span>
            </p>
          ) : (
            <h1 className="flex items-center justify-center gap-3 text-sm">
              Already have an account?
              <Link to="/auth/sign-in" className="text-blue">
                Sign in
              </Link>
            </h1>
          )}
        </form>
      </Form>
    </main>
  );
};

export default SignUp;
