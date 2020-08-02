<template>
  <div class="shader-bg">
  </div>
</template>

<script>
const THREE = require('three')
import { EffectComposer } from '@/utils/postprocessing/EffectComposer.js';
import { RenderPass } from '@/utils/postprocessing/RenderPass.js';
import { ShaderPass } from '@/utils/postprocessing/ShaderPass.js';
import axios from 'axios';
import { TweenMax, Quad } from 'gsap'
import { resizeRenderToDisplaySize } from '@/utils/resizeScreen'
import { MeshBasicMaterial } from 'three';

export default {
  props:['mouseOverUpdate'],
  name: 'DisplacementEdges',
  data(){
    return {
      isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),
      camera: null,
      scene: null,
      renderer: null,
      geometry: null,
      material: null,
      mesh: null,
      vertexShader: null,
      fragmentShader: null,
      amountPerImage: 600,
      transitionPos: {
        value: 0,
      },
      time: 0,
      speed: 0,
      targetSpeed: 0,
      mouse: new THREE.Vector2(),
      followMouse: new THREE.Vector2(),
      prevMouse: new THREE.Vector2(),
      publicPath: process.env.NODE_ENV === "production" ? `${window.theme_url}/assets` : ''
    }
  },
  mounted(){
    this.buildScene()
  },
  methods: {
    async loadShaders(){
      this.postVertex = await this.loadTextFile(`${this.publicPath}/shaders/post/vertex.glsl`);
      this.postFragment = await this.loadTextFile(`${this.publicPath}/shaders/post/fragment.glsl`);
    },
    async buildScene(){
      await this.loadShaders()
      this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
      this.camera.position.z = 1;
  
      this.scene = new THREE.Scene();
    
      this.renderer = new THREE.WebGLRenderer( {
        antialias: true 
      } );
      this.renderer.autoClear = false;
      this.renderer.setPixelRatio( window.devicePixelRatio );
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      this.$el.appendChild( this.renderer.domElement );

      this.texLoader = new THREE.TextureLoader()

      let geometry = new THREE.PlaneGeometry(2.8, 1.4, 4, 4);
      let material = new MeshBasicMaterial({ map: this.texLoader.load('/textures/bg-home-step1.jpg') })
      let mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh);

      const ambLight = new THREE.AmbientLight(0xffffff)
      this.scene.add(ambLight)

      if (this.isMobile) {
        window.addEventListener('touchmove', this.touchMove)
      } else {
        window.addEventListener('mousemove', this.mouseMove)
      }

      window.addEventListener('resize', this.onResize)
      this.composerPass()

      this.render()
    },
    touchMove(e){
      this.mouse.x = ( e.touches[0].clientX / window.innerWidth ) ;
      this.mouse.y = 1. - ( e.touches[0].clientY / window.innerHeight );
    },
    mouseMove(e){
      this.mouse.x = ( e.clientX / window.innerWidth ) ;
      this.mouse.y = 1. - ( e.clientY / window.innerHeight );
    },
    getSpeed(){
      this.speed = Math.sqrt( (this.prevMouse.x- this.mouse.x)**2 + (this.prevMouse.y- this.mouse.y)**2 );

      this.targetSpeed -= 0.045*(this.targetSpeed - this.speed);
      this.followMouse.x -= 0.045*(this.followMouse.x - this.mouse.x);
      this.followMouse.y -= 0.045*(this.followMouse.y - this.mouse.y);


      this.prevMouse.x = this.mouse.x;
      this.prevMouse.y = this.mouse.y;
    },
    composerPass(){
      this.composer = new EffectComposer(this.renderer);
      this.renderPass = new RenderPass(this.scene, this.camera);
      this.composer.addPass(this.renderPass);

      //custom shader pass
      let counter = 0.0;
      let effect = {
        uniforms: {
          "tDiffuse": { value: null },
          "distort": { value: 0 },
          "resolution": { value: new THREE.Vector2(1.,window.innerHeight/window.innerWidth) },
          "uMouse": { value: new THREE.Vector2(0,0) },
          "uVelo": { value: 0.0 },
          "uRadius": { value: this.isMobile ? 0.4 : 0.15 },
          "uType": { value: 0 },
          "time": { value: 0 }
        },
        vertexShader: this.postVertex,
        fragmentShader: this.postFragment
      }

      this.customPass = new ShaderPass(effect);
      
      this.composer.addPass(this.customPass);
    },
    render() {
      requestAnimationFrame( this.render );
  
      this.time+=0.05;
      this.getSpeed();
      this.customPass.uniforms.time.value = this.time;
      this.customPass.uniforms.uMouse.value = this.followMouse;
      this.customPass.uniforms.uVelo.value = Math.min(this.targetSpeed, 0.05);
      this.targetSpeed *=0.999;
      
      // this.renderer.render(this.scene, this.camera);
      if(this.composer) this.composer.render()
    },
    onResize(e){
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      const canvas = this.renderer.domElement
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight
      this.camera.updateProjectionMatrix()
    },
    loadTextFile(url) {
        return axios.get(url).then(response => {
            if (response.status && response.status == 200) {
               return response.data
            }
        }, err => {
            console.log('loadTextFile error', err)
        });
    },
    loadTexture(url) {
      return new Promise(resolve => {
        new THREE.TextureLoader().load(url, resolve);
      });
    },
  }
}
</script>

<style lang="scss">
.shader-bg{
  @include set-size(100%, 100%);
  overflow: hidden;
  // filter: grayscale(100%);

  canvas {
    width: 100%;
    height: 100%;
  }
}

</style>
