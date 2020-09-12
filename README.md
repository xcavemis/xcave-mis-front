# MIS - Da Vinci 500 anos de um gênio

## Configuração

**Setup da máquina**

O projeto utiliza o framework [Vue.js | CLI Service](https://cli.vuejs.org/guide/cli-service.html) em sua arquitetura.

Antes de rodar o projeto e suas dependências, instalar o [Node](https://nodejs.org/) ou [nvm](https://github.com/creationix/nvm/blob/master/README.md) que é o seu gerenciador de pacotes.

Utilizar versão de Node 8.0.0 ou posterior.

Instalação do NVM:
``` bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

Instalação do [vue-cli](https://github.com/vuejs/vue-cli):

``` bash
npm install -g @vue/cli
```

**Setup do projeto:**
```
cd /code
npm install
```

**Dev**
```
npm run serve
```

**Deploy**
```
npm run deploy

CMS: https://hml.exposicaodavinci500anos.com.br/cms/#/login
API: https://hml.exposicaodavinci500anos.com.br/api
SITE: https://hml.exposicaodavinci500anos.com.br

Upload assets: 
aws s3 cp ./tmp s3://xcave-mis-assets --recursive

Cache invalidation:
aws cloudfront create-invalidation \
    --distribution-id <CLOUDFRONT_ID> \
    --paths "/assets/*"

Access files:
https://hml.exposicaodavinci500anos.com.br/assets/test.jpeg

AWS console:
https://us-east-2.console.aws.amazon.com/console/home?region=us-east-2#
AWS Bucket:
https://s3.console.aws.amazon.com/s3/buckets/xcave-mis-assets/assets/?region=sa-east-1&tab=overview
```

## Dependências (libs/plugins)

- [threejs](https://threejs.org/) - versão ^0.118.3
- [gsap](https://greensock.com/gsap) - versão ^3.3.4
- [axios](https://github.com/axios/axios) - versão ^0.19.2
- [hammerjs](https://hammerjs.github.io/) - versão ^2.0.8
- [howler](https://howlerjs.com/) - versão ^2.2.0
- [@vimeo/player](https://github.com/vimeo/player.js/) - versão ^2.12.2
- [@panzoom/panzoom](https://github.com/timmywil/panzoom/) - versão ^4.3.1

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).