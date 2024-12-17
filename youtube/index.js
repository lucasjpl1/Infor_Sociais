require('dotenv').config();
const axios = require('axios');

// Carrega a chave da API do arquivo .env
const API_KEY = process.env.YOUTUBE_API_KEY;

// Função para extrair o ID do vídeo do link
function extractVideoId(videoUrl) {
    try {
        const parsedUrl = new URL(videoUrl);
        if (parsedUrl.hostname === "youtu.be") {
            return parsedUrl.pathname.substring(1);
        } else if (parsedUrl.hostname.includes("youtube.com")) {
            return parsedUrl.searchParams.get("v");
        }
        return null;
    } catch (err) {
        console.error("URL inválida.");
        return null;
    }
}

// Função para buscar informações do vídeo
async function getVideoDetails(videoId) {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;
    const response = await axios.get(url);
    const video = response.data.items[0];

    if (!video) {
        console.log("Vídeo não encontrado!");
        return null;
    }

    const details = {
        "Título": video.snippet.title,
        "Visualizações": video.statistics.viewCount,
        "Curtidas": video.statistics.likeCount || "N/A",
        "Canal": video.snippet.channelTitle,
        "ID do Canal": video.snippet.channelId
    };

    console.log("\nDetalhes do Vídeo:");
    console.table(details);
    return details;
}

// Função para buscar informações do canal
async function getChannelDetails(channelId) {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`;
    const response = await axios.get(url);
    const channel = response.data.items[0];

    if (!channel) {
        console.log("Canal não encontrado!");
        return null;
    }

    const details = {
        "Nome do Canal": channel.snippet.title,
        "Inscritos": channel.statistics.subscriberCount,
        "Total de Visualizações": channel.statistics.viewCount,
        "Descrição do Canal": channel.snippet.description
    };

    console.log("\nDetalhes do Canal:");
    console.table(details);
    return details;
}

// Função principal
async function main() {
    const videoUrl = process.argv[2]; // Link como parâmetro

    if (!videoUrl) {
        console.log("Uso: node index.js <link_do_video>");
        return;
    }

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
        console.log("URL inválida. Não foi possível extrair o ID do vídeo.");
        return;
    }

    const videoDetails = await getVideoDetails(videoId);
    if (videoDetails && videoDetails["ID do Canal"]) {
        await getChannelDetails(videoDetails["ID do Canal"]);
    }
}

main();
