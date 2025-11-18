"use client";

import React from "react";

interface SendTemplateButtonProps {
  templateName: string;
  phoneNumber: string;
  params?:string[];
  label?: string; 
}

const SendTemplateButton: React.FC<SendTemplateButtonProps> = ({
  templateName,
  phoneNumber,
  params = [],
  label = "Send Template",
}) => {
  const sendTemplate = async () => {
    try {
      const res = await fetch("/api/sendTemplate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateName,
          phoneNumber,
          params,
        }),
      });

      const data = await res.json();
      console.log("Template Sent:", data);
    } catch (error) {
      console.error("Send Template Error:", error);
    }
  };

  return (
    <button
      onClick={sendTemplate}
      className="px-2 py-1 bg-green-600 text-white rounded-full text-sm shadow hover:bg-green-700 transition"
    >
      {label}
    </button>
  );
};

export default SendTemplateButton;
