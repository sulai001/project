import React from "react";

const steps = [
  { label: "Cart" },
  { label: "Shipping" },
  { label: "Payment" },
  { label: "Confirmation" },
];

export default function ShippingProgress({ currentStep = 3 }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
      <div className="mt-4 flex items-center">
        {steps.map((step, idx) => (
          <React.Fragment key={step.label}>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  idx < currentStep
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {idx + 1}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  idx < currentStep
                    ? "text-gray-900"
                    : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`w-12 h-1 mx-2 ${
                  idx < currentStep - 1 ? "bg-primary" : "bg-gray-200"
                }`}
              >
                {idx === 2 && (
                  <div
                    className="progress-bar h-full bg-primary"
                    id="progressBar"
                    style={{
                      width: idx < currentStep - 1 ? "100%" : "0%",
                      transition: "width 1.5s ease-in-out",
                    }}
                  />
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
