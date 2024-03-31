import { NOTLARI_AL, NOT_EKLE, NOT_SIL } from "../actions";

const s10chLocalStorageKey = "s10d5";

const baslangicDegerleri = {
  notlar: [],
};

function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar !== null) {
    return localStorageStateOku(key);
  } else {
    localStorageStateYaz(key, baslangicDegerleri);
    return baslangicDegerleri;
  }
}

export const reducer = (
  state = baslangicNotlariniGetir(s10chLocalStorageKey),
  action
) => {
  switch (action.type) {
    case NOTLARI_AL:
      localStorageStateYaz(s10chLocalStorageKey, { notlar: action.payload });
      return { ...state, notlar: action.payload };
    case NOT_EKLE:
      localStorageStateYaz(s10chLocalStorageKey, {
        notlar: [...state.notlar, action.payload],
      });
      return { notlar: [...state.notlar, action.payload] };
    case NOT_SIL:
      const updatedNotlar = state.notlar.filter(
        (not) => not.id !== action.payload
      );
      localStorageStateYaz(s10chLocalStorageKey, { notlar: updatedNotlar });
      return { notlar: updatedNotlar };
    default:
      return state;
  }
};
