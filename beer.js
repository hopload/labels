const Voronoi = require( 'voronoi' );
const Color = require( 'color' );

module.exports = ( canvas, o ) => {
    const bg = o.background;
    const ctx = canvas.getContext( "2d" );
    // ctx.beginPath();
    // ctx.rect( 0, 0, o.dimensions.x, o.dimensions.y );
    // ctx.fillStyle = Color(bg.color).rgb().toString();
    // ctx.fill();
    const v = new Voronoi();
    const bbox = {
        xl: 0,
        xr: o.dimensions.x,
        yt: 0,
        yb: o.dimensions.y
    };
    const sites = [];
    for ( let i = 0; i < bg.cells; i++ ) sites.push( {
        x: Math.floor( Math.random() * o.dimensions.x ),
        y: Math.floor( Math.random() * o.dimensions.y )
    } );

    const d = v.compute( sites, bbox );
    const bgcolors = generateColorPalette( bg.color );

    const textCanvas = document.createElement( "canvas" );
    textCanvas.width = o.dimensions.x;
    textCanvas.height = o.dimensions.y;
    const tctx = textCanvas.getContext( "2d" );
    tctx.fillStyle = "red";
    tctx.font = bg.highlight.font;
    tctx.fillText( bg.highlight.content, bg.highlight.offset.x, bg.highlight.offset.y );

    const getColor = ( alpha ) => {
        const colors = bgcolors.map( x => 'rgba(' + x[ 0 ] + ',' + x[ 1 ] + ',' + x[ 2 ] + ',' + alpha + ')' );
        return colors[ Math.floor( Math.random() * colors.length ) ]
    }

    const isHighlight = ( {
        x,
        y
    } ) => ( y > bg.bounds * o.dimensions.y && y < ( 1 - bg.bounds ) * o.dimensions.y );



    d.cells.forEach( cell => {
        let imgData = tctx.getImageData( cell.site.x, cell.site.y, 1, 1 ).data;
        let letter = ( imgData[ 0 ] == 255 );
        ctx.fillStyle = isHighlight( cell.site ) ? getColor( bg.highlight.alpha ) : getColor( bg.alpha );
        ctx.beginPath();
        ctx.moveTo( cell.halfedges[ 0 ].getStartpoint().x, cell.halfedges[ 0 ].getStartpoint().y );
        cell.halfedges.forEach( he => {
            ctx.lineTo( he.getEndpoint().x, he.getEndpoint().y );
        } )

        ctx.closePath();
        ctx.fill();
    } );


    // d.edges.forEach( edge => {
    //     if(edge.rSite && edge.lSite){
    //         ctx.beginPath();
    //         ctx.moveTo( edge.lSite.x, edge.lSite.y );
    //         ctx.lineTo( edge.rSite.x, edge.rSite.y );
    //         ctx.strokeStyle = "rgba(0,0,0,0.2)";
    //         ctx.stroke();
    //     }
    // } )

}

function generateColorPalette( base ) {
    base = Color( base );
    const colors = [
        Color( base ).rotate( 5 ),
        Color( base ).rotate( 10 ),
        Color( base ).rotate( 15 ),
        Color( base ).rotate( 20 )
    ];

    return colors.map( x => x.rgb().array() );
}