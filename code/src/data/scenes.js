import { codices } from '@/data/1-codices';
import { civil } from '@/data/2-civil';
import { mixedGallery } from '@/data/3-mixed-gallery';
import { anatomy } from '@/data/4-anatomy';

let _scenes = codices.scenes
// .concat(
//   civil.scenes
// ).concat(
//   mixedGallery.scenes
// ).concat(
//   anatomy.scenes
// )

export const data = {
  scenes: _scenes,
  "name": "MIS - DaVinci",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
}
