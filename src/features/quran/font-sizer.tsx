"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

export const DynamicFontSizer: React.FC = () => {
  const step = 1;
  const minStep = 1;
  const maxStep = 10;
  const minFont = 30;
  const maxFont = 110;

  const stepToFontSize = (step: number) => {
    return minFont + (step - 1) * ((maxFont - minFont) / (maxStep - minStep));
  };

  const defaultStep = 4;
  const [fontStep, setFontStep] = useState<number>(defaultStep);

  useEffect(() => {
    const storedFontStep = localStorage.getItem("ayahFontStep");
    if (storedFontStep) {
      setFontStep(parseInt(storedFontStep, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ayahFontStep", fontStep.toString());
    document.documentElement.style.setProperty("--ayah-font-size", `${stepToFontSize(fontStep)}px`);
  }, [fontStep]);

  const increaseFontStep = () => {
    if (fontStep < maxStep) {
      setFontStep(fontStep + step);
    }
  };

  const decreaseFontStep = () => {
    if (fontStep > minStep) {
      setFontStep(fontStep - step);
    }
  };

  const resetFontStep = () => {
    setFontStep(defaultStep);
  };

  return (
    <>
      <div className="gap-2 flex">
        <div>
          <Button onClick={decreaseFontStep} disabled={fontStep <= minStep}>-</Button>
          <span style={{ margin: "0 10px", display: "inline-block", width: "20px", textAlign: "center" }}>
            {fontStep}
          </span>
          <Button onClick={increaseFontStep} disabled={fontStep >= maxStep}>+</Button>
        </div>
        <Button onClick={resetFontStep}>Reset</Button>
      </div>
    </>
  );
};
