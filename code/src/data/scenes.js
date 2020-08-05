import { codices } from '@/data/content/1-codices';
import { civil } from '@/data/content/2-civil';
import { mixedGallery } from '@/data/content/3-mixed-gallery';
import { anatomy } from '@/data/content/4-anatomy';
import { projection } from '@/data/content/5-projection';
import { military } from '@/data/content/6-military';
import { monalisaColors } from '@/data/content/7-monalisa-colors';
import { monalisaLayers } from '@/data/content/8-monalisa-layers';

let _scenes = codices.scenes
// .concat(
//   civil.scenes
// )
// .concat(
//   mixedGallery.scenes
// )
// .concat(
//   anatomy.scenes
// )
// .concat(
//   projection.scenes
// )
// .concat(
//   military.scenes
// )
// .concat(
//   monalisaColors.scenes
// )
// .concat(
//   monalisaLayers.scenes
// )

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
