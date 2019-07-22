export var rules = {
    defaultRules : function(dataset) {
        dataset.forEach(e => {
            let bg = `rgb(${(e.input.r*255)|0}, ${(e.input.g*255)|0}, ${(e.input.b*255)|0})`;
            let color = e.output.dark ? 'white' : 'black';
            let li = document.createElement("li");
    
            li.appendChild(document.createTextNode(`${bg}`));
            li.style.backgroundColor = bg;
            li.style.color = color;
            list.appendChild(li);
        });
    },
}
