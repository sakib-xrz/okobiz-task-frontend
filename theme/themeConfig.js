const themeConfig = {
  token: {
    controlHeightSM: 34,
    controlHeight: 40,
    controlHeightLG: 46,
    colorPrimary: "#0f766e",
    algorithm: true,
    colorInfo: "#0f766e",
  },
  components: {
    Button: {
      defaultShadow: "",
      primaryShadow: "",
      fontWeight: 600,
      algorithm: true,
    },
    Dropdown: {
      paddingBlock: 12,
      fontSize: 16,
      fontSizeIcon: 16,
      algorithm: true,
    },
    Menu: {
      horizontalItemSelectedColor: "rgb(15,118,110)",
      horizontalItemHoverColor: "rgb(15,118,110)",
      colorPrimaryBorder: "rgba(15,118,109,0.1)",
      controlHeightLG: 46,
      itemActiveBg: "rgba(15,118,109,0.1)",
      itemHoverBg: "rgba(15,118,109,0.1)",
      itemHoverColor: "rgb(15,118,110)",
      groupTitleColor: "rgb(15,118,110)",
      itemSelectedColor: "rgb(15,118,110)",
      itemSelectedBg: "rgba(15,118,109,0.1)",
      algorithm: true,
    },
    Pagination: {
      colorPrimary: "rgb(15,118,110)",
      colorPrimaryBorder: "rgba(15,118,109,0.1)",
      colorPrimaryHover: "rgba(15,118,109,0.9)",
      controlOutline: "rgba(15,118,109,0.1)",
      colorBgTextHover: "rgba(15,118,109,0.1)",
      algorithm: true,
    },
    Select: {
      optionSelectedBg: "rgb(15,118,110)",
      optionSelectedColor: "rgba(255,255,255,0.88)",
      algorithm: true,
    },
    Tooltip: {
      colorBgSpotlight: "rgb(15,118,110)",
      fontSize: 16,
      algorithm: true,
    },
    Form: {
      itemMarginBottom: 16,
    },
  },
};

export default themeConfig;
