import React from "react";
import {filterProps} from "../utils/props.js";
import {classNames} from "../utils/classnames.js";

//Build the progress bar content
let progressBar = function (props) {
    let barProps = {
        "style": {
            "width": props.completed + "%"
        }
    };
    //Return the bar component
    return React.createElement("span", barProps, props.children);
};

//Progress component
export const Progress = function (props) {
    let newProps = filterProps(props, ["className", "color", "completed", "striped", "velocity"]);
    let classList = ["siimple-progress"];
    //Check the color property
    if (typeof props.color === "string") {
        classList.push("is-" + props.color.toLowerCase().trim());
    }
    //Check the striped property
    if (typeof props.striped === "boolean" && props.striped === true) {
        classList.push("is-striped");
        if (typeof props.velocity === "string" && props.velocity !== "") {
            classList.push("is-" + props.velocity.toLowerCase().trim());
        }
    }
    //Merge classnames
    newProps.className = classNames(classList, props.className);
    //Return the progress element
    return React.createElement("div", newProps, progressBar(props));
};

//Progress component default props 
Progress.defaultProps = {
    "color": "primary",
    "completed": 0,
    "striped": false,
    "velocity": null
};

