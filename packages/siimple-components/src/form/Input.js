import React from "react";
import {classNames} from "../utils/classnames.js";
import {filterProps} from "../utils/props.js";

//Input component
export const Input = React.forwardRef(function (props, ref) {
    let inputProps = filterProps(props, ["fluid", "full", "className", "ref"]); //Filter props
    inputProps.className = classNames(props.className, {
        "siimple-input": true,
        "is-full": props.full === true || props.fluid === true
    });
    //Save the input reference
    inputProps.ref = ref;
    //Return the input element
    return React.createElement("input", inputProps);
});

//Input default props
Input.defaultProps = {
    "fluid": false, //TODO: DEPRECATED
    "full": false
};

