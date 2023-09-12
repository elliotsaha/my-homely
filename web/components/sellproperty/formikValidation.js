import * as Yup from "yup";
const schema = Yup.object().shape({
  // VALIDATION FOR BASIC DETAILS
  owners: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid Email").required("Required"),
    })
  ),
  StreetAddress: Yup.string()
    .required("Required")
    .test("address-validator", "Not Valid Address", function (value) {
      const encoded = encodeURI(value);
      return fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}`
      )
        .then((res) => res.json())
        .then((data) => data.status === "OK");
    }),
  Unit: Yup.string(),
  PropertyType: Yup.string().required("Required"),
  YearBuilt: Yup.string().required("Required"),
  PropertyTax: Yup.string()
    .required("Required")
    .matches(
      /^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:\.[0-9]{2})?|(?:\.[0-9]{3})*(?:,[0-9]{2})?)$/,
      "Property Tax Not Valid"
    ),
  HouseSize: Yup.object().shape({
    width: Yup.string()
      .required("Required")
      .matches(/^(\d+|\d{1,3}(,\d{3})*)$/, "Not Valid Input"),
    length: Yup.string()
      .required("Required")
      .matches(/^(\d+|\d{1,3}(,\d{3})*)$/, "Not Valid Input"),
    unit: Yup.string().required("Required"),
  }),
  LotSize: Yup.object().shape({
    width: Yup.string()
      .required("Required")
      .matches(/^(\d+|\d{1,3}(,\d{3})*)$/, "Not Valid Input"),
    length: Yup.string()
      .required("Required")
      .matches(/^(\d+|\d{1,3}(,\d{3})*)$/, "Not Valid Input"),
    unit: Yup.string().required("Required"),
  }),

  LivingArea: Yup.object().shape({
    width: Yup.string()
      .required("Required")
      .matches(/^(\d+|\d{1,3}(,\d{3})*)$/, "Not Valid Input"),
    length: Yup.string()
      .required("Required")
      .matches(/^(\d+|\d{1,3}(,\d{3})*)$/, "Not Valid Input"),
    unit: Yup.string().required("Required"),
  }),

  Stories: Yup.string().required("Required"),
  Bedrooms: Yup.string().required("Required"),
  Bathrooms: Yup.string().required("Required"),
  GarageSpaces: Yup.string().required("Required"),
  ParkingSpaces: Yup.string().required("Required"),
  Basement: Yup.bool().required("Required"),

  BasementFinished: Yup.string().when("Basement", {
    is: true,
    then: Yup.string().required("Required"),
  }),

  BasementLivingArea: Yup.object()
    .shape({
      width: Yup.string(),
      length: Yup.string(),
      unit: Yup.string(),
    })
    .when("BasementFinished", {
      is: "YES",
      then: Yup.object().shape({
        width: Yup.string()
          .required("Required")
          .matches(/^(\d+|\d{1,3}(,\d{3})*)$/, "Not Valid Input"),
        length: Yup.string()
          .required("Required")
          .matches(/^(\d+|\d{1,3}(,\d{3})*)$/, "Not Valid Input"),
        unit: Yup.string().required("Required"),
      }),
    }),

  BasementSize: Yup.object()
    .shape({
      width: Yup.string(),
      length: Yup.string(),
      unit: Yup.string(),
    })
    .when("Basement", {
      is: true,
      then: Yup.object().shape({
        width: Yup.string()
          .required("Required")
          .matches(/^(\d+|\d{1,3}(,\d{3})*)$/, "Not Valid Input"),
        length: Yup.string()
          .required("Required")
          .matches(/^(\d+|\d{1,3}(,\d{3})*)$/, "Not Valid Input"),
        unit: Yup.string().required("Required"),
      }),
    }),

  Kitchen: Yup.object().shape({
    Others: Yup.string(),
    Options: Yup.object()
      .test("checkOne", "Check Atleast One Checkbox", function (value) {
        if (Object.keys(value).every((k) => !value[k])) {
          return false;
        } else {
          return true;
        }
      })
      .when("Others", (value) => {
        if (value !== undefined) return Yup.object();
      }),
  }),

  "Exterior Features": Yup.object().shape({
    Others: Yup.string(),
    Options: Yup.object()
      .test("checkOne", "Check Atleast One Checkbox", function (value) {
        if (Object.keys(value).every((k) => !value[k])) {
          return false;
        } else {
          return true;
        }
      })
      .when("Others", (value) => {
        if (value !== undefined) return Yup.object();
      }),
  }),

  "Electricity & Lighting": Yup.object().shape({
    Others: Yup.string(),
    Options: Yup.object()
      .test("checkOne", "Check Atleast One Checkbox", function (value) {
        if (Object.keys(value).every((k) => !value[k])) {
          return false;
        } else {
          return true;
        }
      })
      .when("Others", (value) => {
        if (value !== undefined) return Yup.object();
      }),
  }),

  Flooring: Yup.object().shape({
    Others: Yup.string(),
    Options: Yup.object()
      .test("checkOne", "Check Atleast One Checkbox", function (value) {
        if (Object.keys(value).every((k) => !value[k])) {
          return false;
        } else {
          return true;
        }
      })
      .when("Others", (value) => {
        if (value !== undefined) return Yup.object();
      }),
  }),

  "Heating & Cooling": Yup.object().shape({
    Others: Yup.string(),
    Options: Yup.object()
      .test("checkOne", "Check Atleast One Checkbox", function (value) {
        if (Object.keys(value).every((k) => !value[k])) {
          return false;
        } else {
          return true;
        }
      })
      .when("Others", (value) => {
        if (value !== undefined) return Yup.object();
      }),
  }),

  "Doors & Windows": Yup.object().shape({
    Others: Yup.string(),
    Options: Yup.object()
      .test("checkOne", "Check Atleast One Checkbox", function (value) {
        if (Object.keys(value).every((k) => !value[k])) {
          return false;
        } else {
          return true;
        }
      })
      .when("Others", (value) => {
        if (value !== undefined) return Yup.object();
      }),
  }),

  "Other Features": Yup.object().shape({
    Others: Yup.string(),
    Options: Yup.object()
      .test("checkOne", "Check Atleast One Checkbox", function (value) {
        if (Object.keys(value).every((k) => !value[k])) {
          return false;
        } else {
          return true;
        }
      })
      .when("Others", (value) => {
        if (value !== undefined) return Yup.object();
      }),
  }),

  "Roof & Foundation": Yup.object().shape({
    Others: Yup.string(),
    Options: Yup.object()
      .test("checkOne", "Check Atleast One Checkbox", function (value) {
        if (Object.keys(value).every((k) => !value[k])) {
          return false;
        } else {
          return true;
        }
      })
      .when("Others", (value) => {
        if (value !== undefined) return Yup.object();
      }),
  }),

  PropertyDescription: Yup.string()
    .required("Required Field")
    .min(100, "Minimum of 100 Characters Needed"),

  AskingPrice: Yup.string().required("Required Field"),

  // PHOTOS AND VIDEOS
  PhotographyServices: Yup.boolean().required(),

  PhotographyPackage: Yup.object().when("PhotographyServices", {
    is: true,
    then: Yup.object().required(),
    otherwise: Yup.object(),
  }),

  MarketYourHome: Yup.object().shape({
    emailCampaign: Yup.boolean(),
    socialMediaCampaign: Yup.boolean(),
  }),

  LegalServices: Yup.object().shape({
    representation: Yup.boolean(),
  }),

  HouseImages: Yup.array().when("PhotographyServices", {
    is: false,
    then: Yup.array().test(
      "Under",
      " Please have between 16-25 images",
      function (value) {
        if (value.length < 16 || value.length > 25) {
          return false;
        } else {
          return true;
        }
      }
    ),
  }),
});

export default schema;
