const puppeteer = require('puppeteer');

// Função para separar o link do perfil e o ID do vídeo
function parseTikTokLink(fullLink) {
    try {
        const url = new URL(fullLink);
        const pathParts = url.pathname.split('/');
        const profileUrl = `https://www.tiktok.com/${pathParts[1]}`;
        const videoId = pathParts[3];
        return { profileUrl, videoId };
    } catch (error) {
        console.error("Erro ao analisar o link:", error.message);
        return null;
    }
}

// Função para rolar a página e procurar o vídeo específico
async function scrollAndFindVideo(page, targetVideoId, maxScrolls = 100) {
    let previousHeight = 0;
    const seenVideos = new Set();

    for (let i = 0; i < maxScrolls; i++) {
        // Captura os vídeos carregados até o momento
        const videos = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('a[href*="/video/"]')).map(video => video.href);
        });

        // Adiciona novos vídeos ao conjunto e verifica o vídeo desejado
        for (const link of videos) {
            if (!seenVideos.has(link)) {
                seenVideos.add(link);
                if (link.includes(targetVideoId)) {
                    return link; // Retorna o link do vídeo encontrado
                }
            }
        }

        // Rola a página para baixo
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await new Promise(resolve => setTimeout(resolve, 2000)); // Aguarda 2 segundos

        // Verifica se a página não carrega mais conteúdo
        const newHeight = await page.evaluate(() => document.body.scrollHeight);
        if (newHeight === previousHeight) break;
        previousHeight = newHeight;
    }

    return null; // Retorna null se não encontrar o vídeo após o scroll
}

async function getTikTokInfo(profileUrl, targetVideoId) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        protocolTimeout: 300000,
    });
    const page = await browser.newPage();

    try {
        // Define o User-Agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        await page.goto(profileUrl, { waitUntil: 'networkidle2', timeout: 0 });

        // Coleta informações do perfil
        const profileInfo = await page.evaluate(() => {
            const getText = (selector) => document.querySelector(selector)?.innerText || 'Não encontrado';
            const username = getText('h1[data-e2e="user-title"]');
            const followers = getText('strong[data-e2e="followers-count"]');
            const likes = getText('strong[data-e2e="likes-count"]');
            return { username, followers, likes };
        });

        // Busca o vídeo específico rolando a página
        const targetVideoLink = await scrollAndFindVideo(page, targetVideoId, 100);

        if (targetVideoLink) {
            // Acessa o vídeo específico e coleta curtidas
            await page.goto(targetVideoLink, { waitUntil: 'networkidle2', timeout: 0 });
            const videoInfo = await page.evaluate(() => {
                const getText = (selector) => document.querySelector(selector)?.innerText || 'Não encontrado';
                const likes = getText('[data-e2e="like-count"]');
                return { likes };
            });

            return {
                profile: profileInfo,
                video: {
                    link: targetVideoLink,
                    likes: videoInfo.likes,
                },
            };
        } else {
            console.log("Vídeo não encontrado após rolar a página.");
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar informações:", error.message);
        return null;
    } finally {
        await browser.close();
    }
}

// Captura o link completo do vídeo
const fullLink = process.argv[2];

if (!fullLink) {
    console.log("Uso: node index.js <link-do-video>");
    process.exit(1);
}

const { profileUrl, videoId } = parseTikTokLink(fullLink);

if (!profileUrl || !videoId) {
    console.log("Erro: Link inválido.");
    process.exit(1);
}

getTikTokInfo(profileUrl, videoId).then((info) => {
    if (info) {
        console.log("\nResultado Final:");
        console.log(`Informações do Perfil:\nNome do usuário: ${info.profile.username}\nSeguidores: ${info.profile.followers}\nCurtidas totais: ${info.profile.likes}`);
        console.log(`\nInformações do Vídeo:\nLink: ${info.video.link}\nCurtidas: ${info.video.likes}`);
    } else {
        console.log("\nNão foi possível obter as informações.");
    }
});
