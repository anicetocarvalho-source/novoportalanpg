

## Plano: Transformar "Conteúdo Local" em botão na barra de menus

### Contexto

O menu "Conteúdo Local" é o último item da navegação principal (sort_order 8, url `/local-content`), sem submenus. Actualmente ocupa espaço como item de menu regular. O objectivo é extraí-lo do fluxo de navegação e renderizá-lo como botão compacto, ao lado do toggle de idioma, libertando espaço na barra.

### Alteração

**Ficheiro:** `src/components/layout/Header.tsx`

1. **Separar "Conteúdo Local" da navegação regular** — Filtrar o item cujo `href === "/local-content"` do array `navigation` antes de o renderizar no loop de menus
2. **Renderizar como botão** ao lado do `LanguageToggle`, usando o mesmo estilo visual (border, tamanho, transições baseadas em `isScrolled`) — um `Link` estilizado como botão compacto com ícone
3. **Desktop** — Colocar no bloco `hidden lg:flex` junto ao LanguageToggle, com `gap-2`
4. **Mobile** — Manter "Conteúdo Local" no menu mobile normalmente (sem alteração)

### Detalhes Técnicos

O botão usará as mesmas classes CSS do `LanguageToggle`:
- Não scrolled: `text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10`
- Scrolled: `text-foreground border-border hover:bg-secondary`

Ícone: `Users` do lucide-react (representativo de conteúdo local/comunidade).

A filtragem será feita com:
```typescript
const localContentItem = navigation.find(item => item.href === "/local-content");
const mainNavigation = navigation.filter(item => item.href !== "/local-content");
```

O loop desktop renderiza `mainNavigation`, e o botão é adicionado junto ao LanguageToggle.

