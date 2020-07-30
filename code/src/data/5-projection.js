export const projection = {
    scenes: [

      {
        id: "projection501",
        groupId: 'sensorial',
        src: 'PROJECTION-501',
        type: "image",
        name: "projection 501",
        initialViewParameters: {
          vec3: [-4920.03, 654.81, 557.84]
        },
        infoHotspots: [
          {
            vec3: [2298.14, -1203.51, -4266.67],
            target: "anatomy405",
            title: 'ANATOMY 405',
            type: 'link',
            direction: {
              vec3: [3965.38, -424.08, 3006.92],
            },
          },
          {
            vec3: [346.03, -1033.80, 4870.26],
            target: "projection502",
            title: 'PROJECTION 502',
            type: 'link',
            direction: {
              vec3: [4184.00, 22.68, -2723.38],
            },
          },
          {
            vec3: [-4875.59, -350.40, -1042.97],
            target: "PROJECTION-501",
            title: 'PROJECTION 360 501',
            type: 'panorama',
            direction: {
              vec3: [-2163.50, 36.89, -4499.96],
            },
          },
          {
            vec3: [4458.14, -1491.01, 1679.75],
            target: "PROJECTION-502",
            title: 'PROJECTION 360 502',
            type: 'panorama',
            direction: {
              vec3: [-2163.50, 36.89, -4499.96],
            },
          },
          {
            vec3: [4844.48, -248.70, 1174.49],
            title: "D-501",
            type: 'content',
            image: ["101/la-bele-feroniere.jpg"],
            audio: '101/guide',
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum."
          },
          
        ]
      },
      {
        id: "projection502",
        groupId: 'sensorial',
        src: 'PROJECTION-502',
        type: "image",
        name: "projection 502",
        faceSize: 6144,
        initialViewParameters: {
          vec3: [-2073.68, -881.96, 4456.11]
        },
        infoHotspots: [
          {
            vec3: [-3663.92, -1593.74, 2992.82],
            target: "projection501",
            title: 'PROJECTION 501',
            type: 'link',
            direction: {
              vec3: [4184.00, 22.68, -2723.38],
            },
          },
          {
            vec3: [4105.61, -986.11, -2658.47],
            target: "projection503",
            title: 'PROJECTION 503',
            type: 'link',
            direction: {
              vec3: [1632.90, 208.86, -4712.79],
            },
          },
          {
            vec3: [171.34, 249.14, 4981.23],
            target: "PROJECTION-501",
            title: 'PROJECTION 360 501',
            type: 'panorama',
            direction: {
              vec3: [-2163.50, 36.89, -4499.96],
            },
          },
          {
            vec3: [-3960.30, -951.31, -2892.55],
            target: "PROJECTION-502",
            title: 'PROJECTION 360 502',
            type: 'panorama',
            direction: {
              vec3: [-2163.50, 36.89, -4499.96],
            },
          },
          {
            vec3: [3421.06, -1002.67, -3491.44],
            target: "PROJECTION-503",
            title: 'PROJECTION 360 503',
            type: 'panorama',
            direction: {
              vec3: [-2163.50, 36.89, -4499.96],
            },
          },
          {
            vec3:[4622.69, -149.22, 1874.16],
            title: "D-502",
            type: 'content',
            image: ["101/la-bele-feroniere.jpg"],
            audio: '101/guide',
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum."
          },
        ]
      },
      {
        id: "projection503",
        groupId: 'sensorial',
        src: 'PROJECTION-503',
        type: "image",
        name: "projection 503",
        faceSize: 6144,
        initialViewParameters: {
          vec3: [-2073.68, -881.96, 4456.11]
        },
        infoHotspots: [
          {
            vec3: [-2073.68, -881.96, 4456.11],
            target: "projection502",
            title: 'PROJECTION 502',
            type: 'link',
            direction: {
              vec3: [-4472.10, -211.12, 2203.12],
            },
          },
          {
            vec3: [2840.70, 500.59, -4075.26],
            target: "PROJECTION-504",
            title: 'PROJECTION 360 504',
            type: 'panorama',
            direction: {
              vec3: [-2163.50, 36.89, -4499.96],
            },
          },
          {
            vec3: [99.26, 127.26, 4989.80],
            target: "PROJECTION-503",
            title: 'PROJECTION 360 503',
            type: 'panorama',
            direction: {
              vec3: [-2163.50, 36.89, -4499.96],
            },
          },
          {
            vec3: [-2603.56, -1338.82, -4040.75],
            target: "military601",
            title: 'MILITARY 601',
            type: 'link',
            direction: {
              vec3: [-4394.81, -310.22, -2346.24],
            },
          },
        ]
      },
    ],
  };
  


        // {
      //   id: "projection501Video",
      //   groupId: 'sensorial',
      //   src: 'PROJECTION-501',
      //   type: "video",
      //   name: "projection 501 VIDEO",
      //   initialViewParameters: {
      //     vec3: [4836.37, 7.33, 1241.36]
      //   },
      //   infoHotspots: [
      //     {
      //       vec3: [-1393.05, -1062.38, -4674.75],
      //       target: "anatomy405",
      //       title: 'ANATOMY 405',
      //       type: 'link',
      //       direction: {
      //         vec3: [3965.38, -424.08, 3006.92],
      //       },
      //     },
      //     {
      //       vec3: [3795.75, -772.79, -3150.91],
      //       target: "projection502Video",
      //       title: 'PROJECTION 502 VIDEO',
      //       type: 'link',
      //       direction: {
      //         vec3: [-2163.50, 36.89, -4499.96],
      //       },
      //     },
          
      //   ]
      // },
      // {
      //   id: "projection502Video",
      //   groupId: 'sensorial',
      //   src: 'PROJECTION-502',
      //   type: "video",
      //   name: "projection 502 VIDEO",
      //   faceSize: 6144,
      //   initialViewParameters: {
      //     vec3: [-4849.31, -720.53, -954.74]
      //   },
      //   infoHotspots: [
      //     {
      //       vec3: [3884.46, -1018.28, 2965.07],
      //       title: 'PROJECTION 501 VIDEO',
      //       target: "projection501Video",
      //       type: 'link',
      //       direction: {
      //         vec3: [-4039.55, -373.52, 2920.54],
      //       },
      //     },
      //     {
      //       vec3: [4307.89, -847.07, -2379.84],
      //       title: 'PROJECTION 503 VIDEO',
      //       target: "projection503Video",
      //       type: 'link',
      //       direction: {
      //         vec3: [-4521.04, -198.13, -2108.20],
      //       },
      //     },
      //     {
      //       vec3: [-2256.50, -1353.14, -4240.59],
      //       title: "D-501",
      //       type: 'content',
      //       image: ["101/la-bele-feroniere.jpg"],
      //       audio: '101/guide',
      //       text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum."
      //     },
      //   ]
      // },
      // {
      //   id: "projection503Video",
      //   groupId: 'sensorial',
      //   src: 'PROJECTION-503',
      //   type: "video",
      //   name: "projection 503 VIDEO",
      //   faceSize: 6144,
      //   initialViewParameters: {
      //     vec3: [-4849.31, -720.53, -954.74]
      //   },
      //   infoHotspots: [
      //     {
      //       vec3: [4400.75, -953.95, 2150.84],
      //       title: 'PROJECTION 502 VIDEO',
      //       target: "projection502Video",
      //       type: 'link',
      //       direction: {
      //         vec3: [-4216.35, 60.33, 2670.85],
      //       },
      //     },
      //     {
      //       vec3: [-4708.14, -1206.90, -1144.81],
      //       title: 'PROJECTION 504 VIDEO',
      //       target: "projection504Video",
      //       type: 'link',
      //       direction: {
      //         vec3: [-4656.48, 277.91, -1772.05],
      //       },
      //     },
      //   ]
      // },
      // {
      //   id: "projection504Video",
      //   groupId: 'sensorial',
      //   src: 'PROJECTION-504',
      //   type: "video",
      //   name: "projection 504 VIDEO",
      //   faceSize: 6144,
      //   initialViewParameters: {
      //     vec3: [4142.16, 146.34, -2778.90]
      //   },
      //   infoHotspots: [
      //     {
      //       vec3: [-1505.19, -1224.29, 4605.61],
      //       title: 'MILITARY 601',
      //       target: "military601",
      //       type: 'link',
      //       direction: {
      //         vec3: [-4394.81, -310.22, -2346.24],
      //       },
      //     },
      //     {
      //       vec3: [4872.18, -1046.41, 261.46],
      //       title: 'PROJECTION 503 VIDEO',
      //       target: "projection503Video",
      //       type: 'link',
      //       direction: {
      //         vec3: [4184.00, 22.68, -2723.38],
      //       },
      //     },
      //     {
      //       vec3: [1377.09, -219.44, -4791.38],
      //       title: "D-501",
      //       type: 'content',
      //       image: ["101/la-bele-feroniere.jpg"],
      //       audio: '101/guide',
      //       text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum."
      //     },
      //   ]
      // },