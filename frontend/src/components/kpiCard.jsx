const KpiCard = ({ title, value, icon, accentColorClass, children }) => {
  return (
    <div className={`relative bg-white rounded-lg shadow-sm p-4 border-l-4 ${accentColorClass || 'border-indigo-500'}`}>
      <div className="flex justify-between items-start">
        <div className="flex-grow">
          <p className={`text-xs font-semibold uppercase ${accentColorClass ? accentColorClass.replace('border-', 'text-') : 'text-indigo-500'}`}>
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {value}
          </p>
          {children} 
        </div>
        {icon && (
          <div className="ml-4 text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default KpiCard;