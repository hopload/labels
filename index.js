const label = require( './beer.js' )

const options = {
    dimensions: {
        x: 750,
        y: 1133
    },
    background: {
        alpha: 1,
        bounds: 0.15,
        cells: 200,
        color: [ 243, 156, 18 ],
        highlight: {
            alpha: 0.7,
            content: "",
            font: "800 140px Arial",
            offset: {
                x: 40,
                y: 800
            }

        }
    }
}

const canvas = document.getElementById( "canvas" );
const containers = document.getElementsByClassName( 'container' );
label( canvas, options );
// Array.prototype.forEach.call(containers, main => {
//     main.style.background = "url(" + canvas.toDataURL() + ")";
// } )
canvas.style.display = 'none';