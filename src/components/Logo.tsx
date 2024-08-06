import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 h-16">
      <img src="/logo_icon.png" alt="logo_icon" width={24} height={24} />
      <p className="font-semibold">Authorization</p>
    </Link>
  );
};

export default Logo;
