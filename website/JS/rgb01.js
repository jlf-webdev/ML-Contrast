export function rgb01(val) {
    let re = /(\d+)/g;
    let m = val.match(re);
    return { 
        r : Number((m[0]/255).toFixed(2)),
        g : Number((m[1]/255).toFixed(2)),
        b : Number((m[2]/255).toFixed(2))
    };
}