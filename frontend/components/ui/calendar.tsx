import React from "react";
import Svg, { Path, Line, Rect } from "react-native-svg";
const calendarEvent = () => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#BDFFA7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
      <Path d="M16 3l0 4" />
      <Path d="M8 3l0 4" />
      <Path d="M4 11l16 0" />
    </Svg>
  );
};
export default calendarEvent;
