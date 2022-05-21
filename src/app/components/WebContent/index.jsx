import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CartContext, pageTypes } from "../../context";
import { separate } from "../../utils";
import { PostRequest } from "../../services";

import { Images } from "../../assets";

import "./styles/style.css";

let allPrice = 0;
let first = false;
export const WebContent = ({ categoryId, sortField, searchValue }) => {
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
        const res = await PostRequest("website", {
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
      setTheLastPrice(allPrice);
      setSelected(filtered);
      setCartData({
        type: pageTypes.WEBSITE,
        ids: filtered,
        price: allPrice,
      });
    } else {
      allPrice += price;
      setSelected([...selected, id]);
      setCartData({
        type: pageTypes.WEBSITE,
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
        const res = await PostRequest("website/search", {
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
          {data &&
            data.map((item) => {
              return (
                <div className="webContent__container_body_items" key={item.id}>
                  <div className="webContent__container_body_items_item">
                    <input
                      onChange={() => {
                        handleChange(item.id, item.price);
                      }}
                      type="checkbox"
                      className="webContent__container_body_items_item_checkbox"
                    />
                    <span className="webContent__container_body_items_item_number">{separate(item.price)}</span>
                  </div>
                  <div className="webContent__container_body_items_item">{item.click}</div>
                  <div className="webContent__container_body_items_item">{item.view}</div>
                  <div className="webContent__container_body_items_item">{item.issue}</div>
                  <div className="webContent__container_body_items_item">
                    <span>{item.address}</span>
                  </div>
                </div>
              );
            })}

          {page <= data.length && (
            <div className="webContent__container_body_load">
              <button onClick={loadMore} className="webContent__container_body_load_btn">
                بیشتر
              </button>
            </div>
          )}

          <div className="webContent__container_body_action">
            <div className="webContent__container_body_action_link">
              <Link to={"/#"} className="webContent__container_body_action_addToCart">
                <img src={Images.Filter} alt="" className="webContent__container_body_action_addToCart_image" />
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
                className="webContent__container_body_action_buy"
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
