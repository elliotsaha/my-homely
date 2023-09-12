const { atom } = require("recoil");

const cookiePopover = atom({
  key: "cookies",
  default: true,
});

const authState = atom({
  key: "auth", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

const buyProperty = atom({
  key: "buyPropertyArray",
  default: [],
});

export { authState, buyProperty, cookiePopover };
