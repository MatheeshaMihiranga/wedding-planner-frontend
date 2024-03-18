import React from "react";
import { Grid, Button, Icon } from "semantic-ui-react";

import "./button.scss";

export const CustomButton = ({
  computer = undefined,
  tablet = undefined,
  mobile = undefined,
  theme = "dark",
  title = "title",
  customColumnStyle,
  customButtonStyle,
  onClick,
  type = "button",
  disabled = false,
  circular,
  icon,
  iconName,
  iconSize = "large",
  buttonOutLine = false,
  iconWithText = false,
  customButtonIcon,
}: any) => {
  const themeText = () => {
    switch (theme) {
      case "dark":
        return disabled
          ? buttonOutLine
            ? "disableButtonOutlineMain buttonDarkOutline"
            : "disableButtonMain buttonDark"
          : buttonOutLine
          ? "commonOutLineButton buttonDarkOutline"
          : "commonButton buttonDark";
      case "blue":
        return disabled
          ? buttonOutLine
            ? "disableButtonOutlineMain buttonBlueOutline"
            : "disableButtonMain buttonBlue"
          : buttonOutLine
          ? "commonOutLineButton buttonBlueOutline"
          : "commonButton buttonBlue";
      case "red":
        return disabled
          ? buttonOutLine
            ? "disableButtonOutlineMain buttonRedOutline"
            : "disableButtonMain buttonRed"
          : buttonOutLine
          ? "commonOutLineButton buttonRedOutline"
          : "commonButton buttonRed";
      default:
        return disabled
          ? buttonOutLine
            ? "disableButtonOutlineMain buttonGreenOutline"
            : "disableButtonMain buttonGreen"
          : buttonOutLine
          ? "commonOutLineButton buttonGreenOutline"
          : "commonButton buttonGreen";
    }
  };

  return (
    <Grid.Column
      computer={computer}
      tablet={tablet}
      mobile={mobile}
      className={`${customColumnStyle}`}
    >
      {icon ? (
        <Button
          className={`${themeText()} ${customButtonStyle}`}
          onClick={onClick}
          type={type}
          disabled={disabled}
          circular={circular}
          icon={icon}
        />
      ) : iconWithText ? (
        <div
          onClick={onClick}
          className={`${themeText()} ${customButtonStyle}`}
        >
          <Icon
            name={iconName}
            size={iconSize}
            className={`buttonIcon ${customButtonIcon}`}
          />
          {title}
        </div>
      ) : (
        <Button
          className={`${themeText()} ${customButtonStyle}`}
          onClick={onClick}
          type={type}
          disabled={disabled}
        >
          {title}
        </Button>
      )}
    </Grid.Column>
  );
};
