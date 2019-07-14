export function getRgb01(color) {
    return { 
        r : (color.r/255).toFixed(2),
        g : (color.g/255).toFixed(2),
        b : (color.b/255).toFixed(2)
    };
}