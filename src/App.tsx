import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import Layout from "./pages/Layout";
import AuthLayout from "./pages/auth/AuthLayout";
import ProtectAuthPagesProvider from "./pages/auth/ProtectAuthPagesProvider";
const Home = lazy(() => import("./pages/home/Home"));
const SignIn = lazy(() => import("./pages/auth/Sign-in"));
const SignUp = lazy(() => import("./pages/auth/Sign-up"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CheckInbox = lazy(() => import("./pages/auth/CheckInbox"));
const ResetPasswordUpdate = lazy(
  () => import("./pages/auth/ResetPasswordUpdate")
);

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
          <Route
            path="/auth"
            element={
              <ProtectAuthPagesProvider>
                <AuthLayout />
              </ProtectAuthPagesProvider>
            }
          >
            <Route path="sign-in" element={<SignIn />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="check-inbox" element={<CheckInbox />} />
            <Route
              path="reset-password-update"
              element={<ResetPasswordUpdate />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
