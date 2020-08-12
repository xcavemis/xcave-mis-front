
<template>
  <div class="ar-renderer">
    <div class="tap-instructions__scale-container user-action-none" v-if="showInstructions">
      <img v-if="isMobile" class="tap-instructions__svg" src="~@/assets/images/icons/icon-scale.svg" alt="Arraste o dedo para rotacionar.">
      <img v-if="isMobile" class="tap-instructions__svg" src="~@/assets/images/icons/icon-rotate.svg" alt="Arraste o dedo para rotacionar.">
      <div v-if="isMobile" class="tap-instructions__txt user-action-none">
        <div class="text-masked" v-html="interact_instructions.mobile.line1"></div>
        <div class="text-masked" v-html="interact_instructions.mobile.line2"></div>
      </div>
      <img v-if="!isMobile" class="tap-instructions__img" src="~@/assets/images/icons/mouse-control.png" alt="Arraste o dedo para rotacionar.">
      <div v-if="!isMobile" class="tap-instructions__txt user-action-none">
        <div class="text-masked" v-html="interact_instructions.desktop.line1"></div>
        <div class="text-masked" v-html="interact_instructions.desktop.line2"></div>
      </div>
    </div>
    <!-- <div class="ar-renderer__controls" v-if="!isMobile">
      <img
          ref="zoomOutBtn"
          class="ar-renderer__controls__button-icon"
          alt="Afastar imagem"
          @mouseleave="zoomOut($event)"
          @mousedown="zoomOut($event)"
          @mouseup="zoomOut($event)"
          src="~@/assets/images/icons/zoom-out.png"
      />
      <input ref="rangeZoom" class="ar-renderer__controls__range-input" type="range" min="0" max="1" step="0.05" value="0"  v-model="sliderZoom">
      <img
          ref="zoomInBtn"
          class="ar-renderer__controls__button-icon"
          alt="Aproximar imagem"
          @mouseleave="zoomIn($event)"
          @mousedown="zoomIn($event)"
          @mouseup="zoomIn($event)"
          src="~@/assets/images/icons/zoom-in.png"
      />
    </div> -->
  </div>
</template>

<script>
const Hammer = require('hammerjs');
const THREE = require("three");
// import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.js';
import { ShadowMesh } from 'three/examples/jsm/objects/ShadowMesh.js'
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { TweenMax, Quad } from "gsap";
import { Preloader } from '@/utils/loaders/Preloader';
import { TextureLoader } from 'three';

