export function getRgb01(val) {
    let re = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    let m = val.match(re);
    return { 
        r : Number((parseInt(m[1], 16)/255).toFixed(2)),
        g : Number((parseInt(m[2], 16)/255).toFixed(2)),
        b : Number((parseInt(m[3], 16)/255).toFixed(2))
    };
}