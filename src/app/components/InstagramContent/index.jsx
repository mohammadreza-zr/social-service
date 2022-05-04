import { useState } from "react";
import { Link } from "react-router-dom";
import { Images } from "../../assets";

import { separate } from "../../utils";

import "./styles/style.css";

const dat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export const InstagramContent = () => {
  const [data, setData] = useState(dat);
  const [storySelected, setSelected] = useState([]);
  const [postSelected, setPostSelected] = useState([]);

  const handleChangeStory = (id) => {
    const isSelected = storySelected.find((item) => id === item);
    if (isSelected) {
      const filtered = storySelected.filter((item) => item !== id);
      setSelected(filtered);
    } else {
      setSelected([...storySelected, id]);
    }
  };

  const handleChangePost = (id) => {
    const isSelected = postSelected.find((item) => id === item);
    if (isSelected) {
      const filtered = postSelected.filter((item) => item !== id);
      setPostSelected(filtered);
    } else {
      setPostSelected([...postSelected, id]);
    }
  };

  return (
    <div className="instagram">
      <div className="instagram__container">
        <div className="instagram__container_header">
          <div className="instagram__container_header_item">قیمت استوری</div>
          <div className="instagram__container_header_item">قیمت پست</div>
          <div className="instagram__container_header_item">اکسپلور</div>
          <div className="instagram__container_header_item">بازدید</div>
          <div className="instagram__container_header_item">لایک</div>
          <div className="instagram__container_header_item">فالو</div>
          <div className="instagram__container_header_item">نام کاربری</div>
        </div>
        <div className="instagram__container_body">
          {data.map((item) => {
            return (
              <div className="instagram__container_body_items" key={item}>
                <div className="instagram__container_body_items_item">
                  <input
                    onChange={() => {
                      handleChangeStory(item);
                    }}
                    type="checkbox"
                    className="instagram__container_body_items_item_checkbox"
                  />
                  <span className="instagram__container_body_items_item_number">{separate(20000)}</span>
                </div>
                <div className="instagram__container_body_items_item">
                  <input
                    onChange={() => {
                      handleChangePost(item);
                    }}
                    type="checkbox"
                    className="instagram__container_body_items_item_checkbox"
                  />
                  <span className="instagram__container_body_items_item_number">{separate(20000)}</span>
                </div>
                <div className="instagram__container_body_items_item">
                  <img src={Images.Accept} alt="" className="instagram__container_body_items_item_icon" />
                </div>
                <div className="instagram__container_body_items_item">14K</div>
                <div className="instagram__container_body_items_item">10K</div>
                <div className="instagram__container_body_items_item">100K</div>
                <div className="instagram__container_body_items_item">
                  <span className="instagram__container_body_items_item_phone">@mohammad</span>
                </div>
              </div>
            );
          })}
          <div className="instagram__container_body_action">
            <Link to={"/#"} className="instagram__container_body_action_addToCart">
              <img src={Images.Filter} alt="" className="instagram__container_body_action_addToCart_image" />
            </Link>
            <Link to={`/payment`} className="instagram__container_body_action_buy">
              خرید
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
