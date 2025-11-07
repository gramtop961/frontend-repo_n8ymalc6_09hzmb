import React from 'react';
import { Check } from 'lucide-react';

const Stepper = ({ steps, currentStep, completed = [] }) => {
  return (
    <div className="w-full">
      <ol className="flex items-center justify-between gap-2">
        {steps.map((step, idx) => {
          const isActive = idx === currentStep;
          const isCompleted = completed.includes(idx);
          return (
            <li key={step.key} className="flex-1">
              <div className="flex items-center">
                <div
                  className={`relative mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                    isCompleted
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : isActive
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{idx + 1}</span>
                  )}
                </div>
              </div>
              <p
                className={`mt-2 text-center text-sm font-medium ${
                  isActive ? 'text-blue-700' : 'text-gray-600'
                }`}
              >
                {step.title}
              </p>
            </li>
          );
        })}
      </ol>
      <div className="mt-4 h-1 w-full overflow-hidden rounded bg-gray-200">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Stepper;
