export const projection = {
    scenes: [
      {
        id: "projection501Video",
        groupId: 'sensorial',
        src: 'mercedes-f1-1280x640',
        type: "video",
        name: "projection 501 VIDEO",
        faceSize: 6144,
        initialViewParameters: {
          yaw: -1.0466256635223559, pitch: 0.02441289226320542,
          fov: 1.5707963267948966
        },
        linkHotspots: [
          {
            yaw: 0.9314757271747585, pitch: 0.4024228867281252,
            rotation: 0,
            target: "anatomy405",
            direction: {
              yaw: -1.435661418086159, pitch: -0.0011860279789779327,
              fov: 1.5707963267948966,
            },
          },
          // {
          //   yaw: 2.7879146688196395, pitch: 0.6028420260412517,
          //   rotation: 0,
          //   target: "projection503",
          //   direction: {
          //     yaw: 3.065203447794607, pitch: -0.054666325205939614,
          //     fov: 1.5707963267948966,
          //   },
          // },
          {
            yaw: 2.7879146688196395, pitch: 0.6028420260412517,
            rotation: 0,
            target: "projection502Video",
            direction: {
              yaw: 3.065203447794607, pitch: -0.054666325205939614,
              fov: 1.5707963267948966,
            },
          },
          // {
          //   yaw: 2.7879146688196395, pitch: 0.6028420260412517,
          //   rotation: 0,
          //   target: "projection502",
          //   direction: {
          //     yaw: 3.065203447794607, pitch: -0.054666325205939614,
          //     fov: 1.5707963267948966,
          //   },
          // },
        ],
        infoHotspots: []
      },
      {
        id: "projection501",
        groupId: 'sensorial',
        src: 'projection-501',
        type: "image",
        name: "projection 501",
        faceSize: 6144,
        initialViewParameters: {
          yaw: -1.0466256635223559, pitch: 0.02441289226320542,
          fov: 1.5707963267948966
        },
        linkHotspots: [
          {
            yaw: 0.9314757271747585, pitch: 0.4024228867281252,
            rotation: 0,
            target: "anatomy405",
            direction: {
              yaw: 1.5358998252103762, pitch: 0.03038155458975389,
              fov: 1.5707963267948966,
            },
          },
          {
            yaw: 2.7879146688196395, pitch: 0.6028420260412517,
            rotation: 0,
            target: "projection503",
            direction: {
              yaw: 3.065203447794607, pitch: -0.054666325205939614,
              fov: 1.5707963267948966,
            },
          },
        ],
        infoHotspots: [
          {
            yaw: -0.8231056180548961, pitch: -0.04273978330956574,
            title: "D-401",
            type: 'content',
            image: "101/la-bele-feroniere.jpg",
            audio: '101/guide',
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum."
          },
          
        ]
      },
      {
        id: "projection502Video",
        groupId: 'sensorial',
        src: 'rua',
        type: "video",
        name: "projection 502 VIDEO",
        faceSize: 6144,
        initialViewParameters: {
          yaw: -1.0466256635223559, pitch: 0.02441289226320542,
          fov: 1.5707963267948966
        },
        linkHotspots: [
          {
            yaw: 0.9314757271747585, pitch: 0.4024228867281252,
            rotation: 0,
            target: "projection501Video",
            direction: {
              yaw: -1.435661418086159, pitch: -0.0011860279789779327,
              fov: 1.5707963267948966,
            },
          },
          {
            yaw: 2.7879146688196395, pitch: 0.6028420260412517,
            rotation: 0,
            target: "projection503",
            direction: {
              yaw: 3.065203447794607, pitch: -0.054666325205939614,
              fov: 1.5707963267948966,
            },
          },
          // {
          //   yaw: 2.7879146688196395, pitch: 0.6028420260412517,
          //   rotation: 0,
          //   target: "projection502",
          //   direction: {
          //     yaw: 3.065203447794607, pitch: -0.054666325205939614,
          //     fov: 1.5707963267948966,
          //   },
          // },
        ],
        infoHotspots: []
      },
      {
        id: "projection503",
        groupId: 'sensorial',
        src: 'projection-503',
        type: "image",
        name: "projection 503",
        faceSize: 6144,
        initialViewParameters: {
          yaw: -1.0466256635223559, pitch: 0.02441289226320542,
          fov: 1.5707963267948966
        },
        linkHotspots: [
          {
            yaw: 0.9314757271747585, pitch: 0.4024228867281252,
            rotation: 0,
            target: "military601",
            direction: {
              yaw: 1.5358998252103762, pitch: 0.03038155458975389,
              fov: 1.5707963267948966,
            },
          },
        ],
        infoHotspots: [
          {
            yaw: -0.8231056180548961, pitch: -0.04273978330956574,
            title: "D-502",
            type: 'content',
            image: "101/la-bele-feroniere.jpg",
            audio: '101/guide',
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum."
          },
        ]
      },
    ],
  };
  