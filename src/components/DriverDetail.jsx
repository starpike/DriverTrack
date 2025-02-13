import PropTypes from "prop-types";
import Activity from "./Activity";

const DriverDetail = ({ driverData }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between items-start">
      <div>
        <h2 className="text-md font-semibold">
          {driverData.forename} {driverData.surname}
        </h2>
        <p className="text-sm text-gray-600">
          Registration: {driverData.vehicleRegistration}
        </p>
      </div>
      <div className="mt-4 md:mt-0">
        <Activity traceData={driverData.traces}></Activity>
      </div>
    </div>
  );
};

DriverDetail.propTypes = {
  driverData: PropTypes.shape({
    driverID: PropTypes.number.isRequired,
    surname: PropTypes.string.isRequired,
    forename: PropTypes.string.isRequired,
    vehicleRegistration: PropTypes.string.isRequired,
    traces: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        activity: PropTypes.arrayOf(
          PropTypes.shape({
            startTime: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            duration: PropTypes.number.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default DriverDetail;
