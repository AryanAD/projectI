import React from "react";
import { CustomCSS } from "../../components/custom/CustomCSS";

const Navigation = () => {
  return (
    <React.Fragment>
      <button className={CustomCSS.submitButton}>Submit</button>
      <button className={CustomCSS.deleteButton}>Delete</button>
      <button className={CustomCSS.updateButton}>Update</button>
    </React.Fragment>
  );
};

export default Navigation;
