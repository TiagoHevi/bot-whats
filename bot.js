const { Client } = require('whatsapp-web.js');
const express = require('express');
const qr = require('qrcode');
const fs = require('fs');

const bot = express(); // Criação do objeto Express
const port = process.env.PORT || 3000;

bot.use(express.static('public'));

// Função assíncrona para gerar o QR Code
const generateQRCode = async () => {
    try {
        const qrCode = await qr.toDataURL('http://localhost:' + port + '/qr-code');
        await fs.promises.writeFile('public/qr-code.png', qrCode.replace(/^data:image\/png;base64,/, ''), 'base64');
        console.log('QR Code gerado e salvo.');
    } catch (error) {
        console.error('Erro ao gerar o QR Code:', error);
    }
};

// Adicionando a rota padrão (rota inicial)
bot.get('/', (req, res) => {
    res.redirect('/qr-code');
});

// Adicionando a rota para o QR Code
bot.get('/qr-code', (req, res) => {
    res.sendFile(__dirname + '/public/qr-code.png');
});

// Inicializando o servidor após gerar o QR Code
const initServer = async () => {
    await generateQRCode();
    bot.listen(port, () => {
        console.log(`Servidor web iniciado em http://localhost:${port}`);
    });
};

const client = new Client();

client.on('qr', async (qrCode) => {
    // Apenas para garantir que a geração do QR Code seja atualizada
    await generateQRCode();
});

client.on('ready', () => {
    console.log('Client is ready!');
});

// Inicializando o servidor e gerando o QR Code
initServer();

waitingForName = false;
ganharPerder = false;
nomeDaPessoa = "";
escolha_roteiro = false;
respostaGP = ""

start = false;
roteiro = 0;

client.on('message', async (message) => {

    if (!message.isGroupMsg) {

        // Verifica se a mensagem é um "start"
        if (message.body.toLowerCase() === 'start') {
        waitingForName = true;
        client.sendMessage(message.from, `Olá! Por favor, digite o seu nick na proxima linha.\nExemplo: Eevee ☯🎴 \n nome[clan]
        `);
        }
        else if (waitingForName) {
        nomeDaPessoa = message.body;
        console.log(`Nome recebido: ${nomeDaPessoa}`);
        waitingForName = false;

        client.sendMessage(message.from, `Deseja ganhar ou perder?\n1) Eu quero ganhar\n2) Eu quero perder
\n\n Depois de escolher digita *play* para começar a batalhar`);
        ganharPerder = true;
    
        // Agora você pode usar o nome em outras coisas
        //client.sendMessage(message.from, `Snow♠🈂\n200//400\n\n${nomeDaPessoa}\n200//400`);

        } 
        else if (ganharPerder){

            // a pessoa vai responder e eu vou pegar com essa variavel
            respostaGP = message.body;
            console.log(`1 para ganhar 2 perder, resposta: ${respostaGP}`);
            
            ganharPerder = false;
            
        }
  
        if(respostaGP == 1){

            if (message.body.toLowerCase() === 'play') {
            
                client.sendMessage(message.from, `Roteiro do Bot: Eu vou ganhar neste caso 
    
                placa
                200/\n
                100\n
                placa\n
                200/\n
                100\n
                placa\n
                kns\n
                tai esp\n\n`)
                await client.sendMessage(message.from, `------------start-----------`);
                await client.sendMessage(message.from, `Snow♠🈂\n200//400\n\n ${nomeDaPessoa}\n200//400`);
                await client.sendMessage(message.from, `200/`);
                
    
            }
    
            if (message.body === '100') {
    
                await client.sendMessage(message.from, `Snow♠🈂\n100//200\n\n ${nomeDaPessoa}\n200//300`);
    
            }
    
            if (message.body === '200/') {
    
                await client.sendMessage(message.from, '100');
                await client.sendMessage(message.from, `Snow♠🈂\n100//100\n\n ${nomeDaPessoa}\n100//100`);
                await client.sendMessage(message.from, 'kns');
                
            }
    
            if (message.body.toLowerCase() === 'tai esp') {
    
                await client.sendMessage(message.from, `Snow♠🈂\n0//100\n\n ${nomeDaPessoa}\n100//100`);
                
            }
        }

        if(respostaGP == 2){

            if (message.body.toLowerCase() === 'play') {
            
                client.sendMessage(message.from, `
                Roteiro do Bot: Eu bot vou ganhar neste caso
    
                placa\n
                você: 200/\n
                bot: 100\n
                placa\n
                bot: 200/\n
                voce: 100\n
                placa\n
                você: kns\n
                bot: tai esp\n\n`)
                await client.sendMessage(message.from, `------------start-----------`);
                await client.sendMessage(message.from, `Snow♠🈂\n200//400\n\n ${nomeDaPessoa}\n200//400`);
               
                
                
    
            }

            if (message.body === '200/') {
                
                await client.sendMessage(message.from, '100');
                await client.sendMessage(message.from, `Snow♠🈂\n200//300\n\n ${nomeDaPessoa}\n100//200`);
                await client.sendMessage(message.from, '200/');
                
    
            }

            if (message.body.toLowerCase() === '100') {
                
                await client.sendMessage(message.from, `Snow♠🈂\n100//100\n\n ${nomeDaPessoa}\n100//100`);
                
            }

            if (message.body.toLowerCase() === 'kns') {

                await client.sendMessage(message.from, 'tai esp');
                await client.sendMessage(message.from, `Snow♠🈂\n100//100\n\n ${nomeDaPessoa}\n0//100`);
                
            }
    
        }


        
    }
    
});


//no caso eu ja tenho se a pessoa quer ganhar ou perder com a variavel respostaGP

client.on('message', async (message) => {

    if (message.body === 'Tutorial') {

        await client.sendMessage(message.from, `
você vai começar com um *start*\n\n
logo depois você coloca o seu nome/nick depois voce\n\n
apos voce fazer isso vai perguntar se você quer ganhar ou\nperde ai voce digita 1 se for ganhar ou 2 se for perder\n
logo depois vai te mostrar o roteiro da luta\n
vai ser assim\n

200/\n
100\n
placa\n
100/\n
200\n
placa\n
kns\n
tai eps\n
        
\n\n 

voce tem que seguir esse roteiro de luta se sair dele o chat não vai entender\n\n
um detalhe é que tem diferença entre 200/ e 200 no bot\n se voce colocar 200 o bot vai colocar a placa mas se voce colocar 200/
com a barra siguinifica que voce quer que o bot reaja com um ataque`);
    }
});

 
client.initialize();
