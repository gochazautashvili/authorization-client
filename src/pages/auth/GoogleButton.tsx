import { Button } from "@/components/ui/button";

const GoogleButton = () => {
  const handleGoogleSignIn = () => {};

  return (
    <Button
      onClick={handleGoogleSignIn}
      variant="outline"
      type="button"
      asChild
    >
      <a
        href={`${import.meta.env.VITE_API_URL}/users/google-auth`}
        className="flex items-center gap-4"
      >
        <img src="/google_icon.png" alt="google_icon" width={20} height={20} />
        Continue with Google
      </a>
    </Button>
  );
};

export default GoogleButton;
