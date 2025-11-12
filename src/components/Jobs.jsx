import React from "react";
import { Navbar } from "./shared/Navbar";
import FilterCard from "./FilterCard";
import { Job } from "./Job";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

export const Jobs = () => {
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            {/* Filetr Page */}
            <FilterCard />
          </div>

          {/* Job Card */}
          {

              jobsArray.length<=0? <span>Job not found</span>
             jobsArray.concat.map((item, index) => 
            <Job />)
          }
        </div>
      </div>
    </div>
  );
};
