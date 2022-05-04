import { useEffect, useRef, useState } from "react";

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

export const Filters = () => {
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState(false);
  const [sort, setSort] = useState(false);
  const [sortValue, setSortValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

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

  return (
    <div className="filters">
      <div className="filters__container">
        <div className="filters__container_search">
          <input
            ref={search}
            onChange={(e) => setSearchInput(e.target.value)}
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
            <span
              onClick={(e) => {
                setCategoryValue(e.target.innerText);
                setCategory(false);
              }}
              className="filters__container_category_list_item"
            >
              موزیک
            </span>
            <span
              onClick={(e) => {
                setCategoryValue(e.target.innerText);
                setCategory(false);
              }}
              className="filters__container_category_list_item"
            >
              آموزشی
            </span>
            <span
              onClick={(e) => {
                setCategoryValue(e.target.innerText);
                setCategory(false);
              }}
              className="filters__container_category_list_item"
            >
              سرگرمی
            </span>
            <span
              onClick={(e) => {
                setCategoryValue(e.target.innerText);
                setCategory(false);
              }}
              className="filters__container_category_list_item"
            >
              آشپزی
            </span>
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
            <span
              onClick={(e) => {
                setSortValue(e.target.innerText);
                setSort(false);
              }}
              className="filters__container_sort_list_item"
            >
              ارزانترین ها
            </span>
            <span
              onClick={(e) => {
                setSortValue(e.target.innerText);
                setSort(false);
              }}
              className="filters__container_sort_list_item"
            >
              گرانترین ها
            </span>
            <span
              onClick={(e) => {
                setSortValue(e.target.innerText);
                setSort(false);
              }}
              className="filters__container_sort_list_item"
            >
              بهترین ها
            </span>
            <span
              onClick={(e) => {
                setSortValue(e.target.innerText);
                setSort(false);
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
