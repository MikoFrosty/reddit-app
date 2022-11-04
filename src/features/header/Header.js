import RedditCategorySelector from "./RedditCategorySelector";
import headerStyles from "./Header.module.css";

export default function Header() {
  function handleLogoClick() {
    window.location.reload();
    window.scrollTo(0, 0);
  }

  return (
    <div id={headerStyles["header-outer-container"]}>
      <div id={headerStyles["header-inner-container"]}>
        <div id={headerStyles["logo-wrapper"]} onClick={handleLogoClick}>
          <img src="./logo500.png" alt="reddit logo" />
          <h1>Reddit For You</h1>
        </div>
        <RedditCategorySelector />
      </div>
    </div>
  );
}
