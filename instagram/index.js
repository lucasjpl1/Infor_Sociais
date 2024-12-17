const axios = require("axios");

const fetchAllMediaDetails = async (instagramBusinessId, accessToken) => {
  try {
    console.log("🚀 Listando mídias da conta...");

    // 1. Listar mídias da conta
    const mediaUrl = `https://graph.facebook.com/v17.0/${instagramBusinessId}/media?fields=id,caption&access_token=${accessToken}`;
    const mediaResponse = await axios.get(mediaUrl);
    const mediaData = mediaResponse.data.data;

    if (!mediaData || mediaData.length === 0) {
      console.log("❌ Nenhuma mídia encontrada.");
      return;
    }

    console.log(`📋 Encontradas ${mediaData.length} mídias.`);

    // 2. Iterar sobre cada mídia para buscar detalhes
    for (const media of mediaData) {
      console.log(`\n🔍 Buscando detalhes para a mídia ID: ${media.id}`);

      const detailsUrl = `https://graph.facebook.com/v17.0/${media.id}?fields=like_count,comments_count,media_type,username,timestamp&access_token=${accessToken}`;
      const detailsResponse = await axios.get(detailsUrl);
      const details = detailsResponse.data;

      console.log("📋 Detalhes da Mídia:");
      console.log(`🔹 Usuário: ${details.username}`);
      console.log(`❤️ Curtidas: ${details.like_count}`);
      console.log(`💬 Comentários: ${details.comments_count}`);
      console.log(`📅 Data de publicação: ${details.timestamp}`);
      console.log(`🖼️ Tipo de mídia: ${details.media_type}`);

      if (details.media_type === "VIDEO") {
        console.log("👁️ Mídia é um vídeo. Consulte video_insights para obter visualizações.");
      }
    }
  } catch (error) {
    console.error("❌ Erro ao buscar detalhes das mídias:", error.response?.data?.error?.message || error.message);
  }
};

// Configuração
const instagramBusinessId = "17841401946132905"; // Instagram Business Account ID
const accessToken = "EAAI97bYdpZAUBO7YbcJ17WXtRppMwnCuzmRHOv5YClqKhVvfOZAf2r0L9zeJF1QVdRmZAYGaihuQbazI99Fu276knoW42KZAIxh2R6yiKWfrWnL2r8va3leZCZCGZAplYvYvLarFI8FY3htTeANDgzW8XbHtXCCFxL6iQZB5trcg155KSwktyxCTqRM2ldvyZCKS3JgwY2zPDftujiCQjQRjVQGcCwhzW5wDWMwZDZD"; // Substitua pelo seu Access Token válido

fetchAllMediaDetails(instagramBusinessId, accessToken);
