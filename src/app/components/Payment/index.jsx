import React, { useContext, useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { CartContext } from "../../context";

export const Payment = () => {
  const [value, setValue] = useState("");

  const { cartData } = useContext(CartContext);

  console.log(cartData);

  return (
    <div className="payment">
      <div className="payment__container">
        <h2 className="payment__container_title">چند خط توضیحات برای زمان خرید</h2>
        <form className="payment__container_form">
          <div className="payment__container_form_right">
            <textarea name="" className="payment__container_form_right" cols="30" rows="10"></textarea>
            <textarea name="" className="payment__container_form_right" cols="30" rows="5"></textarea>
          </div>
          <div className="payment__container_form_left">
            <textarea name="" className="payment__container_form_left" cols="30" rows="10"></textarea>
            <DatePicker
              className="payment__container_form_left_date-picker"
              format="YYYY/MM/DD"
              plugins={[<TimePicker hideSeconds position="left" />]}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              value={value}
              // onChange={(e) => setValue(e.year + "/" + (e.month.index + 1) + "/" + e.day)}
              onChange={setValue}
            />
            <input type="file" className="payment__container_form_left_file" />
            {console.log(value)}
          </div>
        </form>
      </div>
    </div>
  );
};
