'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface CompanyLogoProps {
  className?: string;
  size?: number;
}

const CompanyLogo = ({ className = '', size = 120 }: CompanyLogoProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    // Fallback placeholder
    return (
      <div 
        className={`bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg ${className}`}
        style={{ width: size, height: size }}
      >
        <Building2 className="text-white" size={size * 0.5} />
      </div>
    );
  }

  return (
    <Image
      src="/logo.svg"
      alt="Company Logo"
      width={size}
      height={size}
      className={`rounded-full shadow-lg ${className}`}
      onError={handleImageError}
      priority
    />
  );
};

export default CompanyLogo;
