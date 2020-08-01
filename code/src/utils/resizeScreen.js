export const resizeRenderToDisplaySize = (renderer) => {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio;
    const height = canvas.clientHeight * pixelRatio;
    const needResize = canvas.width !== width || canvas.height !== height;
  
    if (needResize) renderer.setSize( width, height, false );
  
    return needResize;
  }