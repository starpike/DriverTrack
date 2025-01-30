import DriverDetail from "../components/DriverDetail";
import driverData from "../assets/data/drivers.json";
import { useState } from "react";

const HomePage = () => {
    const [inputValue, setInputValue] = useState('');
    const [filteredDrivers, setFilteredDrivers] = useState(driverData.data);
  
    const handleFilter = (event) => {
      const query = event.target.value.toLowerCase();
      setInputValue(query);
  
      const filtered = driverData.data.filter((driver) =>
        driver.forename.toLowerCase().includes(query) || driver.surname.toLowerCase().includes(query)
      );
  
      setFilteredDrivers(filtered);
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <input
            type="text"
            placeholder="Search drivers..."
            className="p-1 border rounded-md"
            value={inputValue}
            onChange={handleFilter}
          />
        </div>
        <div className="flex flex-row items-center">
          <h2 className="text-md font-bold">Week 5</h2>
          <h2 className="text-sm text-gray-600">
            &nbsp;- Ending: Febuary 7, 2021
          </h2>
        </div>
      </div>
      <section>
        <div className="grid grid-cols-1 gap-6">
          {filteredDrivers.map((drivers, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-md rounded-md flex flex-col gap-4"
            >
              <DriverDetail driverData={drivers}></DriverDetail>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
