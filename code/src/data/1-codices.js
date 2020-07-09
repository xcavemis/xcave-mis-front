export const codices = {
    scenes: [
      {
        id: "codices101",
        type: "image",
        name: "CODICES 101",
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
            target: "codices102"
          },
        ],
        infoHotspots: [
          {
            yaw: -0.00038049728702915786,
            pitch: 0.014985751462495145,
            title: "D-101",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum."
          }
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
            yaw: -1.988217430070156, 
            pitch: 0.037928391202687095,
            rotation: 0,
            target: "codices101"
          },
          {
            yaw: -1.4347521584966376, 
            pitch: -0.38390294269113845,
            rotation: 0,
            target: "codices103"
          },
        ],
        infoHotspots: [
          {
            yaw: -0.00038049728702915786,
            pitch: 0.014985751462495145,
            title: "D-102",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum."
          },
          {
            yaw: -1.6849472555297336,
            pitch: 0.31676660031329185,
            title: "D-103",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum."
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
            yaw: -1.928586997218538, 
            pitch: -0.38390294269113845,
            rotation: 0,
            target: "civil201"
          },
        ],
        infoHotspots: []
      },
    ],
  };
  