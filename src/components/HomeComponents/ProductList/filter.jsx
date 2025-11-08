import React from "react";
import { Button } from "primereact/button";

const Filter = ({filterProducts}) => {
  const [activeFilter, setActiveFilter] = React.useState("All");
  
  const filters = ["All","Desktop","Laptop","Components"];

  const handleActive = (filterName) =>{
    setActiveFilter(filterName);
    
    filterProducts(filterName);
    
    
  }

  return (
    <div className='flex items-start gap-4 mb-5 '>
      {
        filters.map((filterName) =>(
          <Button
            key={filterName}
            label={filterName}
            className={`w-20 ${activeFilter === filterName ? 'p-button-primary' : 'p-button-outlined'} ${filterName === "Components" ? "w-40" : "w-20"}`}
            onClick={()=>handleActive(filterName)}
          />
        ))
      
      }
    </div>

  );
}

export default Filter;