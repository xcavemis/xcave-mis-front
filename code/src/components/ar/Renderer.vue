
<template>
  <div class="ar-renderer"></div>
</template>

<script>
const Hammer = require('hammerjs');
const THREE = require("three");
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.js';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { TweenMax, Quad } from "gsap";

export default {
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
        this.setupScene();
        if (this.isMobile) this.setupGestures()
    })
  },
  methods: {
    show() {
        TweenMax.fromTo('.ar-renderer', 0.6, { autoAlpha: 0 }, { autoAlpha: 1, ease: Quad.easeInOut })
    },
    hide() {
    },
    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

        this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( this.$el.offsetWidth, this.$el.offsetHeight );
        this.$el.appendChild( this.renderer.domElement );
        this.camera = new THREE.PerspectiveCamera( 60, this.$el.offsetWidth / this.$el.offsetHeight, 1, 1000 );
        this.camera.position.set( 0, this.isMobile ? 60 : 25, this.isMobile ? 40 : 15 );

        // controls
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

        const dirLight1 = new THREE.DirectionalLight( 0xffffff, 2 );
        dirLight1.position.set( 1, 1, 1 );
        this.scene.add( dirLight1 );

        const dirLight2 = new THREE.DirectionalLight( 0x002288, 2 );
        dirLight2.position.set( - 1, - 1, - 1 );
        this.scene.add( dirLight2 );

        const ambLight = new THREE.AmbientLight( 0x222222, 1 );
        this.scene.add( ambLight );


        this.model = this.$store.getters.assets.teste.scene
        this.model.rotation.set(0,-0.7,0)
        this.scene.add(this.model)

        window.addEventListener( 'resize', this.onResizeWindow, false );

        this.stats = new Stats()
        this.$el.appendChild(this.stats.domElement)
        this.animate()
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