export default {
  props: ['content'],
  components: {},
  data() {
    return {
        camera: null,
        renderer: null,
        scene: null,
        renderTarget: null,
        composer: null,
        fxaaPass: null,
        controls: null,
        scale: 1,
        tapPosition: null,
        loadedData: {},
        sliderZoom: 1,
        minScale: new THREE.Vector3(0.5, 0.5, 0.5),
        maxScale: new THREE.Vector3(8, 8, 8),
        firstTapToRotation: false,
        friction: 0.01,
        isDragging: false,
        interact_instructions: {
          mobile: {
            line1: "USE OS DEDOS PARA AUMENTAR,",
            line2: "DIMINUIR OU GIRAR O OBJETO."
          },
          desktop: {
            line1: "USE O MOUSE PARA AUMENTAR,",
            line2: "DIMINUIR OU GIRAR O OBJETO."
          }
        },
        orientationControlsGranted: false,
        showInstructions: true,
        isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    };
  },
  created() {},
  mounted() {
    this.orientationControlsGranted = true
    this.$nextTick(()=>{
      this.setupQueue()
      if (this.isMobile) this.setupGestures()
    })
  },
  methods: {
    show(delay) {
        TweenMax.fromTo(this.model.scale, 0.8, { x: 0, y: 0, z: 0 }, { x: this.content.scale, y: this.content.scale, z: this.content.scale, delay: delay * 0.8, ease: Quad.easeInOut })
        TweenMax.fromTo('.ar-renderer', 0.6, { autoAlpha: 0 }, { autoAlpha: 1, delay: delay, ease: Quad.easeInOut, onComplete: ()=>{
          TweenMax.to('.tap-instructions__scale-container', 0.6, { autoAlpha: 0, delay: this.isMobile ? 5 : 10, ease: Quad.easeInOut, onComplete: ()=> {
            this.showInstructions = false
          }})
        }})
    },
    hide() {
    },
    setupQueue(){
      this.preloader = new Preloader()
      this.preloader.debug = false
      this.preloader.addListener('onComplete', this.loadComplete);
      this.preloader.addListener('onProgress', this.loadProgress);
      this.preloader.queue([
        // models
        { name: this.content.id, url: `models/${this.content.model}`, type: this.content.ext },
        { name: 'hdr', url: `textures/rooitou_park_1k.jpg`, type: 'texture' },
      ])
    },
    loadProgress(details){  
      // console.log('Preloader loadProgress: ', details.data);
    },
    loadComplete(details){  
      console.log('Preloader complete: ', details);
      this.loadedData = details.data
      this.setupScene(details.data[this.content.id]);
      // this.$refs.rangeZoom?.addEventListener('input', this.inputChange)
    },
    setupScene(_model) {
        // SCENE
        this.scene = new THREE.Scene();
        // scene.background = new THREE.Color( 0x59472b );
        // this.scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

        // RENDERER
        this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( this.$el.offsetWidth, this.$el.offsetHeight );
        this.$el.appendChild( this.renderer.domElement );
        this.renderer.shadowMap.enabled = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        // CAMERA
        this.camera = new THREE.PerspectiveCamera( 60, this.$el.offsetWidth / this.$el.offsetHeight, 1, 1000 );
        this.camera.position.set( this.isMobile ? this.content.camera.x : -128, this.isMobile ? this.content.camera.y : 129, this.isMobile ? this.content.camera.z : -5 );
        // CONTROLS
        if (!this.isMobile) {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement );
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.screenSpacePanning = false;
            this.controls.minDistance = 2;
            this.controls.maxDistance = 500;
            this.controls.maxPolarAngle = Math.PI / 2;
        } else {
            this.controls = new DeviceOrientationControls(this.camera)
            if (!this.isIOS) this.controls.alphaOffset = - Math.PI / 2
        }
        window.controls = this.controls 
        this.clock = new THREE.Clock()


        // MODEL
        this.model = _model.scene
        this.model.position.set(0,-40,0)
        this.model.rotation.set(0,0,0)
        this.model.scale.set(0, 0, 0)
        window.model = this.model
        this.model.traverse(child => {
            if (child.isMesh) { 
                // child.material.envMap = this.loadedData.hdr
                child.material.side = THREE.DoubleSide
                child.receiveShadow = true
                child.castShadow = true
            }
        })
        this.scene.add(this.model)

        
        // ANIMATIONS
        const animations = _model.animations
        this.mixer = new THREE.AnimationMixer( this.model );
        this.mixer.clipAction( animations[ 0 ] ).play();
        

        window.addEventListener( 'resize', this.onResizeWindow, false );

        // this.stats = new Stats()
        // this.$el.appendChild(this.stats.domElement)

        this.setupLights()
        this.animate()
        this.$emit('load-complete')
    },
    setupLights(){
        const ambLight = new THREE.AmbientLight( 0xffffff, this.content.lights.ambientIntensity )
        this.scene.add( ambLight );

        //  SHADOW
        const pointLight = new THREE.SpotLight( 0xffffff, this.content.lights.pointIntensity );
        pointLight.position.set( 0, 500, 0 );
        pointLight.angle = Math.PI * 0.2;
        pointLight.castShadow = true;
        pointLight.shadow.camera.near = 200;
        pointLight.shadow.camera.far = 2000;
        pointLight.shadow.bias = - 0.000222;
        pointLight.shadow.mapSize.width = 1024;
        pointLight.shadow.mapSize.height = 1024;
        this.scene.add( pointLight );
        
       const dirLight = new THREE.DirectionalLight(0xffffff, this.content.lights.directionalIntensity  )
       this.scene.add(dirLight)
        var planeGeometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
        planeGeometry.rotateX( - Math.PI / 2 );
        var planeMaterial = new THREE.ShadowMaterial( { opacity: 0.15 } );

        var plane = new THREE.Mesh( planeGeometry, planeMaterial );
        // plane.position.y = 0;
        plane.receiveShadow = true;
        plane.position.set(0,this.content.shadow.z,0)
        this.scene.add( plane );

        
    },
    setupGestures(){

      this.$el.addEventListener('touchmove', this.touchDragMove)
      this.$el.addEventListener('touchend', this.touchDragEnd)
      this.$el.addEventListener('touchstart', this.touchDragStart)

      this.tapPosition = new THREE.Vector2()

      const ham = new Hammer( this.$el, { domEvents: true });
     
      ham.get('pinch').set({ enable: true });
      ham.on( "pinch", ( e ) => {
        this.pinchActive = true
        const pinchScale = this.scale + this.scale * (e.scale - 1) * 0.4;
        if((pinchScale >= this.minScale.x && pinchScale <= this.maxScale.x)){
          if(this.model != null) this.model.scale.set(pinchScale * this.content.scaleFactor, pinchScale * this.content.scaleFactor, pinchScale * this.content.scaleFactor);
        }
      });
      
      ham.on( "pinchend", ( e ) => {
        let pinchScale = this.scale + this.scale * (e.scale - 1) * 0.4;
              
        if(pinchScale < this.minScale.x){
          pinchScale = this.minScale.x;
        }
        if(pinchScale > this.maxScale.x){
          pinchScale = this.maxScale.x;
        }
        this.scale = pinchScale;

        this.pinchActive = false
      });

      ham.get('rotate').set({ enable: true });
      ham.on( "rotatemove", ( e ) => {
        this.pinchActive = true
        let direction = e.direction
        let distance = e.distance
        if ((direction == 2 || direction == 4) && distance > 40) {
          let rotY = this.iOS ? this.friction : 1.0
          if (direction == 2) {
            rotY = this.iOS ? -this.friction : -1.0
          }
          let currentRot = new THREE.Vector3(this.model.rotation.x, this.model.rotation.y, this.model.rotation.z)
          let newRot = new THREE.Vector3(this.model.rotation.x, this.model.rotation.y + rotY, this.model.rotation.z)
          currentRot.lerp(newRot, 0.1)
          this.model.rotation.set(currentRot.x, currentRot.y, currentRot.z)
        }
      });

    },
    touchDragMove(e) {
      if (this.pinchActive) return
      let distance = this.startTouchPosition.x - e.changedTouches[0].clientX
      if (distance < 0) distance *= -1
      if (this.firstTapToRotation) {
        this.firstTapToRotation = distance < 10
      }
      if(this.isDragging && !this.firstTapToRotation) {
        let rotY = this.isIOS ? 0.5 : 1
        if (e.changedTouches[0].clientX < this.previousTouchPosition.x) {
          rotY *= this.isIOS ? -0.8 : -1
        }

        let currentRot = new THREE.Vector3(this.model.rotation.x, this.model.rotation.y, this.model.rotation.z)
        let newRot = new THREE.Vector3(this.model.rotation.x, this.model.rotation.y + rotY, this.model.rotation.z)
        currentRot.lerp(newRot, this.iOS ? 0.01 : 0.05)
        this.model.rotation.set(currentRot.x, currentRot.y, currentRot.z)
      }
      
      this.previousTouchPosition = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
    },
    touchDragStart(e){
      this.startTouchPosition = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
      this.isDragging = true
      this.firstTapToRotation = true
    },
    touchDragEnd(e){
      this.isDragging = false
      this.firstTapToRotation = false
      this.previousTouchPosition = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
    },
    zoomOut(e) {
      if (this.model.scale.x > 0.01) {
        TweenMax.fromTo(this.model.scale, 0.6, 
          { x: this.model.scale.x, y: this.model.scale.y, z: this.model.scale.z }, 
          { x: this.model.scale.x - 0.05, y: this.model.scale.y - 0.05, z: this.model.scale.z - 0.05, ease: Quad.easeInOut })
      }
    },
    zoomIn(e) {
      if (this.model.scale.x < this.maxScale.x) {
        TweenMax.fromTo(this.model.scale, 0.6, 
          { x: this.model.scale.x, y: this.model.scale.y, z: this.model.scale.z }, 
          { x: this.model.scale.x + 0.05, y: this.model.scale.y + 0.05, z: this.model.scale.z + 0.05, ease: Quad.easeInOut })
      }
    },
    inputChange(event) {
     console.log('inputChange', event.target.valueAsNumber)
    },
    
    animate() {
        requestAnimationFrame(this.animate);

        let delta = this.clock.getDelta();

        if (this.model && !this.isDragging && this.content.auto_rotate) this.model.rotation.y += delta * 0.05

        if (this.mixer) this.mixer.update( delta );

        this.controls?.update()
        
        this.render();

        this.stats?.update()

    },
    render() {
        this.renderer?.render(this.scene, this.camera);
    },
    onResizeWindow() {
      if (this.camera) this.camera.updateProjectionMatrix();
      
      const w = this.$el.innerWidth
      const h = this.$el.innerHeight
      if (this.renderer) this.renderer.setSize(w, h );
      if (this.composer) this.composer.setSize(w, h );
      
      if (this.fxaaPass) {
        const pixelRatio = this.renderer.getPixelRatio();
  
        this.fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / (w * pixelRatio );
        this.fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( h * pixelRatio );
      }
      

    },
  },
  beforeDestroy() {
    this.scene.children.map(child => {
      this.scene.remove(child)
    })
    this.model = null
    this.camera = null
    this.renderer.dispose()
    this.renderer = null
    this.scene.dispose()
    this.scene = null
    cancelAnimationFrame(this.animate);
  }

};
</script>

