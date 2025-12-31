# Guia de Deploy - HostGator (cPanel)

Este guia descreve como colocar seu site React/Vite no ar usando a hospedagem HostGator.

## 1. Preparação (Local)

O arquivo `.htaccess` já foi criado na pasta `public`. Ele é essencial para que rotas como `/labs` ou `/books` funcionem corretamente sem dar erro 404.

1. Abra seu terminal na pasta do projeto.
2. Gere a versão de produção:
   ```bash
   npm run build
   ```
3. Uma pasta `dist` será criada. Este é o seu site final.

## 2. Empacotamento

1. Abra a pasta `dist` criada.
2. Selecione **TODOS** os arquivos dentro dela (index.html, .htaccess, assets folder, etc).
3. Crie um arquivo ZIP (ex: `site_deploy.zip`).

## 3. Upload no cPanel

1. Acesse o **Gerenciador de Arquivos** no cPanel da HostGator.
2. Vá para a pasta `public_html` (ou a subpasta do seu domínio).
3. **Delete** arquivos antigos se houver.
4. Clique em **Carregar (Upload)** e envie o arquivo `site_deploy.zip`.
5. Selecione o arquivo enviado e clique em **Extrair**.
6. Verifique se o arquivo `.htaccess` está presente (você pode precisar habilitar "Mostrar arquivos ocultos" nas configurações do cPanel).

## 4. Teste

Acesse seu domínio. Tente navegar para `/books` e recarregar a página. Se não der erro 404, o `.htaccess` está funcionando!
