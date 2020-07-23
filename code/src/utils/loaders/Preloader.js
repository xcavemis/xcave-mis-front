const THREE = require('three');
// require('@/utils/loaders/GLTFLoader.js');
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EventDispatcher } from '@/utils/events/EventDispatcher' 

export class Preloader extends EventDispatcher {
    constructor() {
        super()

        this.manager = new THREE.LoadingManager()

        this.gltf = new GLTFLoader(this.manager)
        this.texture = new THREE.TextureLoader(this.manager)
        this.assets = {}
        this.events = {}

        this.debug = false
        
        this.setListeners()
        
    }

    setListeners(){
        this.manager.onStart = this.onStart.bind(this)
        this.manager.onLoad = this.onLoad.bind(this)      
        this.manager.onProgress = this.onProgress.bind(this)
        this.manager.onError = this.onError.bind(this)
    }

    queue(list){
        if (list.length < 0) return
        for (let item of list) {
            if (this[item.type] && item.url.length > 0) this[item.type].load(item.url, result => {
                if (!this.assets[item.name]) this.assets[item.name] = result
            })
        }
    }

    onStart( url, itemsLoaded, itemsTotal ) {
        if (this.debug) console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };

    onLoad() {
        if (this.debug) console.log( 'Loading complete!', this.assets);
        this.dispatch('onComplete', {
            data: this.assets
        });
    };

    onProgress( url, itemsLoaded, itemsTotal ) {
        if (this.debug) console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        this.dispatch('onProgress', {
            data: itemsLoaded / itemsTotal
        });
    };

    onError( url ) {
        if (this.debug) console.log( 'There was an error loading ' + url );
    };
}