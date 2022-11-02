import RedditCategorySelector from "./RedditCategorySelector";

export default function Header() {
  function handleLogoClick() {
    window.location.reload();
  }

  const headerOuterContainerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 60,
    zIndex: "1000",
    backgroundColor: "#202020",
    boxShadow: "0 0 5px #000",
    borderBottom: "1px solid #505050",
  };

  const headerInnerContainerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    maxWidth: 800,
    height: "100%",
    color: "#fff",
  };

  const h1Style = {
    fontSize: "min(1.4rem, 4.3vw)",
    fontWeight: "bold",
    minWidth: "min(155px, 1vw)",
  };

  const logoWrapperStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  return (
    <div style={headerOuterContainerStyle}>
      <div style={headerInnerContainerStyle}>
        <div style={logoWrapperStyle} onClick={handleLogoClick}>
          <img
            src="./logo500.png"
            alt="reddit logo"
            style={{ width: 40, height: 40, margin: 3 }}
          />
          <h1 style={h1Style}>Reddit For You</h1>
        </div>
        <RedditCategorySelector />
      </div>
    </div>
  );
}
