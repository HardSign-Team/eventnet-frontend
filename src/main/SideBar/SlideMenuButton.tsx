import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";

export default function SlideMenuButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClick = (e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <button onClick={onClick} className="button buttonMenu">
      <AiOutlineLeft />
    </button>
  );
}
