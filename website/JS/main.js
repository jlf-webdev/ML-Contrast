import {dataset} from "./default/rgbDataset.js";
import {trainBrain} from "./brain/brainTraining.js";
import {rgb01} from "./rgb01.js";
import {Picker} from "./color-picker/color-picker.js"
import {rules} from "./default/rules.js"

const cn = document.querySelector("#container");
const body = document.querySelector('#body');
const bigHeadingsBorder = document.querySelector('#headings-bg');
const smallHeadingsBorder = document.querySelector('#headings-sm');
const textColorBorder = document.querySelector('#text-color');
const toggleSwitch = document.querySelector('#checkbox');
const info = document.querySelector('#info');
const addRule = document.querySelector('#add-rule');
const showRules = document.querySelector('#show-rules');
const hideRules = document.querySelector("#hide-rules");
const resetRules = document.querySelector('#reset-rules');
const rulesCtn = document.querySelector('#rules-ctn');

var rgbDataset = dataset;
var network = trainBrain(rgbDataset);

var elementsWithBgColor = [cn, body];
var borders = [
    bigHeadingsBorder, 
    smallHeadingsBorder,
    textColorBorder
];

// console.log(borders);

function setup() {
    body.style.backgroundColor="rgb(4,0,84)";
    cn.style.backgroundColor="rgb(4,0,84)";
    cn.style.color= "white";
    toggleSwitch.addEventListener("click", (e) => toggleSwitch.checked ? cn.style.color = 'black' : cn.style.color = 'white');
    rulesSetup();
    pickerSetup();
}
setup();


function rulesSetup() {
    rules.defaultRules(dataset);
    hideRules.addEventListener("click", (e) => rulesCtn.style.display = "none");
    showRules.addEventListener("click", (e) => rulesCtn.style.display = "grid");

    addRule.addEventListener("click", (e) => {
        const list = document.querySelector("#list");

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
}


function pickerSetup() {
    const isTouchScreen = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
    let pickerWidth = 300;
    let pickerHeight = 220;
    let picker = new Picker(document.getElementById("color-picker"), pickerWidth, pickerHeight);

    const setPickerEvents = () => isTouchScreen ? picker.listenForTouchEvents() : picker.listenForMouseEvents();
    setPickerEvents();

    const loop = () => {
        picker.draw();
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    
    picker.onChange((color) => {
        if (network && (picker.isMouseDown || picker.isTouched)) {
            let background01 = rgb01(color);
            let textColor = brain.likely(background01, network) == 'dark' ? 'white' : 'black';
            
            cn.style.color = textColor;
            borders.forEach(e => e.style.borderColor = textColor);
            // bigHeadingsBorder.style.borderColor = textColor;
            // smallHeadingsBorder.style.borderColor = textColor;
            // textColorBorder.style.borderColor = textColor;
            
            toggleSwitch.checked = textColor=='black' ? true : false;
        }
        elementsWithBgColor.forEach(e => e.style.backgroundColor = color);
        info.innerText = color;
    });
}


