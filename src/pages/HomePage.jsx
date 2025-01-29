import Driver from "../components/Driver";
import drivers from "../assets/data/drivers.json";

const HomePage = () => {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Home</h1>
          <input
            type="text"
            placeholder="Search drivers..."
            className="p-2 border rounded-md"
          />
        </div>
      </div>
      <section>
        <div className="grid grid-cols-1 gap-6">
          {drivers.data.map((driverData, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-md rounded-md flex flex-col gap-4"
            >
              <Driver driverData={driverData}></Driver>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
