import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CartContext, pageTypes } from "../../context";
import { separate } from "../../utils";

import { Images } from "../../assets";

import "./styles/style.css";
// import { GetRequest } from "../../services";

function Items({ currentItems, handleChangeStory, handleChangePost }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div className="instagram__container_body_items" key={item.id}>
            <div className="instagram__container_body_items_item">
              <input
                onChange={() => {
                  handleChangeStory(item.id);
                }}
                type="checkbox"
                className="instagram__container_body_items_item_checkbox"
              />
              <span title="تومان" className="instagram__container_body_items_item_number">
                {separate(item.storyPrice)}
              </span>
            </div>
            <div className="instagram__container_body_items_item">
              <input
                onChange={() => {
                  handleChangePost(item.id);
                }}
                type="checkbox"
                className="instagram__container_body_items_item_checkbox"
              />
              <span title="تومان" className="instagram__container_body_items_item_number">
                {separate(item.postPrice)}
              </span>
            </div>
            <div className="instagram__container_body_items_item">
              <img
                src={item.explore ? Images.Accept : Images.Reject}
                alt=""
                className="instagram__container_body_items_item_icon"
              />
            </div>
            <div className="instagram__container_body_items_item">{item.view}K</div>
            <div className="instagram__container_body_items_item">{item.like}K</div>
            <div className="instagram__container_body_items_item">{item.follow}K</div>
            <div className="instagram__container_body_items_item">
              <span className="instagram__container_body_items_item_phone">{item.username}</span>
            </div>
          </div>
        ))}
    </>
  );
}

export const InstagramContent = () => {
  const [data, setData] = useState([]);
  const [storySelected, setSelected] = useState([]);
  const [postSelected, setPostSelected] = useState([]);

  const { setCartData } = useContext(CartContext);

  useEffect(() => {
    async function fetchData() {
      try {
        // const res = await GetRequest("insta");
        // console.log(res.data);
        setData([
          {
            createdAt: "2022-05-14T01:18:20.676Z",
            explore: true,
            follow: 0,
            id: "string",
            labels: [0],
            like: 0,
            postPrice: 0,
            storyPrice: 0,
            updatedAt: "2022-05-14T01:18:20.676Z",
            username: "string",
            view: 0,
          },
          {
            createdAt: "2022-05-14T01:18:20.676Z",
            explore: false,
            follow: 0,
            id: "string2",
            labels: [0],
            like: 2,
            postPrice: 0,
            storyPrice: 0,
            updatedAt: "2022-05-14T01:18:20.676Z",
            username: "string",
            view: 0,
          },
          {
            createdAt: "2022-05-14T01:18:20.676Z",
            explore: true,
            follow: 0,
            id: "string3",
            labels: [0],
            like: 0,
            postPrice: 0,
            storyPrice: 0,
            updatedAt: "2022-05-14T01:18:20.676Z",
            username: "string2",
            view: 100,
          },
          {
            createdAt: "2022-05-14T01:18:20.676Z",
            explore: true,
            follow: 0,
            id: "string4",
            labels: [0],
            like: 0,
            postPrice: 0,
            storyPrice: 0,
            updatedAt: "2022-05-14T01:18:20.676Z",
            username: "string",
            view: 0,
          },
          {
            createdAt: "2022-05-14T01:18:20.676Z",
            explore: true,
            follow: 0,
            id: "string5",
            labels: [0],
            like: 0,
            postPrice: 0,
            storyPrice: 0,
            updatedAt: "2022-05-14T01:18:20.676Z",
            username: "string",
            view: 0,
          },
        ]);
      } catch (err) {}
    }
    fetchData();

    return () => {};
  }, []);

  const handleSearch = async () => {
    try {
      // const res = await GetRequest("insta/search",{
      //   "filter": "CHEAPEST",
      //   "label": 0,
      //   "limit": 0,
      //   "limitAsInt": 0,
      //   "offset": 0,
      //   "offsetAsInt": 0,
      //   "searchText": "string"
      // });
      // console.log(res.data);
    } catch (err) {}
  };

  const handleChangeStory = (id) => {
    const isSelected = storySelected.find((item) => id === item);
    if (isSelected) {
      const filtered = storySelected.filter((item) => item !== id);
      setSelected(filtered);
      setCartData({
        type: pageTypes.INSTA,
        ids: [filtered, postSelected],
      });
    } else {
      setSelected([...storySelected, id]);
      setCartData({
        type: pageTypes.INSTA,
        ids: [[...storySelected, id], postSelected],
      });
    }
  };

  const handleChangePost = (id) => {
    const isSelected = postSelected.find((item) => id === item);
    if (isSelected) {
      const filtered = postSelected.filter((item) => item !== id);
      setPostSelected(filtered);
      setCartData({
        type: pageTypes.INSTA,
        ids: [filtered, storySelected],
      });
    } else {
      setPostSelected([...postSelected, id]);
      setCartData({
        type: pageTypes.INSTA,
        ids: { post: [...postSelected, id], story: storySelected },
      });
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
          <Items currentItems={data} handleChangePost={handleChangePost} handleChangeStory={handleChangeStory} />
          <div className="instagram__container_body_action">
            <Link to={"/#"} className="instagram__container_body_action_addToCart">
              <img src={Images.Filter} alt="" className="instagram__container_body_action_addToCart_image" />
            </Link>
            <Link
              onClick={(e) => {
                if (storySelected.length === 0 && postSelected.length === 0) {
                  e.preventDefault();
                  alert("شما هیچ گزینه ای انتخاب نکردید!");
                  return false;
                }
              }}
              to={`/payment`}
              className="instagram__container_body_action_buy"
            >
              خرید
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
