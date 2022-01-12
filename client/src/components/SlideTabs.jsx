import anime from "animejs";
import { useState, useRef, useLayoutEffect } from "react";
import { join } from "../helpers/utils";


const SlideTabs = ({ tabs = [] }) => {

  const [activeTab, setActiveTab] = useState(0);
  const page = useRef();

  useLayoutEffect(() => {

    anime({
      targets: page.current,
      opacity: [0, 1],
      duration: 500,
      easing: "easeInQuad",
    })

  }, [activeTab])

  return (
    <div className="slide__tab-layout">
      <ul className="slide__tabs">
        {tabs.map((tab, i) => (
          <li className={join("slide__tab", [activeTab === i, "active"])}
            key={i}
            onClick={() => activeTab !== i && anime({
              targets: page.current,
              opacity: 0,
              duration: 500,
              easing: "easeInQuad",
              complete: () => setActiveTab(i)
            })}
          >
            {tab.title}
          </li>
        ))}
      </ul>
      <div className="slide__page" ref={page}>
        {tabs && tabs[activeTab]?.content}
      </div>
    </div>
  )

}


export default SlideTabs;