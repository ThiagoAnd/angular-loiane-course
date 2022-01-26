//Aqui temos um objeto dentro desse array proxyconfig, que vai conter a config para o angular conseguir se conectar com o backend sem precisar utilizar o CORS
//por convenção quando formos tratar de chamada no backend java,node,php,etc, colocamos o /api, e no target fica pra onde esse alias vai mandar
//dai nas chamadas, ao inves de colocar localhost:8000, vc coloca só /api
//secure seta para true se vc for utilizar HTTPS, mas como só vamos fazer chamadas locais pode setar para falso mesmo, pq vamos usar só HTTP
//pathRewrite, sem ele, quando fazemos o redirecionamento por exemplo para /api/upload, o angular entende que fica assim: localhost:8000/api/upload
//e não é o que nos queremos, com esse pathRewrite, nos fazemos um regex, então cada vez que começar com /api substituimos por vazio
//então a chamada ao inves de ficar localhost:8000/api/upload fica localhost:8000/upload
//depois de setado esse arquivo nos vamos la no package.json e setamos no script de start um --proxy-config nomeDoArquivo(esse no caso que seria proxy.conf.js)
//depois disso só da npm start que ele vai pegar essa configuração
const PROXY_CONFIG = [
{
  context: ['/api'],
  target: 'http://localhost:8000/',
  secure: false,
  logLevel: 'debug',
  pathRewrite: {'^/api' : ''}
}
];

module.exports = PROXY_CONFIG;
