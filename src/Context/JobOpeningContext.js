import { createContext, useState } from "react";

const JobOpeningsState = createContext();


const JobOpeningContext = (props) => {
  const [jobData, setJobData] = useState([]);

  const getJobOpening = (data) => {
    setJobData(data);
  };

  return (
    <JobOpeningsState.Provider value={{ jobData, getJobOpening }}>
      {props.children}
    </JobOpeningsState.Provider>
  );
};

export { JobOpeningsState, JobOpeningContext };
