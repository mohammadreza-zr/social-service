import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Images } from "../../assets";
import { CartContext, pageTypes } from "../../context";

import { separate } from "../../utils";

import "./styles/style.css";

const dat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export const WhatsappContent = () => {
  const [data, setData] = useState(dat);
  const [selected, setSelected] = useState([]);

  const { setCartData } = useContext(CartContext);

  const handleChange = (id) => {
    const isSelected = selected.find((item) => id === item);
    if (isSelected) {
      const filtered = selected.filter((item) => item !== id);
      setSelected(filtered);
      setCartData({
        type: pageTypes.WHATSAPP,
        ids: filtered,
      });
    } else {
      setSelected([...selected, id]);
      setCartData({
        type: pageTypes.WEBSITE,
        ids: [...selected, id],
      });
    }
  };

  return (
    <div className="whatsapp">
      <div className="whatsapp__container">
        <div className="whatsapp__container_header">
          <div className="whatsapp__container_header_item">قیمت</div>
          <div className="whatsapp__container_header_item">استان</div>
          <div className="whatsapp__container_header_item">شغل</div>
          <div className="whatsapp__container_header_item">بازدید</div>
          <div className="whatsapp__container_header_item">شماره</div>
        </div>
        <div className="whatsapp__container_body">
          {data.map((item) => {
            return (
              <div className="whatsapp__container_body_items" key={item}>
                <div className="whatsapp__container_body_items_item">
                  <input
                    onChange={() => {
                      handleChange(item);
                    }}
                    type="checkbox"
                    className="whatsapp__container_body_items_item_checkbox"
                  />
                  <span className="whatsapp__container_body_items_item_number">{separate(20000)}</span>
                </div>
                <div className="whatsapp__container_body_items_item">تهران</div>
                <div className="whatsapp__container_body_items_item">برنامه نویس</div>
                <div className="whatsapp__container_body_items_item">400</div>
                <div className="whatsapp__container_body_items_item">
                  <span className="whatsapp__container_body_items_item_phone">0914****111</span>
                </div>
              </div>
            );
          })}
          <div className="whatsapp__container_body_action">
            <Link to={"/#"} className="whatsapp__container_body_action_addToCart">
              <img src={Images.Filter} alt="" className="whatsapp__container_body_action_addToCart_image" />
            </Link>
            <Link
              onClick={(e) => {
                if (selected.length === 0) {
                  e.preventDefault();
                  alert("شما هیچ گزینه ای انتخاب نکردید!");
                  return false;
                }
              }}
              to={`/payment`}
              className="whatsapp__container_body_action_buy"
            >
              خرید
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
