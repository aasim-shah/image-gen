"use client";

import { useState } from "react";
import Draggable from "react-draggable";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = ({ phoneNumber = "1234567890", message = "Hello!" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e: any, data: any) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <Draggable bounds="parent" position={position} onDrag={handleDrag}>
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          message
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        style={{ width: "60px", height: "60px", zIndex: 1000 }}
      >
        <FaWhatsapp size={32} />
      </a>
    </Draggable>
  );
};

export default WhatsAppButton;
