<template>
  <div class="pano-comp">
    <div id="pano" class="panolens-container"></div>
  </div>
</template>

<script>
const THREE = require('three');
import { TweenMax, Quad } from 'gsap';
const PANOLENS = require('@/utils/panolens/panolens.js');
import { data } from '@/data/scenes.js';
const hotspotInfo = require('@/assets/images/icons/hotspot-info.png')
const hotspotAr = require('@/assets/images/icons/hotspot-ar.png')
const hotspotLink = require('@/assets/images/icons/hotspot-link.png')
export default {
  name: 'Pano',
  props: {},
  data: () => ({
    viewer: null,
    sceneLoaded: false,
    currentSceneID: 0,
    viewer: null,
    panos: {},
    isMobile: navigator.userAgent.toLowerCase().match(/mobile/i),
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    currentPano: null, 
  }),
  mounted(){
    // this.$store.dispatch("loading", true)
    this.$nextTick(()=>{
      this.initPano()
    })
  },
  methods: {
    initPano(){
      this.viewer = new PANOLENS.Viewer({
        container: this.$el.querySelector('.panolens-container'),
        output: 'console',
        controlButtons: ['video'],
        autoHideInfospot: false
      })
      this.viewer.getControl().minFov = 20
      this.viewer.getControl().maxFov = 70
      // this.viewer.onTap = (event, type) => {
      //   if (type == 'click') {
      //     console.log(event)
      //   }
      // }
      this.buildScene('codices101', [4979.33, -341.24, -138.51])
      // this.buildScenes()
      // this.buildLinks()

      // data.scenes.map((data) => {
      //   data.infoHotspots.map((spot, index) => {
      //     if (spot.type == 'link') {
      //       console.log(this.panos[data.id], data.id)
      //       this.panos[data.id].link( this.panos[spot.target], spot.vec3 ? new THREE.Vector3(spot.vec3[0], spot.vec3[1], spot.vec3[2]) : new THREE.Vector3(1203.85, -1355.19, -4649.08), 400, require('@/assets/images/icons/hotspot-link.png'));
      //       this.panos[data.id].addEventListener( 'enter-fade-start', ()=>{
        
      //         // let dir;
      //         // if (direction == null) {
      //         //   dir = new THREE.Vector3(scene.initialViewParameters.vec3[0], scene.initialViewParameters.vec3[1], scene.initialViewParameters.vec3[2])
      //         // } else {
      //         //   }
      //         let dir = new THREE.Vector3(data.initialViewParameters.vec3[0], data.initialViewParameters.vec3[1], data.initialViewParameters.vec3[2])
      //         this.viewer.tweenControlCenter(dir, 0 );
      //         this.$store.dispatch("loading", false)
      //       })
      //     }
      //   })
      // })
      console.log(this.panos)
    },
    buildScene(key, direction){
      this.$store.dispatch("loading", true)
      if (this.currentPano) this.disposePanorama(this.currentPano)
      this.panos = {}
      const scene = this.findSceneDataById(key)
      let isImage = scene.type == 'image'
      // let urlPrefix = isImage ? `https://hml.exposicaodavinci500anos.com.br/assets${this.isMobile ? '/mob' : ''}` : "/media/videos";
      let urlPrefix = isImage ? `https://hml.exposicaodavinci500anos.com.br/assets${this.isMobile ? '/mob' : ''}` : "https://hml.exposicaodavinci500anos.com.br/assets/videos";
      let ext = isImage ? `.jpg` : `.mp4`
      let id = scene.id.substring(scene.id.length - 3, scene.id.length)
      // console.log(`${urlPrefix}/${scene.src}${ext}`)
      console.log(this.$store.getters.assets[id])
      let currentPano = isImage ? 
        new PANOLENS.ImagePanorama(  this.$store.getters.assets[id] ? this.$store.getters.assets[id].image : `${urlPrefix}/${scene.src}${ext}` ) :
        new PANOLENS.VideoPanorama(  `${urlPrefix}/${scene.src}${ext}`, { autoplay: true, muted: true} );

      currentPano.addEventListener( 'enter-fade-start', ()=>{
        this.viewer.getControl().object.fov = 50
        this.viewer.getControl().object.updateProjectionMatrix();
        let dir;
        if (direction == null) {
          dir = new THREE.Vector3(scene.initialViewParameters.vec3[0], scene.initialViewParameters.vec3[1], scene.initialViewParameters.vec3[2])
        } else {
          dir = new THREE.Vector3(direction[0], direction[1], direction[2])
        }
        this.viewer.tweenControlCenter(dir, 0 );
        this.$store.dispatch("loading", false)
      })

      const { edgeLength } = currentPano;
      const radius = edgeLength / 2;
      const baseScale = 200

      scene.infoHotspots?.map(info => {
        let pos = info.vec3 ? new THREE.Vector3(info.vec3[0], info.vec3[1], info.vec3[2]) : new THREE.Vector3(Math.random() * 1000, -1355.19, -4649.08)
        const infoSpot = new PANOLENS.Infospot(info.type == 'content' ? 150 : 400, info.type == 'content' ? require('@/assets/images/icons/hotspot-info.png') : require('@/assets/images/icons/hotspot-link.png'))
        infoSpot.addHoverText(info.title)
        infoSpot.position.copy( pos );
        infoSpot.addEventListener('click', (e) => {
          if (info.type == 'content') {
            this.showInfoHotspotLayer(info)
          } else if (info.type == 'link') {
            this.navigateTo(info)
          } 
        })
        currentPano.add( infoSpot );
        // this.panos[data.id].link( this.panos[link.target], dir);
        
      })
     
      if (!this.panos[scene.id]) {
        this.panos[scene.id] = currentPano
      }
      
      // this.panos.push(currentPano)
      this.viewer.add(currentPano)
      this.currentPano = currentPano
      this.updateMenuNavigation(scene)
    },
    buildScenes(){
      // return
      this.panos = {}
      console.log(this.$store.getters.assets)
      data.scenes.map((data) => {
        let isImage = data.type == 'image'
        let urlPrefix = isImage ? `/media/images/${this.isMobile ? '/mob' : ''}` : "/media/videos";
        // let urlPrefix = isImage ? `https://hml.exposicaodavinci500anos.com.br/assets${this.isMobile ? '/mob' : ''}` : "/img/scenes/video";
        let ext = isImage ? `.jpg` : `.mp4`
        let id = data.id.substring(data.id.length - 3, data.id.length)
        // console.log(`${urlPrefix}/${data.src}${ext}`)
        let panoSource = isImage ? 
          new PANOLENS.ImagePanorama(  this.$store.getters.assets[id] ? this.$store.getters.assets[id].image : `${urlPrefix}/${data.src}${ext}` ) : 
          new PANOLENS.VideoPanorama(  `${urlPrefix}/${data.src}${ext}`, { autoplay: true } );

        panoSource.addEventListener( 'enter', ()=>{
          console.log('pano fadeIn')
          this.viewer.tweenControlCenter( new THREE.Vector3(-782.91, -92.86, -4927.70), 1000 );
          // panoSource.fadeIn()

        })

        // panoSource.onLeave = function () {

	      //   const duration = this.animationDuration;

	      //   this.enterTransition.stop();
	      //   this.leaveTransition
        //     .to( {}, duration )
        //     .onStart( function () {

        //         /**
        //          * Leave panorama and animation starting event
        //          * @event Panorama#leave-start
        //          * @type {object} 
        //          */
        //         this.dispatchEvent( { type: 'leave-start' } );

        //         // this.fadeOut( 200 );
        //         this.toggleInfospotVisibility( false );

        //   }.bind( this ) ).start()
        // }
        // panoSource.addEventListener( 'enter-fade-start', ()=>{
        //   this.viewer.tweenControlCenter( new THREE.Vector3(-782.91, -92.86, -4927.70), 1000 );
        // })
        // console.log(panoSource)
        
        if (!this.panos[data.id]) {
          this.panos[data.id] = panoSource
        }
        // this.panos.push(panoSource)
        this.viewer.add(panoSource)
      });
    },
    buildLinks(){
      console.log(this.panos)
      data.scenes.map((data) => {
        data.linkHotspots?.map(link => {
          let dir = link.vec3 ? new THREE.Vector3(link.vec3[0], link.vec3[1], link.vec3[2]) : new THREE.Vector3(Math.random() * 1000, -1355.19, -4649.08)
          this.panos[data.id].link( this.panos[link.target], dir);
          
        })
        data.infoHotspots?.map(info => {
          let pos = info.vec3 ? new THREE.Vector3(info.vec3[0], info.vec3[1], info.vec3[2]) : new THREE.Vector3(Math.random() * 1000, -1355.19, -4649.08)
          const infoSpot = new PANOLENS.Infospot()
          infoSpot.addHoverText(info.title)
          infoSpot.position.copy( pos );
          infoSpot.addEventListener('click', (e) => {
            console.log('infoSpot click', info)
            if (info.type == 'content') {
              this.showInfoHotspotLayer(info)
            } else if (info.type == 'link') {
              this.navigateTo(info)
            } 
          })
          this.panos[data.id].add( infoSpot );
          // this.panos[data.id].link( this.panos[link.target], dir);
          
        })
      })
    },
    disposePanorama(panorama) {
      panorama.dispose();
      this.viewer.remove( panorama );
      panorama = null;
    },
    navigateTo(info){
      // this.$store.dispatch("loading", true)
      this.buildScene(info.target, info.direction.vec3)
    },
    goToScene(id){
      this.buildScene(id, null)
    },
    prev(){
      if (this.currentSceneID > 0) this.currentSceneID--
      const prevScene = data.scenes[this.currentSceneID]
      this.buildScene(prevScene.id, prevScene.initialViewParameters.vec3)
    },
    next(){
      if (this.currentSceneID < data.scenes.length-1) this.currentSceneID++
      const nextScene = data.scenes[this.currentSceneID]
      this.buildScene(nextScene.id, nextScene.initialViewParameters.vec3)
    },
    zoomIn(){
      const control = this.viewer.getControl()
      control.object.fov = ( control.object.fov > control.minFov ) 
	                ? control.object.fov - 0.1
	                : control.minFov;
      control.object.updateProjectionMatrix();
    },
    zoomOut(){
      const control = this.viewer.getControl()
      control.object.fov = ( control.object.fov < control.maxFov ) 
	                ? control.object.fov + 0.1
	                : control.maxFov;
      control.object.updateProjectionMatrix();
    },
    left(){
      this.viewer.getControl().rotateLeft(-0.001)
    },
    up(){
      this.viewer.getControl().rotateUp(-0.001)
    },
    right(){
      this.viewer.getControl().rotateLeft(0.001)
    },
    down(){
      this.viewer.getControl().rotateUp(0.001)
    },
    showInfoHotspotLayer(content) {
      this.$emit('info-layer', content)
    },
    updateMenuNavigation(scene) {
      let sceneName = scene.groupId
      const currScene = this.$store.getters.visitedScenes[sceneName]
      const currSceneList = currScene.arr
      if (currSceneList.indexOf(scene.id) < 0) {
        currSceneList.push(scene.id)
        this.$store.dispatch('visited_scenes', {
          room: sceneName,
          arr: currSceneList
        })
      }
      Object.keys(this.$store.getters.navigationStatus).forEach(room => {
        let scn = this.$store.getters.visitedScenes[room]

        if (sceneName == room && scn.arr.length == scn.len) {
          this.$store.dispatch('navigation_status', {
            room: sceneName,
            status: 'visited-current',
          })
        } else if (sceneName != room && scn.arr.length == scn.len) {
          this.$store.dispatch('navigation_status', {
            room: sceneName,
            status: 'visited',
          })
        } else if (sceneName == room && scn.arr.length < scn.len) {
          this.$store.dispatch('navigation_status', {
            room: sceneName,
            status: 'current',
          })
        } 
      })

    },
    findSceneById(id) {
      for (let i = 0; i < this.scenes.length; i++) {
        if (this.scenes[i].data.id === id) {
          return this.scenes[i];
        }
      }
      return null;
    },
    findSceneDataById(id) {
      for (let i = 0; i < data.scenes.length; i++) {
        if (data.scenes[i].id === id) {
          return data.scenes[i];
        }
      }
      return null;
    }
  }
}
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.pano-comp {
  @include set-size(100%, 100%);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -ms-text-size-adjust: none;
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  -ms-content-zooming: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  background-color: $black;

  .experience-overlay {
    @include set-size(100%, 100%);
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000;
  }
}

#pano {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 70px);
  overflow: hidden;
  background-color: #000;

}
canvas {
  top: 0;
  left: 0;
}
</style>
