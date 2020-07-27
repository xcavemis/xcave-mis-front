import { codices } from '@/data/1-codices';
import { civil } from '@/data/2-civil';
import { mixedGallery } from '@/data/3-mixed-gallery';
import { anatomy } from '@/data/4-anatomy';
import { projection } from '@/data/5-projection';
import { military } from '@/data/6-military';
import { monalisaColors } from '@/data/7-monalisa-colors';
import { monalisaLayers } from '@/data/8-monalisa-layers';

let _scenes = codices.scenes
.concat(
  civil.scenes
)
.concat(
  mixedGallery.scenes
)
.concat(
  anatomy.scenes
)
.concat(
  projection.scenes
)
.concat(
  military.scenes
)
.concat(
  monalisaColors.scenes
)
.concat(
  monalisaLayers.scenes
)

export const data = {
  scenes: _scenes,
  "name": "MIS - DaVinci",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": false,
    "viewControlButtons": false
  }
}
