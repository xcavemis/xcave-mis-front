export const civil = {
    scenes: [
      {
        id: "civil201",
        type: "image",
        name: "CIVIL 201",
        faceSize: 4096,
        initialViewParameters: {
          pitch: 0,
          yaw: 0,
          fov: 1.5707963267948966
        },
        linkHotspots: [
          {
            yaw: -1.4347521584966376, 
            pitch: -0.38390294269113845,
            rotation: 0,
            target: "civil202",
            direction: {
              pitch: 0,
              yaw: 0,
              fov: 1.5707963267948966
            },
          },
          {
            yaw: -1.6849472555297336,
            pitch: 0.31676660031329185,
            rotation: 0,
            target: "civil205",
            direction: {
              pitch: 0,
              yaw: 0,
              fov: 1.5707963267948966
            },
          },
        ],
        infoHotspots: []
      },
      {
        id: "civil202",
        type: "image",
        name: "CIVIL 202",
        faceSize: 4096,
        initialViewParameters: {
          pitch: -0.12123199544790353,
          yaw: 2.135259024847783,
          fov: 1.5707963267948966
        },
        linkHotspots: [
          {
            yaw: -1.4347521584966376, 
            pitch: -0.38390294269113845,
            rotation: 0,
            target: "civil201",
            direction: {
              pitch: 0,
              yaw: 0,
              fov: 1.5707963267948966
            },
          },
          {
            yaw: 2.7272376506945806, 
            pitch: 0.32403734171909804,
            rotation: 0,
            target: "civil203",
            direction: {
              pitch: 0,
              yaw: 0,
              fov: 1.5707963267948966
            },
          },
        ],
        infoHotspots: [
          {
            yaw: -0.00038049728702915786,
            pitch: 0.014985751462495145,
            title: "D-201",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum."
          },
          {
            yaw: -1.6849472555297336,
            pitch: 0.31676660031329185,
            title: "D-202",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum."
          }
        ]
      },
      {
        id: "civil203",
        type: "image",
        name: "CIVIL 203",
        faceSize: 4096,
        initialViewParameters: {
          pitch: 0,
          yaw: 0,
          fov: 1.5707963267948966
        },
        linkHotspots: [
            {
                yaw: -1.4347521584966376, 
                pitch: -0.38390294269113845,
                rotation: 0,
                target: "civil202",
                direction: {
                  pitch: 0,
                  yaw: 0,
                  fov: 1.5707963267948966
                },
            },
            {
                yaw: 2.7272376506945806, 
                pitch: 0.32403734171909804,
                rotation: 0,
                target: "civil204",
                direction: {
                  pitch: 0,
                  yaw: 0,
                  fov: 1.5707963267948966
                },
            },
        ],
        infoHotspots: [
            {
                yaw: -0.00038049728702915786,
                pitch: 0.014985751462495145,
                title: "D-203",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum."
            },
        ]
      },
      {
        id: "civil204",
        type: "image",
        name: "CIVIL 204",
        faceSize: 4096,
        initialViewParameters: {
          pitch: 0,
          yaw: 0,
          fov: 1.5707963267948966
        },
        linkHotspots: [
            {
                yaw: -1.4347521584966376, 
                pitch: -0.38390294269113845,
                rotation: 0,
                target: "civil203",
                direction: {
                  pitch: 0,
                  yaw: 0,
                  fov: 1.5707963267948966
                },
            },
            {
                yaw: 2.7272376506945806, 
                pitch: 0.32403734171909804,
                rotation: 0,
                target: "civil205",
                direction: {
                  pitch: 0,
                  yaw: 0,
                  fov: 1.5707963267948966
                },
            },
        ],
        infoHotspots: []
      },
      {
        id: "civil205",
        type: "image",
        name: "CIVIL 205",
        faceSize: 4096,
        initialViewParameters: {
          pitch: 0,
          yaw: 0,
          fov: 1.5707963267948966
        },
        linkHotspots: [
            {
                yaw: -1.4347521584966376, 
                pitch: -0.38390294269113845,
                rotation: 0,
                target: "civil204",
                direction: {
                  pitch: 0,
                  yaw: 0,
                  fov: 1.5707963267948966
                },
            },
            {
                yaw: 1.1614840724080224, 
                pitch: -0.03187549457778971,
                rotation: 0,
                target: "civil201",
                direction: {
                  pitch: 0,
                  yaw: 0,
                  fov: 1.5707963267948966
                },
            },
            {
                yaw: 2.7272376506945806, 
                pitch: 0.32403734171909804,
                rotation: 0,
                target: "mixed-gallery301",
                direction: {
                  pitch: 0,
                  yaw: 0,
                  fov: 1.5707963267948966
                },
            },
        ],
        infoHotspots: [
            {
                yaw: -0.00038049728702915786,
                pitch: 0.014985751462495145,
                title: "D-204",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum."
            },
        ]
      },
    ],
  };
  