export const mixedGallery = {
  scenes: [
    {
      id: "RA-3",
      title: "Realidade Aumentada",
      type: 'ar',
      model: 'Drum.gltf',
      ext: 'gltf',
      scale: 1,
      scaleFactor: 1,
      auto_rotate: true,
      lights: {
        ambientIntensity: 1.5,
        pointIntensity: 1.2,
        directionalIntensity: 2,
      },
      camera: {
        x: 0,
        y: 60,
        z: 130
      },
      shadow: {
        z: -40
      }
    },
    {
      id: "RA-2",
      title: "Realidade Aumentada",
      type: 'ar',
      model: 'helicopter.gltf',
      ext: 'gltf',
      scale: 0.1,
      scaleFactor: 0.1,
      auto_rotate: false,
      lights: {
        ambientIntensity: 0.6,
        pointIntensity: 0.1,
        directionalIntensity: 0.8,
      },
      camera: {
        x: 0,
        y: 80,
        z: 300
      },
      shadow: {
        z: -120
      }
    },
    {
      id: "V-301",
      title: "CIVIL V301",
      target: "446670386",
      type: 'learn',
    },
    {
      id: "V-302",
      title: "CIVIL V302",
      target: "446670496",
      type: 'learn',
    },
    {
      id: "V-303",
      title: "CIVIL V303",
      target: "446670532",
      type: 'learn',
    },
    {
      id: "V-304",
      title: "CIVIL V304",
      target: "446670237",
      type: 'learn',
    },
    {
      id: "V-305",   
      title: "CIVIL V305",
      target: "446670424",
      type: 'learn',
    },
    {
      id: "D-301",
      title: "Asas Batendo",
      type: 'content',
      image: ["3-Gallery/D301a.jpg","3-Gallery/D301b.jpg"],
      audio: '',
      text: "<h2><em>C&oacute;dice Atlanticus, f. 88 v.</em></h2><p>Este &eacute; o desenho de um experimento para testar se asas batendo seriam capazes de i&ccedil;ar uma carga pesada. Uma &ldquo;asa&rdquo; de doze metros, uma estrutura com hastes e rede coberta por papel, deveria ser fixada a uma prancha de madeira do mesmo peso de um homem.</p><p>Se a longa alavanca pudesse ser puxada para baixo r&aacute;pido o bastante, a asa possivelmente &ldquo;tocaria&rdquo; o ar e levantaria a prancha. Se isso funcionasse, duas asas poderiam erguer um piloto e sua m&aacute;quina voadora e mant&ecirc;-los no ar.</p><p>Leonardo escreveu em seu caderno:<br />&ldquo;...mas assegure-se de que a for&ccedil;a utilizada seja r&aacute;pida o suficiente e, se o efeito acima n&atilde;o for alcan&ccedil;ado, n&atilde;o perca seu tempo&rdquo;.</p>"
    },
    {
      id: "D-302",
      title: "Medidor de Velocidade para Vento ou &Aacute;gua",
      type: 'content',
      image: ["3-Gallery/D302.jpg"],
      audio: '',
      text: "<p>Uma pergunta na cabe&ccedil;a de Leonardo era: &ldquo;Se a intensidade do vento ou da &aacute;gua permanece a mesma, cinco vezes mais vento ou &aacute;gua gerar&aacute; cinco vezes mais for&ccedil;a?&rdquo;.</p><p>Neste instrumento experimental, vento ou &aacute;gua &eacute; direcionado atrav&eacute;s de dois cones em formato de funil com perfura&ccedil;&otilde;es na parte superior. A fonte de energia move as l&acirc;minas girat&oacute;rias das h&eacute;lices em um eixo horizontal e levanta o peso por meio de um cabo conectado a elas. Se o fl uxo de energia que passa pelo cone &eacute; interrompido, at&eacute; onde as l&acirc;minas girat&oacute;rias podem levantar o peso? E se, por sua vez, o cone menor for bloqueado, ser&aacute; que o peso alcan&ccedil;ar&aacute; uma altura cinco vezes maior?</p>"
    },
    {
      id: "D-303",
      title: "Inclinômetro",
      type: 'content',
      image: ["3-Gallery/D303.jpg"],
      audio: '',
      text: "<p>Na parte inferior deste f&oacute;lio, temos o desenho de um aparelho que indica se uma m&aacute;quina voadora est&aacute; voando nivelada ao horizonte ou em &acirc;ngulo. Uma linha de prumo com uma pequena bola na extremidade est&aacute; pendurada dentro de um recipiente no formato de sino, para proteg&ecirc;-la da interfer&ecirc;ncia do vento.</p><p>O piloto verifi ca o &acirc;ngulo da linha de prumo para determinar se a m&aacute;quina est&aacute; voando inclinada ou horizontalmente. Aparelhos semelhantes que utilizam um prumo para medir o grau de inclina&ccedil;&atilde;o de um declive s&atilde;o muito utilizados hoje em dia.</p><p>Na parte superior, vemos desenhos relacionados a pesos e escalas, e experimentos para medi&ccedil;&atilde;o da resist&ecirc;ncia de parafusos.</p>"
    },
    {
      id: "D-304",
      title: "O Pai da Aviação",
      type: 'content',
      image: ["3-Gallery/D304.jpg"],
      audio: '',
      text: "<p>O sonho de voar j&aacute; existia na mente de engenheiros e inventores desde o s&eacute;culo XV, mas Leonardo foi o primeiro a abordar esse desafio a partir de uma perspectiva cient&iacute;fica.</p><p>Leonardo analisou o padr&atilde;o de voo dos p&aacute;ssaros e morcegos e estudou sua anatomia, pois acreditava que, se os humanos pudessem desenvolver e operar aeronaves que copiassem seus movimentos, o sonho de voar poderia ser realizado.</p><p>A princ&iacute;pio, Leonardo imaginou humanos voando ao utilizarem &ldquo;asas&rdquo;. Alguns de seus projetos mostram o piloto de barriga para baixo, operando mecanismos conectados a asas, enquanto outros o colocam entre asas que batem, impulsionadas por pedais operados pelas m&atilde;os e p&eacute;s. Projetos mais sofisticados inclu&iacute;am um complexo sistema de polias e parafusos.</p><p>Leonardo, entretanto, logo percebeu que os humanos, com menos de um quarto de seu peso nos m&uacute;sculos peitorais e dos bra&ccedil;os, nunca teriam for&ccedil;a suficiente para voar como os p&aacute;ssaros. Ent&atilde;o come&ccedil;ou a investigar a possibilidade do voo sem o movimento das asas, estudando a velocidade e inventando maneiras de usar ascorrentes de ar para alcan&ccedil;ar grandes altitudes.</p><p>As ideias de Leonardo foram as precursoras das asas-deltas, avi&otilde;es, helic&oacute;pteros e paraquedas modernos.</p><p><strong>&ldquo;Haver&aacute; asas! Se essa conquista n&atilde;o for minha, dever&aacute; ser de outro.&rdquo; - <em>Leonardo da Vinci</em></strong></p>"
    },
    {
      id: "D-305",
      title: "Higr&ocirc;metro de Cera",
      type: 'content',
      image: ["3-Gallery/D305.jpg"],
      audio: '',
      text: "<p>Este instrumento mede o n&iacute;vel de umidade da atmosfera. &Eacute; um conjunto simples com v&aacute;rias balan&ccedil;as contendo, de um lado, uma subst&acirc;ncia parecida com algod&atilde;o macio para absorver a &aacute;gua e, do outro lado, o mesmo peso de uma subst&acirc;ncia n&atilde;o absorvente, como a cera.</p><p>Quando o ar est&aacute; seco, a linha de prumo est&aacute; na vertical. A umidade do ar &eacute; absorvida pelo algod&atilde;o, fazendo com que fi que mais pesado que a cera. O n&iacute;vel de umidade &eacute; indicado pelo tanto que o lado com o algod&atilde;o fi ca mais baixo que o outro lado.</p><p>Leonardo percebe que isso ajuda a &ldquo;entender a qualidade e espessura do ar e quando h&aacute; previs&atilde;o de chuva&rdquo;. Hoje em dia, este princ&iacute;pio &eacute; aplicado &agrave;s &ldquo;casinhas meteorol&oacute;gicas&rdquo; e outros higr&ocirc;metros que usam material absorvente como tripa de gato ou cabelo humano.</p>"
    },
    {
      id: "D-306",
      title: "Anemosc&oacute;pio",
      type: 'content',
      image: ["3-Gallery/D306a.jpg","3-Gallery/D306b.jpg"],
      audio: '',
      text: "<p>Entre os instrumentos desenvolvidos para seus estudos sobre o voo, Leonardo desenhou este anemosc&oacute;pio, que indicava a dire&ccedil;&atilde;o do vento. Ele se parece exatamente com as birutas que muitas vezes vemos nos telhados de edifi ca&ccedil;&otilde;es.</p>"
    },
    {
      id: "D-307",
      title: "Anemômetro",
      type: 'content',
      image: ["3-Gallery/D307a.jpg","3-Gallery/D307b.jpg"],
      audio: '',
      text: "<p>Este instrumento mede a for&ccedil;a do vento. A l&acirc;mina oscilante (placa vertical) movimenta-se como um ponteiro ao vento e, pela leitura da gradua&ccedil;&atilde;o do quadrante, &eacute; poss&iacute;vel determinar a for&ccedil;a das condi&ccedil;&otilde;es do vento. Um instrumento parecido foi inventado por Leon Alberti, um matem&aacute;tico italiano, por volta do ano de 1450.</p>"
    },
    {
      id: "D-308",
      title: "Estudo de Asa",
      type: 'content',
      image: ["3-Gallery/D308.jpg"],
      audio: '',
      text: "<p>Leonardo fez vários estudos de asas. Este é baseado no formato das asas de um morcego. Feita de madeira, a estrutura deveria ter um único pedaço de tecido esticado sobre ela. Este desenho pode ter sido um objeto cenográfico para umas das muitas produções teatrais nas quais Leonardo trabalhou em Milão.</p>"
    },
    {
      id: "D-309",
      title: "Parafuso Aéreo",
      type: 'content',
      image: ["3-Gallery/D309a.jpg","3-Gallery/D309b.jpg"],
      audio: '3-Gallery/A302.mp3',
      text: "<p>As crian&ccedil;as, desde os tempos medievais, j&aacute; brincavam com &ldquo;cata-ventos&rdquo;, onde as l&acirc;minas sobre um eixo rosqueado giram circularmente e se movem para cima e para baixo. Leonardo provavelmente se inspirou nessa ideia para seu conceito de parafuso ascendente. Quatro homens na base de uma plataforma central empurravam as barras &agrave; sua frente, para mover o eixo. Conforme as l&acirc;minas cobertas por tecidos giravam, um impulso para cima seria criado. Esta m&aacute;quina, que provavelmente nunca levantaria voo, foi considerada a precursora do helic&oacute;ptero de nossos dias.</p>"
    },
    {
      id: "D-310",
      title: "&aacute;quina Voadora",
      type: 'content',
      image: ["3-Gallery/D310.jpg"],
      audio: '3-Gallery/A301.mp3',
      text: "<h2><em>C&oacute;dice Atlanticus, f. 824 v.</em></h2><p>Este &eacute; um dos desenhos mais famosos de Leonardo a respeito do voo humano. O piloto fica com o rosto virado para baixo e &eacute; mantido nessa posi&ccedil;&atilde;o por meio de correias. Ele coloca seus p&eacute;s em estribos colocados na parte de tr&aacute;s da m&aacute;quina e move-os para engatar as cordas e polias que fazem com que as asas subam e des&ccedil;am. Ele puxa as alavancas pr&oacute;ximas &agrave; sua cabe&ccedil;a para mudar a dire&ccedil;&atilde;o do voo.</p><p>O movimento resultante imita o voo das aves conforme as asas se dobram e se flexionam, ao serem trazidas na dire&ccedil;&atilde;o do corpo da m&aacute;quina.</p>"
    },
    {
      id: "D-311",
      title: "Figurinista",
      type: 'content',
      image: ["3-Gallery/D311.jpg"],
      audio: '',
      text: "<h2><em>ACERVO REAL, RL 12514 R.</em></h2><p>Ao trabalhar para Ludovico Sforza, Leonardo recebeu v&aacute;rias incumb&ecirc;ncias estranhas relacionadas &agrave; vida no castelo; incluindo organizar as festas de Sforza. Nas famosas festas do duque, Leonardo era inventor, gerente de palco e produtor, tudo ao mesmo tempo.</p><p>Ele desenhou os elaborados trajes e m&aacute;scaras e as novidades mec&acirc;nicas para encantar os convidados. Esses eventos giravam em torno de prest&iacute;gio e poder. Quanto mais luxuosa a festa, mais se exaltava a gl&oacute;ria de Ludovico.</p>"
    },
    
    {
      id: "D-312",
      title: "Máquina Voadora Vertical",
      type: 'content',
      image: ["3-Gallery/D312a.jpg","3-Gallery/D312b.jpg"],
      audio: '',
      text: "<h2><em>Manoscritto B, f. 80 r.</em></ph2><p>Neste projeto, o piloto deve ficar reto no centro de uma m&aacute;quina enorme. O piloto precisa usar os bra&ccedil;os, pernas e at&eacute; mesmo a cabe&ccedil;a para mover os mecanismos deslizantes para cima e para baixo para fazer essa m&aacute;quina al&ccedil;ar voo. Leonardo estava utilizando todas as partes do corpo humano na tentativa de maximizar a fonte de energia. <br />A m&aacute;quina tem doze metros de comprimento com uma envergadura de asa de 24 metros e h&aacute; uma escada retr&aacute;til de doze metros com amortecedores. <br />Leonardo decidiu ser necess&aacute;rio ter dois pares de asas que batessem &ldquo;cruzadas, da mesma maneira como um cavalo se movimenta&rdquo;.</p>"
    },
    {
      id: "D-313",
      title: "Mecanismo de Relógio",
      type: 'content',
      image: ["3-Gallery/D313a.jpg","3-Gallery/D313b.jpg"],
      audio: '',
      text: "<h2><em>C&Oacute;DICE ATLANTICUS, F. 348 V.-A</em></h2><p>Leonardo era fascinado em medir o tempo. Ele visitou a Abadia Cisterciense de Chiaravalle, perto de Mil&atilde;o, para examinar o funcionamento do renomado rel&oacute;gio de peso, um dos destaques da alta torre de tijolos da abadia.</p><p>O rel&oacute;gio n&atilde;o s&oacute; registrava os minutos e as horas, mas tamb&eacute;m a posi&ccedil;&atilde;o do Sol e da Lua. Ele estudou o mecanismo com grande interesse e dedicou especial aten&ccedil;&atilde;o &agrave;s molas, que representaram uma inova&ccedil;&atilde;o tecnol&oacute;gica no per&iacute;odo renascentista.</p><p>O rel&oacute;gio em exibi&ccedil;&atilde;o foi feito especialmente para esta exposi&ccedil;&atilde;o, por um artes&atilde;o de noventa anos em Vinci, Toscana, cidade natal de Leonardo da Vinci.</p>"
    },
    {
      id: "D-314",
      title: "Spot ou Projetor",
      type: 'content',
      image: ["3-Gallery/D314a.jpg","3-Gallery/D314b.jpg"],
      audio: '3-Gallery/A303.mp3',
      text: "<h2><em>C&Oacute;DICE ATLANTICUS, F. 9 V.-B</em></h2><p>Quando Leonardo fez este esbo&ccedil;o, observou que o instrumento era capaz de lan&ccedil;ar &ldquo;uma luz bonita e abundante&rdquo;. O projetor &eacute; uma caixa simples com uma grande lente de vidro de um dos lados. A luz &eacute; produzida por uma vela.</p><p>Em Mil&atilde;o, Leonardo usou esta inven&ccedil;&atilde;o para projetar na parede formas e fi guras ampliadas durante apresenta&ccedil;&otilde;es teatrais. Alterando o tamanho do objeto projetado, ele conseguia criar sombras com bordas n&iacute;tidas ou borradas.</p>"
    },
    {
      id: "D-315",
      title: "Flauta Dupla",
      type: 'content',
      image: ["3-Gallery/D315.jpg"],
      audio: '',
      text: "<h2><em>C&Oacute;DICE ARUNDEL, F. 175 R.</em></h2><p>Leonardo introduziu aperfei&ccedil;oamentos em muitos instrumentos musicais populares, tornando-os mais autom&aacute;ticos, simplifi cando a t&eacute;cnica de tocar e criando novos efeitos sonoros.</p><p>Projetou melhorias para a fl auta, incorporando chaves e abrindo orif&iacute;cios para os dedos ao longo de seu comprimento. Os projetos para instrumentos de sopro nesta ilustra&ccedil;&atilde;o se referem a uma s&eacute;rie de apresenta&ccedil;&otilde;es na corte, produzidas por Leonardo para celebrar o casamento do sobrinho do duque de Mil&atilde;o com Isabella de Arag&atilde;o em 1490.</p>"
    },
    {
      id: "D-316",
      title: "Instrumentos musicais, e parta marcar o tempo",
      type: 'content',
      image: ["3-Gallery/D316.jpg"],
      audio: '3-Gallery/A304.mp3',
      text: "<p>Entre as artes criativas, o gosto de Leonardo pela m&uacute;sica era superado apenas pela pintura. Ele era um respeitado m&uacute;sico, tinha uma bela voz e era muito talentoso ao tocar a lira da braccio, uma esp&eacute;cie de antecessor do violino.</p><p>Infelizmente, muitos de seus escritos sobre m&uacute;sica, incluindo seu Tratado sobre M&uacute;sica, foram perdidos. Leonardo se mudou para Mil&atilde;o em 1482, esperando receber o apoio do Duque Ludovico de Sforza, o Moro. Ele impressionou o Duque com seu talento para a m&uacute;sica, dire&ccedil;&atilde;o teatral e cenografia. Uma de suas espetaculares cria&ccedil;&otilde;es, Dan&ccedil;a dos Planetas, era t&atilde;o bela que um cortes&atilde;o escreveu &ldquo;A princ&iacute;pio, acredit&aacute;vamos estar vendo o Para&iacute;so&rdquo;.</p><p>Leonardo aplicou a teoria mec&acirc;nica e observa&ccedil;&otilde;es sobre ac&uacute;stica a seus projetos de desenvolvimento de novos instrumentos musicais. Muitas de suas ideias baseavam-se em instrumentos j&aacute; existentes, entre eles o piano port&aacute;til, a bateria mec&acirc;nica e a flauta dupla. Um registro em particular conta com onze projetos diferentes de baterias, muitos deles analisando como o tom poderia ser alterado ao longo da apresenta&ccedil;&atilde;o.</p><p>Ele tamb&eacute;m tinha grande interesse pela &oacute;ptica, os efeitos da luz, reflexos, sombras e magnifica&ccedil;&atilde;o. Leonardo projetou um tipo de holofote para o teatro e descobriu que era poss&iacute;vel, com o uso de lentes e espelhos, avistar os planetas e a lua.</p><p>Alguns dos desenhos t&eacute;cnicos mais bonitos de Leonardo referem-se aos rel&oacute;gios. Ele utilizou molas, pesos e engrenagens para aprimorar os instrumentos existentes de medi&ccedil;&atilde;o do tempo.</p><p><strong>&ldquo;O poeta est&aacute; muito abaixo do pintor na representa&ccedil;&atilde;o do que se pode ver, e muito abaixo do m&uacute;sico na representa&ccedil;&atilde;o do que n&atilde;o se pode ver.&rdquo; &ndash; <em>Leonardo da Vinci</em></strong></p>"
    },
    {
      id: "D-317",
      title: "Piano Port&aacute;til",
      type: 'content',
      image: ["3-Gallery/D317.jpg"],
      audio: '',
      text: "<h2><em>C&Oacute;DICE ATLANTICUS, F. 93 R.</em></h2> <p>Leonardo produziu muitos esbo&ccedil;os e projetos para instrumentos musicais. Este f&oacute;lio mostra o funcionamento de um instrumento port&aacute;til. No centro da p&aacute;gina, na parte inferior, temos o desenho da caixa do instrumento, ilustrando como &eacute; usada na cintura e tocada com as duas m&atilde;os, como se toca um piano.</p> <p>Na parte de dentro, h&aacute; um arco de crina de cavalo em movimento cont&iacute;nuo, operado pelo m&uacute;sico atrav&eacute;s de um sistema de polias e um p&ecirc;ndulo, enquanto caminha. Um complexo sistema de cames e polias move as cordas pelo arco e o som semelhante ao de uma viola &eacute; produzido. Este piano tem uma escala de tr&ecirc;s oitavas.</p>"
    },
    {
      id: "D-318",
      title: "Paraquedas",
      type: 'content',
      image: ["3-Gallery/D318a.jpg","3-Gallery/D318b.jpg"],
      audio: '3-Gallery/A305.mp3',
      text: "<h2><em>C&oacute;dice Atlanticus, f. 1058 v.</em></h2><p>O projeto de paraquedas de Leonardo consiste em um tecido selado, mantido aberto por um pir&acirc;mide feita com hastes de madeira, cada uma delas com sete metros de comprimento. Leonardo escreveu: &ldquo;Se um homem recebe um peda&ccedil;o de tecido engomado com o comprimento de onze metros de cada lado e onze metros de altura, ele pode pular de qualquer altura, sem nenhum ferimento&rdquo;. Para ele, a inven&ccedil;&atilde;o era um tipo de planador, ou &ldquo;voo sem o movimento das asas&rdquo;. <br />No ano 2000, o ingl&ecirc;s Adrian Nicholas usou uma r&eacute;plica feita de lona grossa e madeira em um salto de um bal&atilde;o de ar quente a 3 mil metros de altura. Tudo correu tranquilamente. Ele se soltou quando estava a seiscentos metros do solo e trocou para um paraquedas moderno, para n&atilde;o ser esmagado pela pesada pir&acirc;mide de madeira quando tocasse o solo.</p>."
    },
    {
      id: "D-319",
      title: "Tambor Mecânico",
      type: 'content',
      image: ["3-Gallery/D319.jpg"],
      audio: '3-Gallery/A306.mp3',
      text: "<h2><em>C&oacute;dice ATLANTICUS, f 306. v.-a</em></h2><p>Leonardo inventou tambores mec&acirc;nicos para uso em marchas militares e possivelmente para quando soldados iniciassem um combate.<br />Os tambores marcam ritmos complexos, de acordo com os movimentos do eixo da carruagem. Quando o carrinho &eacute; puxado, as engrenagens giram os dois rolos centrais que, por sua vez, movem as dez baquetas (cinco de cada lado). Os pinos ou cames posicionados nos rolos podem ser colocados em posi&ccedil;&otilde;es diferentes para mudar a batida e o ritmo da m&uacute;sica. <br />O barulho alto criado por v&aacute;rias batidas do &uacute;nico instrumento faria com que o inimigo acreditasse que o ex&eacute;rcito que se aproximava era muito maior em tamanho que em realidade.</p>"
    },
    {
      id: "D-320",
      title: "Sala de Espelhos",
      type: 'content',
      image: ["3-Gallery/D320a.jpg","3-Gallery/D320b.jpg"],
      audio: '3-Gallery/A307.mp3',
      text: "<h2><em>MANOSCRITTO B, F. 28 R.</em></h2><p>Voc&ecirc; j&aacute; parou entre dois espelhos paralelos e viu como seu refl exo &eacute; repetido, cada vez mais longe de onde voc&ecirc; est&aacute; parado, nas duas dire&ccedil;&otilde;es, e que vai diminuindo cada vez mais?</p><p>A primeira imagem refl ete voc&ecirc; no tamanho que voc&ecirc; &eacute;; uma segunda imagem &eacute; refletida de volta no outro espelho e &eacute; menor. Esse arranjo continua at&eacute; o infinito.</p><p>Leonardo descreveu uma sala de oito lados com oito espelhos planos fazendo o papel de paredes. Ele observou que se uma pessoa estivesse l&aacute; dentro, &ldquo;seria capaz de ver todas as partes (de si mesma) in&uacute;meras vezes&rdquo;.</p>"
    },
    {
      id: "D-321",  
      title: "M&aacute;quina de Perspectiva",
      type: 'content',
      image: ["3-Gallery/D321.jpg"],
      audio: '',
      text: "<h2><em>MANOSCRITTO B, F. 28 R.</em></h2><p>A perspectiva &eacute; um sistema usado por artistas e engenheiros para representar objetos tridimensionais em uma superf&iacute;cie bidimensional. Para criar uma perspectiva exata, o artista precisa pintar sobre um tela transparente colocada entre seus olhos e a cena, reproduzindo as formas e as cores no plano da pintura para que sejam iguais &agrave;s da cena<br />atr&aacute;s da tela.</p><p>Este desenho de Leonardo mostra um artista pintando e usando o &ldquo;vidro de artista&rdquo;. Este desenho exemplifi ca trabalhos anteriores feitos em perspectiva pelo artista e arquiteto italiano Brunelleschi.</p>"
    },
    {
      id: "D-322",  
      title: "Arte Renascentista",
      type: 'content',
      image: ["3-Gallery/D322.jpg"],
      audio: '',
      text: "<p>Leonardo, assim como Michelangelo, Rafael e Ticiano, fez parte do Renascentismo italiano. A maioria de suas<br />pinturas e esculturas foi executada em Floren&ccedil;a e Mil&atilde;o, entre os anos de 1473 e 1513, mas grande parte de seu<br />trabalho foi perdida.</p><p>Leonardo trabalhou em pelo menos 25 pinturas, mas muitas delas hoje s&atilde;o apenas c&oacute;pias. Cerca de 6 mil<br />p&aacute;ginas de anota&ccedil;&otilde;es e desenhos ainda existem, mas acad&ecirc;micos acreditam que esse n&uacute;mero represente menos<br />da metade e, talvez, at&eacute; mesmo um quarto de tudo que existia at&eacute; sua morte.</p><p>Para Leonardo, a arte n&atilde;o era poss&iacute;vel sem a ci&ecirc;ncia. Segundo ele, a verdade sobre o mundo s&oacute; poderia ser<br />aprendida atrav&eacute;s de observa&ccedil;&otilde;es meticulosas, e todas as teorias deveriam ser testadas e aplicadas no mundo real.<br />Seu trabalho art&iacute;stico est&aacute;, por isso mesmo, fundamentado em uma fus&atilde;o de observa&ccedil;&otilde;es cient&iacute;ficas e<br />experimenta&ccedil;&otilde;es cautelosas. Ele era fascinado pela luz e pela sombra e pelos efeitos criados por diferentes<br />fontes de luz refletidas em rostos e objetos, assim como pelos efeitos da perspectiva em paisagens distantes.</p><p>Leonardo fazia uma constante autocr&iacute;tica de sua t&eacute;cnica art&iacute;stica e retificava suas pinturas, e sua obstinada sede<br />de conhecimento e a busca pela perfei&ccedil;&atilde;o o distinguiam de seus contempor&acirc;neos.</p><p>As obras de arte aqui expostas s&atilde;o reprodu&ccedil;&otilde;es em tamanho natural de suas pinturas florentinas a &oacute;leo, pois os<br />originais s&atilde;o considerados muito valiosos para serem retirados dos locais permanentes.</p><p>&ldquo;A arte nunca &eacute; conclu&iacute;da, apenas abandonada.&rdquo; &ndash; Leonardo da Vinci<br /><br /></p>"
    },
    {
      id: "D-323",  
      title: "Autorretrato",
      type: 'content',
      image: ["3-Gallery/D323a.jpg","3-Gallery/D323b.jpg"],
      audio: '3-Gallery/A308.mp3',
      text: "<p>Tamanho real: 33 x 21 cm<br />Piazza dell&rsquo;Orologio, Turim, Itália</p><p><br /><strong>O Resgate de Leonardo</strong></p><p>Este autorretrato é como a maioria de nós visualiza Leonardo, mas o pequeno desenho em giz está perdendo a cor e as manchas marrom-avermelhadas estão pouco a pouco se espalhando sobre seu rosto. O original é tão frágil que foi exibido apenas três vezes no último século, e tão delicado que qualquer tentativa para preservá-lo pode levar à sua destruição.</p><p>Até agora, parecia que pouco poderia ser feito para salvar a imagem de Leonardo de seu terrível destino, mas técnicas de ampliação de DNA surgiram para oferecer novas esperanças.</p><p>Embora a descoloração irregular pareçamais um caso grave de sarampo, é, de fato, uma deterioração comumente observada em papéis antigos, conhecida como &ldquo;foxing&rdquo; (pontos escuros na tela). No entanto, até recentemente, os cientistas não sabiam a causa dessa doença de Leonardo. Alguns acreditavam que o culpado poderia ser o crescimento de fungos, outros sustentavam que era o resultado da oxidação de alguma substância na polpa da qual o papel era feito.</p><p>Ao longo dos anos, cientistas tentaram, sem sucesso, identi car a origem biológica das manchas através da remoção e cultivo de amostras do foxing, acreditando que, se conseguissem reproduzi-las, certamente conseguiriam descobrir como detê-las.</p><p>Em 2015, a cientista sênior Guadalupe Pinar e sua equipe da University of Natural Resources and Life Sciences [Universidade de Recursos Naturais e Ciências da Vida], em Viena, utilizaram imagens do SEM (microscópio eletrônico de varredura) para determinar se as marcas no desenho eram decididamente de origem biológica, gerando expectativas de que o foxing pudesse ser contido &ndash; e até mesmo reduzido.</p><p>DNA foi então retirado do desenho de Leonardo da Vinci e a sequência fúngica ampliada e clonada, o que mostrou que o desenho é um zoológico de formas fúngicas, com predominância do fungo lo Ascomycota.</p><p>A pesquisa sugere que o foxing começou quando partículas de ferro carregadas pela poeira romperam a estrutura do papel possibilitando que organismos fúngicos nele se abrigassem. O ácido oxálico produzido pelos fungos dani cou o papel ainda mais.</p><p>Agora, uma estratégia realista parece ser bastante promissora para salvar Leonardo desse mal. Até lá, teremos que tratar o autorretrato de Leonardo como o velho homem que representa, fazendo com que descanse bastante e receba poucas visitas.</p>"
    },
    {
      id: "D-324",  
      title: "O Homem Vitruviano",
      type: 'content',
      image: ["3-Gallery/D324.jpg"],
      audio: '3-Gallery/A309.mp3',
      text: "<p>Tamanho real: 34 x 24 cm<br />Gallerie dell&rsquo;Accademia, Veneza, Itália</p>"
    },     
    {
      id: "D-325",    
      title: "D-325",
      type: 'content',
      image: ["3-Gallery/D325.jpg"],
      audio: '',
      text: ""
    },
    {
      id: "D-326",  
      title: "A Virgem, o Menino, Sant&rsquo;Ana e São João Batista",
      type: 'content',
      image: ["3-Gallery/D326.jpg"],
      audio: '',
      text: "<p>Tamanho real: 141,5 x 104,6 cm<br />The National Gallery, Londres, Reino Unido</p>"
    },
    {
      id: "D-327",    
      title: "São João Batista",
      type: 'content',
      image: ["3-Gallery/D327.jpg"],
      audio: '',
      text: "<p>Tamanho real: 69 x 57 cm<br />Museu do Louvre, Paris, França</p>"
    },
    {
      id: "D-328",  
      title: "Retrato de Ginevra de&rsquo; Benci",
      type: 'content',
      image: ["3-Gallery/D328.jpg"],
      audio: '',
      text: "<p>Tamanho real: 38,8 x 36,7 cm<br />National Gallery of Art, Washington, D.C., EUA</p>"
    },
    {
      id: "D-329",            
      title: "A Virgem e o Menino com Santa Ana",
      type: 'content',
      image: ["3-Gallery/D329.jpg"],
      audio: '',
      text: "<p>Tamanho real: 168 x 112 cm<br />Museu do Louvre, Paris, França</p>"
    },
    {
      id: "D-330",  
      title: "La Bella Principessa",
      type: 'content',
      image: ["3-Gallery/D330a.jpg","3-Gallery/D330b.jpg"],
      audio: '3-Gallery/A310.mp3',
      text: "<p>Tamanho real: 33 x 24 cm<br />Cole&ccedil;&atilde;o particular</p><p>No final dos anos 1990, La Bella Principessa foi vendida por US$ 20 mil em um leil&atilde;o em Nova York, como uma pe&ccedil;a alem&atilde; obscura do final do s&eacute;culo XIX.</p><p>Dez anos depois, uma revela&ccedil;&atilde;o extraordin&aacute;ria, daquelas que s&oacute; acontecem uma vez na vida, come&ccedil;ou a ser desvendada, deixando o mundo das artes ao mesmo tempo fascinado e dividido. Acreditava-se que La Bella Principessa, parte de uma cole&ccedil;&atilde;o particular su&iacute;&ccedil;a, seria uma obra-prima desconhecida de Leonardo da Vinci.</p><p>A mais moderna tecnologia para impress&otilde;es digitais foi utilizada para verificar se a obra era um original de Leonardo da Vinci. Uma &uacute;nica impress&atilde;o digital descoberta em La Bella Principessa foi comparada com uma existente em outra pintura de Leonardo, S&atilde;o Jer&ocirc;nimo. Os resultados revelaram que eram praticamente id&ecirc;nticas.</p><p>Uma an&aacute;lise profunda da obra de t&eacute;cnicas mistas composta em giz branco, vermelho e preto, al&eacute;m de tinta e desenho sobre papel velino (pergaminho de couro de vitelo), foi conduzida por Pascal Cotte, inventor da c&acirc;mera multiespectral. Isto forneceu aos historiadores os fatos e evid&ecirc;ncias de que eles precisavam.</p><p>Hoje, grande parte do mundo das artes concorda que este &eacute;, sem d&uacute;vida, um trabalho original de Leonardo da Vinci, o que faz com que sua descoberta seja totalmente inesperada e extremamente valiosa.</p><p>O valor estimado dessa pintura atualmente est&aacute; em torno de &euro; 200 milh&otilde;es. <br />&copy;Lumi&egrave;re Technology / Pascal Cotte</p>"
    },
    {
      id: "D-331",    
      title: "São Jerônimo, o Penitente",
      type: 'content',
      image: ["3-Gallery/D331.jpg"],
      audio: '',
      text: `<p>Tamanho real: 103 x 74 cm<br />Galeria de Arte do Vaticano, Roma, Itália</p>`
    },
    {
      id: "D-332",
      title: "A Virgem das Rochas",
      type: 'content',
      image: ["3-Gallery/D332a.jpg","3-Gallery/D332b.jpg"],
      audio: '3-Gallery/A311.mp3',
      text: "<p>Tamanho real: 199 x 122 cm<br />The National Gallery, Londres, Reino Unido<br />Museu do Louvre, Paris, França</p>"
    },
    {
      id: "D-333",
      title: "FALTA O CONTEÚDO",
      type: 'content',
      image: ["3-Gallery/D332a.jpg","3-Gallery/D332b.jpg"],
      audio: '3-Gallery/A311.mp3',
      text: "<p>FALTA O CONTEÚDO</p>"
    },
    {
      id: "D-334",
      title: "Martelo Impulsionado por um Came Exc&ecirc;ntrico",
      type: 'content',
      image: ["3-Gallery/D334a.jpg","3-Gallery/D334b.jpg"],
      audio: '',
      text: "<h2><em>C&oacute;dice Madrid I, f. 6 v.</em></h2><p>Leonardo frequentemente usa cames rotativos (rodas com sali&ecirc;ncias) para produzir diferentes movimentos mec&acirc;nicos. Nesta m&aacute;quina (ilustrada na parte inferior da p&aacute;gina), quando o came &eacute; acionado por uma manivela, as sali&ecirc;ncias no came mudam o movimento de circular para um movimento para cima e para baixo. O came levanta o martelo, que ent&atilde;o cai com todo o seu peso, batendo todas as vezes no mesmo local. <br />O mecanismo pode ter sido projetado para ajudar os ferreiros que utilizavam martelo e bigorna para forjar espadas, ferraduras e outras ferramentas. </p>"
    },
    
    {
      id: "D-335",
      title: "Mecanismo de Estudo de Peso ou Guincho Composto",
      type: 'content',
      image: ["3-Gallery/D335a.jpg","3-Gallery/D335b.jpg"],
      audio: '',
      text: "<h2><em>C&oacute;dice Madrid I, f. 36 v.</em></h2><p>Leonardo desenhou e analisou esse sistema de cabo e polia. Ele observou que era uma maneira segura para se i&ccedil;ar cargas pesadas, j&aacute; que a distribui&ccedil;&atilde;o da carga era uniforme.<br />Por outro lado, os dispositivos com rodas dentadas e correntes tinham um risco maior de quebrar sob tens&atilde;o. Leonardo prop&ocirc;s que cada polia pudesse i&ccedil;ar uma unidade de peso.<br />Portanto, as 33 polias aqui mostradas conseguem erguer 33 kg (ou libras), contrabalan&ccedil;adas por apenas 1 kg (ou libra) de peso no final do cabo. Mais voltas e polias aumentam a vantagem mec&acirc;nica.</p>"
    },
    {
      id: "D-336",
      title: "Transforma&ccedil;&atilde;o de Movimento Cont&iacute;nuo em Movimento Alternado",
      type: 'content',
      image: ["3-Gallery/D336a.jpg","3-Gallery/D336b.jpg"],
      audio: '',
      text: "<h2><em>C&oacute;dice Madrid I, f. 123 r.</em></h2><p>Este desenho mostra uma maneira de transformar movimento circular em movimento alternado. &Eacute; parte de um projeto de uma m&aacute;quina t&ecirc;xtil e mostra como enrolar um fio uniformemente em torno de um carretel. <br />&Agrave; medida que a roda gira, uma alavanca presa a uma haste move-a para dentro e para fora do eixo, girando-o em apenas em uma dire&ccedil;&atilde;o. O carretel na ponta do eixo tamb&eacute;m se move para a frente e para tr&aacute;s enquanto gira, de modo que o fio possa ser enrolado uniformemente em torno dele.</p>"
    },
    {
      id: "D-337",  
      title: "Roda Volante",
      type: 'content',
      image: ["3-Gallery/D337a.jpg","3-Gallery/D337b.jpg"],
      audio: '',
      text: "<h2><em>C&oacute;dice Madrid I, f. 114 r.</em></h2><p>A roda volante &eacute; um instrumento mec&acirc;nico para uniformizar a velocidade de rota&ccedil;&atilde;o. No projeto de Leonardo, quando a manivela &eacute; girada com rapidez suficiente, as quatro esferas elevam-se com for&ccedil;a centr&iacute;fuga at&eacute; as correntes ficarem na horizontal. Quando a velocidade m&aacute;xima de rota&ccedil;&atilde;o &eacute; atingida, as esferas e o eixo a ela acoplado giram a uma velocidade constante. A roda volante mant&eacute;m o movimento e reduz o esfor&ccedil;o necess&aacute;rio para sustent&aacute;-la. Isso ajuda a estabilizar a rota&ccedil;&atilde;o do eixo quando ele sofre press&atilde;o oscilante ou intermitente. <br />O princ&iacute;pio j&aacute; era conhecido por Leonardo na roda de oleiro.</p>"
    },
    {
      id: "D-338",  
      title: "Mecanismo de Bloqueio Autom&aacute;tico",
      type: 'content',
      image: ["3-Gallery/D338a.jpg","3-Gallery/D338b.jpg"],
      audio: '',
      text: "<h2><em>C&oacute;dice Madrid I, f. 12 r.</em></h2><p>Em qualquer processo mec&acirc;nico, quando grandes pesos est&atilde;o envolvidos, &eacute; importante que a roda de eleva&ccedil;&atilde;o n&atilde;o fique fora de controle se algo der errado. <br />Leonardo estudou diversas varia&ccedil;&otilde;es para um sistema de travamento, que bloqueia a rota&ccedil;&atilde;o da roda na dire&ccedil;&atilde;o errada, enquanto o peso est&aacute; sendo levantado. A garra pressiona uma engrenagem na roda, impedindo que esta gire para tr&aacute;s e libere o peso. <br />Essa ideia, utilizada originalmente para carregar catapultas, &eacute; a base dos mecanismos de travamento por catraca em uso atualmente.</p>"
    },
    {
      id: "D-339",  
      title: "Engrenagem Helicoidal ou Parafuso Sem Fim",
      type: 'content',
      image: ["3-Gallery/D339a.jpg","3-Gallery/D339b.jpg"],
      audio: '',
      text: "<h2><em>C&oacute;dice Madrid I, f. 17 v.</em></h2><p>Este sistema mec&acirc;nico de transmiss&atilde;o de movimento circular frequentemente aparece nos projetos de Leonardo. <br />O parafuso sem fim na arte superior faz contato com a roda da engrenagem sobre todo o arco da roda, e n&atilde;o somente em um ponto. Como atinge muitas das engrenagens de uma s&oacute; vez, ele distribui a for&ccedil;a por uma &aacute;rea mais ampla e reduz o risco de falha se alguma engrenagem quebrar sob tens&atilde;o. <br />Leonardo estava desenvolvendo ainda mais os princ&iacute;pios do parafuso de Arquimedes. Ainda hoje, sempre que a suavidade da transmiss&atilde;o &eacute; necess&aacute;ria, este instrumento &eacute; muito utilizado. </p>"
    },
    {
      id: "D-340",
      title: "Macaco",
      type: 'content',
      image: ["3-Gallery/D340a.jpg","3-Gallery/D340b.jpg"],
      audio: '',
      text: "<h2><em>C&oacute;dice ATLANTICUS, f. 998 r.</em></h2><p>Este instrumento de pinh&atilde;o e cremalheira altamente eficiente &eacute; a base para o macaco de carro usado atualmente. Ele converte movimento rotacional em movimento linear, permitindo que objetos pesados sejam erguidos com um m&iacute;nimo de esfor&ccedil;o. <br />Uma manivela &eacute; conectada a uma pequena engrenagem. Ao ser acionada, o pinh&atilde;o circular encaixa os dentes na cremalheira e move-a para cima. Qualquer objeto na parte superior da cremalheira &eacute;, ent&atilde;o, erguido. O objeto pode ser abaixado invertendo-se a dire&ccedil;&atilde;o em que a manivela &eacute; girada.</p>"
    },
    {
      id: "D-341",
      title: "Rolamentos",
      type: 'content',
      image: ["3-Gallery/D41a.jpg","3-Gallery/D341b.jpg"],
      audio: '',
      text: "<h2><em>C&oacute;dice Madrid I, f. 101 v.</em></h2><p>Leonardo identificou o princ&iacute;pio mec&acirc;nico por tr&aacute;s do uso de rolamentos para reduzir a fric&ccedil;&atilde;o. Neste projeto, as tr&ecirc;s bolas esf&eacute;ricas podem mover-se livremente, aninhadas em uma base hemisf&eacute;rica. As bolas espalham a fric&ccedil;&atilde;o criada pela press&atilde;o do eixo vertical. Leonardo observou que s&atilde;o necess&aacute;rias tr&ecirc;s esferas, e n&atilde;o quatro. Quatro esferas se moveriam de forma desigual e produziriam maior resist&ecirc;ncia, tornando o dispositivo menos eficiente. <br />Como muitas das inven&ccedil;&otilde;es de Leonardo, esta tamb&eacute;m ficou esquecida por v&aacute;rios s&eacute;culos: foi somente em 1791 que a ideia foi patenteada por um fabricante de carruagens, no pa&iacute;s de Gales.</p>"
    },
    {
      id: "D-342",  
      title: "Corrente do Cárter",
      type: 'content',
      image: ["3-Gallery/D342a.jpg","3-Gallery/D342b.jpg"],
      audio: '',
      text: "<h2><em>C&oacute;dice Madrid I, f. 10 r</em>.</h2><p>Leonardo dedicou muita aten&ccedil;&atilde;o &agrave; transmiss&atilde;o do movimento circular. Aqui ele investiga o uso de correntes em vez de cordas. Para mover cargas pesadas, um sistema mec&acirc;nico com duas rodas dentadas, conectado por uma corrente a uma dist&acirc;ncia definida e no mesmo plano vertical ou horizontal, produz maior efici&ecirc;ncia e &eacute; mais seguro que se cordas fossem utilizadas. O sistema tamb&eacute;m pode ser utilizado para produzir movimentos descont&iacute;nuos de vaiv&eacute;m, como os encontrados nos mecanismos dos rel&oacute;gios.</p>"
    },
    {
      id: "D-343",
      title: "Rolamentos Seccionados",
      type: 'content',
      image: ["3-Gallery/D343a.jpg","3-Gallery/D343b.jpg"],
      audio: '',
      text: "<h2><em>C&oacute;dice Madrid I, f. 20 v.</em></h2><p>Esta inven&ccedil;&atilde;o de Leonardo &eacute; um ancestral do rolamento de esferas, usado para reduzir atritos. <br />As esferas de madeira s&atilde;o alternadas com carret&eacute;is com lados c&ocirc;ncavos. As esferas podem mover-se livremente em todas as dire&ccedil;&otilde;es e os carret&eacute;is giram em seus pr&oacute;prios eixos. Como as esferas n&atilde;o se tocam, seu desgaste &eacute; reduzido. <br />Este dispositivo foi usado por Leonardo em um projeto para um grande palco girat&oacute;rio para um espet&aacute;culo teatral sofisticado da Corte de Mil&atilde;o, mas o palco acabou nunca sendo constru&iacute;do.</p>"
    },
    {
      id: "D-344",
      title: "Transformação do Movimento Circular",
      type: 'content',
      image: ["3-Gallery/D344a.jpg","3-Gallery/D344b.jpg"],
      audio: '',
      text: "<h2><em>C&oacute;dice Madrid I, f. 29 v.</em></h2><p>Neste modelo, quando a roda dentada gira, a haste do pist&atilde;o da barra horizontal na parte superior move-se para a frente e para tr&aacute;s, horizontalmente.<br />Uma combina&ccedil;&atilde;o de alavancas faz com que, ao mesmo tempo em que o eixo gira a roda, a haste nela conectada deslize para tr&aacute;s e para a frente. Hoje em dia, cortadores de feno com compressores alternativos usam esse sistema.<br />No sentido de r&eacute;, o sistema &eacute; usado no movimento de um trem a vapor. </p>"
    },
    {
      id: "D-345",  
      title: "Mecanismo da Engrenagem de Lanterna",
      type: 'content',
      image: ["3-Gallery/D345a.jpg","3-Gallery/D345b.jpg"],
      audio: '',
      text: "L<h2><em>C&oacute;dice Atlanticus, f. 4 v.-b</em></h2><p>A engrenagem, inventada por Arquimedes no s&eacute;culo III a.C., era bem conhecida no tempo de Leonardo. Leonardo trabalhou em aprimoramentos para diversos tipos de engrenagens projetadas para transmitir movimento e for&ccedil;a. Esta combina&ccedil;&atilde;o de engrenagem e pinh&atilde;o de lanterna aparece em v&aacute;rios de seus projetos. <br />O pinh&atilde;o de lanterna &eacute; uma s&eacute;rie de pequenos cilindros presos entre dois discos. Aqui, a engrenagem &eacute; um disco com pinos perpendiculares dispostos em intervalos regulares ao redor do per&iacute;metro. O instrumento transmite movimento quando a lanterna, acionada por uma manivela, encaixa-se com os pinos da engrenagem e movimenta a roda. Em um segundo projeto, a pr&oacute;pria engrenagem &eacute; acionada pela manivela. Mecanismos semelhantes s&atilde;o usados hoje em alguns rel&oacute;gios.</p>"
    },
    {
      id: "D-346",
      title: "Planador",
      type: 'content',
      image: ["3-Gallery/D346.jpg"],
      audio: '3-Gallery/A313.mp3',
      text: `<p>Um projeto para voo baseado no movimento das asas dos p&aacute;ssaros. O piloto, seguro por correias, fi ca dependurado verticalmente na parte central da m&aacute;quina e se equilibra movimentando a parte inferior de seu corpo. A parte da asa mais pr&oacute;xima ao corpo do piloto &eacute; r&iacute;gida, enquanto sua extremidade &eacute; fl ex&iacute;vel. As asas s&atilde;o movimentadas pelo piloto, que usa um sistema de cabos e polias manipuladas por al&ccedil;as. Esta m&aacute;quina, que demanda uma enorme for&ccedil;a f&iacute;sica, pode n&atilde;o ter funcionado, mas certamente representa um grande avan&ccedil;o na pesquisa aerodin&acirc;mica.</p><p>&nbsp;</p>`
    },
    {
      id: "D-347",
      title: "Dama com Arminho",
      type: 'content',
      image: ["3-Gallery/D347.jpg"],
      audio: '3-Gallery/A312.mp3',
      text: "<p>Tamanho real: 55 x 40 cm<br />Museu Czartoryski, Cracóvia, Polônia</p>"
    },
    {
      id: "D-348",
      title: "La belle ferronnière",
      type: 'content',
      image: ["3-Gallery/D348.jpg"],
      audio: '3-Gallery/A312.mp3',
      text: "<p>Tamanho real: 62 x 44 cm<br />Museu do Louvre, Paris, França</p>"
    },
    {
      id: "D-349",
      title: "Princípios da Física e da Mecânica",
      type: 'content',
      image: ["3-Gallery/D349.jpg"],
      audio: '',
      text: "<p>Leonardo acreditava que a mec&acirc;nica era a chave para entendermos o mundo. Ele estudou a intera&ccedil;&atilde;o da &aacute;gua, luz e ar, e identificou seus padr&otilde;es de comportamento sob diferentes condi&ccedil;&otilde;es. Retratou redemoinhos, movimentos das correntes de ar e sombras e reflexos da luz em seus desenhos, &agrave; medida que compreendia os princ&iacute;pios f&iacute;sicos e mec&acirc;nicos por tr&aacute;s desses fen&ocirc;menos.</p><p>Para Leonardo, o corpo humano era uma m&aacute;quina complexa e avan&ccedil;ada, capaz de uma ampla diversidade de movimentos. Ele explorou a maneira em que as formas determinam o comportamento f&iacute;sico de humanos e animais, e o modo pelo qual os humanos expressam seus sentimentos. Acima de tudo, ele se perguntava: quais s&atilde;o os mecanismos invis&iacute;veis que controlam a vida em si?</p><p>Leonardo acreditava que, se pudesse compreender o funcionamento do corpo humano e das for&ccedil;as naturais, poderia criar m&aacute;quinas que replicassem os padr&otilde;es da natureza. Seus estudos sobre mec&acirc;nica, anatomia e fisionomia (a arte de determinar tra&ccedil;os de personalidade baseados na apar&ecirc;ncia f&iacute;sica) foram o ponto inicial da maioria de suas atividades e inven&ccedil;&otilde;es.</p><p>Algumas de suas maiores fa&ccedil;anhas no campo da mec&acirc;nica incluem o volante, os sistemas de rolamentos, molas, transmiss&atilde;o de movimento e o rolamento exc&ecirc;ntrico.</p><p><strong>&ldquo;Impressiona-me a urg&ecirc;ncia por fazer. Saber n&atilde;o &eacute; suficiente; deve-se praticar. Querer n&atilde;o &eacute; suficiente;</strong><br /><strong>deve-se agir.&rdquo; &ndash; <em>Leonardo da Vinci</em></strong></p>"
    },
  ],
};
 