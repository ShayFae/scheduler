import React from "react";
import "components/Button.scss";
import { action } from "@storybook/addon-actions/dist/preview";

export default function Button(props) {
// const {onClick, disabled} = props;
let buttonClass = 'button';
if (props.confirm) {
   buttonClass += ' button--confirm';
}

if (props.danger) {
   buttonClass += ' button--danger';
}
   // console.log({test})
   return (
         <>
            <button className={buttonClass}  disabled={props.disabled} onClick={props.onClick}>{props.children}</button>
         </>
         );
}
