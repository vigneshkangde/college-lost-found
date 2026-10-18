import React from 'react';

export default function SectionHeader({
  kicker,
  title,
  subtitle,
  align = 'left', // 'left' | 'center'
  action,
  className = ''
}) {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 ${
        isCenter ? 'text-center items-center' : ''
      } ${className}`}
    >
      <div className={`space-y-1.5 ${isCenter ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
        {kicker && (
          <span className="inline-block text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 px-2.5 py-1 rounded-md mb-1">
            {kicker}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            {subtitle}
          </p>
        )}
      </div>

      {action && !isCenter && (
        <div className="shrink-0 pt-1">
          {action}
        </div>
      )}
    </div>
  );
}
