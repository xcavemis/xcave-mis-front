
<template>
  <div class="ar-renderer"></div>
</template>

<script>
const Hammer = require('hammerjs');
const THREE = require("three");
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.js';
import { ShadowMesh } from 'three/examples/jsm/objects/ShadowMesh.js'
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { TweenMax, Quad } from "gsap";
import { Preloader } from '@/utils/loaders/Preloader';

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
        minScale: new THREE.Vector3(0.5, 0.5, 0.5),
        maxScale: new THREE.Vector3(8, 8, 8),
        firstTapToRotation: false,
        isDragging: false,
        orientationControlsGranted: false,
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
        TweenMax.fromTo(this.model.scale, 0.8, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, delay: delay * 0.8, ease: Quad.easeInOut })
        TweenMax.fromTo('.ar-renderer', 0.6, { autoAlpha: 0 }, { autoAlpha: 1, delay: delay, ease: Quad.easeInOut, onComplete: ()=>{

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
      ])
    },
    loadProgress(details){  
      // console.log('Preloader loadProgress: ', details.data);
    },
    loadComplete(details){  
      // console.log('Preloader complete: ', details);
      
      this.setupScene(details.data[this.content.id]);
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
        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMapping;

        // CAMERA
        this.camera = new THREE.PerspectiveCamera( 60, this.$el.offsetWidth / this.$el.offsetHeight, 1, 1000 );
        this.camera.position.set( this.isMobile ? 0 : -128, this.isMobile ? 60 : 129, this.isMobile ? 40 : -5 );
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
        }

        this.clock = new THREE.Clock()

        // MODEL
        this.model = _model.scene
        this.model.position.set(0,-40,0)
        this.model.rotation.set(0,0,0)
        this.model.scale.set(0, 0, 0)
        window.model = this.model
        this.model.traverse(child => {
            if (child.isMesh) { 
                child.receiveShadow = true
                child.castShadow = true
            }
        })
        this.scene.add(this.model)

        //  SHADOW
        var light = new THREE.SpotLight( 0xffffff, 0.7 );
        light.position.set( 0, 1500, 0 );
        light.angle = Math.PI * 0.2;
        light.castShadow = true;
        light.shadow.camera.near = 200;
        light.shadow.camera.far = 2000;
        light.shadow.bias = - 0.000222;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        this.scene.add( light );

        var planeGeometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
        planeGeometry.rotateX( - Math.PI / 2 );
        var planeMaterial = new THREE.ShadowMaterial( { opacity: 0.15 } );

        var plane = new THREE.Mesh( planeGeometry, planeMaterial );
        // plane.position.y = 0;
        plane.receiveShadow = true;
        plane.position.set(0,-41,0)
        this.scene.add( plane );


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
        const ambLight = new THREE.AmbientLight( 0xf0f0f0 )
        this.scene.add( ambLight );

        
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
          if(this.model != null) this.model.scale.set(pinchScale, pinchScale, pinchScale);
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
          let rotY = this.iOS ? 0.5 : 1.0
          if (direction == 2) {
            rotY = this.iOS ? -0.5 : -1.0
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
        let rotY = 1
        if (e.changedTouches[0].clientX < this.previousTouchPosition.x) {
          rotY *= -1
        }
        let currentRot = new THREE.Vector3(this.model.rotation.x, this.model.rotation.y, this.model.rotation.z)
        let newRot = new THREE.Vector3(this.model.rotation.x, this.model.rotation.y + rotY, this.model.rotation.z)
        currentRot.lerp(newRot, this.iOS ? 0.08 : 0.2)
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
    
    animate() {
        requestAnimationFrame(this.animate);

        let delta = this.clock.getDelta();

        if (this.model) this.model.rotation.y += delta * 0.05

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
}

</style>