import React, { useMemo } from 'react';

const Field = ({ label, children, required }) => (
  <label className="block">
    <span className="mb-1 block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500">*</span>}
    </span>
    {children}
  </label>
);

const StepForm = ({ step, data, onChange, onNext, onBack, onSubmit, canProceed }) => {
  const buttonBase = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors';

  const content = useMemo(() => {
    switch (step.key) {
      case 'user':
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="First name" required>
              <input
                type="text"
                value={data.firstName || ''}
                onChange={(e) => onChange({ firstName: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                placeholder="John"
              />
            </Field>
            <Field label="Last name" required>
              <input
                type="text"
                value={data.lastName || ''}
                onChange={(e) => onChange({ lastName: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                placeholder="Doe"
              />
            </Field>
            <Field label="Email" required>
              <input
                type="email"
                value={data.email || ''}
                onChange={(e) => onChange({ email: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                placeholder="you@example.com"
              />
            </Field>
            <Field label="Phone">
              <input
                type="tel"
                value={data.phone || ''}
                onChange={(e) => onChange({ phone: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                placeholder="+1 555 123 4567"
              />
            </Field>
          </div>
        );
      case 'details':
        return (
          <div className="grid grid-cols-1 gap-4">
            <Field label="Project type" required>
              <select
                value={data.projectType || ''}
                onChange={(e) => onChange({ projectType: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="website">Website</option>
                <option value="mobile">Mobile App</option>
                <option value="dashboard">Dashboard</option>
                <option value="ecommerce">E-commerce</option>
              </select>
            </Field>
            <Field label="Budget range" required>
              <input
                type="range"
                min={1}
                max={5}
                value={data.budget || 3}
                onChange={(e) => onChange({ budget: Number(e.target.value) })}
                className="w-full"
              />
              <div className="mt-1 text-sm text-gray-600">{['$', '$$', '$$$', '$$$$', '$$$$$'][
                (data.budget || 3) - 1
              ]}</div>
            </Field>
            <Field label="Description">
              <textarea
                value={data.description || ''}
                onChange={(e) => onChange({ description: e.target.value })}
                className="min-h-[120px] w-full resize-y rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                placeholder="Tell us about your project goals..."
              />
            </Field>
          </div>
        );
      case 'assets':
        return (
          <div className="grid grid-cols-1 gap-4">
            <Field label="Upload reference images">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => onChange({ images: Array.from(e.target.files || []) })}
                className="block w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
              />
            </Field>
            {Array.isArray(data.images) && data.images.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {data.images.map((file, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(file)}
                    alt={`upload-${i}`}
                    className="h-28 w-full rounded-md object-cover shadow"
                  />
                ))}
              </div>
            )}
          </div>
        );
      case 'review':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-700">Contact</h4>
              <p className="text-gray-600">
                {data.firstName} {data.lastName} • {data.email}
                {data.phone ? ` • ${data.phone}` : ''}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700">Details</h4>
              <p className="text-gray-600 capitalize">{data.projectType || '—'}</p>
              <p className="text-gray-600">Budget: {['$', '$$', '$$$', '$$$$', '$$$$$'][
                (data.budget || 3) - 1
              ]}</p>
              {data.description && <p className="text-gray-600">{data.description}</p>}
            </div>
            {Array.isArray(data.images) && data.images.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700">Images</h4>
                <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {data.images.map((file, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(file)}
                      alt={`review-${i}`}
                      className="h-28 w-full rounded-md object-cover shadow"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  }, [step.key, data, onChange]);

  return (
    <div>
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        {content}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className={`${buttonBase} border border-gray-300 bg-white text-gray-700 hover:bg-gray-50`}
        >
          Back
        </button>
        {step.key === 'review' ? (
          <button
            type="button"
            onClick={onSubmit}
            className={`${buttonBase} bg-emerald-600 text-white hover:bg-emerald-700`}
            disabled={!canProceed}
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className={`${buttonBase} bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50`}
            disabled={!canProceed}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default StepForm;
