import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, color = "blue", trend }) => {
  const colorStyles = {
    blue: {
      bg: "from-blue-600/10 to-indigo-600/5",
      border: "border-blue-500/20",
      iconBg: "bg-blue-500/15 text-blue-400",
      glow: "group-hover:border-blue-500/40"
    },
    emerald: {
      bg: "from-emerald-600/10 to-teal-600/5",
      border: "border-emerald-500/20",
      iconBg: "bg-emerald-500/15 text-emerald-400",
      glow: "group-hover:border-emerald-500/40"
    },
    indigo: {
      bg: "from-indigo-600/10 to-purple-600/5",
      border: "border-indigo-500/20",
      iconBg: "bg-indigo-500/15 text-indigo-400",
      glow: "group-hover:border-indigo-500/40"
    },
    amber: {
      bg: "from-amber-600/10 to-orange-600/5",
      border: "border-amber-500/20",
      iconBg: "bg-amber-500/15 text-amber-400",
      glow: "group-hover:border-amber-500/40"
    }
  };

  const currentStyle = colorStyles[color] || colorStyles.blue;

  return (
    <div className={`group relative p-5 rounded-2xl bg-gradient-to-br ${currentStyle.bg} border ${currentStyle.border} ${currentStyle.glow} transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className={`p-2.5 rounded-xl ${currentStyle.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">{value}</h3>
        {trend && (
          <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            {trend}
          </span>
        )}
      </div>
      
      {subtitle && (
        <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
      )}
    </div>
  );
};
