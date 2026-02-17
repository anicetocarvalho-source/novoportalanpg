
# Crop/Preview Interactivo no ImageUpload

## Resumo

Adicionar um modal de recorte (crop) que aparece apos o utilizador selecionar uma imagem, permitindo ajustar o enquadramento antes de comprimir e enviar para o storage. A implementacao sera feita sem dependencias externas, usando Canvas API nativa.

## Fluxo do Utilizador

1. Utilizador seleciona uma imagem (ficheiro)
2. Abre um Dialog modal com a imagem carregada
3. O utilizador pode:
   - Arrastar a area de recorte sobre a imagem
   - Ajustar o zoom com um Slider
   - Escolher um aspect ratio pre-definido (livre, 16:9, 4:3, 1:1)
   - Rodar a imagem 90 graus
4. Clica "Confirmar" -- a area recortada e extraida via Canvas, comprimida e enviada
5. Clica "Cancelar" -- volta ao estado anterior sem alteracoes

## Detalhes Tecnicos

### 1. Novo componente `ImageCropDialog.tsx`

Criar `src/components/admin/ImageCropDialog.tsx` com:

- **Props**: `open`, `onClose`, `imageSrc` (object URL), `aspectRatio?`, `onCropComplete(blob: Blob)`
- **Estado interno**: `crop { x, y, width, height }`, `zoom`, `rotation`
- **Renderizacao**: Um `canvas` ref que desenha a imagem com zoom/rotacao; um overlay SVG com a area de recorte draggable e handles de resize nos cantos
- **Interaccao**: Mouse/touch events para drag da area de recorte e resize dos handles
- **Zoom**: Controlado pelo componente `Slider` existente (range 1x-3x)
- **Aspect ratios**: Botoes toggle (Livre, 16:9, 4:3, 1:1) usando o componente `ToggleGroup` existente
- **Rotacao**: Botao com icone `RotateCw` do Lucide
- **Extraccao**: Ao confirmar, desenha a regiao recortada num canvas off-screen e exporta como Blob via `canvas.toBlob()`
- **UI**: Usa `Dialog`, `DialogContent`, `DialogHeader`, `DialogFooter`, `Button`, `Slider` ja existentes no projecto

### 2. Alteracoes ao `ImageUpload.tsx`

- Adicionar estado `cropDialogOpen` e `pendingFile` (File | null)
- Nova prop opcional `enableCrop?: boolean` (default `true`) e `cropAspectRatio?: number`
- No `handleFileSelect`:
  - Em vez de comprimir e enviar directamente, guardar o ficheiro em `pendingFile` e abrir o crop dialog
  - Se `enableCrop === false`, manter o comportamento actual (compressao directa)
- Novo handler `handleCropComplete(croppedBlob)`:
  - Recebe o blob ja recortado
  - Aplica a compressao existente (`compressImage`) sobre o blob recortado
  - Faz upload para o storage (logica existente)
  - Fecha o dialog e limpa `pendingFile`

### 3. Ficheiros a criar/editar

| Ficheiro | Accao |
|---|---|
| `src/components/admin/ImageCropDialog.tsx` | Criar (novo) |
| `src/components/admin/ImageUpload.tsx` | Editar (integrar crop dialog) |

### 4. Dependencias

Nenhuma nova dependencia -- utiliza apenas Canvas API, eventos de mouse/touch nativos, e componentes UI ja existentes (Dialog, Slider, ToggleGroup, Button).
