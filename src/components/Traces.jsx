import { useMemo } from "react";
import PropTypes from "prop-types";

const DAYS_OF_WEEK = [
  { name: "Sun", index: 0 },
  { name: "Mon", index: 1 },
  { name: "Tue", index: 2 },
  { name: "Wed", index: 3 },
  { name: "Thu", index: 4 },
  { name: "Fri", index: 5 },
  { name: "Sat", index: 6 },
];

const ACTIVITY_TYPE = ["Rest", "Work", "Available", "Drive"];

const useActiveDays = (traces) => {
  return useMemo(() => {
    const activeDaysSet = new Set();
    traces.forEach((item) => {
      const date = new Date(item.date);
      if (!isNaN(date)) {
        activeDaysSet.add(date.getDay());
      }
    });
    return activeDaysSet;
  }, [traces]);
};

const totalActivityDuration = (traces) => {
  let totalDuration = 0;

  traces.forEach((trace) => {
    totalDuration += trace.activity.reduce((accumulator, activity) => {
      return accumulator + activity["duration"];
    }, 0);
  });

  return totalDuration;
};

const activityTypeDuration = (traces, type) => {
    return 0;
};

const Traces = ({ traceData }) => {
  const activeDays = useActiveDays(traceData);

  return (
    <div>
      <div className="flex gap-2">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day.index} className="flex flex-col items-center">
            <div className="text-sm font-medium text-center">{day.name}</div>
            <div
              className={`w-8 h-8 rounded ${
                activeDays.has(day.index) ? "bg-green-500" : "bg-gray-300"
              }`}
              aria-label={`${
                activeDays.has(day.index) ? "Active" : "Inactive"
              } on ${day.name}`}
              title={`${
                activeDays.has(day.index) ? "Active" : "Inactive"
              } on ${day.name}`}
            ></div>
          </div>
        ))}
      </div>
      <p className="text-sm font-medium pt-1">
        Total Activity Duration: {totalActivityDuration(traceData)} mins
      </p>
      <div>
        {ACTIVITY_TYPE.map((type, index) => (
          <div className="text-sm font-medium pt-1" key={index}>
            {type}: {activityTypeDuration(traceData, type.toLowerCase())} mins
          </div>
        ))}
      </div>
    </div>
  );
};

Traces.propTypes = {
  traceData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Traces;
