import React from 'react';

const PreviewPanel = ({ step, images }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-gray-700">Step Preview</h3>
      {step.key === 'assets' || step.key === 'review' ? (
        <div>
          {Array.isArray(images) && images.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {images.map((file, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(file)}
                  alt={`preview-${i}`}
                  className="h-24 w-full rounded-md object-cover shadow"
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Upload images in this step to see them here.</p>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-500">Fill the form to proceed to next step.</p>
      )}
    </div>
  );
};

export default PreviewPanel;
