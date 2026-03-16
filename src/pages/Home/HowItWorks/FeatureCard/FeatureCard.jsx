import React from 'react';
import { Truck } from 'lucide-react';

const FeatureCard = ({title, description}) => {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-gray-100 flex flex-col items-start gap-4">
        {/* Icon */}
        <div className="text-teal-900">
          <div className="relative">
            <Truck size={36} strokeWidth={1.5} />
            <div className="absolute -top-1 left-2 w-3 h-3 bg-teal-900 rounded-full border-2 border-white" />
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-teal-900">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>
    );
};

export default FeatureCard;
