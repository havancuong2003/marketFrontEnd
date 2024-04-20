import { Select, Option } from "@material-tailwind/react";
export const FilterInventory = ({
    component,
}) => {
    return (
        <div className="w-full p-2 rounded-md text-[#DA8B14] mx-5">
        <div>
          {/* <img src="../../img/sort.png" alt="sort"> </img> */}
        </div>
        <select>
          {component.map((item, index) => (
            <option key={index}>{item}</option>            
          ))}
        </select>
      </div>
    )
}