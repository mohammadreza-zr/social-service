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
        <Link to="/contact" className="home-content__container_link">
          تماس با ما
        </Link>
      </div>
      <div className="home-content__container">
        <Link to="/instagram" className="home-content__container_item">
          <div className="home-content__container_item_image">
            <img src={Images.Instagram} alt="" className="home-content__container_item_image-img" />
          </div>
          <div className="home-content__container_item_text">اینستاگرام</div>
        </Link>
        <Link to="/telegram" className="home-content__container_item">
          <div className="home-content__container_item_image">
            <img src={Images.Telegram} alt="" className="home-content__container_item_image-img" />
          </div>
          <div className="home-content__container_item_text">تلگرام</div>
        </Link>
        <Link to="/web" className="home-content__container_item">
          <div className="home-content__container_item_image">
            <img src={Images.Website} alt="" className="home-content__container_item_image-img" />
          </div>
          <div className="home-content__container_item_text">وبسایت</div>
        </Link>
        <Link to="/whatsapp" className="home-content__container_item">
          <div className="home-content__container_item_image">
            <img src={Images.Whatsapp} alt="" className="home-content__container_item_image-img" />
          </div>
          <div className="home-content__container_item_text">واتساپ</div>
        </Link>
      </div>
    </div>
  );
};
