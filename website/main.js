import {dataset} from "./rgbDataset.js";
import {trainBrain} from "./brainTraining.js";
import {getRgb01} from "./rgb01.js";
import {rgb01} from "./old_rgb01.js";
import {defineTextColor} from "./brainResolve.js";
import {Picker} from "./color-picker/color-picker.js"

let rgbDataset = dataset;
var network = trainBrain(rgbDataset);
const cn = document.querySelector("#container");
const body = document.querySelector('#body');
const info = document.querySelector('#info');
const toggleSwitch = document.querySelector('#checkbox');
const addRule = document.querySelector('#add-rule');
const showRules = document.querySelector('#show-rules');
const hideRules = document.querySelector("#hide-rules");
const resetRules = document.querySelector('#reset-rules');
const rulesCtn = document.querySelector('#rules-ctn');

const isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));


function printDefaultRules() {
    dataset.forEach(e => {
        let bg = `rgb(${(e.input.r*255)|0}, ${(e.input.g*255)|0}, ${(e.input.b*255)|0})`;
        let color = e.output.dark ? 'white' : 'black';
        let li = document.createElement("li");

        li.appendChild(document.createTextNode(`${bg}`));
        li.style.backgroundColor = bg;
        li.style.color = color;
        list.appendChild(li);
    });
}
printDefaultRules();

hideRules.addEventListener("click", (e) => {
    rulesCtn.style.display = "none";
})

showRules.addEventListener("click", (e) => {
    rulesCtn.style.display = "grid";
});


addRule.addEventListener("click", (e) => {
    const list = document.querySelector("#list")
    
    if (!cn.style.backgroundColor) {
        body.style.backgroundColor="rgb(4,0,84)";
        cn.style.backgroundColor="rgb(4,0,84)";
        cn.style.color= "white";
    }

    if (rgbDataset.length<15){
        let li = document.createElement("li");

        let bg = cn.style.backgroundColor;
        let color = rgb01(bg);
        let rule = {
            input : color,
            output: toggleSwitch.checked ? { light : 1 } : { dark :1 }
        }
        
        rgbDataset.push(rule);
        network = trainBrain(rgbDataset);
        cn.style.Color = toggleSwitch.checked ? 'black' : 'white';
        body.style.backgroundColor=bg;

        li.appendChild(document.createTextNode(`${bg}`));
        li.style.backgroundColor = bg;
        li.style.color = cn.style.color;
        list.appendChild(li);
    }
});

resetRules.addEventListener("click", (e) => {
    rgbDataset = [];
    network = null;
    
    let parent = list.parentNode;
    parent.removeChild(list);

    let ul = document.createElement("UL");
    parent.appendChild(ul);
    ul.setAttribute("id", "list");
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


let pickerWidth = 300;
let pickerHeight = 220;

let picker = new Picker(document.getElementById("color-picker"), pickerWidth, pickerHeight, isTouch);

function setPickerEvents () {
    if (isTouch) {
        picker.listenForTouchEvents();
    }
    else {
        picker.listenForMouseEvents();
    }
}
setPickerEvents();


picker.onChange((color) => {
    //console.log(color);
    
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
        body.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        info.innerText = `rgb(${color.r}, ${color.g}, ${color.b})`; 
});


function loop() {
    picker.draw();
    requestAnimationFrame(loop);
  }
requestAnimationFrame(loop);