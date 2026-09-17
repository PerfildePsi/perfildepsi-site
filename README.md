# Perfil de Psi — site completo

Versão de 17 de setembro de 2026. Estrutura de publicação igual à pasta Claude: o arquivo `index.html`, as páginas legais e a pasta `assets` ficam juntos na raiz.

## Publicar no GitHub Pages

1. Extraia o ZIP e abra a pasta `perfildepsi-site`.
2. Envie **o conteúdo dessa pasta** para a raiz do repositório do site. O `index.html` deve ficar diretamente na raiz, sem uma pasta extra. Substitua os arquivos da versão anterior pelos desta versão.
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**, escolha a branch que recebeu os arquivos (normalmente `main`), a pasta **/(root)** e salve.
5. Confira o endereço de publicação exibido pelo GitHub após a conclusão.

Não é necessário instalar programas, dependências ou compilar o site. Envie também o arquivo oculto `.nojekyll`.

Guia oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Domínio

O arquivo `CNAME` preserva `perfildepsi.com.br`, conforme a pasta Claude. Os endereços canônicos, o sitemap e o robots.txt também estão preparados para esse domínio. Mantenha a configuração já existente do domínio em Settings → Pages e no provedor de DNS. O arquivo CNAME sozinho não configura o DNS.

Se optar por usar apenas um endereço `github.io`, remova o CNAME e substitua `https://perfildepsi.com.br` pelo endereço final nos arquivos HTML, `sitemap.xml` e `robots.txt`. Os caminhos dos arquivos visuais são relativos e também funcionam em um endereço de projeto como `usuario.github.io/repositorio/`.

## O que está incluído

- Página compacta com os textos escolhidos, cinco perfis expansíveis e seus serviços.
- Botões laranja com ícones, CNPJ no rodapé e condições especiais para menos de dois anos de formação.
- Nota do CensoPsi com fonte e contexto.
- Logotipo fornecido, fontes locais e respectivas licenças.
- Formulário de consultoria, páginas legais, sitemap, robots.txt e llms.txt.
- Integrações de medição já existentes preservadas.

## Como funciona a consultoria

O formulário prepara uma mensagem para o WhatsApp da Perfil de Psi, **(17) 99193-0115**. A visitante revisa e envia no próprio WhatsApp. O site não confirma recebimento, não agenda automaticamente e não salva as respostas em um banco de dados. Não requer senha, serviço de formulários ou servidor próprio.

O botão de cada perfil leva esse caminho preenchido para o formulário. Os campos obrigatórios são nome, WhatsApp, tempo de formação e objetivo. Perfil e Instagram/site são opcionais.

## Edição

- `index.html`: textos, perfis, formulário, links e CNPJ.
- `assets/style.css`: cores, fontes e apresentação no celular e computador.
- `assets/main.js`: expansão dos perfis, janelas e preparação da mensagem.
- `assets/tracking.js`: integrações de medição preservadas.
- `assets/fonts/`: fontes e licenças.

Para uma conferência visual rápida, abra `index.html` após extrair todos os arquivos. Para testar o funcionamento completo, utilize o endereço publicado ou uma prévia servida por HTTP.

Este pacote contém os arquivos de publicação. Não inclui credenciais, histórico de Git, arquivos temporários ou configurações privadas do Sites.
