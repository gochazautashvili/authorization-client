import { Button, ButtonProps } from "./ui/button";
import { Loader2 } from "lucide-react";

interface Props extends ButtonProps {
  loading: boolean;
}

const LoadingButton = ({ className, loading, disabled, ...props }: Props) => {
  return (
    <Button {...props} className={className} disabled={loading || disabled}>
      {loading && <Loader2 className="animate-spin mr-2 size-4" />}
      {props.children}
    </Button>
  );
};

export default LoadingButton;
