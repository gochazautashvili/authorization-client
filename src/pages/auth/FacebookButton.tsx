import { Button } from "@/components/ui/button";

const FacebookButton = () => {
  return (
    <Button type="button" asChild>
      <a
        href={`${import.meta.env.VITE_API_URL}/users/facebook-auth`}
        className="flex items-center gap-4"
      >
        <img
          src="/facebook_icon.png"
          alt="google_icon"
          width={20}
          height={20}
        />
        Continue with Facebook
      </a>
    </Button>
  );
};

export default FacebookButton;
