# TikTok Video Scraper

Este projeto utiliza **Puppeteer** para automatizar a navegação no navegador, buscar informações de um perfil do TikTok e extrair os detalhes de um vídeo específico a partir de um link fornecido.

---

## 📋 **Requisitos**

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 14 ou superior): [Baixe aqui](https://nodejs.org)
- **Puppeteer**: Biblioteca para controle automatizado do navegador Chrome.

---

## ⚙️ **Instalação**

Siga os passos abaixo para configurar o projeto:

1. **Clone o repositório**:

git clone https://github.com/seu-usuario/tiktok-scraper.git
cd tiktok-scraper

2.Instale as dependências:

npm install puppeteer

🚀 Uso
Execute o script passando o link do vídeo do TikTok:


node index.js "<link-do-video>"

Exemplo:

node index.js "https://www.tiktok.com/@usuario/video/1234567890123456789"

✅ Saída Esperada
Se o vídeo for encontrado, o script retornará algo assim:

Resultado Final:
Informações do Perfil:
Nome do usuário: usuario
Seguidores: 10.5K
Curtidas totais: 1.2M

Informações do Vídeo:
Link: https://www.tiktok.com/@usuario/video/1234567890123456789
Curtidas: 50.1K


Se o vídeo não for encontrado, o retorno será:
Vídeo não encontrado após rolar a página.



🛠️ Como Funciona

1. Separação do Link
O link do vídeo é dividido em:
URL do Perfil: https://www.tiktok.com/@usuario
ID do Vídeo: 1234567890123456789

2. Coleta de Dados do Perfil
O script acessa o perfil e coleta:
Nome do usuário
Quantidade de seguidores
Total de curtidas

3. Busca do Vídeo
O script rola a página gradualmente para carregar os vídeos e verifica se o vídeo desejado foi encontrado.
4. Coleta de Informações do Vídeo
Quando o vídeo é encontrado:
Ele acessa a página do vídeo.
Coleta o número de curtidas.

🚧 Melhorias Futuras
Adicionar suporte a proxies para evitar bloqueios.
Implementar cache para salvar resultados localmente.
Melhorar o carregamento dos vídeos usando interceptação de rede.

📜 Licença
Este projeto é licenciado sob a MIT License.
