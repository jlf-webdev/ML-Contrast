export class Picker {
    constructor (target, width, height, isTouch) {
        this.target = target;
        this.width = width;
        this.height = height;
        this.target.width = width;
        this.target.height = height;
        // Get context
        this.context = this.target.getContext("2d");
        // Circle
        this.pickerCircle = { x:70, y:150, width:7, insigth:7};
        
        this.isMouseDown = false;
        this.isTouched = false;
    }

    draw() {
        this.build();
    }

    build() {
        //Build Gradient Colors on the 2d Canvas
        let gradient = this.context.createLinearGradient(0,0,this.width,0);
        //Color stops
        gradient.addColorStop(0,"rgb(255,0,0)");
        gradient.addColorStop(0.15,"rgb(255,0,255)");
        gradient.addColorStop(0.33,"rgb(0,0,255)");
        gradient.addColorStop(0.49,"rgb(0,255,255)");
        gradient.addColorStop(0.67,"rgb(0,255,0)");
        gradient.addColorStop(0.84,"rgb(255,255,0)");
        gradient.addColorStop(1,"rgb(255,0,0)");
        // Fill it
        this.context.fillStyle = gradient;
        this.context.fillRect(0,0,this.width,this.height);

        //Add black&white color
        gradient = this.context.createLinearGradient(0,0,0,this.height);
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.5, "rgba(255,255,255,0)");
        gradient.addColorStop(0.5, "rgba(0,0,0,0)");
        gradient.addColorStop(1, "rgba(0,0,0,1)");
        this.context.fillStyle = gradient;
        this.context.fillRect(0,0,this.width,this.height);  
        
        //Circle Selector
        this.context.beginPath();
        this.context.arc(this.pickerCircle.x, this.pickerCircle.y, this.pickerCircle.width, 0, Math.PI * 2);
        this.context.strokeStyle = "black";
        this.context.stroke();
        this.context.closePath();
    }

    listenForMouseEvents() {
        this.isMouseDown = false;
        
        const onMouseDown = (e) => {
            let currentX = e.pageX - this.target.offsetLeft;
            let currentY = e.pageY - this.target.offsetTop;
            this.pickerCircle.x = currentX >= this.width ? this.width : currentX;
            this.pickerCircle.y = currentY >= this.height ? this.height : currentY;  
            this.isMouseDown = true;
        }

        const onMouseMove = (e) => {
            if (this.isMouseDown) {
                let currentX = e.pageX - this.target.offsetLeft;
                let currentY = e.pageY - this.target.offsetTop;
                this.pickerCircle.x = currentX >= this.width ? this.width : currentX;
                this.pickerCircle.y = currentY >= this.height ? this.height : currentY;
            }
        }

        const onMouseUp = () => {
            this.isMouseDown = false;
        }
        
        this.target.addEventListener("mousedown", onMouseDown);
        this.target.addEventListener("mousedown", () => this.onChangeCallback(this.getPickedColor()));
        this.target.addEventListener("mousemove", onMouseMove); 
        this.target.addEventListener("mousemove", () => this.onChangeCallback(this.getPickedColor()));
        document.addEventListener("mouseup", onMouseUp);
    }

    listenForTouchEvents() {
        this.isTouched = false;

        const onTouchStart = (e) => {
            e.preventDefault();
            let currentX = e.touches[0].pageX - this.target.offsetLeft;
            let currentY = e.touches[0].pageY - this.target.offsetTop;
            this.pickerCircle.x = currentX >= this.width ? this.width : currentX;
            this.pickerCircle.y = currentY >= this.height ? this.height : currentY; 
            this.isTouched = true;
        }
    
        const onTouchMove = (e) => {
            e.preventDefault();
            if (this.isTouched) {
                let currentX = e.touches[0].pageX - this.target.offsetLeft;
                let currentY = e.touches[0].pageY - this.target.offsetTop;
                this.pickerCircle.x = currentX >= this.width ? this.width : currentX;
                this.pickerCircle.y = currentY >= this.height ? this.height : currentY;
            }
        }
    
        function onTouchEnd() {
            this.isTouched = false;
        }

        this.target.addEventListener("touchstart", onTouchStart);
        this.target.addEventListener("touchstart", () => this.onChangeCallback(this.getPickedColor()));
        this.target.addEventListener("touchmove", onTouchMove);
        this.target.addEventListener("touchmove", () => this.onChangeCallback(this.getPickedColor()));
        document.addEventListener("touchend", onTouchEnd);
        document.addEventListener("touchcancel", onTouchEnd);
    }

    getPickedColor() {
        let imageData = this.context.getImageData(this.pickerCircle.x, this.pickerCircle.y, 1, 1);
        return { 
            r: imageData.data[0], 
            g: imageData.data[1],
            b: imageData.data[2]
        }
    }

    onChange(callback) {
        this.onChangeCallback = callback;
    }

}

