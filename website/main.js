import {dataset} from "./rgbDataset.js";
import {trainBrain} from "./brainTraining.js";
import {getRgb01} from "./rgb01.js";
import {rgb01} from "./old_rgb01.js";
import {defineTextColor} from "./brainResolve.js";
import {Picker} from "./color-picker/color-picker.js"

let rgbDataset = dataset;
var network = trainBrain(rgbDataset);
console.log(rgbDataset);
const cn = document.querySelector("#container");
const info = document.querySelector('#info');
const toggleSwitch = document.querySelector('#checkbox');
const addRule = document.querySelector('#add-rule');
const reset = document.querySelector('#reset');



addRule.addEventListener("click", (e) => {
    if (!cn.style.backgroundColor) {
        cn.style.backgroundColor="rgb(4,0,84)";
    }
    /*let rule = { input: { r: 0, g: 0, b: 0},  output: { dark: 1 }};
    rgbDataset.push(rule);
    rule = { input: { r: 1, g: 1, b: 1 },     output : { light: 1}};
    rgbDataset.push(rule);*/
    let bg = cn.style.backgroundColor;
    console.log(bg);
    
    let color = rgb01(bg)

    let rule = {
        input : color,
        output: toggleSwitch.checked ? { light : 1 } : { dark :1 }
    }

    rgbDataset.push(rule);
    network = trainBrain(rgbDataset);
    cn.style.Color = toggleSwitch.checked ? 'black' : 'white';
    console.log(color);
    console.log(rgbDataset);
    console.log(rule);
});

reset.addEventListener("click", (e) => {
    rgbDataset = [];
    network = null;
    console.log(rgbDataset);
});

toggleSwitch.addEventListener("click", (e) => {
    var isChecked = toggleSwitch.checked;
    if (isChecked) {
        cn.style.color = 'black';
    }
    else {
        cn.style.color = 'white';
    }
});

let pickerWidth = 220;
let pickerHeight = 180;
let picker = new Picker(document.getElementById("color-picker"), pickerWidth, pickerHeight);

//Draw
setInterval(() => picker.draw(), 16);

picker.onChange((color) => {
    //console.log(color);
    if (picker.isMouseDown) {
        if (network) {
            let background01 = getRgb01(color);
            let textColor = defineTextColor(background01, network) == 'dark' ? 'white' : 'black';
            cn.style.color = textColor;
            if (textColor == 'black') {
                toggleSwitch.checked = true;
            }
            else {
                toggleSwitch.checked = false;
            }
        }
        cn.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        info.innerText = `rgb(${color.r}, ${color.g}, ${color.b})`; 
    }
});