import React, { MouseEventHandler } from "react";
import { AiOutlineRight } from "react-icons/ai";

type Props = {
  onClick: () => void;
};

export default function BurgerMenuButton({ onClick }: Props) {
  return (
    <button className="bm-icon button buttonMenu" onClick={onClick}>
      <AiOutlineRight />
    </button>
  );
}
