import { useEffect } from "react";

export default function EnergyVisualization() {
  useEffect(() => {
    const divElement = document.getElementById("viz1743780214585");
    const vizElement = divElement.getElementsByTagName("object")[0];

    if (divElement.offsetWidth > 800) {
      vizElement.style.width = "1200px";
      vizElement.style.height = "1000px";
    } else if (divElement.offsetWidth > 500) {
      vizElement.style.width = "1000px";
      vizElement.style.height = "900px";
    } else {
      vizElement.style.width = "100%";
      vizElement.style.height = "1500px";
    }

    const scriptElement = document.createElement("script");
    scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
  }, []);

  return (
    <div
      className="tableauPlaceholder flex justify-center items-center"
      id="viz1743780214585"
      style={{ position: "relative", minHeight: "1000px" }}
    >
      <noscript>
        <a href="#">
          <img
            alt="Dashboard 1"
            src="https://public.tableau.com/static/images/so/solarpanel-tab/Dashboard1/1_rss.png"
            style={{ border: "none" }}
          />
        </a>
      </noscript>
      <object
        className="tableauViz"
        style={{ display: "none", width: "1200px", height: "1000px" }} // fallback style
      >
        <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
        <param name="embed_code_version" value="3" />
        <param name="site_root" value="" />
        <param name="name" value="solarpanel-tab/Dashboard1" />
        <param name="tabs" value="no" />
        <param name="toolbar" value="yes" />
        <param
          name="static_image"
          value="https://public.tableau.com/static/images/so/solarpanel-tab/Dashboard1/1.png"
        />
        <param name="animate_transition" value="yes" />
        <param name="display_static_image" value="yes" />
        <param name="display_spinner" value="yes" />
        <param name="display_overlay" value="yes" />
        <param name="display_count" value="yes" />
        <param name="language" value="en-US" />
        <param name="filter" value="publish=yes" />
      </object>
    </div>
  );
}
