import { Images } from "../../assets";

import "./styles/style.css";

export const ContactUsContent = () => {
  return (
    <div className="contact">
      <div className="contact__container">
        <h1 className="contact__container_title">
          برای ارتباط با ما و یا اضافه کردن حساب های خود, در شبکه های زیر با ما در ارتباط باشید
        </h1>
        <div className="contact__container_content">
          <div className="contact__container_content_item">
            <img src={Images.ContactInstagram} alt="" className="contact__container_content_item_image" />
            <span>@zanbori_ir</span>
          </div>
          <div className="contact__container_content_item">
            <img src={Images.ContactWhatsapp} alt="" className="contact__container_content_item_image" />
            <span>09913365121</span>
          </div>
          <div className="contact__container_content_item">
            <img src={Images.ContactTelegram} alt="" className="contact__container_content_item_image" />
            <span>@zanbori_ir</span>
          </div>
          <div className="contact__container_content_item">
            <img src={Images.ContactPhone} alt="" className="contact__container_content_item_image" />
            <span>09913365121</span>
          </div>
        </div>
      </div>
    </div>
  );
};
