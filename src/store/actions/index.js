import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const NOT_EKLE = "NOT_EKLE";
export const NOT_SIL = "NOT_SIL";
export const NOTLARI_AL = "NOTLARI_AL";

export function notEkle(not) {
  return { type: NOT_EKLE, payload: not };
}

export function notSil(notId) {
  return { type: NOT_SIL, payload: notId };
}

export function notlariAl(notlar) {
  return { type: NOTLARI_AL, payload: notlar };
}

export const notEkleAPI = (yeniNot) => (dispatch) => {
  axios
    .post("https://nextgen-project.onrender.com/api/s10d5/gratitudes", yeniNot)
    .then((res) => {
      if (res.status === 201) {
        console.log("response.data:" + res.data);
        dispatch(notEkle(res.data));
        toast(
          "Notun başarıyla kaydedildi. Güzelliklerle dolu bir gün dileğiyle...",
          { autoClose: 15000 }
        );
      }
      // res.data objesi içerisinden ihtiyaç duyduğun değeri bul ve oluşturduğun notEkle ile dispatch et (status codea dikkat)
    })
    .catch((error) => console.log(error));
};

export const notlariAlAPI = () => (dispatch) => {
  axios
    .get("https://nextgen-project.onrender.com/api/s10d5/gratitudes")
    .then((res) => {
      if (res.status === 200) {
        dispatch(notlariAl(res.data));
        /* console.log("al api:" + res.data); */
        // response olarak gelen datayı notlariAl ile dispatch et.
      }
    })
    .catch((error) => console.log(error));
};

// notSilAPI buraya
export const notSilAPI = (id) => (dispatch) => {
  console.log("id:" + id);
  axios
    .delete(`https://nextgen-project.onrender.com/api/s10d5/gratitudes/${id}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(notSil(id));
        toast("Notunuz silindi...");
        console.log("sil apı:" + res.data);
      }
    })
    .catch((error) => toast("Bir hata oluştu!"));
};
