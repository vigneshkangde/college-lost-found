import React from 'react';

export default function StatusBadge({ status = 'lost', size = 'md', className = '' }) {
  const normStatus = (status || 'lost').toLowerCase();

  const configs = {
    lost: {
      label: 'Lost Item',
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      dot: 'bg-rose-500'
    },
    found: {
      label: 'Found Item',
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500'
    },
    claimed: {
      label: 'Claimed',
      bg: 'bg-blue-50 text-blue-700 border-blue-200',
      dot: 'bg-blue-500'
    },
    returned: {
      label: 'Returned to Owner',
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      dot: 'bg-slate-500'
    }
  };

  const config = configs[normStatus] || configs.lost;

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold'
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${config.bg} ${sizeStyles[size]} ${className}`}
    >
      <span className={`rounded-full shrink-0 ${config.dot} ${dotSizes[size]}`} />
      <span>{config.label}</span>
    </span>
  );
}
