import { Images } from "../../assets";

import "./styles/style.css";

export const Header = ({ where }) => {
  return (
    <div className="header">
      <div className="header__title">
        <h1 className="header__title_h1">
          {where === "home"
            ? "با زنبوری تبلیغی ارزان با کیفیت و پربازید داشته باشید"
            : "ما هر روز توسط نیروی انسانی اکانت ها و صفحات را برسی میکنیم تا شما پربازده ترین تبلیغ را داشته باشید"}
        </h1>
      </div>
      <img src={Images.HeaderImage} alt="HeaderImage" className="header__img" />
    </div>
  );
};
