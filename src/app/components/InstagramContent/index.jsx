import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CartContext, pageTypes } from "../../context";
import { separate } from "../../utils";
import { PostRequest } from "../../services";

import { Images } from "../../assets";

import "./styles/style.css";

let allPrice = 0;
let first = false;
export const InstagramContent = ({ categoryId, sortField, searchValue }) => {
  const { setCartData } = useContext(CartContext);

  const [data, setData] = useState([]);
  const [storySelected, setSelected] = useState([]);
  const [postSelected, setPostSelected] = useState([]);
  const [page, setPage] = useState(25);
  const [theLastPrice, setTheLastPrice] = useState(0);

  if (theLastPrice !== allPrice) {
    allPrice = 0;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await PostRequest("insta", {
          limit: 25,
          limitAsInt: 25,
          offset: 0,
          offsetAsInt: 0,
        });
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (err) {}
    }
    fetchData();

    return () => {};
  }, []);

  const loadMore = () => {
    setPage(page + 25);
  };

  const handleChangeStory = (id, price) => {
    const isSelected = storySelected.find((item) => id === item);
    if (isSelected) {
      const filtered = storySelected.filter((item) => item !== id);
      setSelected(filtered);
      allPrice -= price;
      setTheLastPrice(allPrice);
      setCartData({
        type: pageTypes.INSTA,
        ids: { post: postSelected, story: [filtered] },
        price: allPrice,
      });
    } else {
      setSelected([...storySelected, id]);
      allPrice += price;
      setTheLastPrice(allPrice);
      setCartData({
        type: pageTypes.INSTA,
        ids: { post: postSelected, story: [...storySelected, id] },
        price: allPrice,
      });
    }
  };

  const handleChangePost = (id, price) => {
    const isSelected = postSelected.find((item) => id === item);
    if (isSelected) {
      const filtered = postSelected.filter((item) => item !== id);
      allPrice -= price;
      setTheLastPrice(allPrice);
      setPostSelected(filtered);
      setCartData({
        type: pageTypes.INSTA,
        ids: { post: [filtered], story: storySelected },
        price: allPrice,
      });
    } else {
      setPostSelected([...postSelected, id]);
      allPrice += price;
      setTheLastPrice(allPrice);
      setCartData({
        type: pageTypes.INSTA,
        ids: { post: [...postSelected, id], story: storySelected },
        price: allPrice,
      });
    }
  };

  useEffect(() => {
    const filterData = async () => {
      try {
        let sortFieldToSend = sortField;
        if (sortField === "null") {
          sortFieldToSend = null;
        }
        const res = await PostRequest("insta/search", {
          filter: sortFieldToSend,
          label: +categoryId,
          limit: page,
          limitAsInt: 25,
          offset: 0,
          offsetAsInt: 0,
          searchText: searchValue ? (searchValue.length > 0 ? searchValue : null) : null,
        });
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (err) {}
    };
    if (first) {
      filterData();
    }
    first = true;
  }, [searchValue, categoryId, sortField, page]);

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
          {data &&
            data.map((item) => (
              <div className="instagram__container_body_items" key={item.id}>
                <div className="instagram__container_body_items_item">
                  <input
                    onChange={() => {
                      handleChangeStory(item.id, item.storyPrice);
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
                      handleChangePost(item.id, item.postPrice);
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
          {page <= data.length && (
            <div className="instagram__container_body_load">
              <button onClick={loadMore} className="instagram__container_body_load_btn">
                بیشتر
              </button>
            </div>
          )}

          <div className="instagram__container_body_action">
            <div className="instagram__container_body_action_link">
              <Link to={"/#"} className="instagram__container_body_action_addToCart">
                <img src={Images.Filter} alt="" className="instagram__container_body_action_addToCart_image" />
              </Link>
            </div>
            {storySelected.length > 0 || postSelected.length > 0 ? (
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
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
