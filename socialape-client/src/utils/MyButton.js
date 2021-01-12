import React from "react";

import { IconButton, Tooltip } from "@material-ui/core";

export default function MyButton({
  tip,
  tipClassName,
  btnClassName,
  handleClick,
  children,
}) {
  return (
    <Tooltip title={tip} className={tipClassName}>
      <IconButton className={btnClassName} onClick={handleClick}>
        {children}
      </IconButton>
    </Tooltip>
  );
}
