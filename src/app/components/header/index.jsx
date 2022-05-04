import { Images } from '../../assets';

import './styles/style.css';

export const Header = () => {
  return (
    <div className="header">
      <img src={Images.HeaderImage} alt="HeaderImage" className="header__img" />
    </div>
  );
};