<style lang="scss">
.ar-renderer {
  @include center(absolute);
  @include set-size(100%, 100%);
  background-color: transparent;
  z-index: 10;
  opacity: 0;


  .tap-instructions__scale-container{
    @include set-size(100%, auto);
    @include center-x(absolute);
    bottom: 20vh;
    z-index: 10;
    pointer-events: none;
    // opacity: 0;
    // display: none;  

    @include minWidth(1024) {
      bottom: 0;
      padding: 15px;;
      background-color: rgba(0,0,0,0.2);
    }
    
    .tap-instructions__svg{
      @include set-size(22vw, 20vw);
      max-width: 80px;
      margin-bottom: 2.9vh;
    }
    .tap-instructions__img{
      @include set-size(22vw, auto);
      max-width: 80px;
    }

    .tap-instructions__txt{
      color: #fff;
      @include font-size(16);
      font-family: $mont-regular;
      text-shadow: 0px 0px 4px rgba(0,0,0,0.16);
      margin: 0;
      text-align: center;

      @include maxWidth(375) {
        @include font-size(14);
      }
    }

    .second-step {
      .cls-1 {
        opacity: 0.2;
      }

      .cls-2 {
        fill: #fff;
      }
    }
  }

  .ar-renderer__controls { 
    @include set-size(100%, 40px);
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: rgba(0,0,0,0.1);
    .mg-r {
        margin-right: 20px;
    }
    .ar-renderer__controls__button-icon { 
        @include set-size(22px, 22px);
        margin: 10px 10px;
        cursor: pointer;
        opacity: 0.7;
        transform: translateZ(0) scale(1);
        transition: all 0.2s ease-in-out;
        &:hover {
            opacity: 1;
            transform: translateZ(0) scale(1.1);
        }
    } 

    .ar-renderer__controls__range-input {
        width: 160px
    }
  }

}

</style>