import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CartContext, pageTypes } from "../../context";
import { separate } from "../../utils";
import { PostRequest } from "../../services";

import { Images } from "../../assets";

import "./styles/style.css";

let allPrice = 0;
let first = false;
export const WhatsappContent = ({ categoryId, sortField, searchValue }) => {
  const { setCartData } = useContext(CartContext);

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(25);
  const [theLastPrice, setTheLastPrice] = useState(0);

  if (theLastPrice !== allPrice) {
    allPrice = 0;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await PostRequest("whatsapp", {
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

  const handleChange = (id, price) => {
    const isSelected = selected.find((item) => id === item);
    if (isSelected) {
      const filtered = selected.filter((item) => item !== id);
      allPrice -= price;
      setSelected(filtered);
      setCartData({
        type: pageTypes.WHATSAPP,
        ids: filtered,
        price: allPrice,
      });
    } else {
      allPrice += price;
      setTheLastPrice(allPrice);
      setSelected([...selected, id]);
      setCartData({
        type: pageTypes.WHATSAPP,
        ids: [...selected, id],
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
        const res = await PostRequest("whatsapp/search", {
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

  function hideMiddle(string, prefixLength, suffixLength) {
    var re = new RegExp("^(\\+?\\d{" + prefixLength + "})(\\d+)(\\d{" + suffixLength + "})$");

    return string.replace(re, function (match, prefix, middle, suffix) {
      return prefix + "*".repeat(middle.length) + suffix;
    });
  }

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
          {data &&
            data.map((item) => {
              return (
                <div className="whatsapp__container_body_items" key={item.id}>
                  <div className="whatsapp__container_body_items_item">
                    <input
                      onChange={() => {
                        handleChange(item.id, item.price);
                      }}
                      type="checkbox"
                      className="whatsapp__container_body_items_item_checkbox"
                    />
                    <span className="whatsapp__container_body_items_item_number">{separate(item.price)}</span>
                  </div>
                  <div className="whatsapp__container_body_items_item">{item.province}</div>
                  <div className="whatsapp__container_body_items_item">{item.job}</div>
                  <div className="whatsapp__container_body_items_item">{item.view}</div>
                  <div className="whatsapp__container_body_items_item">
                    <span className="whatsapp__container_body_items_item_phone">
                      {hideMiddle(item.phoneNumber, 4, 3)}
                    </span>
                  </div>
                </div>
              );
            })}
          {page <= data.length && (
            <div className="whatsapp__container_body_load">
              <button onClick={loadMore} className="whatsapp__container_body_load_btn">
                بیشتر
              </button>
            </div>
          )}

          <div className="whatsapp__container_body_action">
            <div className="whatsapp__container_body_action_link">
              <Link to={"/contact"} className="whatsapp__container_body_action_addToCart">
                <img src={Images.AddAccount} alt="" className="whatsapp__container_body_action_addToCart_image" />
              </Link>
            </div>
            {selected.length > 0 ? (
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
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
