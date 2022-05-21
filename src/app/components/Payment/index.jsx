import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { CartContext } from "../../context";
import { PostRequest } from "../../services";
import { separate } from "../../utils";

import "./styles/style.css";
import { Images } from "../../assets/images";

export const Payment = () => {
  const [value, setValue] = useState("");
  const [caption, setCaption] = useState("");
  const [desc, setDesc] = useState("");
  const [connection, setConnection] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("THREE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const labelDiv = useRef();
  const fileInput = useRef();

  const navigate = useNavigate();

  const { cartData } = useContext(CartContext);

  useEffect(() => {
    if (!cartData.type || cartData.type.length === 0) {
      navigate("/");
    }
  }, [cartData, navigate]);

  const handleSelectFile = () => {
    if (labelDiv.current && fileInput.current) {
      labelDiv.current.style.fontSize = "12px";
      labelDiv.current.innerText = fileInput.current?.files[0]?.name || "+";
    }
  };

  const handleSubmit = async () => {
    try {
      if (!fileInput.current.files[0]) {
        return setError("لطفا فایل را انتخاب کنید");
      }

      setLoading(true);

      let selectedStories = cartData?.ids?.story,
        posts,
        story,
        ids;
      if (cartData.type === "INSTA") {
        posts = cartData?.ids?.post?.map((item) => {
          const isSelectedInPost = cartData?.ids?.story.find((id) => id === item);
          if (isSelectedInPost) {
            selectedStories = selectedStories.filter((id) => id !== item);
            return {
              id: item,
              in: "BOTH",
            };
          } else {
            return {
              id: item,
              in: "POST",
            };
          }
        });
        story = selectedStories?.map((item) => {
          const isSelectedInStory = cartData?.ids?.post.find((id) => id === item);
          if (isSelectedInStory) {
            return {
              id: item,
              in: "BOTH",
            };
          } else {
            return {
              id: item,
              in: "STORY",
            };
          }
        });
        ids = [...posts, ...story];
      } else {
        ids = cartData?.ids?.map((item) => {
          return {
            id: item,
          };
        });
      }

      const data = {
        file: fileInput.current.files[0],
        caption: caption,
        personalDescription: desc,
        costumerContact: connection,
        date: date,
        time: time,
        type: cartData.type,
      };
      const res = await PostRequest("order", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (res.data.status === "success") {
        const res2 = await PostRequest(`complete/${res.data.callback}`, ids, {
          headers: {
            "content-type": "application/json",
          },
        });
        if (res2.data.status === "success") {
          window.location.href = res2.data.callback;
        } else {
          setError("مشکلی پیش آمد");
        }
      } else {
        setError("مشکلی پیش آمد");
      }
    } catch (err) {
      setError("مشکلی پیش آمد");
    }
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h2 className="payment__container_title">چند خط توضیحات برای زمان خرید</h2>
        <form className="payment__container_form">
          <div className="payment__container_form_right">
            <label htmlFor="caption">* کپشن</label>
            <textarea
              name=""
              id="caption"
              className="payment__container_form_right_caption"
              cols="30"
              rows="10"
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
            ></textarea>
            <label htmlFor="desc">* توضیحات شخصی</label>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              name=""
              id="desc"
              className="payment__container_form_right"
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <div className="payment__container_form_left">
            <label htmlFor="connection">* راه های ارتباطی با شما</label>
            <textarea
              name=""
              id="connection"
              className="payment__container_form_left_connection"
              cols="30"
              rows="10"
              placeholder="تلگرام, ایمیل, واتساپ یا شماره تماس"
              onChange={(e) => setConnection(e.target.value)}
              value={connection}
            ></textarea>
            <div className="payment__container_form_left_time">
              <div className="payment__container_form_left_time_date">
                <label htmlFor="date">* تاریخ</label>
                <DatePicker
                  id="date"
                  className="payment__container_form_left_date-picker"
                  format="YYYY/MM/DD"
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  value={value}
                  onChange={(e) => {
                    setValue(e);
                    setDate(e.unix);
                  }}
                />
              </div>
              <div className="payment__container_form_left_time_time">
                <span>* ساعت</span>
                <select
                  onChange={(e) => setTime(e.target.value)}
                  className="payment__container_form_left_time_time_select"
                >
                  <option value="THREE">3</option>
                  <option value="EIGHT">8</option>
                  <option value="ELEVEN">11</option>
                  <option value="FIFTEEN">15</option>
                  <option value="NINETEEN">19</option>
                  <option value="TWENTY_ONE">21</option>
                  <option value="TWENTY_THREE">23</option>
                </select>
              </div>
            </div>
            <div className="payment__container_form_left_file">
              <label htmlFor="file">
                * فایل
                <div ref={labelDiv} className="payment__container_form_left_file_selector">
                  +
                </div>
              </label>
              <input
                type="file"
                onChange={handleSelectFile}
                ref={fileInput}
                id="file"
                className="payment__container_form_left_file_input"
              />
            </div>
          </div>
        </form>
        <div className="payment__container_submit">
          <p>مبلغ کل سفارشات شما {separate(cartData?.price)} تومان میباشد</p>
          <p className="payment__container_submit_error">{error}</p>
          {loading ? (
            <img src={Images.Loading} alt="" className="payment__container_submit_loading" />
          ) : (
            <button onClick={handleSubmit} className="payment__container_submit_btn">
              پرداخت
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
