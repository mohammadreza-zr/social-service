import { useState } from "react";
import { Link } from "react-router-dom";
import { Images } from "../../assets";

import { separate } from "../../utils";

import "./styles/style.css";

const dat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export const TelegramContent = () => {
  const [data, setData] = useState(dat);
  const [selected, setSelected] = useState([]);

  const handleChange = (id) => {
    const isSelected = selected.find((item) => id === item);
    if (isSelected) {
      const filtered = selected.filter((item) => item !== id);
      setSelected(filtered);
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="telegram">
      <div className="telegram__container">
        <div className="telegram__container_header">
          <div className="telegram__container_header_item">قیمت</div>
          <div className="telegram__container_header_item">بازدید</div>
          <div className="telegram__container_header_item">اعضا</div>
          <div className="telegram__container_header_item">نام</div>
          <div className="telegram__container_header_item">آیدی</div>
        </div>
        <div className="telegram__container_body">
          {data.map((item) => {
            return (
              <div className="telegram__container_body_items" key={item}>
                <div className="telegram__container_body_items_item">
                  <input
                    onChange={() => {
                      handleChange(item);
                    }}
                    type="checkbox"
                    className="telegram__container_body_items_item_checkbox"
                  />
                  <span className="telegram__container_body_items_item_number">{separate(20000)}</span>
                </div>
                <div className="telegram__container_body_items_item">24K</div>
                <div className="telegram__container_body_items_item">20K</div>
                <div className="telegram__container_body_items_item">فروشگاه لباس ما</div>
                <div className="telegram__container_body_items_item">
                  <span className="telegram__container_body_items_item_phone">@our_shopping</span>
                </div>
              </div>
            );
          })}
          <div className="telegram__container_body_action">
            <Link to={"/#"} className="telegram__container_body_action_addToCart">
              <img src={Images.Filter} alt="" className="telegram__container_body_action_addToCart_image" />
            </Link>
            <Link to={`/payment`} className="telegram__container_body_action_buy">
              خرید
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
