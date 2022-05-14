import { Link } from "react-router-dom";

import { Images } from "../../assets";

import "./styles/style.css";

export const HomeContent = () => {
  return (
    <div className="home-content">
      <div className="home-content__header">
        <Link to="/#" className="home-content__container_link">
          خدمات
        </Link>
        <Link to="/#" className="home-content__container_link">
          راهنما
        </Link>
        <Link to="/#" className="home-content__container_link">
          پشتیبانی
        </Link>
        <Link to="/#" className="home-content__container_link">
          درباره ما
        </Link>
      </div>
      <div className="home-content__container">
        <div className="home-content__container_item">
          <div className="home-content__container_item_image">
            <img src={Images.Instagram} alt="" className="home-content__container_item_image-img" />
          </div>
          <Link to="/instagram">
            <div className="home-content__container_item_text">اینستاگرام</div>
          </Link>
        </div>
        <div className="home-content__container_item">
          <div className="home-content__container_item_image">
            <img src={Images.Telegram} alt="" className="home-content__container_item_image-img" />
          </div>
          <Link to="/telegram">
            <div className="home-content__container_item_text">تلگرام</div>
          </Link>
        </div>
        <div className="home-content__container_item">
          <div className="home-content__container_item_image">
            <img src={Images.Website} alt="" className="home-content__container_item_image-img" />
          </div>
          <Link to="/web">
            <div className="home-content__container_item_text">وبسایت</div>
          </Link>
        </div>
        <div className="home-content__container_item">
          <div className="home-content__container_item_image">
            <img src={Images.Whatsapp} alt="" className="home-content__container_item_image-img" />
          </div>
          <Link to="/whatsapp">
            <div className="home-content__container_item_text">واتساپ</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
