import { useState } from "react";
import { Link } from "react-router-dom";

import { separate } from "../../utils";

import { Images } from "../../assets";

import "./styles/style.css";

const dat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export const WebContent = () => {
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
    <div className="webContent">
      <div className="webContent__container">
        <div className="webContent__container_header">
          <div className="webContent__container_header_item">قیمت</div>
          <div className="webContent__container_header_item">کلیک</div>
          <div className="webContent__container_header_item">بازدید</div>
          <div className="webContent__container_header_item">موضوع</div>
          <div className="webContent__container_header_item">آدرس</div>
        </div>
        <div className="webContent__container_body">
          {data.map((item) => {
            return (
              <div className="webContent__container_body_items" key={item}>
                <div className="webContent__container_body_items_item">
                  <input
                    onChange={() => {
                      handleChange(item);
                    }}
                    type="checkbox"
                    className="webContent__container_body_items_item_checkbox"
                  />
                  <span className="webContent__container_body_items_item_number">{separate(20000)}</span>
                </div>
                <div className="webContent__container_body_items_item">{item}</div>
                <div className="webContent__container_body_items_item">500</div>
                <div className="webContent__container_body_items_item">شخصی</div>
                <div className="webContent__container_body_items_item">
                  <a href="https://mr-zare.ir">mr-zare.ir</a>
                </div>
              </div>
            );
          })}
          <div className="webContent__container_body_action">
            <Link to={"/#"} className="webContent__container_body_action_addToCart">
              <img src={Images.Filter} alt="" className="webContent__container_body_action_addToCart_image" />
            </Link>
            <Link to={`/payment`} className="webContent__container_body_action_buy">
              خرید
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
