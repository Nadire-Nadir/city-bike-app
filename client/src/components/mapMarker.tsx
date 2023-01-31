import { IoLocationSharp } from "react-icons/io5";
import { MarkerType } from "../types";

export const Marker = (props: MarkerType) => 
    <div
        style={{
            color: 'red',
            fontSize: "36px"
        }}
    >
        <IoLocationSharp />
    </div>