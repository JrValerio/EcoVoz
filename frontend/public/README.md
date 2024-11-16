# Public Directory

A pasta `public` contém arquivos estáticos que são servidos diretamente pelo servidor. Esses arquivos não passam por processamento ou transformação pelo Vite e podem ser referenciados diretamente em componentes React ou no HTML.

---

## **Estrutura dos Arquivos**

Aqui estão os arquivos atualmente incluídos na pasta e seus propósitos:

### **1. Favicon e Ícones**

- **`favicon.ico`**: Ícone padrão exibido na aba do navegador.
- **`favicon.svg`**: Versão moderna do ícone em SVG, ideal para alta resolução.
- **`apple-touch-icon.png`**: Ícone usado por dispositivos Apple (iPhone, iPad) para atalhos da web.

### **2. Imagens**

- **`logo.png`**: Logotipo principal do projeto EcoVoz.
- **`og-image.png`**: Imagem utilizada em redes sociais para previews (configurada em Open Graph meta tags).
- **`background.jpg`**: Imagem de fundo reutilizável.

### **3. Metadados**

- **`manifest.json`**: Arquivo de configuração para Progressive Web Apps (PWA). Define ícones, cores e comportamento do aplicativo ao ser adicionado à tela inicial.
- **`robots.txt`**: Define o comportamento de bots de mecanismos de busca (SEO). Por padrão, permite o acesso completo.

### **4. Documentação**

- **`README.md`**: Este arquivo. Explica o propósito e a estrutura da pasta `public`.

---

## **Como Usar os Arquivos**

1. **Referência no HTML**:
   Os arquivos desta pasta podem ser usados diretamente no arquivo `index.html`.  
   Exemplo:

   ```html
   <link rel="icon" href="/favicon.ico" />
   <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
   ```

2. **Referência no React**:
   Nos componentes React, use caminhos relativos começando com `/`.  
   Exemplo:
   ```tsx
   <img src="/logo.png" alt="EcoVoz Logo" />
   ```

---

## **Boas Práticas**

- **Não inclua arquivos sensíveis**: Esta pasta é pública e acessível diretamente pelo navegador.
- **Organização**: Mantenha arquivos bem nomeados e relevantes para o projeto.
- **Imagens otimizadas**: Reduza o tamanho das imagens antes de adicioná-las para melhorar o desempenho do site.

---

Se precisar adicionar novos arquivos, siga o padrão de nomenclatura e atualize este documento para manter a equipe informada. 🚀

```

---

### **Por Que Isso é Útil?**
- **Clareza**: Facilita para a equipe entender a função de cada arquivo na pasta.
- **Padronização**: Ajuda a manter um padrão na adição de novos arquivos.
- **Organização**: A documentação evita confusões sobre o propósito da pasta e dos arquivos.

```
