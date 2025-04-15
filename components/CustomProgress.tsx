export default function CustomProgress({ value = 60 }: { value: number }) {
    return (
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-green-400 to-yellow-500 transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    );
  }
  