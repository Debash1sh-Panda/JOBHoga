import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { setSearchJobByQuery } from "../../redux/jobSlice";

const fitlerData = [
  {
    fitlerType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Software Developer",
      "Java Developer",
      "Internship",
    ],
  },
  {
    fitlerType: "Location",
    array: [
      "Delhi",
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Kolkata",
      "Remote",
    ],
  },
  {
    fitlerType: "Salary",
    array: [
      "0-4LPA",
      "4-9LPA",
      "9-12LPA",
      "12-18LPA",
      "18-22LPA",
    ],
  },
];

function FilterCard() {
  const [selectedValue, setselectedValue] = useState();
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setselectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchJobByQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="w-full bg-white p-4 rounded-md sm:p-5 md:p-6">
      <h1 className="font-bold text-lg sm:text-xl md:text-2xl">Filter Jobs</h1>
      <hr className="my-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {fitlerData.map((data, index) => (
          <div key={index} className="mb-4">
            <h1 className="text-md sm:text-lg md:text-xl bg-gradient-to-r from-black to-red-500 bg-clip-text text-transparent font-semibold">
              {data.fitlerType}
            </h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label
                    htmlFor={itemId}
                    className="text-sm sm:text-base md:text-lg"
                  >
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
