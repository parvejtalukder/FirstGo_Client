import React from 'react';
import FeatureCard from './FeatureCard/FeatureCard';

const HowItWorks = () => {
  const steps = [
    {
      title: "Booking Pick & Drop",
      description: "From personal packages to business shipments — we deliver on time, every time."
    },
    {
      title: "Cash On Delivery",
      description: "From personal packages to business shipments — we deliver on time, every time."
    },
    {
      title: "Delivery Hub",
      description: "From personal packages to business shipments — we deliver on time, every time."
    },
    {
      title: "Booking SME & Corporate",
      description: "From personal packages to business shipments — we deliver on time, every time."
    }
  ];

  return (
    <section className="bg-transparent py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
       
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-900 text-center lg:text-left">
          How it Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <FeatureCard
              key={idx}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;