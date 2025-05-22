import LogoIcon from '../assets/stair.svg?react';

const Logo = () => {
  return (
    <div className="logo">
      <LogoIcon width={16} height={16} />
      <span>Eats</span>
    </div>
  );
};

export default Logo;