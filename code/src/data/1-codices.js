export const codices = {
  scenes: [
    {
      id: "codices101",
      groupId: 'codices',
      src: 'CODICES-101',
      type: "image",
      name: "CODICES 101",
      initialViewParameters: {
        vec3: [4979.33, -341.24, -138.51],
      },
      infoHotspots: [
        {
          vec3: [699.84, -1624.78, -4667.39],
          title: "CÓDICES 102",
          type: 'link',
          target: "codices102",
          direction: {
            vec3: [-1454.25, -356.19, -4765.15],
          }
        },
        {
          vec3: [4930.12, -367.29, 698.80],
          title: "D-101",
          type: 'content',
          image: ["101/la-bele-feroniere.jpg"],
          audio: '101/guide',
          text:  `<h2>C&Oacute;DICES</h2>
          <p>As observa&ccedil;&otilde;es cient&iacute;ficas e t&eacute;cnicas de Leonardo podem ser encontradas em suas anota&ccedil;&otilde;es e esbo&ccedil;os, dos quais cerca de 6.000 p&aacute;ginas ainda existem. Muitas delas foram reunidas em "c&oacute;dices" (antigos manuscritos em forma de livro).</p>
          <p>Em 1630 Pompeo Leoni, um escultor da corte espanhola, obteve muitas das p&aacute;ginas remanescentes. Ele tentou organiz&aacute;-las por assunto - uma tarefa consider&aacute;vel, mas que resultou apenas na desorganiza&ccedil;&atilde;o da ordem original das p&aacute;ginas, o que poderia ter sido fundamental para entendermos o processo mental de Leonardo. Cada um dos novos livros criados por esse processo &eacute; agora conhecido como c&oacute;dice.</p>
          <p><strong>C&oacute;dice Arundel</strong><br />Essa cole&ccedil;&atilde;o, composta de um manuscrito de papel atado por couro marroquino, se encontra na Biblioteca Brit&acirc;nica, em Londres. Cont&eacute;m 238 p&aacute;ginas de tamanhos variados, que foram cortadas ou removidas de outros manuscritos. A maioria de suas p&aacute;ginas data do per&iacute;odo entre 1480 e 1518. As anota&ccedil;&otilde;es tratam de diferentes temas, incluindo geometria, pesos e arquitetura. Entre elas, h&aacute; notas sobre a resid&ecirc;ncia real de Francisco I em Romorantin, na Fran&ccedil;a.</p>
          <p><strong>C&oacute;dice Forster (I-III)</strong><br />Esses tr&ecirc;s manuscritos atados com papel-pergaminho est&atilde;o em Londres, no Museu Vit&oacute;ria e Alberto. Eles s&atilde;o conhecidos como Forster I (duas partes, uma escrita entre 1487 - 1490 e outra de 1505), Forster II (1495-1497) e Forster III (1490-1496). Incluem estudos sobre geometria, pesos e m&aacute;quinas hidr&aacute;ulicas.</p>.`
        },
        // {
        //   yaw: -0.1158860785837117, pitch: 0.1134721887779726,
        //   title: "Realidade Aumentada",
        //   type: 'ar',
        //   model: '',
        // },
      ]
    },
    {
      id: "codices102",
      groupId: 'codices',
      src: 'CODICES-102',
      type: "image",
      name: "CODICES 102",
      initialViewParameters: {
        vec3: [-858.69, -220.42, -4910.63],
      },
      infoHotspots: [
        {
          vec3: [2189.97, -2126.87, 3951.23],
          target: "codices101",
          title: "CODICES 101",
          type: 'link',
          direction: {
            vec3: [-521.59, 82.72, 4969.41],
          },
        },
        {
          vec3: [-3612.58, -1979.30, -2820.87],
          target: "codices103",
          title: "CODICES 103",
          type: 'link',
          direction: {
            vec3: [1065.19, -113.25, -4879.27],
          },
        },
        {
          vec3: [4129.81, -403.57, -2777.75],
          title: "D-102",
          type: 'content',
          image: ["101/la-bele-feroniere.jpg"],
          audio: '101/guide',
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum."
        },
        {
          vec3: [1768.74, -421.07, -4649.30],
          title: "D-103",
          type: 'content',
          image: ["101/la-bele-feroniere.jpg"],
          audio: '101/guide',
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
          vec3: [-2341.86, -468.72, -4383.29],
          title: "D-104",
          type: 'content',
          image: ["101/la-bele-feroniere.jpg"],
          audio: '101/guide',
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
          vec3: [578.16, 4292.65, -2491.67],
          title: "D-105",
          type: 'content',
          image: ["101/la-bele-feroniere.jpg"],
          audio: '101/guide',
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien elit, fermentum aliquet malesuada tempus, aliquet sodales magna. Phasellus ultrices mattis bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
      ]
    },
    {
      id: "codices103",
      groupId: 'codices',
      src: 'CODICES-103',
      type: "image",
      name: "CODICES 103",
      initialViewParameters: {
        vec3: [108.42, 327.03, -4981.47],
      },
      infoHotspots: [
        {
          vec3: [-2954.47, -1892.33, 3553.42],
          target: "codices102",
          title: "CODICES 102",
          type: 'link',
          direction: {
            vec3: [2882.42, 97.62, 4077.21],
          },
        },
        {
          vec3: [3869.62, -1891.27, 2526.24],
          target: "civil201",
          title: "CIVIL 201",
          type: 'link',
          direction: {
            vec3: [4984.73, -204.58, 137.96],
          },
        },
      ]
    },
  ],
};
