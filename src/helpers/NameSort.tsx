import React from "react";

export const nameSort = (name: any) => {
  let splitData = name.split("");
  if (splitData.length > 6) {
    let tempName = name.slice(0, 6) + "...";
    return tempName;
  } else {
    return name;
  }
};
