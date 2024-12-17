<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TikTok Video Scraper</title>
</head>
<body>
    <h1>TikTok Video Scraper</h1>
    <p>Este projeto utiliza <strong>Puppeteer</strong> para automatizar a navegação no navegador, buscar informações de um perfil do TikTok e extrair os detalhes de um vídeo específico a partir de um link fornecido.</p>

    <h2>Requisitos</h2>
    <ul>
        <li>Node.js versão 14+ (instale em <a href="https://nodejs.org" target="_blank">nodejs.org</a>)</li>
        <li>Puppeteer (biblioteca para controle do navegador Chrome)</li>
    </ul>

    <h2>Instalação</h2>
    <p>Clone o repositório ou baixe os arquivos:</p>
    <pre><code>git clone https://github.com/seu-usuario/tiktok-scraper.git
cd tiktok-scraper</code></pre>

    <p>Instale as dependências:</p>
    <pre><code>npm install puppeteer</code></pre>

    <h2>Uso</h2>
    <p>Execute o script passando o link do vídeo do TikTok:</p>
    <pre><code>node index.js "&lt;link-do-video&gt;"</code></pre>

    <h3>Exemplo:</h3>
    <pre><code>node index.js "https://www.tiktok.com/@usuario/video/1234567890123456789"</code></pre>

    <h2>Saída Esperada</h2>
    <p>Se o vídeo for encontrado, o script retorna:</p>
    <pre><code>Resultado Final:
Informações do Perfil:
Nome do usuário: usuario
Seguidores: 10.5K
Curtidas totais: 1.2M

Informações do Vídeo:
Link: https://www.tiktok.com/@usuario/video/1234567890123456789
Curtidas: 50.1K</code></pre>

    <p>Se o vídeo não for encontrado:</p>
    <pre><code>Vídeo não encontrado após rolar a página.</code></pre>

    <h2>Funcionamento</h2>
    <ol>
        <li><strong>Separação do Link:</strong> O script divide o link fornecido em duas partes:
            <ul>
                <li><strong>URL do Perfil:</strong> <code>https://www.tiktok.com/@usuario</code></li>
                <li><strong>ID do Vídeo:</strong> <code>1234567890123456789</code></li>
            </ul>
        </li>
        <li><strong>Acesso ao Perfil:</strong> O script acessa a página do perfil e coleta:
            <ul>
                <li>Nome do usuário</li>
                <li>Quantidade de seguidores</li>
                <li>Total de curtidas no perfil</li>
            </ul>
        </li>
        <li><strong>Rolar a Página:</strong> O script rola a página gradualmente para carregar todos os vídeos. A cada rolagem, ele verifica se o vídeo desejado foi carregado.</li>
        <li><strong>Captura das Informações:</strong> Quando o vídeo é encontrado, o script acessa o link e coleta o número de curtidas.</li>
    </ol>

    <h2>Possíveis Erros e Soluções</h2>
    <table border="1" cellspacing="0" cellpadding="5">
        <tr>
            <th>Erro</th>
            <th>Solução</th>
        </tr>
        <tr>
            <td><code>Error: Timeout exceeded</code></td>
            <td>Aumente o número de rolagens ou o timeout.</td>
        </tr>
        <tr>
            <td><code>Vídeo não encontrado</code></td>
            <td>Verifique se o vídeo existe no perfil.</td>
        </tr>
        <tr>
            <td><code>Puppeteer não instalado</code></td>
            <td>Instale novamente com <code>npm install puppeteer</code>.</td>
        </tr>
        <tr>
            <td><code>Link inválido</code></td>
            <td>Certifique-se de fornecer um link válido.</td>
        </tr>
    </table>

    <h2>Melhorias Futuras</h2>
    <ul>
        <li>Adicionar suporte a proxies para evitar bloqueios.</li>
        <li>Implementar cache para salvar resultados localmente.</li>
        <li>Melhorar o carregamento de vídeos usando interceptação de rede.</li>
    </ul>

    <h2>Licença</h2>
    <p>Este projeto é licenciado sob a <strong>MIT License</strong>.</p>

    <h2>Contribuição</h2>
    <p>Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias.</p>
</body>
</html>
