import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";

const CheckInbox = () => {
  const [searchParams] = useSearchParams();
  const gmail = searchParams.get("gmail");

  return (
    <main className="container h-screen flex flex-col items-center justify-center max-w-[400px]">
      <img
        src="/check_inbox_image.png"
        alt="check_inbox_image"
        width={200}
        height={200}
        className="bg-[#FEE265] py-6 px-10 rounded-lg"
      />
      <h1 className="text-3xl font-semibold my-4 text-center">
        Check your Inbox
      </h1>
      <p className="text-center text-sm">
        We have just emailed you the instrustions and a reset password link to{" "}
        <strong>{gmail}</strong>. It might take a few minutes to arrive
      </p>
      <Button className="mt-6 w-full" asChild>
        <Link to="/auth/sign-in">Back to Sign in</Link>
      </Button>
    </main>
  );
};

export default CheckInbox;
