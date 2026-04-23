import { useState } from "react";
import data from "./data.json";



// const imagePath = "/images/${job.company.toLowerCase()}.svg"




const getTags = (job) => {
  return [
    job.role,
    job.level,
    ...job.languages,
    ...job.tools,
  ];
};

function App() {


  const [jobs] = useState(data);
  const [filters, setFilters] = useState([]);

  
  const addFilter = (tag) => {
    if (!filters.includes(tag)) {
      setFilters([...filters, tag]);
    }
  };


  const removeFilter = (tag) => {
    setFilters(filters.filter((f) => f !== tag));
  };


  const clearFilters = () => {
    setFilters([]);
  };

  const filteredJobs = jobs.filter((job) => {
    const tags = getTags(job);

    return filters.every((filter) =>
      tags.includes(filter)
    );
  });


  return (
    <>
      <header className="header"></header>
      <div className="app">
      

      {filters.length > 0 && (
        <div className="filter-bar mb-5">

          <div className="filters">
            {filters.map((filter) => (
              <span key={filter} className="filter-item">
                {filter}
                <button onClick={() => removeFilter(filter)}>x</button>
              </span>
            ))}
          </div>

          <button className="clear" onClick={clearFilters}>
            Clear
          </button>
        </div>
      )}

    
      {filteredJobs.map((job) => (
        <div
          key={job.id}
          className={`card ${job.featured ? "featured" : ""}`}
        >

          <div className="jobCard flex-">
          <img src={job.logo} alt={job.company} className="logo ms-4 mb-4" />
          <div className="info">
            <div className="top">
              <h4>{job.company}</h4>

              {job.new && <span className="badge new">NEW!</span>}
              {job.featured && (
                <span className="badge featured">FEATURED</span>
              )}
            </div>
              <div className="d-flex posButt">
             <h3 className="d-flex">{job.position} </h3>
              <hr className="hr" />
             <div className="tags ms-auto">
            {getTags(job).map((tag) => (
              <button key={tag} onClick={() => addFilter(tag)}>
                {tag}
              </button>
            ))}
          </div>
              </div>
            <p className="meta">
              {job.postedAt} • {job.contract} • {job.location}
            </p>
          </div>
          </div>


        </div>
      ))}

      </div>
    </>
  );
}

export default App;