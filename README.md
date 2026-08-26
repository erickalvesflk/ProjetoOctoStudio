# Projeto OctoStudio
Site desenvolvido para a **exibição dos jogos criados no projeto OctoStudio**, reunindo informações sobre os projetos e seus participantes em um único lugar.
> **Aviso:** sou novo com o github em equipe, então qualquer erro ou dica eu estou aceitando! 
## Projeto no Figma
O design do site está disponível no Figma e pode ser alterado ao longo do desenvolvimento do projeto.

**[Acessar o projeto no Figma](https://www.figma.com/design/ceeWgU2AIv0vFdlsNjkkiJ/Sem-t%C3%ADtulo?node-id=0-1&t=41M50hMS0eVmHX6z-1)**

Sinta-se à vontade para propor e realizar alterações no protótipo conforme o projeto evoluir.

## Funcionamento
O site será totalmente **front-end** e hospedado utilizando o **GitHub Pages**.
Como os formulários serão feitos através do **Google Forms**, não será necessário desenvolver um back-end para o site.

### Geração das páginas com Python
Para facilitar a criação e manutenção das páginas, será utilizado um **script em Python** responsável por gerar automaticamente:
* páginas individuais dos projetos;
* páginas individuais dos participantes.

As informações utilizadas pelo gerador serão armazenadas em arquivos **JSON**
Atualmente, o `index.html` possui alguns conteúdos de exemplo para auxiliar no desenvolvimento e na estilização do site. Após a finalização do gerador em Python, esses exemplos serão removidos.
> **Importante:** não é necessário criar manualmente as páginas de cada projeto ou participante. Durante o desenvolvimento do front-end, basta preparar os estilos CSS necessários para essas páginas.

### Scripts JavaScript
O site também utilizará alguns scripts JavaScript para gerar conteúdos e controlar comportamentos da interface, como:

* **Rolagem suave (Smooth Scroll):** suaviza a navegação entre diferentes seções da página;
* **Cards de participantes:** gera dinamicamente os cards de participantes dentro de `index.html#participants-container`;
* **Cards de jogos:** gera dinamicamente os cards de jogos dentro de `index.html#games-container`.

Os cards serão construídos a partir dos dados disponíveis nos arquivos **JSON**, evitando a necessidade de adicioná-los manualmente ao HTML.

Dessa forma, **não é necessário criar manualmente as páginas de cada projeto ou participante**. Durante o desenvolvimento do front-end, basta criar os estilos CSS necessários para essas páginas.

## Organização do projeto
```text
ProjetoOctoStudio/
│
├── Data/                       # Dados utilizados pelo gerador e peo site
│   ├── projects/                   # Jsons com informação de cada projeto
│   ├── games/                      # arquivo dos jogos
│   └── members.json
│
├── Generator/                  # Scripts python responsáveis pela geração das páginas
│   ├── src/
│   ├── template/
│   └── __main__.py
│
├── Web/                        # Imagem de site
│   ├── imgs/
│   │   ├── main/                   # Imagens utilizadas na página principal
│   │   ├── members/                # Imagens dos participantes
│   │   └── projects/               # Imagens dos projetos
│   │
│   ├── pages/                  # Paginas Html
│   │   ├── members/                # Páginas geradas dos participantes
│   │   └── projects/               # Páginas geradas dos projetos
│   │
│   ├── scripts/                # Scripts JavaScript
│   ├── style/                  # Arquivos CSS
│   │   ├── index.css               # Estilos para a pagina inicial (index.html)
│   │   ├── member.css              # Estilos para as paginas de cada participante (pages/members)
│   │   ├── header.css              # Estilos para o cabeçalho
│   │   ├── footer.css              # Estilos para o rodapé
│   │   ├── hidescroll.css          # Esconde o scroll do site
│   │   └── mediaquery.css          # Estilos para as telas maiores de 600px de largura
│   │
│   └── index.html              # Página principal
│
└── README.md
```