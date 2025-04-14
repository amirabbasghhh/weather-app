"use client";

type Props = {
  value: number;
  max?: number;
  className?: string;
};

const UvProgress = ({ value, max = 14, className }: Props) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // جلوگیری از اینکه دایره از کادر بیرون بزنه:
  const thumbLeft = `calc(${percentage}% - 8px)`; // نصف عرض دایره (w-4 = 16px)

  return (
    <div className={`relative h-4 w-full rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden ${className}`}>
      {/* زمینه رنگی گرادینت */}
      <div
        className="absolute top-0 left-0 h-full transition-all duration-500"
        style={{
          width: "100%",
          backgroundImage:
            "linear-gradient(to right, #3b82f6, #22c55e, #eab308, #ef4444, #a855f7, #f43f5e)",
        }}
      />

      {/* دایره سفید */}
      <div
        className="absolute top-1/2 w-4 h-4 rounded-full bg-white border border-gray-400 shadow-md transition-all duration-300"
        style={{
          left: thumbLeft,
          transform: "translateY(-50%)", // فقط در جهت عمودی جابه‌جا بشه
        }}
      />
    </div>
  );
};

export default UvProgress;
