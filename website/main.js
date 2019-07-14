import {rgbDataset} from "./rgbDataset.js";
import {trainBrain} from "./brainTraining.js";
import {getRgb01} from "./new_rgb01.js";
import {defineTextColor} from "./brainResolve.js";
import {Picker} from "./color-picker/color-picker.js"

const network = trainBrain(rgbDataset);
/*const input = document.querySelector("input");
input.value = "#293DDC";*/
const cn = document.querySelector("#container");

/*input.addEventListener("input", (e)=> {
    let bgColor = e.target.value;
    let background01 = getRgb01(bgColor);
    let textColor = defineTextColor(background01, network) == 'dark' ? 'white' : 'black';
    cn.style.background = bgColor;
    cn.style.color = textColor;
    });*/


let pickerWidth = 220;
let pickerHeight = 180;
let picker = new Picker(document.getElementById("color-picker"), pickerWidth, pickerHeight);

//Draw
setInterval(() => picker.draw(), 16);

picker.onChange((color) => {
    //let container = document.getElementById('container');
    let background01 = getRgb01(color);
    let textColor = defineTextColor(background01, network) == 'dark' ? 'white' : 'black';
    cn.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    cn.style.color = textColor;
});