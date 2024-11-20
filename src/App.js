import logo from "./logo.svg";
import "./App.css";
import { Repo } from "./repo";
import StarIcon from "./assets/icons/star-svgrepo-com.svg";
import SettingIcon from "./assets/icons/setting-svgrepo-com.svg";
import { useState } from "react";
import { Setting } from "./setting";
function App() {
  const [tab, setTab] = useState(0);
  return (
    <div className="App">
      <div>{tab === 0 ? <Repo /> : <Setting />}</div>
      <div className="footer_main_box">
        <div className="footer_sub_box">
          <div
            className={`footer_child_box ${tab === 0 && "active"}`}
            onClick={() => setTab(0)}
          >
            <img src={StarIcon} className="footer_image" />
            <div className="footer_title_item">Trending</div>
          </div>
        </div>
        <div className="footer_sub_box">
          <div
            className={`footer_child_box ${tab === 1 && "active"}`}
            onClick={() => setTab(1)}
          >
            <img src={SettingIcon} className="footer_image" />
            <div className="footer_title_item">Settings</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
