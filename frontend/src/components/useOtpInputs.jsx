import { useRef } from "react";

export const useOtpInputs = () => {
  const inputsRef = useRef([]);

  const handleInput = (e, index) => {
    const value = e.target.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      e.target.value = value.replace(/\D/g, "");
      return;
    }

    // Move to next input if filled
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace on empty input moves to previous
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    pasteData.split("").forEach((digit, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = digit;
      }
    });

    const focusIndex = Math.min(pasteData.length, 5);
    inputsRef.current[focusIndex]?.focus();
  };

  return {
    inputsRef,
    handleInput,
    handleKeyDown,
    handlePaste,
  };
};
