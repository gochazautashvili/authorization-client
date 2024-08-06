interface Props {
  avatar: string;
  size?: number;
}

const Avatar = ({ avatar, size = 48 }: Props) => {
  return (
    <img
      src={avatar}
      alt="user avatar"
      width={size}
      height={size}
      className="object-cover rounded-full"
    />
  );
};

export default Avatar;
