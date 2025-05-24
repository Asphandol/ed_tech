import { Lightbulb, Clock, Network } from "lucide-react";

const overviewItems = [
  {
    icon: <Lightbulb className="text-blue-500" size={20} />,
    label: "Active Prototypes",
    value: "7",
  },
  {
    icon: <Clock className="text-blue-500" size={20} />,
    label: "Hours Learning",
    value: "3h 15m",
  },
  {
    icon: <Network className="text-blue-500" size={20} />,
    label: "Community score",
    value: "240",
  },
];

export default function OverviewCards() {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">OVERVIEW</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {overviewItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow rounded-xl p-4 flex items-center gap-4"
          >
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
              {item.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600">{item.label}</p>
              <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
