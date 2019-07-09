import {rgbDataset} from "./rgbDataset.js";
import {trainBrain} from "./brainTraining.js";
import {getRgb01} from "./rgb01.js";
import {defineTextColor} from "./brainResolve.js";

const network = trainBrain(rgbDataset);
const input = document.querySelector("input");
const cn = document.querySelector("#container");

input.addEventListener("input", (e)=> {
    let bgColor = e.target.value;
    let background01 = getRgb01(bgColor);
    let textColor = defineTextColor(background01, network) == 'dark' ? 'white' : 'black';
    cn.style.background = bgColor;
    cn.style.color = textColor;
    });
