"use client"

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";


export default function MyApp() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "30min" });
      cal("ui", { "theme": "light", "cssVarsPerTheme": { "light": { "cal-brand": "#F9FBE7" }, "dark": { "cal-brand": "#ffffff" } }, "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, [])
  return (
    <div className="mt-96">
      <Cal namespace="30min"
        calLink="aditya-maurya-b8zlbv/30min"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ "layout": "month_view", "theme": "light" }}
      />
    </div>
  )
};