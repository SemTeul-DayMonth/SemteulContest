import "../static/Nav.css";

export default function Nav() {
  return (
    <div className="nav">
      <div className="nav_left">
        <div className="mainLogo">DayMonth</div>
        <div className="searchBar">
          <div className="searchIcon"></div>
          <input
            className="search"
            type="text"
            placeholder="Search for events"
            style={{ color: "#7B68EE" }}
          />
        </div>
      </div>
      <div className="nav_right">
        <div className="modeSwitch">to-do</div>
        <a href="" className="settingsLink">
          settings
        </a>
      </div>
    </div>
  );
}
