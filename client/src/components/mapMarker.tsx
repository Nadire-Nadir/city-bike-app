import { IoLocationSharp } from "react-icons/io5";
import { CoordinateType } from "../types";

export const Marker = (props: CoordinateType) => 
    <div
        style={{
            color: 'red',
            fontSize: "36px"
        }}
    >
        <IoLocationSharp />
    </div>