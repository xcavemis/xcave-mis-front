export const view = (() => {
    const matrix = [1, 0, 0, 1, 0, 0]; // current view transform
    var m = matrix;             // alias 
    var scale = 1;              // current scale
    const pos = { x: 0, y: 0 }; // current position of origin
    var dirty = true;
    const API = {
      applyTo(el) {
        if (dirty) { this.update() }
        el.style.transform = `matrix(${m[0]},${m[1]},${m[2]},${m[3]},${m[4]},${m[5]})`;
      },
      update() {
        dirty = false;
        m[3] = m[0] = scale;
        m[2] = m[1] = 0;
        m[4] = pos.x;
        m[5] = pos.y;
      },
      pan(amount) {
        if (dirty) { this.update() }
         pos.x += amount.x;
         pos.y += amount.y;
         dirty = true;
      },
      scaleAt(at, amount, min = 0.5, max = 10) { // at in screen coords
        if (dirty) { this.update() }
        scale *= amount;
        if (scale < min) scale = min
        if (scale > max) scale = max
        pos.x = at.x - (at.x - pos.x) * amount;
        pos.y = at.y - (at.y - pos.y) * amount;
        dirty = true;
      },
      reset(){
        m = matrix;
        scale = 1;
        pos.x = 0
        pos.y = 0
        dirty = true;
      }
    };
    return API;
})();
  



// export const dragAndZoom = (canvas, size, src) => {		
//     let imageTarget = new Image();
//     imageTarget.src = src;
//     canvas.width = size.w; canvas.height = size.h;
//     let ctx = canvas.getContext('2d');
//     let zoomSettings = {
//         curr: 1,
//         min: 0.4,
//         max: 5
//     }
//     trackTransforms(ctx);

//     const redraw = () => {
//         // Clear the entire canvas
//         let p1 = ctx.transformedPoint(0,0);
//         let p2 = ctx.transformedPoint(canvas.width,canvas.height);
//         ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
        
//         // ctx.drawImage(imageTarget, -size.w * .5, -size.h * .5);

//         let x = (canvas.width / 2) - (imageTarget.width / 2) * zoomSettings.curr;
//         let y = (canvas.height / 2) - (imageTarget.height / 2) * zoomSettings.curr;
//         ctx.drawImage(imageTarget, x, y, imageTarget.width * zoomSettings.curr, imageTarget.height * zoomSettings.curr);
//     }
    
//     let lastX=size.w*0.5, lastY=size.h*0.5;
//     let dragStart,dragged;

//     canvas.addEventListener('mousedown',(evt) => {
//         document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
//         lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
//         lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
//         dragStart = ctx.transformedPoint(lastX,lastY);
//         dragged = false;
//     },false);

//     canvas.addEventListener('mousemove',(evt) => {
//         lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
//         lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
//         dragged = true;
//         if (dragStart){
//             let pt = ctx.transformedPoint(lastX,lastY);
//             ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
//             redraw();
//         }
//     },false);

//     canvas.addEventListener('mouseup',(evt) => {
//         dragStart = null;
//         if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
//     },false);

//     let scaleFactor = 1.1;
//     let zoom = (clicks) => {
//         // if (zoomSettings.curr >= zoomSettings.max || zoomSettings.curr <= zoomSettings.min) return
//         if (clicks > 0 && zoomSettings.curr < zoomSettings.max) {
//             zoomSettings.curr += 0.1
//         } else if (clicks < 0 && zoomSettings.curr > zoomSettings.min) {
//             zoomSettings.curr -= 0.1
//         } 
        
//         // let pt = ctx.transformedPoint(lastX,lastY);
//         // ctx.translate(pt.x,pt.y);
//         // let factor = Math.pow(scaleFactor,clicks);
//         // ctx.scale(factor,factor);
//         // ctx.translate(-pt.x,-pt.y);
//         redraw();
//     }

//     let handleScroll = (evt) => {
//         let delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
//         if (delta) zoom(delta);
//         return evt.preventDefault() && false;
//     };
//     canvas.addEventListener('DOMMouseScroll',handleScroll,false);
//     canvas.addEventListener('mousewheel',handleScroll,false);
    
//     redraw();
// };


// // Adds ctx.getTransform() - returns an SVGMatrix
// // Adds ctx.transformedPoint(x,y) - returns an SVGPoint
// function trackTransforms(ctx){
//     let svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
//     let xform = svg.createSVGMatrix();
//     ctx.getTransform = function(){ return xform; };
    
//     let savedTransforms = [];
//     let save = ctx.save;
//     ctx.save = function(){
//         savedTransforms.push(xform.translate(0,0));
//         return save.call(ctx);
//     };
//     let restore = ctx.restore;
//     ctx.restore = function(){
//         xform = savedTransforms.pop();
//         return restore.call(ctx);
//     };

//     let scale = ctx.scale;
//     ctx.scale = function(sx,sy){
//         xform = xform.scaleNonUniform(sx,sy);
//         return scale.call(ctx,sx,sy);
//     };
//     let rotate = ctx.rotate;
//     ctx.rotate = function(radians){
//         xform = xform.rotate(radians*180/Math.PI);
//         return rotate.call(ctx,radians);
//     };
//     let translate = ctx.translate;
//     ctx.translate = function(dx,dy){
//         xform = xform.translate(dx,dy);
//         return translate.call(ctx,dx,dy);
//     };
//     let transform = ctx.transform;
//     ctx.transform = function(a,b,c,d,e,f){
//         let m2 = svg.createSVGMatrix();
//         m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
//         xform = xform.multiply(m2);
//         return transform.call(ctx,a,b,c,d,e,f);
//     };
//     let setTransform = ctx.setTransform;
//     ctx.setTransform = function(a,b,c,d,e,f){
//         xform.a = a;
//         xform.b = b;
//         xform.c = c;
//         xform.d = d;
//         xform.e = e;
//         xform.f = f;
//         return setTransform.call(ctx,a,b,c,d,e,f);
//     };
//     let pt  = svg.createSVGPoint();
//     ctx.transformedPoint = function(x,y){
//         pt.x=x; pt.y=y;
//         return pt.matrixTransform(xform.inverse());
//     }
// }

// // setTimeout(init, 1000)