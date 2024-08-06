import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full h-screen absolute top-0 left-0 flex items-center justify-center bg-black bg-opacity-40">
      <Loader2 className="size-6 animate-spin" />
    </div>
  );
};

export default Loading;
