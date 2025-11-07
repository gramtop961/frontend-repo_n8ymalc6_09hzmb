import React, { useMemo, useState } from 'react';
import Stepper from './components/Stepper';
import StepForm from './components/StepForm';
import PreviewPanel from './components/PreviewPanel';
import HeroHeader from './components/HeroHeader';

function App() {
  const steps = useMemo(
    () => [
      { key: 'user', title: 'Your Info' },
      { key: 'details', title: 'Project Details' },
      { key: 'assets', title: 'Upload Images' },
      { key: 'review', title: 'Review & Submit' },
    ],
    []
  );

  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const step = steps[current];

  const completed = useMemo(() => Array.from({ length: current }, (_, i) => i), [current]);

  const canProceed = useMemo(() => {
    switch (step.key) {
      case 'user':
        return Boolean(form.firstName && form.lastName && form.email);
      case 'details':
        return Boolean(form.projectType);
      case 'assets':
        return true; // optional
      case 'review':
        return true;
      default:
        return false;
    }
  }, [step.key, form]);

  const handleChange = (patch) => setForm((f) => ({ ...f, ...patch }));

  const handleNext = () => current < steps.length - 1 && setCurrent((c) => c + 1);
  const handleBack = () => current > 0 && setCurrent((c) => c - 1);
  const handleSubmit = () => {
    setSubmitted(true);
    // In a real app, send to backend here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 py-10">
      <div className="mx-auto max-w-5xl px-4">
        <HeroHeader />

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Stepper steps={steps} currentStep={current} completed={completed} />
            <StepForm
              step={step}
              data={form}
              onChange={handleChange}
              onNext={handleNext}
              onBack={handleBack}
              onSubmit={handleSubmit}
              canProceed={canProceed}
            />
            {submitted && (
              <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-emerald-800">
                Your submission has been received! You can continue editing or close the page.
              </div>
            )}
          </div>
          <div className="space-y-6">
            <PreviewPanel step={step} images={form.images} />
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="mb-2 text-sm font-semibold text-gray-700">Tips</h3>
              <ul className="list-inside list-disc text-sm text-gray-600">
                <li>Required fields are marked with an asterisk.</li>
                <li>You can upload multiple images at once.</li>
                <li>Use the Back button to review previous steps.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
