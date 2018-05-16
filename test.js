const Voronoi = require( 'voronoi' );
const _ = require( 'lodash' );
const canvas = document.getElementById( "canvas" );
const ctx = canvas.getContext( "2d" );
const v = new Voronoi();
//7cm breit 9 cm hoch
// 2,756 inch x 3,543 inch 
// @ 300 dpi
const max = {
    x: 827,
    y: 1063
};
const bbox = {
    xl: 0,
    xr: max.x,
    yt: 0,
    yb: max.y
};
const sites = [];
const points = 10000;
for ( let i = 0; i < points; i++ ) sites.push( {
    x: Math.floor( Math.random() * max.x ),
    y: Math.floor( Math.random() * max.y )
} );



const textCanvas = document.getElementById( "text" );
const tctx = textCanvas.getContext( "2d" );
tctx.fillStyle = "red";
// tctx.font = '800 220px Arial';
tctx.fillRect( 300, 300, 200, 200 )
const c = ( alpha ) => {
    let colors = [
        'rgba(78,9,12,' + alpha + ')',
        'rgba(161,34,19,' + alpha + ')',
        'rgba(171,95,44,' + alpha + ')',
        'rgba(171,95,44,' + alpha + ')',
        'rgba(252,160,67,' + alpha + ')'
    ]
    return colors[ Math.round( Math.random() * colors.length ) ];
}
sites.forEach( p => {
    let imgData = tctx.getImageData( p.x, p.y, 1, 1 ).data;
    // let letter = (imgData[0] < 50 && imgData[1] < 50 && imgData[2] < 50);
    let letter = ( imgData[ 0 ] == 255 );
    // ctx.fillStyle = 'rgb(' + rnd255() + ',' + rnd255() + ',' + rnd255() + ')';
    ctx.fillStyle = letter ? c( 1 ) : c( 0 );
    ctx.fillRect( p.x, p.y, 2, 2 )
} );