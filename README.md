# Sublima Arte 

## Estrutura
- `index.html`: página inicial
- `sobre.html`: apresentação da marca
- `galeria.html`: portfólio
- `tabelas.html`: tabela de referência
- `contato.html`: canais de atendimento e formulário
- `css/style.css`: estilos globais e responsividade
- `js/script.js`: menu mobile, ano automático e máscara de telefone

## Como publicar no GitHub Pages
1. Faça backup do repositório atual.
2. Substitua os cinco arquivos HTML e os arquivos `css/style.css` e `js/script.js`.
3. Mantenha a pasta `img/` e os nomes dos arquivos de imagem já existentes.
4. Faça commit e push para a branch configurada no GitHub Pages.
5. Aguarde a publicação e teste em celular, tablet e desktop.

## Formulário
O formulário usa o endpoint do Web3Forms e preserva a chave que já estava configurada no site. Chaves de formulários client-side ficam visíveis no navegador; configure restrição de domínio e proteção anti-spam no painel do provedor. Se houver suspeita de abuso, gere uma nova chave e substitua o valor `access_key`.

## Segurança e limites do GitHub Pages
Este é um site estático. Validação no navegador melhora a experiência, mas não substitui validação no servidor. Não coloque senhas, tokens privados ou credenciais administrativas no HTML/JavaScript. GitHub Pages não permite configurar diretamente todos os cabeçalhos HTTP de segurança; para políticas como CSP e HSTS, use uma camada de hospedagem/CDN que permita configurar headers.

## Imagens
A versão mantém referências aos arquivos que já aparecem no repositório:
- `img/logo1.png`
- `img/camiseta-personalizada-05.png`
- `img/capoeira1.png`
- `img/image 2.png`
- `img/caneca.png`
- `img/image cap.png`
- `img/tabela-de-tamanhos-ink.jpg`
- `img/AUZIER.LOGO1.png` (se ainda for usada em outras páginas)
