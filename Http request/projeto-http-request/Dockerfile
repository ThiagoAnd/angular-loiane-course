#setei as angular como alias
FROM node:lts-alpine as angularimagem
#não vamos precisar dessa variavel de ambiente abaixo
#ENV NODE_ENV=production
#WORKDIR /usr/src/app
#workdir vai ser apenas /app, esse vai ser o workspace dentro do nosso docker
WORKDIR /app
#vamos gerar um npm install a partir do package.json
#ou seja, vamos copiar o package.json para dentro do nosso diretorio /app
COPY package.json /app
# agora vamos rodar o npm install, mas vamos executar sem todo aquele log pra n ficar poluindo a tela, usando o silent
# eu tive que fazer -force pois estava dando um erro, eu vou deixar ele laaaa embaixo pra servir de historico
RUN npm install --force
#No comando abaixo copiamos tudo que esta local para dentro da imagem docker com os 2 pontos
#nao entendi pq vai copiar tudo, e o node modules que foi gerado com esse npm install da linha 12? nao vai ser sobrescrito com o que temos local?
#achei a resposta, nao vai ser sobrescrito pois o node modules local esta no docker ignore
# colocar tambem no docker ignore a dist, o e2e, tudo q nao for necessario e que ja vai ser gerado com os comandos desse dockerfile
COPY . .
# vamos construir o build de produção
RUN npm run build

# agora fazemos a segunda parte que é utilizar o NGINX como servidor HTTP
# Vamos entao gerar a nossa segunda imagem
FROM nginx:alpine
# vamos chamar o volume , que no caso o que a gente vai expor, que vai estar no caminho abaixo
VOLUME /var/cache/nginx
# depois do volume montado nos vamos copiar alguns arquivos
# o comando se le, copie do angularimagem tudo o que for do dist para a pasta do nginx abaixo
# no nginx o padrão para ficar os arquivos estaticos é essa abaixo
COPY --from=angularimagem app/dist/projeto-http-request /usr/share/nginx/html
# vamos copiar as configurações do nginx que a loiane copiou de um lugar na net, para o diretorio padrão de configurações do nginx
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# para rodar esse dorckerfile, vc abre o prompt dentro do mesmo nivel do docker file e executa:
# docker build -t curso-angular .
#o que é feito acima : vai fazer o build do dockerfile com o ponto ou se n for ali colocar o nome da pasta que vai estar o dockerfile , e colocar a tag curso-angular nele

#dai pra rodar a imagem vc digita:
# docker run -p 8081:80 curso-angular

# ou vc faz desse jeito acima, mas vai ter que lembrar dos comandos, ou faz tudo pelo docker compose





#ERROOOOO

 #> [angularimagem 4/6] RUN npm install:
#12 4.764 npm notice
#12 4.764 npm notice New minor version of npm available! 8.3.1 -> 8.5.1
#12 4.764 npm notice Changelog: <https://github.com/npm/cli/releases/tag/v8.5.1>
#12 4.764 npm notice Run `npm install -g npm@8.5.1` to update!
#12 4.764 npm notice
#12 4.769 npm ERR! code ERESOLVE
#12 4.773 npm ERR! ERESOLVE unable to resolve dependency tree
#12 4.773 npm ERR!
#12 4.773 npm ERR! While resolving: projeto-http-request@0.0.0
#12 4.774 npm ERR! Found: jasmine-core@3.6.0
#12 4.774 npm ERR! node_modules/jasmine-core
#12 4.774 npm ERR!   dev jasmine-core@"~3.6.0" from the root project
#12 4.775 npm ERR!
#12 4.775 npm ERR! Could not resolve dependency:
#12 4.775 npm ERR! peer jasmine-core@">=3.8" from karma-jasmine-html-reporter@1.7.0
#12 4.776 npm ERR! node_modules/karma-jasmine-html-reporter
#12 4.776 npm ERR!   dev karma-jasmine-html-reporter@"^1.5.0" from the root project
#12 4.776 npm ERR!
#12 4.777 npm ERR! Fix the upstream dependency conflict, or retry
#12 4.777 npm ERR! this command with --force, or --legacy-peer-deps
#12 4.777 npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
#12 4.777 npm ERR!
#12 4.777 npm ERR! See /root/.npm/eresolve-report.txt for a full report.
#12 4.780
#12 4.780 npm ERR! A complete log of this run can be found in:
#12 4.780 npm ERR!     /root/.npm/_logs/2022-02-24T03_23_50_556Z-debug-0.log
#------
#executor failed running [/bin/sh -c npm install]: exit code: 1
#ERROR: Service 'projetohttprequest' failed to build : Build failed






#Essa parte abaixo ficava abaixo do work dir, vou comentar , no curso foi apagado
#COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
#RUN npm install --production --silent && mv node_modules ../
#COPY . .
#EXPOSE 3000
#RUN chown -R node /usr/src/app
#USER node
#CMD ["npm", "start"]
