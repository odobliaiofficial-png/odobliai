import React from 'react';
import { getCropIconUrl } from '../utils/cropIconMapper';

interface CropIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const CropIcon: React.FC<CropIconProps> = ({ name, className = "w-6 h-6", size }) => {
  const iconUrl = getCropIconUrl(name);

  if (!iconUrl) return null;

  return (
    <img
      src={iconUrl}
      alt={name}
      style={size ? { width: size, height: size } : undefined}
      className={`object-contain inline-block filter drop-shadow-xs transition-transform hover:scale-110 ${className}`}
    />
  );
};
