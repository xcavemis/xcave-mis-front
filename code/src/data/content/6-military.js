export const military = {
    scenes: [
      {
        id: "RA-4",
        title: "Realidade Aumentada",
        type: 'ar',
        model: 'boat.gltf',
        ext: 'gltf',
        scale: 0.01,
        scaleFactor: 0.01,
        auto_rotate: true,
        lights: {
          ambientIntensity: 1.3,
          pointIntensity: 0.5,
          directionalIntensity: 0.8,
        },
        camera: {
          x: 0,
          y: 80,
          z: 300
        },
        shadow: {
          z: -40
        }
      },
      {
        id: "V-601",
        title: "MILITAR V601",
        target: "448119117",
        type: 'learn',
      },
      {
        id: "V-602",
        title: "MILITAR V602",
        target: "448120333",
        type: 'learn',
      },
      {
        id: "D-601",
        title: "Flutuadores para Andar sobre a Água",
        type: 'content',
        image: ["6-military/D601.jpg"],
        audio: '6-military/A606.mp3',
        text: "<h2>C&Oacute;DICE ATLANTICUS, F. 26</h2><p>Leonardo pensou na maneira como os soldados poderiam atravessar trechos de &aacute;gua rasa. Ele sugeriu que peles infl adas (bolsas de couro ou odres) poderiam ser amarradas aos p&eacute;s dos soldados. Se fossem grandes o sufi ciente, poderiam aguentar o peso de um homem. Pranchas fl utuantes de madeira tamb&eacute;m poderiam ser usadas.</p><p>Dois bast&otilde;es, tamb&eacute;m com bolsas fl utuantes nas extremidades, poderiam ajudar a manter o equil&iacute;brio e poderiam ser &uacute;teis para ajudar a&nbsp;pessoa a deslizar pela &aacute;gua. A ideia de Leonardo n&atilde;o funcionava para uso na &aacute;gua, mas princ&iacute;pios parecidos s&atilde;o usados atualmente por esquiadores de neve na modalidade cross-country.</p>"
      },
      {
        id: "D-602",
        title: "Equipamento para Respiração Subaquática",
        type: 'content',
        image: ["6-military/D602.jpg"],
        audio: '6-military/A606.mp3',
        text: "<h2><em>C&oacute;dice Arundel, f. 24 v.</em></h2><p>Em um segundo projeto, tubos de ar descendo de uma boia no formato de sino flutando na superf&iacute;cie s&atilde;o presos a uma m&aacute;scara facial. Os tubos s&atilde;o feitos de bambu, unidos por couro, e envoltos em an&eacute;is de metal para evitar que sejam esmagados pela press&atilde;o da &aacute;gua. Dois tubos fazem a troca de ar para o mergulhador, e uma v&aacute;lvula regula o fluxo de ar. <br />Um roupa de mergulho baseada neste projeto, feita de couro de porco, tubos de bambu e corti&ccedil;a, foi testada pela mergulhadora Jacquie Cozens em 2002, com algum sucesso. </p>"
      },
      {
        id: "D-603",
        title: "Equipamento para Mergulho",
        type: 'content',
        image: ["6-military/D603.jpg"],
        audio: '6-military/A606.mp3',
        text: "L<h2>C&Oacute;DICE ATLANTICUS, F. 333 V.</h2><p>Inventores anteriores a Leonardo haviam desenvolvido projetos para ajudar as pessoas a respirar embaixo da &aacute;gua. No projeto aprimorado de Leonardo, uma t&uacute;nica de couro &agrave; prova d&rsquo;&aacute;gua &eacute; refor&ccedil;ada por uma armadurapara impedir que a bolsa de ar seja comprimida em &aacute;guas profundas.</p><p>Mangueiras fl ex&iacute;veis, com juntas de couro refor&ccedil;adas por espirais de metal, traziam o ar da superf&iacute;cie, e v&aacute;lvulas regulavam seu consumo. As mangueiras eram apoiadas por boias feitas de corti&ccedil;a para que fl utuassem.</p><p>Leonardo acreditava que essa roupa de mergulho possibilitaria o conserto de cascos de navios embaixo d&rsquo;&aacute;gua ou viabilizaria o ataque a cascos de navios inimigos por ex&eacute;rcitos de mergulhadores.</p>"
      },
      {
        id: "D-604",
        title: "Nadadeira de Mão",
        type: 'content',
        image: ["6-military/D604a.jpg","6-military/D604b.jpg"],
        audio: '6-military/A606.mp3',
        text: "<h2>MANOSCRITTO B, F. 81 V.</h2><p>Leonardo inventou uma luva com membranas para ajudar as pessoas a fl utuar por mais tempo e nadar mais longe no mar. A luva &eacute; presa ao redor do pulso. Cinco longas varetas de madeira funcionam com uma extens&atilde;o dos dedos e s&atilde;o presas umas &agrave;s outras por uma membrana distendida.</p><p>Este projeto &eacute; uma imita&ccedil;&atilde;o de um animal com membranas natat&oacute;rias. As nadadeiras usadas pelos nadadores de hoje em dia foram desenvolvidas com base em ideias semelhantes.</p>"
      },
      {
        id: "D-605",
        title: "Boia Salva-Vidas",
        type: 'content',
        image: ["6-military/D605a.jpg","6-military/D605b.jpg"],
        audio: '6-military/A606.mp3',
        text: "<h2>MANOSCRITTO B, F. 81 V.</h2><p>A observa&ccedil;&atilde;o de Leonardo sobre o desenho na parte inferior deste f&oacute;lio diz: &ldquo;Como salvar sua vida em caso de tempestade e naufr&aacute;gio&rdquo;.</p><p>Esta inven&ccedil;&atilde;o &eacute; facilmente identifi cada com uma boia salva-vidas circular, utilizada para manter as pessoas fl utuando.</p><p>A boia original pode ter sido confeccionada em corti&ccedil;a, da casca leve do sobreiro, &aacute;rvore muito comum na regi&atilde;o do Mediterr&acirc;neo.</p>"
      },
      {
        id: "D-606",
        title: "Ponte para Emergências",
        type: 'content',
        image: ["6-military/D606a.jpg","6-military/D606b.jpg"],
        audio: '6-military/A605.mp3',
        text: "<h2><em>C&oacute;dice Atlanticus, f. 22 r.</em></h2><p>Esta ponte foi projetada para ser erguida rapidamente em tempos de guerra. A ideia de Leonardo era que a ponte pudesse ser constru&iacute;da por um grupo de soldados, no caso de uma emerg&ecirc;ncia, usando pequenos troncos de &aacute;rvore encontrados &agrave; beira de um rio. Os troncos s&atilde;o entrela&ccedil;ados e fixados sem o uso de cordas ou pregos, de forma que quanto mais press&atilde;o para baixo &eacute; aplicada, mais as pe&ccedil;as de madeira unem-se umas &agrave;s outras, deixando a constru&ccedil;&atilde;o mais segura. Leonardo chamava esta constru&ccedil;&atilde;o de ponte de &ldquo;Seguran&ccedil;a&rdquo;.</p>"
      },
      {
        id: "D-607",
        title: "Canhão",
        type: 'content',
        image: ["6-military/D607a.jpg"],
        audio: '6-military/A604.mp3',
        text: "<h2>C&Oacute;DICE ATLANTICUS, F. 76</h2><p>Este desenho maravilhoso de uma m&aacute;quina horr&iacute;vel demonstra as habilidades art&iacute;sticas e t&eacute;cnicas de Leonardo. Era uma pe&ccedil;a de apresenta&ccedil;&atilde;o, desenhada para um poss&iacute;vel patrocinador na esperan&ccedil;a de atrair apoio financeiro cont&iacute;nuo. No desenho, Leonardo detalhou a trajet&oacute;ria parab&oacute;lica que os proj&eacute;teis seguiriam ap&oacute;s serem disparados e como explodiriam quando atingissem o ch&atilde;o.</p><p>Os canh&otilde;es pesados eram montados em plataformas de madeira refor&ccedil;adas. O &acirc;ngulo de tiro podia ser regulado por uma roda movida por um parafuso sem fi m que, por sua vez, era movido por um macaco.</p>"
      },
      {
        id: "D-608",
        title: "Ponte Pênsil Móvel",
        type: 'content',
        image: ["6-military/D608.jpg"],
        audio: '6-military/A603.mp3',
        text: "<h2><em>C&oacute;dice Atlanticus, f. 312 r.-a</em></h2><p>A ponte voadora (ver desenho acima) foi projetada para ser constru&iacute;da rapidamente por soldados, usando brotos de &aacute;rvore e cordas. Soldados em retirada ou que seguiam em frente poderiam cruzar obst&aacute;culos e desmanchar a ponte depois de atravess&aacute;-la. <br />Este projeto utiliza os conceitos de tens&atilde;o e resist&ecirc;ncia registrados por Leonardo em outros esbo&ccedil;os. Esta ponte apresenta algumas similaridades &agrave; ponte p&ecirc;nsil de autoancoragem, onde as cordas s&atilde;o ancoradas no pr&oacute;prio deque da ponte, eliminando a necessidade de grandes estruturas de ancoragem. <br />O esbo&ccedil;o inferior &eacute; uma ponte girat&oacute;ria, movida por cordas, guinchos, rodas e roldanas de metal.</p>"
      },
      {
        id: "D-609",
        title: "Submarino",
        type: 'content',
        image: ["6-military/D609a.jpg","6-military/D609b.jpg"],
        audio: '6-military/A602.mp3',
        text: "<h2>MANOSCRITTO B. F. 11 R.</h2><p>Leonardo concebeu essa ideia de &ldquo;um navio para afundar outro navio&rdquo;. &Eacute; uma estrutura simples com uma torre e uma escotilha, e espa&ccedil;o para uma pessoa. Para que um submarino pudesse afundar um navio, ele deveria ser capaz de se movimentar sem ser percebido, por baixo de um navio inimigo estacionado em um porto. O marinheiro prenderia uma linha com um peso no casco do navio e a outra ponta seria presa no fundo do mar. Quando o navio come&ccedil;asse a navegar, o peso puxaria e faria com que o casco de desprendesse do fundo do navio, fazendo com que afundasse.</p>."
      },
      {
        id: "D-610",
        title: "Barco a Remo",
        type: 'content',
        image: ["6-military/D610.jpg"],
        audio: '6-military/A601.mp3',
        text: "<h2><em>Manoscritto B, f. 83 r.</em></h2><p>Naquela &eacute;poca, o meio mais r&aacute;pido e eficiente de comunica&ccedil;&atilde;o era por mar ou rio. Cidades no interior, como Mil&atilde;o e Floren&ccedil;a, dependiam de barcos r&aacute;pidos e confi&aacute;veis que pudessem atravessar os rios livremente. <br />Leonardo projetou um tipo de pedalinho com remos no formato de p&aacute;s, inspirando-se nas barbatanas de peixes. O operador moveria dois pedais com seus p&eacute;s. Utilizando o princ&iacute;pio de movimento alternado, os pedais moveriam as p&aacute;s no sentido anti-hor&aacute;rio para impulsionar a embarca&ccedil;&atilde;o para a frente. <br />Os desenhos de Leonardo n&atilde;o mostram o barco inteiro, mas sugerem como seriam suas partes. </p>"
      },
      {
        id: "D-611",
        title: "Metralhadora de Três Registros",
        type: 'content',
        image: ["6-military/D611a.jpg","6-military/D611b.jpg"],
        audio: '6-military/A608.mp3',
        text: "<p>No topo deste f&oacute;lio est&aacute; um desenho de uma metralhadora de cano m&uacute;ltiplo. Leonardo queria aumentar a velocidade relativa com que as armas poderiam ser disparadas, ent&atilde;o ele projetou m&aacute;quinas com v&aacute;rios canh&otilde;es. Estes talvez sejam os precursores da metralhadora moderna. Esta m&aacute;quina tinha trinta canos, em tr&ecirc;s camadas, em uma estrutura girat&oacute;ria.</p><p>Assim que a linha superior de dez canh&otilde;es era disparada, a pr&oacute;xima camada era carregada; enquanto a terceira camada estava esfriando.</p>"
      },
      {
        id: "D-612",
        title: "Engenharia Militar",
        type: 'content',
        image: ["6-military/D612a.jpg"],
        audio: '6-military/A607.mp3',
        text: "<p>A guerra trouxe consigo novos desafios mec&acirc;nicos e estrat&eacute;gicos, e algumas das cria&ccedil;&otilde;es mais criativas de Leonardo concentraram-se nas m&aacute;quinas de guerra.</p><p>Em sua &eacute;poca, as cidades italianas batalhavam n&atilde;o apenas contra os franceses, mas tamb&eacute;m lutavam entre si. Leonardo era um pacifista mas, como produto de seu ambiente, reconhecia que seus ricos apoiadores precisavam mais de artefatos militares do que de pinturas. Leonardo aceitou o desafio, e concentrou seus esfor&ccedil;as na cria&ccedil;&atilde;o de m&aacute;quinas de guerra impressionantes.</p><p>Leonardo trabalhou em projetos de m&aacute;quinas de guerra em Mil&atilde;o, entre 1483 e 1490, e tamb&eacute;m em Floren&ccedil;a, de 1502 a 1504. Nas duas cidades, conquistou a reputa&ccedil;&atilde;o de influente estrategista, aconselhando generais e estadistas.</p><p>Alguns de seus primeiros projetos, como as pontes e escadas extens&iacute;veis, eram extremamente pr&aacute;ticos e simples. Com o tempo, por&eacute;m, suas cria&ccedil;&otilde;es se tornariam mais complexas, conforme ele considerava as ofensivas defensivas e ofensivas da &eacute;poca. Ele inventou pontes, escadas de assalto, artilharia, carros de armas e morteiros. Desenhou planos para metralhadoras de v&aacute;rios canh&otilde;es, canh&otilde;es, bestas gigantes, tanques blindados e carros-ceifadores.</p><p>Leonardo tamb&eacute;m se interessou pelos enormes cavalos de guerra dos nobres e cavaleiros, parte fundamental das for&ccedil;as de ataque. Como excelente cavaleiro, ficou encantado pela for&ccedil;a e beleza desses animais, e fez muitos desenhos sobre eles.</p>"
      },
      {
        id: "D-613",
        title: "Catapulta",
        type: 'content',
        image: ["6-military/D613a.jpg","6-military/D613b.jpg"],
        audio: '',
        text: "<h2>C&Oacute;DICE ATLANTICUS, F. 50 V.</h2> <p>O interesse cont&iacute;nuo de Leonardo em engenharia militar come&ccedil;ou nos primeiros anos. Ele encheu muitas p&aacute;ginas de seus<br />cadernos com desenhos de aprimoramentos sugeridos para a catapulta, uma das mais antigas armas de guerra.</p><p>Nesses projetos, ele testou ideias sobre a elasticidade dos materiais e a varia&ccedil;&atilde;o de tens&atilde;o, na esperan&ccedil;a de arremessar a pedra mais longe, com maior for&ccedil;a e com mais precis&atilde;o contra o inimigo.</p>"
      },
      {
        id: "D-614",
        title: "Roçadeira",
        type: 'content',
        image: ["6-military/D614.jpg"],
        audio: '6-military/A609.mp3',
        text: "<h2>MANOSCRITTO B, F. 1030</h2><p>Estes dois desenhos datam de cerca de 1485, quando Leonardo trabalhava para o duque de Mil&atilde;o como artista e estrategista militar. No desenho inferior, os cavalos que puxam a carruagem de guerra s&atilde;o protegidos por foices rodopiantes, que s&atilde;o giradas por um elaborado sistema de engrenagens conectadas &agrave;s rodas da carruagem. Os cavalos podiam atacar apenas para a frente, dentro dos limites da m&aacute;quina. Leonardo reconheceu que, em condi&ccedil;&otilde;es de batalha, os cavalos provavelmente fi cariam assustados e disparariam.</p>"
      },
      {
        id: "D-615",
        title: "Carro de Foice",
        type: 'content',
        image: ["6-military/D615a.jpg","6-military/D615b.jpg"],
        audio: '6-military/A609.mp3',
        text: "<h2>MANOSCRITTO B, F. 1030</h2><p>O desenho superior mostra uma carruagem especialmente letal. Leonardo expandiu a ideia romana de uma carruagem de guerra puxada a cavalo e sugeriu a adi&ccedil;&atilde;o de quatro foices grandes. &Agrave; medida que a carruagem se movia, as foices giravam, cortando todos no caminho. Mas os cavalos eram muito vulner&aacute;veis e, se disparassem fora de controle, as foices causariam estragos tanto entre as for&ccedil;as amigas quanto inimigas. O desenho inferior mostra uma vers&atilde;o melhorada, que deveria proteger os cavalos.</p>"
      },
      {
        id: "D-616",
        title: "Carro Coberto para Ataque",
        type: 'content',
        image: ["6-military/D616a.jpg","6-military/D616b.jpg"],
        audio: '',
        text: "<h2<em>CÓDICE ATLANTICUS, F. 391 V.-A</em></h2><p>Seria este o cavalo de Troia da época de Leonardo? Esta imensa estrutura de madeira destinava-se a atacar as muralhas de um castelo ou fortaleza. A estrutura sobre rodas é empurrada em direção às paredes. Uma passarela coberta, longa o sufi ciente para cobrir o fosso do castelo, é então baixada e posicionada nas paredes, com o auxílio de cabos. Os soldados podem sair da estrutura, subir para atravessar a ponte e invadir a fortaleza.</p>"
      },
      {
        id: "D-617",
        title: "Roçadeira",
        type: 'content',
        image: ["6-military/D617.jpg"],
        audio: '',
        text: "<h2>MANOSCRITTO B, F. 1030</h2><p>Estes dois desenhos datam de cerca de 1485, quando Leonardo trabalhava para o duque de Mil&atilde;o como artista e estrategista militar. No desenho inferior, os cavalos que puxam a carruagem de guerra s&atilde;o protegidos por foices rodopiantes, que s&atilde;o giradas por um elaborado sistema de engrenagens conectadas &agrave;s rodas da carruagem. Os cavalos podiam atacar apenas para a frente, dentro dos limites da m&aacute;quina. Leonardo reconheceu que, em condi&ccedil;&otilde;es de batalha, os cavalos provavelmente fi cariam assustados e disparariam.</p>"
      },
      {
        id: "D-618",
        title: "Escada de Assalto",
        type: 'content',
        image: ["6-military/D618a.jpg","6-military/D618b.jpg"],
        audio: '',
        text: "<h2>C&Oacute;DICE FORSTER I, F. 46 V.</h2><p>Leonardo desenhou muitos tipos diferentes de escadas de assalto pelas quais os soldados podiam escalar as muralhas de uma fortaleza ou castelo inimigo. Esta escada port&aacute;til pode ser aumentada ou diminu&iacute;da e inclinada em diversos &acirc;ngulos.</p><p>O mecanismo &eacute; uma grande roda dentada que se encaixa em um parafuso sem fim. Uma manivela abaixo da roda coloca a escada em movimento, elevando-a ou abaixando-a, conforme necess&aacute;rio. Essa escada para escalar &eacute; semelhante &agrave; usada hoje pelos bombeiros.</p>"
      },
      {
        id: "D-619",
        title: "Canhão a Vapor",
        type: 'content',
        image: ["6-military/D619.jpg"],
        audio: '6-military/A609.mp3',
        text: "<h2>MANOSCRITTO B, F. 33 R.</h2><p>Esta m&aacute;quina foi projetada para aproveitar a energia a vapor, de modo a projetar balas de um canh&atilde;o. N&atilde;o era necess&aacute;rio usar p&oacute;lvora. O canh&atilde;o de cobre, sobre rodas, poderia ser facilmente transportado no campo de batalha. Uma vez posicionada, a culatra do canh&atilde;o &eacute; aquecida a uma temperatura alta, derrama-se &aacute;gua, e a press&atilde;o resultante do vapor for&ccedil;a a bola do canh&atilde;o a sair do cano. Uma explos&atilde;o barulhenta aconteceria, com grandes nuvens de vapor. Leonardo copiou essa ideia do matem&aacute;tico grego Arquimedes.</p>"
      },
      {
        id: "D-620",
        title: "Bala Ogival",
        type: 'content',
        image: ["6-military/D620a.jpg","6-military/D620b.jpg"],
        audio: '6-military/A610.mp3',
        text: "<p>Leonardo havia estudado como as correntes de ar e &aacute;gua influenciam a maneira como os objetos se movem. Ele reconheceu que o ar diminui a velocidade de voo de um proj&eacute;til e que o voo de uma bala de canh&atilde;o era irregular. <br />Leonardo projetou um novo tipo de bala, com uma forma pontiaguda e asas direcionais, aumentando sua efici&ecirc;ncia aerodin&acirc;mica e ajudando a atingir maiores dist&acirc;ncias, com trajet&oacute;ria alinhada e precisa.</p>"
      },
      {
        id: "D-621",
        title: "Metralhadora Multidirecional",
        type: 'content',
        image: ["6-military/D621a.jpg","6-military/D621b.jpg"],
        audio: '',
        text: "<h2>C&Oacute;DICE ATLANTICUS, F. 56 V.</h2><p>O desenho do meio &eacute; de uma m&aacute;quina com canh&otilde;es dispostos em forma de leque. Podia disparar tiros &uacute;nicos ou disparos simult&acirc;neos. A m&aacute;quina, sobre rodas, podia ser movida facilmente para que os canh&otilde;es estivessem voltados para a dire&ccedil;&atilde;o do inimigo. A manivela na parte de tr&aacute;s podia ser ajustada para alterar a altura e a trajet&oacute;ria dos m&iacute;sseis. Mas seria dif&iacute;cil recarregar essa m&aacute;quina no meio de uma batalha.</p>"
      },
      {
        id: "D-622",
        title: "A Batalha de Anghiari",
        type: 'content',
        image: ["6-military/D622a.jpg"],
        audio: '6-military/A611.mp3',
        text: `<p>Em 1494, ap&oacute;s a queda dos M&eacute;dici, Girolamo Savonarola assumiu o poder na Rep&uacute;blica Florentina e ordenou a constru&ccedil;&atilde;o de um plen&aacute;rio para o "Grande Conselho" da Rep&uacute;blica, que dever&aacute; ser constru&iacute;do dentro da assembleia municipal de Floren&ccedil;a, o Palazzo Vecchio". A maior parte do trabalho de constru&ccedil;&atilde;o no "Sal&atilde;o dos Quinhentos" terminou em 1500, e todas as aten&ccedil;&otilde;es se voltaram &agrave;s imagens que seriam representadas ali. Decidiu-se que duas importantes vit&oacute;rias da hist&oacute;ria florentina recente seriam celebradas em grandes pinturas ladeando o trono do regente, para declarar a autoconfian&ccedil;a da nova rep&uacute;blica.</p><p>Leonardo da Vinci foi contratado para pintar A Batalha de Anghiari, na qual Floren&ccedil;a derrotou Niccol&ograve; Piccinino, comandante mercen&aacute;rio de Mil&atilde;o, e Michelangelo foi incumbido de pintar a Batalha de Cascina, vit&oacute;ria contra Pisa. Como dois dos mais reconhecidos artistas da &eacute;poca, o renomado Leonardo e o jovem Michelangelo desenvolveram uma rivalidade que, ao longo do tempo, veio a se tornar uma antipatia m&uacute;tua profunda. Quando Michelangelo passou a cham&aacute;-lo de "o tocador de lira de Mil&atilde;o", Leonardo viu o fato de trabalhar a seu lado como um &aacute;rduo desafio pessoal. Um terceiro jovem artista costumava acompanhar o progresso do trabalho - o desconhecido Raphael, de 21 anos.</p><p>Em junho de 1504, Leonardo come&ccedil;ou a trabalhar no que seria um de seus maiores esfor&ccedil;os. Destemido e inovador, decidiu testar uma nova t&eacute;cnica de pintura de afresco, usando tintas &agrave; base de &oacute;leo aplicadas a uma base de cera. Por&eacute;m, quando a pintura come&ccedil;ou a escorrer, ele tentou faz&ecirc;-la secar mais r&aacute;pido usando calor, o que foi um grande erro - pois &agrave; medida que o calor era absorvido pela tinta, a cera derretia, resultando em mais pingos e manchas.</p><p>Leonardo terminou a parte central, mas n&atilde;o conseguiu solucionar os graves problemas t&eacute;cnicos. Nem ele, nem Michelangelo conclu&iacute;ram as pinturas. Os trabalhos inacabados permaneceram na parede por d&eacute;cadas, e foram cobertos em 1565. Essas pinturas s&atilde;o conhecidas hoje apenas por c&oacute;pias, descri&ccedil;&otilde;es e esbo&ccedil;os.</p><p>Entretanto, mesmo os esbo&ccedil;os que Leonardo fez de Batalha de Anghiari s&atilde;o uma vis&atilde;o extraordin&aacute;ria, geralmente descritos por seus contempor&acirc;neos como impressionantes, espetaculares, singulares e surreais. Ele e seus assistentes levaram mais de um ano para concluir, no papel, um desenho em tamanho real do afresco, demonstrando o movimento fren&eacute;tico dos cavalos enfurecidos e do terror, da ang&uacute;stia e da agressividade dos soldados em meio &agrave; batalha.</p>`
      },
      {
        id: "D-623",
        title: "Parafuso de Arquimedes",
        type: 'content',
        image: ["6-military/D623a.jpg","6-military/D623b.jpg"],
        audio: '',
        text: "<h2>C&Oacute;DICE ATLANTICUS, F. 26 V.</h2><p>Esta m&aacute;quina para retirar &aacute;gua sem muito esfor&ccedil;o por parte das pessoas era muito conhecida no mundo antigo. Foi descrita no Egito por Arquimedes, matem&aacute;tico grego (287-212 a.C.). Leonardo desenhou v&aacute;rias vers&otilde;es desta m&aacute;quina, sugerindo varia&ccedil;&otilde;es e aprimoramentos. Ele considerou a rela&ccedil;&atilde;o entre a inclina&ccedil;&atilde;o do eixo e a quantidade de molas necess&aacute;rias. O<br />principal aprimoramento realizado por Leonardo teve como resultado um maior volume de &aacute;gua retirada com muito menos derramamento. O parafuso de &aacute;gua ou parafuso de Arquimedes, ainda &eacute; utilizado hoje em dia na irriga&ccedil;&atilde;o, &eacute; a<br />base de muitas bombas industriais.</p>"
      },
      {
        id: "D-624",
        title: "Canhão",
        type: 'content',
        image: ["6-military/D624a.jpg","6-military/D624b.jpg"],
        audio: '',
        text: "<h2>C&Oacute;DICE ATLANTICUS, F. 76</h2><p>Este desenho maravilhoso de uma m&aacute;quina horr&iacute;vel demonstra as habilidades art&iacute;sticas e t&eacute;cnicas de Leonardo. Era uma pe&ccedil;a de apresenta&ccedil;&atilde;o, desenhada para um poss&iacute;vel patrocinador na esperan&ccedil;a de atrair apoio financeiro cont&iacute;nuo. No desenho, Leonardo detalhou a trajet&oacute;ria parab&oacute;lica que os proj&eacute;teis seguiriam ap&oacute;s serem disparados e como explodiriam quando atingissem o ch&atilde;o.</p><p>Os canh&otilde;es pesados eram montados em plataformas de madeira refor&ccedil;adas. O &acirc;ngulo de tiro podia ser regulado por uma roda movida por um parafuso sem fi m que, por sua vez, era movido por um macaco.</p>"
      },
      {
        id: "D-625",
        title: "Monalisa",
        type: 'content',
        image: ["6-military/D625a.jpg"],
        audio: '6-military/A612.mp3',
        text: ""
      },
    ],
  };
  