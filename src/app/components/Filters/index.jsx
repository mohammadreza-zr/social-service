import { useEffect, useRef, useState } from "react";

import { GetRequest } from "../../services";

import { Images } from "../../assets";

import "./styles/style.css";

function check(s) {
  var PersianOrASCII = /[آ-ی]|([a-zA-Z])/;
  let m;
  if ((m = s.match(PersianOrASCII)) !== null) {
    if (m[1]) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

export const Filters = ({ setCategoryId, setSortField, setSearchValue }) => {
  //open close toggle
  const [category, setCategory] = useState(false);

  //all elements call from server
  const [categoryItems, setCategoryItems] = useState(null);

  //show on the top
  const [categoryValue, setCategoryValue] = useState("");

  //open close toggle
  const [sort, setSort] = useState(false);

  //show on the top
  const [sortValue, setSortValue] = useState("");

  //search input for change style
  const [searchInput, setSearchInput] = useState("");

  const search = useRef(null);
  const categoryList = useRef(null);
  const sortList = useRef(null);

  const handleClickCategory = () => {
    setCategory(!category);
  };
  const handleClickSort = () => {
    setSort(!sort);
  };

  useEffect(() => {
    if (!check(searchInput)) search.current.style.direction = "ltr";
    else search.current.style.direction = "rtl";
  }, [searchInput]);

  useEffect(() => {
    if (category) {
      categoryList.current.style.visibility = "visible";
      categoryList.current.style.height = "auto";
    } else {
      categoryList.current.style.visibility = "hidden";
      categoryList.current.style.height = "0";
    }
  }, [category]);

  useEffect(() => {
    if (sort) {
      sortList.current.style.visibility = "visible";
      sortList.current.style.height = "auto";
    } else {
      sortList.current.style.visibility = "hidden";
      sortList.current.style.height = "0";
    }
  }, [sort]);

  //call the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetRequest("label");
        if (res.status === 200) setCategoryItems(res.data);
      } catch (er) {}
    };

    fetchData();
    return () => {};
  }, []);

  //set category on the top
  const handleSetCategory = (e) => {
    setCategoryValue(e.target.innerText);
    setCategory(false);
    setCategoryId(e.target.id);
  };

  return (
    <div className="filters">
      <div className="filters__container">
        <div className="filters__container_search">
          <input
            ref={search}
            onChange={(e) => {
              setSearchInput(e.target.value);
              if (e.target.value.length === 0) {
                setSearchValue(e.target.value);
              }
            }}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                setSearchValue(e.target.value);
              }
            }}
            type="text"
            className="filters__container_search_input"
            placeholder="جستجو"
          />
          <img src={Images.Search} alt="" className="filters__container_search_icon" />
        </div>
        <div className="filters__container_category">
          <div className="filters__container_category_top" onClick={handleClickCategory}>
            <div className="filters__container_category_top_content">
              <img src={Images.Arrow} alt="" className="filters__container_category_top_content_icon" />
              <span className="filters__container_category_top_content_name">
                {categoryValue.length === 0 ? "همه" : categoryValue}
              </span>
            </div>
            <span className="filters__container_category_top_listIcon">
              <img src={Images.PageIcon} alt="" />
            </span>
          </div>
          <div className="filters__container_category_list" ref={categoryList}>
            {categoryItems && categoryValue.length !== 0 && (
              <span id="null" onClick={handleSetCategory} className="filters__container_category_list_item">
                همه
              </span>
            )}
            {categoryItems &&
              categoryItems.map((item) => {
                return (
                  <span
                    id={item?.id + 1}
                    key={item?.id}
                    onClick={handleSetCategory}
                    className="filters__container_category_list_item"
                  >
                    {item?.name}
                  </span>
                );
              })}
          </div>
        </div>
        <div className="filters__container_sort">
          <div className="filters__container_sort_top" onClick={handleClickSort}>
            <div className="filters__container_sort_top_content">
              <img src={Images.Arrow} alt="" className="filters__container_sort_top_content_icon" />
              <span className="filters__container_sort_top_content_name">
                {sortValue.length === 0 ? "همه" : sortValue}
              </span>
            </div>
            <span className="filters__container_sort_top_listIcon">
              <img src={Images.Filter} alt="" />
            </span>
          </div>
          <div className="filters__container_sort_list" ref={sortList}>
            {sortValue.length !== 0 && (
              <span
                onClick={(e) => {
                  setSortValue(e.target.innerText);
                  setSort(false);
                  setSortField("null");
                }}
                className="filters__container_sort_list_item"
              >
                همه
              </span>
            )}

            <span
              onClick={(e) => {
                setSortValue(e.target.innerText);
                setSort(false);
                setSortField("CHEAPEST");
              }}
              className="filters__container_sort_list_item"
            >
              ارزانترین ها
            </span>
            <span
              onClick={(e) => {
                setSortValue(e.target.innerText);
                setSort(false);
                setSortField("EXPENSIVE");
              }}
              className="filters__container_sort_list_item"
            >
              گرانترین ها
            </span>
            <span
              onClick={(e) => {
                setSortValue(e.target.innerText);
                setSort(false);
                setSortField("BEST");
              }}
              className="filters__container_sort_list_item"
            >
              بهترین ها
            </span>
            <span
              onClick={(e) => {
                setSortValue(e.target.innerText);
                setSort(false);
                setSortField("ECONOMICAL");
              }}
              className="filters__container_sort_list_item"
            >
              اقتصادی
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
