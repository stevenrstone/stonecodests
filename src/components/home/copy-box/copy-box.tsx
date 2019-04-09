import React from "react";

import "./copy-box.css";

const CopyBox: React.StatelessComponent<{}> = ({ children }) => (
  <div className="copy-container">
    <div className="copy-box">{children}</div>
  </div>
);

export default CopyBox;
