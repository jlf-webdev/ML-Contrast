import {rgbDataset} from "./rgbDataset.js";
import {trainBrain} from "./brainTraining.js";
import {getRgb01} from "./rgb01.js";
import {defineTextColor} from "./brainResolve.js";
import {Picker} from "./color-picker/color-picker.js"

const network = trainBrain(rgbDataset);
const cn = document.querySelector("#container");
const info = document.querySelector('#info');
const toggleSwitch = document.querySelector('#checkbox');
const addRule = document.querySelector('#add-rule');
const reset = document.querySelector('#reset');

toggleSwitch.addEventListener("click", (e) => {
    var isChecked = toggleSwitch.checked;
    if (isChecked) {
        cn.style.color = 'black';
    }
    else {
        cn.style.color = 'white';
    }
});

addRule.addEventListener('click', (e) => {
    console.log('added a rule');
});

reset.addEventListener('click', (e) => {
    console.log('reset the rules');
});

let pickerWidth = 220;
let pickerHeight = 180;
let picker = new Picker(document.getElementById("color-picker"), pickerWidth, pickerHeight);

//Draw
setInterval(() => picker.draw(), 16);

picker.onChange((color) => {
    if (picker.isMouseDown) {
        let background01 = getRgb01(color);
        let textColor = defineTextColor(background01, network) == 'dark' ? 'white' : 'black';
        cn.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        cn.style.color = textColor;
        info.innerText = `rgb(${color.r}, ${color.g}, ${color.b})`;
        if (textColor == 'black') {
            toggleSwitch.checked = true;
        }
        else {
            toggleSwitch.checked = false;
        }
    }
});