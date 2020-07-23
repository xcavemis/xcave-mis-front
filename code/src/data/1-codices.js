export const codices = {
    scenes: [
      {
        id: "codices101",
        type: "image",
        name: "CODICES 101",
        faceSize: 6144,
        initialViewParameters: {
          yaw: 0.031036797240462377, pitch: 0.011708270924472686,
          fov: 1.5707963267948966
        },
        linkHotspots: [
          {
            yaw: 1.5047226100659117, pitch: 0.3066645687128826,
            rotation: 0,
            target: "codices102",
            direction: {
              yaw: 1.864111704778729, 
              pitch: 0.08421002512558218,
              fov: 1.5707963267948966,
            },
          },
        ],
        infoHotspots: [
          {
            yaw: -0.5278457635004656, pitch: 0.20489117403065293,
            title: "D-101",
            type: 'content',
            image: "101/la-bele-feroniere.jpg",
            audio: '101/guide',
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum."
          },
          {
            yaw: -0.1158860785837117, pitch: 0.1134721887779726,
            title: "Realidade Aumentada",
            type: 'ar',
            model: '',
          },
        ]
      },
      {
        id: "codices102",
        type: "image",
        name: "CODICES 102",
        faceSize: 4096,
        initialViewParameters: {
          pitch: 0,
          yaw: 0,
          fov: 1.5707963267948966
        },
        linkHotspots: [
          {
            yaw: -0.870596128525225, pitch: 0.3471781798871092,
            rotation: 0,
            target: "codices101",
            direction: {
              pitch: 0,
              yaw: -1.6015670326454412, pitch: 0.025416835807696714
            },
          },
          {
            yaw: 2.2627856015454757, pitch: 0.31963522894558594,
            rotation: 0,
            target: "codices103",
            direction: {
              yaw: 1.254446921890727, pitch: 0.042058331030297325,
              fov: 1.5707963267948966
            },
          },
        ],
        infoHotspots: [
          {
            yaw: -0.5211899160846869, pitch: 0.09777342155119584,
            title: "D-102",
            type: 'content',
            image: "101/la-bele-feroniere.jpg",
            audio: '101/guide',
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum."
          },
          {
            yaw: 0.08455857139717615, pitch: 0.2033815353009274 ,
            title: "D-103",
            type: 'content',
            image: "101/la-bele-feroniere.jpg",
            audio: '101/guide',
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          }
        ]
      },
      {
        id: "codices103",
        type: "image",
        name: "CODICES 103",
        faceSize: 4096,
        initialViewParameters: {
          pitch: 0,
          yaw: 0,
          fov: 1.5707963267948966
        },
        linkHotspots: [
          {
            yaw: -2.142884953204561, pitch: 0.37913226327843574,
            rotation: 0,
            target: "codices102",
            direction: {
              yaw: -0.9883949748664271, pitch: 0.023028254223168787,
              fov: 1.5707963267948966
            },
          },
          // {
          //   yaw: -1.928586997218538, 
          //   pitch: -0.38390294269113845,
          //   rotation: 0,
          //   target: "civil201",
          //   direction: {
          //     pitch: 0,
          //     yaw: 0,
          //     fov: 1.5707963267948966
          //   },
          // },
        ],
        infoHotspots: []
      },
    ],
  };
  