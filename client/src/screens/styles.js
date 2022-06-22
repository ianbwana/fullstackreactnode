const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const maxWidth = 400;
const minWidth = 350;

export default {
  viewContainer: {
    borderRadius: 6,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    flexDirection: "row",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "Circular-Std",
  },
  normalText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  largeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  extraLargeText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  input: {
    width: "80%",
    height: 45,
    fontSize: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    color: "#FFFFFF",
    padding: 5,
  },
  financialInfo: {
    width: "48%",
    height: 150,
    borderRadius: 8,
    backgroundColor: "#301934",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  modal_background: {
    width: deviceWidth - 40,
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 6,
    marginLeft: 20,
    marginRight: 20,
  },
  modal_outer_background: {
    flex: 1,
    backgroundColor: "#00000070",
    alignItems: "center",
    justifyContent: "center",
    // height: 700,
    // marginTop: 150
  },
  buttonStyle: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 47,
    borderRadius: 5,
  },

  cancel_button: {
    height: 25,
    width: 25,
    position: "absolute",
    top: 20,
    right: 15,
    backgroundColor: "#009ebb",
    borderRadius: 25 / 2,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 0,
    paddingBottom: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
};
