"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => AdvancedBasesPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian9 = require("obsidian");

// src/compactCardsView.ts
var import_obsidian3 = require("obsidian");

// src/viewHelp.ts
var import_obsidian = require("obsidian");
var HELP_BTN_CLASS = "advanced-bases-help-btn";
var HELP_POPOVER_CLASS = "advanced-bases-help-popover";
var currentContentByBtn = /* @__PURE__ */ new WeakMap();
function findToolbar(containerEl) {
  var _a;
  const scope = (_a = containerEl.closest(".view-content")) != null ? _a : containerEl.ownerDocument.body;
  return scope.querySelector(".bases-toolbar");
}
function closeAnyPopover(doc) {
  doc.querySelectorAll(`.${HELP_POPOVER_CLASS}`).forEach((el) => el.remove());
}
function openPopover(btn, content) {
  const doc = btn.ownerDocument;
  closeAnyPopover(doc);
  const popover = doc.body.createDiv({ cls: HELP_POPOVER_CLASS });
  popover.createDiv({ cls: "advanced-bases-help-popover-title", text: content.title });
  const list = popover.createEl("ul", { cls: "advanced-bases-help-popover-list" });
  for (const line of content.lines) {
    list.createEl("li", { text: line });
  }
  const rect = btn.getBoundingClientRect();
  popover.setCssStyles({ visibility: "hidden" });
  const pw = popover.offsetWidth;
  let left = rect.right - pw;
  if (left < 8) left = 8;
  const maxLeft = doc.documentElement.clientWidth - pw - 8;
  if (left > maxLeft) left = Math.max(8, maxLeft);
  popover.setCssStyles({
    left: `${left}px`,
    top: `${rect.bottom + 4}px`,
    visibility: ""
  });
  const onDocClick = (evt) => {
    if (!popover.contains(evt.target) && evt.target !== btn && !btn.contains(evt.target)) {
      cleanup();
    }
  };
  const onKey = (evt) => {
    if (evt.key === "Escape") cleanup();
  };
  const cleanup = () => {
    popover.remove();
    doc.removeEventListener("mousedown", onDocClick, true);
    doc.removeEventListener("keydown", onKey, true);
  };
  window.setTimeout(() => {
    doc.addEventListener("mousedown", onDocClick, true);
    doc.addEventListener("keydown", onKey, true);
  }, 0);
}
function ensureViewHelpButton(containerEl, ariaLabel, getContent) {
  const toolbar = findToolbar(containerEl);
  if (!toolbar) return;
  let btn = toolbar.querySelector(`.${HELP_BTN_CLASS}`);
  if (!btn) {
    btn = toolbar.createDiv({ cls: `bases-toolbar-item clickable-icon ${HELP_BTN_CLASS}` });
    (0, import_obsidian.setIcon)(btn, "circle-help");
    btn.setAttribute("tabindex", "0");
    btn.addEventListener("click", (evt) => {
      evt.stopPropagation();
      const existing = btn.ownerDocument.querySelector(`.${HELP_POPOVER_CLASS}`);
      if (existing) {
        closeAnyPopover(btn.ownerDocument);
      } else {
        const current = currentContentByBtn.get(btn);
        if (current) openPopover(btn, current());
      }
    });
  }
  btn.setAttribute("aria-label", ariaLabel);
  currentContentByBtn.set(btn, getContent);
}

// src/i18n.ts
var import_obsidian2 = require("obsidian");
var en = {
  newNoteButton: "New note",
  createFailed: "Could not create the note.",
  templateMissing: "Template not found: {path}",
  noteExists: "Note already exists: {path}",
  enableButtonName: 'Show "New note" button',
  enableButtonDesc: "Adds a button to the Feed view toolbar that creates a new note linked to the current Base.",
  folderName: "Folder for new notes",
  folderDesc: "Vault-relative path to the folder where new notes are saved.",
  templateName: "Template",
  templateDesc: "Vault-relative path to the template file used for new notes.",
  showIconName: "Show file icon",
  cardWidthName: "Card width",
  showPropertiesName: "Show properties",
  showMore: "Show more",
  previewFailed: "(Preview could not be rendered.)",
  imagePropertyName: "Image property",
  imageFitName: "Image fit",
  imageFitCoverLabel: "Cover",
  imageFitContainLabel: "Contain",
  aspectRatioName: "Image aspect ratio",
  compactCardSettingsGroupName: "Compact card settings",
  compactToggleName: "Compact",
  timelineDatePropertyName: "Date property",
  timelineEndDatePropertyName: "End date property",
  timelineGroupPropertyName: "Group property (lanes)",
  timelineLaneHeightName: "Lane height",
  timelineEmptyState: "No entries to show on the timeline.",
  timelineTodayMarkerColorName: "Timeline today-marker color",
  timelineTodayMarkerColorDesc: "Overrides the default theme-adaptive color of the vertical line marking today's date in the Timeline view.",
  settingsIntro: "These settings apply globally, to every Base that uses an Advanced Bases view. Per-Base display options \u2014 like card size, image fit, or lane height \u2014 are configured separately in each Base's own view settings.",
  settingsFeedHeading: "Feed view",
  settingsCardsCompactHeading: "Cards Compact",
  settingsCardsCompactDesc: "Cards Compact has no global settings. Its display options (compact mode, card size, image fit, image property, show icon) are configured per Base \u2014 open a Base using the Cards Compact view and edit its view settings from the sidebar.",
  settingsTimelineHeading: "Timeline view",
  helpAria: "View help",
  feedHelpLine1: "Click a note's title to open it.",
  feedHelpLine2: 'Use "New note" to create a note linked to this Base.',
  compactHelpLine1: "Toggle Compact to switch between the two layouts.",
  compactHelpLine2: "Click a card to open its note.",
  timelineHelpLine1: "Ctrl+scroll (or pinch) to zoom, plain scroll to pan.",
  timelineHelpLine2: "Click a bar or marker to open its note.",
  timelineHelpLine3: "Click a lane's color swatch to change its color."
};
var cs = {
  newNoteButton: "Nov\xE1 pozn\xE1mka",
  createFailed: "Nepoda\u0159ilo se vytvo\u0159it pozn\xE1mku.",
  templateMissing: "Nelze naj\xEDt \u0161ablonu: {path}",
  noteExists: "Pozn\xE1mka u\u017E existuje: {path}",
  enableButtonName: 'Zobrazit tla\u010D\xEDtko "Nov\xE1 pozn\xE1mka"',
  enableButtonDesc: "P\u0159id\xE1 do panelu Feed view tla\u010D\xEDtko, kter\xE9 vytvo\u0159\xED novou pozn\xE1mku prov\xE1zanou s aktu\xE1ln\xED Base.",
  folderName: "Slo\u017Eka pro nov\xE9 pozn\xE1mky",
  folderDesc: "Vault-relativn\xED cesta ke slo\u017Ece, kam se ukl\xE1daj\xED nov\xE9 pozn\xE1mky.",
  templateName: "\u0160ablona",
  templateDesc: "Vault-relativn\xED cesta k souboru \u0161ablony pou\u017Eit\xE9 pro nov\xE9 pozn\xE1mky.",
  showIconName: "Zobrazit ikonu souboru",
  cardWidthName: "\u0160\xED\u0159ka karty",
  showPropertiesName: "Zobrazit vlastnosti",
  showMore: "Zobrazit v\xEDce",
  previewFailed: "(N\xE1hled se nepoda\u0159ilo vykreslit.)",
  imagePropertyName: "Vlastnost obr\xE1zku",
  imageFitName: "P\u0159izp\u016Fsoben\xED obr\xE1zku",
  imageFitCoverLabel: "Vyplnit",
  imageFitContainLabel: "Cel\xFD obr\xE1zek",
  aspectRatioName: "Pom\u011Br stran obr\xE1zku",
  compactCardSettingsGroupName: "Nastaven\xED kompaktn\xEDch karet",
  compactToggleName: "Kompaktn\xED",
  timelineDatePropertyName: "Vlastnost data",
  timelineEndDatePropertyName: "Vlastnost koncov\xE9ho data",
  timelineGroupPropertyName: "Vlastnost seskupen\xED (\u0159\xE1dky)",
  timelineLaneHeightName: "V\xFD\u0161ka \u0159\xE1dku",
  timelineEmptyState: "V \u010Dasov\xE9 ose nejsou \u017E\xE1dn\xE9 polo\u017Eky k zobrazen\xED.",
  timelineTodayMarkerColorName: "Barva zna\u010Dky dne\u0161n\xEDho dne v Timeline",
  timelineTodayMarkerColorDesc: "P\u0159ep\xED\u0161e v\xFDchoz\xED barvu (p\u0159izp\u016Fsobenou motivu), kterou m\xE1 svisl\xE1 \u010D\xE1ra ozna\u010Duj\xEDc\xED dne\u0161n\xED datum v zobrazen\xED Timeline.",
  settingsIntro: "Tato nastaven\xED plat\xED glob\xE1ln\u011B pro ka\u017Edou B\xE1zi, kter\xE1 pou\u017E\xEDv\xE1 zobrazen\xED Advanced Bases. Nastaven\xED zobrazen\xED jednotliv\xFDch B\xE1z\xED \u2014 jako \u0161\xED\u0159ka karty, p\u0159izp\u016Fsoben\xED obr\xE1zku nebo v\xFD\u0161ka \u0159\xE1dku \u2014 se nastavuj\xED zvl\xE1\u0161\u0165 ve vlastn\xEDm nastaven\xED zobrazen\xED dan\xE9 B\xE1ze.",
  settingsFeedHeading: "Zobrazen\xED Feed",
  settingsCardsCompactHeading: "Cards Compact",
  settingsCardsCompactDesc: "Cards Compact nem\xE1 \u017E\xE1dn\xE1 glob\xE1ln\xED nastaven\xED. Jeho nastaven\xED zobrazen\xED (kompaktn\xED re\u017Eim, \u0161\xED\u0159ka karty, p\u0159izp\u016Fsoben\xED obr\xE1zku, vlastnost obr\xE1zku, zobrazen\xED ikony) se nastavuj\xED pro ka\u017Edou B\xE1zi zvl\xE1\u0161\u0165 \u2014 otev\u0159ete B\xE1zi pou\u017E\xEDvaj\xEDc\xED zobrazen\xED Cards Compact a upravte jej\xED nastaven\xED zobrazen\xED v postrann\xEDm panelu.",
  settingsTimelineHeading: "Zobrazen\xED Timeline",
  helpAria: "N\xE1pov\u011Bda k zobrazen\xED",
  feedHelpLine1: "Kliknut\xEDm na n\xE1zev pozn\xE1mky ji otev\u0159ete.",
  feedHelpLine2: 'Pomoc\xED "Nov\xE1 pozn\xE1mka" vytvo\u0159\xEDte pozn\xE1mku propojenou s touto B\xE1z\xED.',
  compactHelpLine1: "P\u0159epnut\xEDm Kompaktn\xED p\u0159epnete mezi dv\u011Bma rozvr\u017Een\xEDmi.",
  compactHelpLine2: "Kliknut\xEDm na kartu otev\u0159ete jej\xED pozn\xE1mku.",
  timelineHelpLine1: "Ctrl+kole\u010Dko (nebo sev\u0159en\xED prsty) p\u0159ibl\xED\u017E\xED, oby\u010Dejn\xE9 kole\u010Dko posouv\xE1.",
  timelineHelpLine2: "Kliknut\xEDm na pruh nebo zna\u010Dku otev\u0159ete jej\xED pozn\xE1mku.",
  timelineHelpLine3: "Kliknut\xEDm na barevn\xFD vzorek dr\xE1hy zm\u011Bn\xEDte jej\xED barvu."
};
var de = {
  newNoteButton: "Neue Notiz",
  createFailed: "Die Notiz konnte nicht erstellt werden.",
  templateMissing: "Vorlage nicht gefunden: {path}",
  noteExists: "Notiz existiert bereits: {path}",
  enableButtonName: 'Schaltfl\xE4che "Neue Notiz" anzeigen',
  enableButtonDesc: "F\xFCgt der Feed-Symbolleiste eine Schaltfl\xE4che hinzu, die eine neue, mit der aktuellen Base verkn\xFCpfte Notiz erstellt.",
  folderName: "Ordner f\xFCr neue Notizen",
  folderDesc: "Tresorrelativer Pfad zum Ordner, in dem neue Notizen gespeichert werden.",
  templateName: "Vorlage",
  templateDesc: "Tresorrelativer Pfad zur Vorlagendatei f\xFCr neue Notizen.",
  showIconName: "Dateisymbol anzeigen",
  cardWidthName: "Kartenbreite",
  showPropertiesName: "Eigenschaften anzeigen",
  showMore: "Mehr anzeigen",
  previewFailed: "(Vorschau konnte nicht gerendert werden.)",
  imagePropertyName: "Bildeigenschaft",
  imageFitName: "Bildanpassung",
  imageFitCoverLabel: "Ausf\xFCllen",
  imageFitContainLabel: "Einpassen",
  aspectRatioName: "Seitenverh\xE4ltnis des Bildes",
  compactCardSettingsGroupName: "Einstellungen f\xFCr kompakte Karten",
  compactToggleName: "Kompakt",
  timelineDatePropertyName: "Datumseigenschaft",
  timelineEndDatePropertyName: "Enddatumseigenschaft",
  timelineGroupPropertyName: "Gruppierungseigenschaft (Spuren)",
  timelineLaneHeightName: "Spurh\xF6he",
  timelineEmptyState: "Keine Eintr\xE4ge f\xFCr die Zeitleiste vorhanden.",
  timelineTodayMarkerColorName: "Farbe der Heute-Markierung in der Zeitleiste",
  timelineTodayMarkerColorDesc: "\xDCberschreibt die standardm\xE4\xDFig designabh\xE4ngige Farbe der senkrechten Linie, die das heutige Datum in der Zeitleisten-Ansicht markiert.",
  settingsIntro: "Diese Einstellungen gelten global f\xFCr jede Base, die eine Advanced-Bases-Ansicht verwendet. Ansichtsspezifische Optionen pro Base \u2013 wie Kartenbreite, Bildanpassung oder Spurh\xF6he \u2013 werden separat in den eigenen Ansichtseinstellungen jeder Base konfiguriert.",
  settingsFeedHeading: "Feed-Ansicht",
  settingsCardsCompactHeading: "Cards Compact",
  settingsCardsCompactDesc: "Cards Compact hat keine globalen Einstellungen. Ihre Anzeigeoptionen (Kompaktmodus, Kartenbreite, Bildanpassung, Bildeigenschaft, Symbolanzeige) werden pro Base konfiguriert \u2013 \xF6ffnen Sie eine Base mit der Cards-Compact-Ansicht und bearbeiten Sie deren Ansichtseinstellungen in der Seitenleiste.",
  settingsTimelineHeading: "Zeitleisten-Ansicht",
  helpAria: "Ansichtshilfe",
  feedHelpLine1: "Klicken Sie auf den Titel einer Notiz, um sie zu \xF6ffnen.",
  feedHelpLine2: 'Mit "Neue Notiz" erstellen Sie eine mit dieser Base verkn\xFCpfte Notiz.',
  compactHelpLine1: "Schalten Sie Kompakt um, um zwischen den beiden Layouts zu wechseln.",
  compactHelpLine2: "Klicken Sie auf eine Karte, um ihre Notiz zu \xF6ffnen.",
  timelineHelpLine1: "Strg+Scrollen (oder Zoomgeste) zoomt, einfaches Scrollen verschiebt.",
  timelineHelpLine2: "Klicken Sie auf einen Balken oder eine Markierung, um die Notiz zu \xF6ffnen.",
  timelineHelpLine3: "Klicken Sie auf das Farbfeld einer Spur, um deren Farbe zu \xE4ndern."
};
var fr = {
  newNoteButton: "Nouvelle note",
  createFailed: "Impossible de cr\xE9er la note.",
  templateMissing: "Mod\xE8le introuvable : {path}",
  noteExists: "La note existe d\xE9j\xE0 : {path}",
  enableButtonName: "Afficher le bouton \xAB Nouvelle note \xBB",
  enableButtonDesc: "Ajoute un bouton \xE0 la barre d'outils de la vue Feed qui cr\xE9e une nouvelle note li\xE9e \xE0 la Base actuelle.",
  folderName: "Dossier des nouvelles notes",
  folderDesc: "Chemin relatif au coffre vers le dossier o\xF9 enregistrer les nouvelles notes.",
  templateName: "Mod\xE8le",
  templateDesc: "Chemin relatif au coffre vers le fichier mod\xE8le utilis\xE9 pour les nouvelles notes.",
  showIconName: "Afficher l'ic\xF4ne du fichier",
  cardWidthName: "Largeur de la carte",
  showPropertiesName: "Afficher les propri\xE9t\xE9s",
  showMore: "Afficher plus",
  previewFailed: "(L'aper\xE7u n'a pas pu \xEAtre affich\xE9.)",
  imagePropertyName: "Propri\xE9t\xE9 d'image",
  imageFitName: "Ajustement de l'image",
  imageFitCoverLabel: "Couvrir",
  imageFitContainLabel: "Contenir",
  aspectRatioName: "Format de l'image",
  compactCardSettingsGroupName: "Param\xE8tres des cartes compactes",
  compactToggleName: "Compact",
  timelineDatePropertyName: "Propri\xE9t\xE9 de date",
  timelineEndDatePropertyName: "Propri\xE9t\xE9 de date de fin",
  timelineGroupPropertyName: "Propri\xE9t\xE9 de regroupement (lignes)",
  timelineLaneHeightName: "Hauteur de ligne",
  timelineEmptyState: "Aucune entr\xE9e \xE0 afficher dans la frise chronologique.",
  timelineTodayMarkerColorName: "Couleur du rep\xE8re \xAB aujourd'hui \xBB de la frise",
  timelineTodayMarkerColorDesc: "Remplace la couleur par d\xE9faut (adapt\xE9e au th\xE8me) de la ligne verticale marquant la date du jour dans la vue Frise chronologique.",
  settingsIntro: "Ces param\xE8tres s'appliquent globalement \xE0 chaque Base utilisant une vue Advanced Bases. Les options d'affichage propres \xE0 chaque Base \u2014 comme la largeur des cartes, l'ajustement de l'image ou la hauteur des lignes \u2014 se configurent s\xE9par\xE9ment dans les param\xE8tres de vue propres \xE0 chaque Base.",
  settingsFeedHeading: "Vue Feed",
  settingsCardsCompactHeading: "Cards Compact",
  settingsCardsCompactDesc: "Cards Compact n'a aucun param\xE8tre global. Ses options d'affichage (mode compact, largeur de carte, ajustement de l'image, propri\xE9t\xE9 d'image, affichage de l'ic\xF4ne) se configurent par Base \u2014 ouvrez une Base utilisant la vue Cards Compact et modifiez ses param\xE8tres de vue dans le panneau lat\xE9ral.",
  settingsTimelineHeading: "Vue Frise chronologique",
  helpAria: "Aide de la vue",
  feedHelpLine1: "Cliquez sur le titre d'une note pour l'ouvrir.",
  feedHelpLine2: "Utilisez \xAB Nouvelle note \xBB pour cr\xE9er une note li\xE9e \xE0 cette Base.",
  compactHelpLine1: "Activez Compact pour basculer entre les deux dispositions.",
  compactHelpLine2: "Cliquez sur une carte pour ouvrir sa note.",
  timelineHelpLine1: "Ctrl+molette (ou pincement) pour zoomer, molette simple pour faire d\xE9filer.",
  timelineHelpLine2: "Cliquez sur une barre ou un rep\xE8re pour ouvrir sa note.",
  timelineHelpLine3: "Cliquez sur la pastille de couleur d'une voie pour changer sa couleur."
};
var es = {
  newNoteButton: "Nueva nota",
  createFailed: "No se pudo crear la nota.",
  templateMissing: "Plantilla no encontrada: {path}",
  noteExists: "La nota ya existe: {path}",
  enableButtonName: 'Mostrar bot\xF3n "Nueva nota"',
  enableButtonDesc: "A\xF1ade un bot\xF3n a la barra de la vista Feed que crea una nueva nota enlazada a la Base actual.",
  folderName: "Carpeta para notas nuevas",
  folderDesc: "Ruta relativa al vault de la carpeta donde se guardan las notas nuevas.",
  templateName: "Plantilla",
  templateDesc: "Ruta relativa al vault del archivo de plantilla usado para notas nuevas.",
  showIconName: "Mostrar icono del archivo",
  cardWidthName: "Ancho de la tarjeta",
  showPropertiesName: "Mostrar propiedades",
  showMore: "Mostrar m\xE1s",
  previewFailed: "(No se pudo renderizar la vista previa.)",
  imagePropertyName: "Propiedad de imagen",
  imageFitName: "Ajuste de imagen",
  imageFitCoverLabel: "Cubrir",
  imageFitContainLabel: "Contener",
  aspectRatioName: "Relaci\xF3n de aspecto de la imagen",
  compactCardSettingsGroupName: "Ajustes de tarjetas compactas",
  compactToggleName: "Compacto",
  timelineDatePropertyName: "Propiedad de fecha",
  timelineEndDatePropertyName: "Propiedad de fecha de fin",
  timelineGroupPropertyName: "Propiedad de agrupaci\xF3n (carriles)",
  timelineLaneHeightName: "Altura del carril",
  timelineEmptyState: "No hay entradas para mostrar en la l\xEDnea de tiempo.",
  timelineTodayMarkerColorName: "Color del marcador de hoy en la l\xEDnea de tiempo",
  timelineTodayMarkerColorDesc: "Sustituye el color predeterminado (adaptado al tema) de la l\xEDnea vertical que marca la fecha de hoy en la vista L\xEDnea de tiempo.",
  settingsIntro: "Estos ajustes se aplican globalmente a toda Base que use una vista de Advanced Bases. Las opciones de visualizaci\xF3n propias de cada Base \u2014 como el ancho de tarjeta, el ajuste de imagen o la altura de carril \u2014 se configuran por separado en los ajustes de vista propios de cada Base.",
  settingsFeedHeading: "Vista Feed",
  settingsCardsCompactHeading: "Cards Compact",
  settingsCardsCompactDesc: "Cards Compact no tiene ajustes globales. Sus opciones de visualizaci\xF3n (modo compacto, ancho de tarjeta, ajuste de imagen, propiedad de imagen, mostrar icono) se configuran por Base \u2014 abre una Base que use la vista Cards Compact y edita sus ajustes de vista en el panel lateral.",
  settingsTimelineHeading: "Vista L\xEDnea de tiempo",
  helpAria: "Ayuda de la vista",
  feedHelpLine1: "Haz clic en el t\xEDtulo de una nota para abrirla.",
  feedHelpLine2: "Usa \xABNueva nota\xBB para crear una nota vinculada a esta Base.",
  compactHelpLine1: "Activa Compacto para alternar entre los dos dise\xF1os.",
  compactHelpLine2: "Haz clic en una tarjeta para abrir su nota.",
  timelineHelpLine1: "Ctrl+rueda (o pellizco) para hacer zoom; rueda normal para desplazar.",
  timelineHelpLine2: "Haz clic en una barra o marcador para abrir su nota.",
  timelineHelpLine3: "Haz clic en la muestra de color de un carril para cambiar su color."
};
var it = {
  newNoteButton: "Nuova nota",
  createFailed: "Impossibile creare la nota.",
  templateMissing: "Modello non trovato: {path}",
  noteExists: "La nota esiste gi\xE0: {path}",
  enableButtonName: 'Mostra il pulsante "Nuova nota"',
  enableButtonDesc: "Aggiunge un pulsante alla barra della vista Feed che crea una nuova nota collegata alla Base corrente.",
  folderName: "Cartella per le nuove note",
  folderDesc: "Percorso relativo al vault della cartella in cui salvare le nuove note.",
  templateName: "Modello",
  templateDesc: "Percorso relativo al vault del file modello usato per le nuove note.",
  showIconName: "Mostra icona del file",
  cardWidthName: "Larghezza scheda",
  showPropertiesName: "Mostra propriet\xE0",
  showMore: "Mostra altro",
  previewFailed: "(Impossibile visualizzare l'anteprima.)",
  imagePropertyName: "Propriet\xE0 immagine",
  imageFitName: "Adattamento immagine",
  imageFitCoverLabel: "Copertura",
  imageFitContainLabel: "Contenuta",
  aspectRatioName: "Proporzioni immagine",
  compactCardSettingsGroupName: "Impostazioni schede compatte",
  compactToggleName: "Compatto",
  timelineDatePropertyName: "Propriet\xE0 data",
  timelineEndDatePropertyName: "Propriet\xE0 data di fine",
  timelineGroupPropertyName: "Propriet\xE0 di raggruppamento (corsie)",
  timelineLaneHeightName: "Altezza corsia",
  timelineEmptyState: "Nessuna voce da mostrare nella timeline.",
  timelineTodayMarkerColorName: "Colore del indicatore di oggi nella timeline",
  timelineTodayMarkerColorDesc: "Sostituisce il colore predefinito (adattato al tema) della linea verticale che indica la data odierna nella vista Timeline.",
  settingsIntro: "Queste impostazioni si applicano globalmente a ogni Base che usa una vista di Advanced Bases. Le opzioni di visualizzazione specifiche di ogni Base \u2014 come larghezza scheda, adattamento immagine o altezza corsia \u2014 si configurano separatamente nelle impostazioni di vista di ciascuna Base.",
  settingsFeedHeading: "Vista Feed",
  settingsCardsCompactHeading: "Cards Compact",
  settingsCardsCompactDesc: "Cards Compact non ha impostazioni globali. Le sue opzioni di visualizzazione (modalit\xE0 compatta, larghezza scheda, adattamento immagine, propriet\xE0 immagine, mostra icona) si configurano per singola Base \u2014 apri una Base che usa la vista Cards Compact e modifica le sue impostazioni di vista nel pannello laterale.",
  settingsTimelineHeading: "Vista Timeline",
  helpAria: "Guida della vista",
  feedHelpLine1: "Fai clic sul titolo di una nota per aprirla.",
  feedHelpLine2: 'Usa "Nuova nota" per creare una nota collegata a questa Base.',
  compactHelpLine1: "Attiva Compatto per passare tra i due layout.",
  compactHelpLine2: "Fai clic su una scheda per aprire la sua nota.",
  timelineHelpLine1: "Ctrl+rotellina (o pizzico) per lo zoom, rotellina semplice per scorrere.",
  timelineHelpLine2: "Fai clic su una barra o un indicatore per aprire la sua nota.",
  timelineHelpLine3: "Fai clic sul campione di colore di una corsia per cambiarne il colore."
};
var pt = {
  newNoteButton: "Nova nota",
  createFailed: "N\xE3o foi poss\xEDvel criar a nota.",
  templateMissing: "Modelo n\xE3o encontrado: {path}",
  noteExists: "A nota j\xE1 existe: {path}",
  enableButtonName: 'Mostrar bot\xE3o "Nova nota"',
  enableButtonDesc: "Adiciona um bot\xE3o \xE0 barra da vista Feed que cria uma nova nota vinculada \xE0 Base atual.",
  folderName: "Pasta para novas notas",
  folderDesc: "Caminho relativo ao cofre da pasta onde as novas notas s\xE3o salvas.",
  templateName: "Modelo",
  templateDesc: "Caminho relativo ao cofre do arquivo de modelo usado para novas notas.",
  showIconName: "Mostrar \xEDcone do arquivo",
  cardWidthName: "Largura do cart\xE3o",
  showPropertiesName: "Mostrar propriedades",
  showMore: "Mostrar mais",
  previewFailed: "(N\xE3o foi poss\xEDvel renderizar a pr\xE9-visualiza\xE7\xE3o.)",
  imagePropertyName: "Propriedade da imagem",
  imageFitName: "Ajuste da imagem",
  imageFitCoverLabel: "Cobrir",
  imageFitContainLabel: "Conter",
  aspectRatioName: "Propor\xE7\xE3o da imagem",
  compactCardSettingsGroupName: "Configura\xE7\xF5es de cart\xF5es compactos",
  compactToggleName: "Compacto",
  timelineDatePropertyName: "Propriedade de data",
  timelineEndDatePropertyName: "Propriedade de data de t\xE9rmino",
  timelineGroupPropertyName: "Propriedade de agrupamento (raias)",
  timelineLaneHeightName: "Altura da raia",
  timelineEmptyState: "Nenhuma entrada para mostrar na linha do tempo.",
  timelineTodayMarkerColorName: "Cor do marcador de hoje na linha do tempo",
  timelineTodayMarkerColorDesc: "Substitui a cor padr\xE3o (adaptada ao tema) da linha vertical que marca a data de hoje na vista Linha do tempo.",
  settingsIntro: "Estas configura\xE7\xF5es aplicam-se globalmente a toda Base que use uma vista do Advanced Bases. As op\xE7\xF5es de exibi\xE7\xE3o pr\xF3prias de cada Base \u2014 como largura do cart\xE3o, ajuste da imagem ou altura da raia \u2014 s\xE3o configuradas separadamente nas configura\xE7\xF5es de vista de cada Base.",
  settingsFeedHeading: "Vista Feed",
  settingsCardsCompactHeading: "Cards Compact",
  settingsCardsCompactDesc: "Cards Compact n\xE3o tem configura\xE7\xF5es globais. Suas op\xE7\xF5es de exibi\xE7\xE3o (modo compacto, largura do cart\xE3o, ajuste da imagem, propriedade da imagem, mostrar \xEDcone) s\xE3o configuradas por Base \u2014 abra uma Base que use a vista Cards Compact e edite suas configura\xE7\xF5es de vista na barra lateral.",
  settingsTimelineHeading: "Vista Linha do tempo",
  helpAria: "Ajuda da visualiza\xE7\xE3o",
  feedHelpLine1: "Clique no t\xEDtulo de uma nota para abri-la.",
  feedHelpLine2: 'Use "Nova nota" para criar uma nota vinculada a esta Base.',
  compactHelpLine1: "Ative Compacto para alternar entre os dois layouts.",
  compactHelpLine2: "Clique em um cart\xE3o para abrir sua nota.",
  timelineHelpLine1: "Ctrl+rolagem (ou pin\xE7a) para ampliar, rolagem simples para deslocar.",
  timelineHelpLine2: "Clique em uma barra ou marcador para abrir sua nota.",
  timelineHelpLine3: "Clique na amostra de cor de uma faixa para alterar sua cor."
};
var ru = {
  newNoteButton: "\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u043C\u0435\u0442\u043A\u0430",
  createFailed: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0443.",
  templateMissing: "\u0428\u0430\u0431\u043B\u043E\u043D \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D: {path}",
  noteExists: "\u0417\u0430\u043C\u0435\u0442\u043A\u0430 \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442: {path}",
  enableButtonName: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0443 \xAB\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u043C\u0435\u0442\u043A\u0430\xBB",
  enableButtonDesc: "\u0414\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u0442 \u043D\u0430 \u043F\u0430\u043D\u0435\u043B\u044C \u0432\u0438\u0434\u0430 Feed \u043A\u043D\u043E\u043F\u043A\u0443, \u0441\u043E\u0437\u0434\u0430\u044E\u0449\u0443\u044E \u043D\u043E\u0432\u0443\u044E \u0437\u0430\u043C\u0435\u0442\u043A\u0443, \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u0443\u044E \u0441 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 Base.",
  folderName: "\u041F\u0430\u043F\u043A\u0430 \u0434\u043B\u044F \u043D\u043E\u0432\u044B\u0445 \u0437\u0430\u043C\u0435\u0442\u043E\u043A",
  folderDesc: "\u041F\u0443\u0442\u044C \u0432\u043D\u0443\u0442\u0440\u0438 \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430 \u043A \u043F\u0430\u043F\u043A\u0435 \u0434\u043B\u044F \u043D\u043E\u0432\u044B\u0445 \u0437\u0430\u043C\u0435\u0442\u043E\u043A.",
  templateName: "\u0428\u0430\u0431\u043B\u043E\u043D",
  templateDesc: "\u041F\u0443\u0442\u044C \u0432\u043D\u0443\u0442\u0440\u0438 \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430 \u043A \u0444\u0430\u0439\u043B\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430 \u0434\u043B\u044F \u043D\u043E\u0432\u044B\u0445 \u0437\u0430\u043C\u0435\u0442\u043E\u043A.",
  showIconName: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0437\u043D\u0430\u0447\u043E\u043A \u0444\u0430\u0439\u043B\u0430",
  cardWidthName: "\u0428\u0438\u0440\u0438\u043D\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438",
  showPropertiesName: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u0430",
  showMore: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435",
  previewFailed: "(\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043E\u0431\u0440\u0430\u0437\u0438\u0442\u044C \u043F\u0440\u0435\u0432\u044C\u044E.)",
  imagePropertyName: "\u0421\u0432\u043E\u0439\u0441\u0442\u0432\u043E \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",
  imageFitName: "\u041F\u043E\u0434\u0433\u043E\u043D\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",
  imageFitCoverLabel: "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C",
  imageFitContainLabel: "\u0412\u043C\u0435\u0441\u0442\u0438\u0442\u044C",
  aspectRatioName: "\u0421\u043E\u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0435 \u0441\u0442\u043E\u0440\u043E\u043D \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",
  compactCardSettingsGroupName: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043A\u043E\u043C\u043F\u0430\u043A\u0442\u043D\u044B\u0445 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A",
  compactToggleName: "\u041A\u043E\u043C\u043F\u0430\u043A\u0442\u043D\u044B\u0439",
  timelineDatePropertyName: "\u0421\u0432\u043E\u0439\u0441\u0442\u0432\u043E \u0434\u0430\u0442\u044B",
  timelineEndDatePropertyName: "\u0421\u0432\u043E\u0439\u0441\u0442\u0432\u043E \u0434\u0430\u0442\u044B \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F",
  timelineGroupPropertyName: "\u0421\u0432\u043E\u0439\u0441\u0442\u0432\u043E \u0433\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u043A\u0438 (\u0434\u043E\u0440\u043E\u0436\u043A\u0438)",
  timelineLaneHeightName: "\u0412\u044B\u0441\u043E\u0442\u0430 \u0434\u043E\u0440\u043E\u0436\u043A\u0438",
  timelineEmptyState: "\u041D\u0435\u0442 \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u0434\u043B\u044F \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u043D\u0430 \u0448\u043A\u0430\u043B\u0435 \u0432\u0440\u0435\u043C\u0435\u043D\u0438.",
  timelineTodayMarkerColorName: "\u0426\u0432\u0435\u0442 \u043E\u0442\u043C\u0435\u0442\u043A\u0438 \u0441\u0435\u0433\u043E\u0434\u043D\u044F\u0448\u043D\u0435\u0433\u043E \u0434\u043D\u044F \u043D\u0430 \u0448\u043A\u0430\u043B\u0435 \u0432\u0440\u0435\u043C\u0435\u043D\u0438",
  timelineTodayMarkerColorDesc: "\u041F\u0435\u0440\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442 \u0446\u0432\u0435\u0442 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E (\u0430\u0434\u0430\u043F\u0442\u0438\u0432\u043D\u044B\u0439 \u043A \u0442\u0435\u043C\u0435) \u0432\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0439 \u043B\u0438\u043D\u0438\u0438, \u043E\u0442\u043C\u0435\u0447\u0430\u044E\u0449\u0435\u0439 \u0441\u0435\u0433\u043E\u0434\u043D\u044F\u0448\u043D\u044E\u044E \u0434\u0430\u0442\u0443 \u0432 \u0432\u0438\u0434\u0435 \u0428\u043A\u0430\u043B\u0430 \u0432\u0440\u0435\u043C\u0435\u043D\u0438.",
  settingsIntro: "\u042D\u0442\u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u044E\u0442\u0441\u044F \u0433\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u043E \u043A\u043E \u0432\u0441\u0435\u043C Base, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0449\u0438\u043C \u0432\u0438\u0434 Advanced Bases. \u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E\u0439 Base \u2014 \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u0448\u0438\u0440\u0438\u043D\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438, \u043F\u043E\u0434\u0433\u043E\u043D\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u0432\u044B\u0441\u043E\u0442\u0430 \u0434\u043E\u0440\u043E\u0436\u043A\u0438 \u2014 \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E \u0432 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0445 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445 \u0432\u0438\u0434\u0430 \u043A\u0430\u0436\u0434\u043E\u0439 Base.",
  settingsFeedHeading: "\u0412\u0438\u0434 Feed",
  settingsCardsCompactHeading: "Cards Compact",
  settingsCardsCompactDesc: "\u0423 Cards Compact \u043D\u0435\u0442 \u0433\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u044B\u0445 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A. \u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F (\u043A\u043E\u043C\u043F\u0430\u043A\u0442\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C, \u0448\u0438\u0440\u0438\u043D\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438, \u043F\u043E\u0434\u0433\u043E\u043D\u043A\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F, \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u043E \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F, \u043F\u043E\u043A\u0430\u0437 \u0437\u043D\u0430\u0447\u043A\u0430) \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u0434\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0439 Base \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E \u2014 \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 Base \u0441 \u0432\u0438\u0434\u043E\u043C Cards Compact \u0438 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u0435\u0433\u043E \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0432\u0438\u0434\u0430 \u043D\u0430 \u0431\u043E\u043A\u043E\u0432\u043E\u0439 \u043F\u0430\u043D\u0435\u043B\u0438.",
  settingsTimelineHeading: "\u0412\u0438\u0434 \u0428\u043A\u0430\u043B\u0430 \u0432\u0440\u0435\u043C\u0435\u043D\u0438",
  helpAria: "\u0421\u043F\u0440\u0430\u0432\u043A\u0430 \u043F\u043E \u0432\u0438\u0434\u0443",
  feedHelpLine1: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0437\u0430\u043C\u0435\u0442\u043A\u0438, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0435\u0451.",
  feedHelpLine2: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \xAB\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u043C\u0435\u0442\u043A\u0430\xBB, \u0447\u0442\u043E\u0431\u044B \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0443, \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u0443\u044E \u0441 \u044D\u0442\u043E\u0439 \u0411\u0430\u0437\u043E\u0439.",
  compactHelpLine1: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u041A\u043E\u043C\u043F\u0430\u043A\u0442\u043D\u044B\u0439, \u0447\u0442\u043E\u0431\u044B \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u044C\u0441\u044F \u043C\u0435\u0436\u0434\u0443 \u0434\u0432\u0443\u043C\u044F \u043C\u0430\u043A\u0435\u0442\u0430\u043C\u0438.",
  compactHelpLine2: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0435\u0451 \u0437\u0430\u043C\u0435\u0442\u043A\u0443.",
  timelineHelpLine1: "Ctrl+\u043A\u043E\u043B\u0435\u0441\u043E (\u0438\u043B\u0438 \u0449\u0438\u043F\u043E\u043A) \u2014 \u043C\u0430\u0441\u0448\u0442\u0430\u0431, \u043E\u0431\u044B\u0447\u043D\u0430\u044F \u043F\u0440\u043E\u043A\u0440\u0443\u0442\u043A\u0430 \u2014 \u043F\u0430\u043D\u043E\u0440\u0430\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435.",
  timelineHelpLine2: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043F\u043E\u043B\u043E\u0441\u0443 \u0438\u043B\u0438 \u043C\u0435\u0442\u043A\u0443, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0443.",
  timelineHelpLine3: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0446\u0432\u0435\u0442\u043E\u0432\u043E\u0439 \u043E\u0431\u0440\u0430\u0437\u0435\u0446 \u0434\u043E\u0440\u043E\u0436\u043A\u0438, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0435\u0451 \u0446\u0432\u0435\u0442."
};
var ja = {
  newNoteButton: "\u65B0\u898F\u30CE\u30FC\u30C8",
  createFailed: "\u30CE\u30FC\u30C8\u3092\u4F5C\u6210\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002",
  templateMissing: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093: {path}",
  noteExists: "\u30CE\u30FC\u30C8\u306F\u65E2\u306B\u5B58\u5728\u3057\u307E\u3059: {path}",
  enableButtonName: "\u300C\u65B0\u898F\u30CE\u30FC\u30C8\u300D\u30DC\u30BF\u30F3\u3092\u8868\u793A",
  enableButtonDesc: "Feed\u30D3\u30E5\u30FC\u306E\u30C4\u30FC\u30EB\u30D0\u30FC\u306B\u3001\u73FE\u5728\u306EBase\u306B\u30EA\u30F3\u30AF\u3057\u305F\u65B0\u898F\u30CE\u30FC\u30C8\u3092\u4F5C\u6210\u3059\u308B\u30DC\u30BF\u30F3\u3092\u8FFD\u52A0\u3057\u307E\u3059\u3002",
  folderName: "\u65B0\u898F\u30CE\u30FC\u30C8\u306E\u30D5\u30A9\u30EB\u30C0",
  folderDesc: "\u65B0\u898F\u30CE\u30FC\u30C8\u3092\u4FDD\u5B58\u3059\u308B\u30D5\u30A9\u30EB\u30C0\u306E Vault \u5185\u76F8\u5BFE\u30D1\u30B9\u3002",
  templateName: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
  templateDesc: "\u65B0\u898F\u30CE\u30FC\u30C8\u306B\u4F7F\u7528\u3059\u308B\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u30D5\u30A1\u30A4\u30EB\u306E Vault \u5185\u76F8\u5BFE\u30D1\u30B9\u3002",
  showIconName: "\u30D5\u30A1\u30A4\u30EB\u30A2\u30A4\u30B3\u30F3\u3092\u8868\u793A",
  cardWidthName: "\u30AB\u30FC\u30C9\u306E\u5E45",
  showPropertiesName: "\u30D7\u30ED\u30D1\u30C6\u30A3\u3092\u8868\u793A",
  showMore: "\u3082\u3063\u3068\u898B\u308B",
  previewFailed: "\uFF08\u30D7\u30EC\u30D3\u30E5\u30FC\u3092\u8868\u793A\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\uFF09",
  imagePropertyName: "\u753B\u50CF\u30D7\u30ED\u30D1\u30C6\u30A3",
  imageFitName: "\u753B\u50CF\u306E\u30D5\u30A3\u30C3\u30C8",
  imageFitCoverLabel: "\u30AB\u30D0\u30FC",
  imageFitContainLabel: "\u30B3\u30F3\u30C6\u30A4\u30F3",
  aspectRatioName: "\u753B\u50CF\u306E\u30A2\u30B9\u30DA\u30AF\u30C8\u6BD4",
  compactCardSettingsGroupName: "\u30B3\u30F3\u30D1\u30AF\u30C8\u30AB\u30FC\u30C9\u306E\u8A2D\u5B9A",
  compactToggleName: "\u30B3\u30F3\u30D1\u30AF\u30C8",
  timelineDatePropertyName: "[EN] Date property",
  timelineEndDatePropertyName: "[EN] End date property",
  timelineGroupPropertyName: "[EN] Group property (lanes)",
  timelineLaneHeightName: "[EN] Lane height",
  timelineEmptyState: "[EN] No entries to show on the timeline.",
  timelineTodayMarkerColorName: "[EN] Timeline today-marker color",
  timelineTodayMarkerColorDesc: "[EN] Overrides the default theme-adaptive color of the vertical line marking today's date in the Timeline view.",
  settingsIntro: "[EN] These settings apply globally, to every Base that uses an Advanced Bases view. Per-Base display options \u2014 like card size, image fit, or lane height \u2014 are configured separately in each Base's own view settings.",
  settingsFeedHeading: "[EN] Feed view",
  settingsCardsCompactHeading: "[EN] Cards Compact",
  settingsCardsCompactDesc: "[EN] Cards Compact has no global settings. Its display options (compact mode, card size, image fit, image property, show icon) are configured per Base \u2014 open a Base using the Cards Compact view and edit its view settings from the sidebar.",
  settingsTimelineHeading: "[EN] Timeline view",
  helpAria: "\u30D3\u30E5\u30FC\u306E\u30D8\u30EB\u30D7",
  feedHelpLine1: "\u30CE\u30FC\u30C8\u306E\u30BF\u30A4\u30C8\u30EB\u3092\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u3068\u958B\u304D\u307E\u3059\u3002",
  feedHelpLine2: "\u300C\u65B0\u898F\u30CE\u30FC\u30C8\u300D\u3067\u3053\u306EBase\u306B\u30EA\u30F3\u30AF\u3057\u305F\u30CE\u30FC\u30C8\u3092\u4F5C\u6210\u3057\u307E\u3059\u3002",
  compactHelpLine1: "\u30B3\u30F3\u30D1\u30AF\u30C8\u3092\u5207\u308A\u66FF\u3048\u308B\u30682\u3064\u306E\u30EC\u30A4\u30A2\u30A6\u30C8\u3092\u5207\u308A\u66FF\u3048\u3089\u308C\u307E\u3059\u3002",
  compactHelpLine2: "\u30AB\u30FC\u30C9\u3092\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u3068\u305D\u306E\u30CE\u30FC\u30C8\u304C\u958B\u304D\u307E\u3059\u3002",
  timelineHelpLine1: "Ctrl+\u30B9\u30AF\u30ED\u30FC\u30EB\uFF08\u307E\u305F\u306F\u30D4\u30F3\u30C1\uFF09\u3067\u30BA\u30FC\u30E0\u3001\u901A\u5E38\u306E\u30B9\u30AF\u30ED\u30FC\u30EB\u3067\u30D1\u30F3\u3057\u307E\u3059\u3002",
  timelineHelpLine2: "\u30D0\u30FC\u3084\u30DE\u30FC\u30AB\u30FC\u3092\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u3068\u30CE\u30FC\u30C8\u304C\u958B\u304D\u307E\u3059\u3002",
  timelineHelpLine3: "\u30EC\u30FC\u30F3\u306E\u30AB\u30E9\u30FC\u30B9\u30A6\u30A9\u30C3\u30C1\u3092\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u3068\u8272\u3092\u5909\u66F4\u3067\u304D\u307E\u3059\u3002"
};
var zh = {
  newNoteButton: "\u65B0\u5EFA\u7B14\u8BB0",
  createFailed: "\u65E0\u6CD5\u521B\u5EFA\u7B14\u8BB0\u3002",
  templateMissing: "\u627E\u4E0D\u5230\u6A21\u677F\uFF1A{path}",
  noteExists: "\u7B14\u8BB0\u5DF2\u5B58\u5728\uFF1A{path}",
  enableButtonName: "\u663E\u793A\u201C\u65B0\u5EFA\u7B14\u8BB0\u201D\u6309\u94AE",
  enableButtonDesc: "\u5728 Feed \u89C6\u56FE\u5DE5\u5177\u680F\u4E2D\u6DFB\u52A0\u4E00\u4E2A\u6309\u94AE\uFF0C\u7528\u4E8E\u521B\u5EFA\u4E0E\u5F53\u524D Base \u5173\u8054\u7684\u65B0\u7B14\u8BB0\u3002",
  folderName: "\u65B0\u7B14\u8BB0\u6587\u4EF6\u5939",
  folderDesc: "\u4FDD\u5B58\u65B0\u7B14\u8BB0\u7684\u6587\u4EF6\u5939\uFF08\u76F8\u5BF9\u4E8E\u5E93\u6839\u76EE\u5F55\u7684\u8DEF\u5F84\uFF09\u3002",
  templateName: "\u6A21\u677F",
  templateDesc: "\u65B0\u7B14\u8BB0\u4F7F\u7528\u7684\u6A21\u677F\u6587\u4EF6\u8DEF\u5F84\uFF08\u76F8\u5BF9\u4E8E\u5E93\u6839\u76EE\u5F55\uFF09\u3002",
  showIconName: "\u663E\u793A\u6587\u4EF6\u56FE\u6807",
  cardWidthName: "\u5361\u7247\u5BBD\u5EA6",
  showPropertiesName: "\u663E\u793A\u5C5E\u6027",
  showMore: "\u663E\u793A\u66F4\u591A",
  previewFailed: "\uFF08\u9884\u89C8\u6E32\u67D3\u5931\u8D25\u3002\uFF09",
  imagePropertyName: "\u56FE\u7247\u5C5E\u6027",
  imageFitName: "\u56FE\u7247\u9002\u914D\u65B9\u5F0F",
  imageFitCoverLabel: "\u586B\u5145",
  imageFitContainLabel: "\u5305\u542B",
  aspectRatioName: "\u56FE\u7247\u5BBD\u9AD8\u6BD4",
  compactCardSettingsGroupName: "\u7D27\u51D1\u5361\u7247\u8BBE\u7F6E",
  compactToggleName: "\u7D27\u51D1",
  timelineDatePropertyName: "[EN] Date property",
  timelineEndDatePropertyName: "[EN] End date property",
  timelineGroupPropertyName: "[EN] Group property (lanes)",
  timelineLaneHeightName: "[EN] Lane height",
  timelineEmptyState: "[EN] No entries to show on the timeline.",
  timelineTodayMarkerColorName: "[EN] Timeline today-marker color",
  timelineTodayMarkerColorDesc: "[EN] Overrides the default theme-adaptive color of the vertical line marking today's date in the Timeline view.",
  settingsIntro: "[EN] These settings apply globally, to every Base that uses an Advanced Bases view. Per-Base display options \u2014 like card size, image fit, or lane height \u2014 are configured separately in each Base's own view settings.",
  settingsFeedHeading: "[EN] Feed view",
  settingsCardsCompactHeading: "[EN] Cards Compact",
  settingsCardsCompactDesc: "[EN] Cards Compact has no global settings. Its display options (compact mode, card size, image fit, image property, show icon) are configured per Base \u2014 open a Base using the Cards Compact view and edit its view settings from the sidebar.",
  settingsTimelineHeading: "[EN] Timeline view",
  helpAria: "\u89C6\u56FE\u5E2E\u52A9",
  feedHelpLine1: "\u70B9\u51FB\u7B14\u8BB0\u6807\u9898\u5373\u53EF\u6253\u5F00\u3002",
  feedHelpLine2: "\u4F7F\u7528\u201C\u65B0\u5EFA\u7B14\u8BB0\u201D\u521B\u5EFA\u4E0E\u6B64 Base \u5173\u8054\u7684\u7B14\u8BB0\u3002",
  compactHelpLine1: "\u5207\u6362\u201C\u7D27\u51D1\u201D\u5373\u53EF\u5728\u4E24\u79CD\u5E03\u5C40\u95F4\u5207\u6362\u3002",
  compactHelpLine2: "\u70B9\u51FB\u5361\u7247\u5373\u53EF\u6253\u5F00\u5176\u7B14\u8BB0\u3002",
  timelineHelpLine1: "Ctrl+\u6EDA\u8F6E\uFF08\u6216\u53CC\u6307\u7F29\u653E\uFF09\u53EF\u7F29\u653E\uFF0C\u666E\u901A\u6EDA\u52A8\u53EF\u5E73\u79FB\u3002",
  timelineHelpLine2: "\u70B9\u51FB\u6761\u5F62\u6216\u6807\u8BB0\u5373\u53EF\u6253\u5F00\u5176\u7B14\u8BB0\u3002",
  timelineHelpLine3: "\u70B9\u51FB\u6CF3\u9053\u7684\u989C\u8272\u8272\u5757\u5373\u53EF\u66F4\u6539\u5176\u989C\u8272\u3002"
};
var pl = {
  newNoteButton: "Nowa notatka",
  createFailed: "Nie uda\u0142o si\u0119 utworzy\u0107 notatki.",
  templateMissing: "Nie znaleziono szablonu: {path}",
  noteExists: "Notatka ju\u017C istnieje: {path}",
  enableButtonName: 'Poka\u017C przycisk "Nowa notatka"',
  enableButtonDesc: "Dodaje do paska narz\u0119dzi widoku Feed przycisk tworz\u0105cy now\u0105 notatk\u0119 powi\u0105zan\u0105 z bie\u017C\u0105c\u0105 Base.",
  folderName: "Folder na nowe notatki",
  folderDesc: "\u015Acie\u017Cka wzgl\u0119dem magazynu do folderu, w kt\xF3rym zapisywane s\u0105 nowe notatki.",
  templateName: "Szablon",
  templateDesc: "\u015Acie\u017Cka wzgl\u0119dem magazynu do pliku szablonu u\u017Cywanego dla nowych notatek.",
  showIconName: "Poka\u017C ikon\u0119 pliku",
  cardWidthName: "Szeroko\u015B\u0107 karty",
  showPropertiesName: "Poka\u017C w\u0142a\u015Bciwo\u015Bci",
  showMore: "Poka\u017C wi\u0119cej",
  previewFailed: "(Nie uda\u0142o si\u0119 wyrenderowa\u0107 podgl\u0105du.)",
  imagePropertyName: "W\u0142a\u015Bciwo\u015B\u0107 obrazu",
  imageFitName: "Dopasowanie obrazu",
  imageFitCoverLabel: "Wype\u0142nij",
  imageFitContainLabel: "Zmie\u015B\u0107",
  aspectRatioName: "Proporcje obrazu",
  compactCardSettingsGroupName: "Ustawienia kompaktowych kart",
  compactToggleName: "Kompaktowy",
  timelineDatePropertyName: "[EN] Date property",
  timelineEndDatePropertyName: "[EN] End date property",
  timelineGroupPropertyName: "[EN] Group property (lanes)",
  timelineLaneHeightName: "[EN] Lane height",
  timelineEmptyState: "[EN] No entries to show on the timeline.",
  timelineTodayMarkerColorName: "[EN] Timeline today-marker color",
  timelineTodayMarkerColorDesc: "[EN] Overrides the default theme-adaptive color of the vertical line marking today's date in the Timeline view.",
  settingsIntro: "[EN] These settings apply globally, to every Base that uses an Advanced Bases view. Per-Base display options \u2014 like card size, image fit, or lane height \u2014 are configured separately in each Base's own view settings.",
  settingsFeedHeading: "[EN] Feed view",
  settingsCardsCompactHeading: "[EN] Cards Compact",
  settingsCardsCompactDesc: "[EN] Cards Compact has no global settings. Its display options (compact mode, card size, image fit, image property, show icon) are configured per Base \u2014 open a Base using the Cards Compact view and edit its view settings from the sidebar.",
  settingsTimelineHeading: "[EN] Timeline view",
  helpAria: "Pomoc widoku",
  feedHelpLine1: "Kliknij tytu\u0142 notatki, aby j\u0105 otworzy\u0107.",
  feedHelpLine2: "U\u017Cyj \u201ENowa notatka\u201D, aby utworzy\u0107 notatk\u0119 powi\u0105zan\u0105 z t\u0105 Baz\u0105.",
  compactHelpLine1: "W\u0142\u0105cz Kompaktowy, aby prze\u0142\u0105cza\u0107 si\u0119 mi\u0119dzy dwoma uk\u0142adami.",
  compactHelpLine2: "Kliknij kart\u0119, aby otworzy\u0107 jej notatk\u0119.",
  timelineHelpLine1: "Ctrl+k\xF3\u0142ko (lub uszczypni\u0119cie) przybli\u017Ca, zwyk\u0142e przewijanie przesuwa.",
  timelineHelpLine2: "Kliknij pasek lub znacznik, aby otworzy\u0107 jego notatk\u0119.",
  timelineHelpLine3: "Kliknij pr\xF3bk\u0119 koloru pasa, aby zmieni\u0107 jego kolor."
};
var uk = {
  newNoteButton: "\u041D\u043E\u0432\u0430 \u043D\u043E\u0442\u0430\u0442\u043A\u0430",
  createFailed: "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0441\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0442\u0430\u0442\u043A\u0443.",
  templateMissing: "\u0428\u0430\u0431\u043B\u043E\u043D \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E: {path}",
  noteExists: "\u041D\u043E\u0442\u0430\u0442\u043A\u0430 \u0432\u0436\u0435 \u0456\u0441\u043D\u0443\u0454: {path}",
  enableButtonName: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u043A\u043D\u043E\u043F\u043A\u0443 \xAB\u041D\u043E\u0432\u0430 \u043D\u043E\u0442\u0430\u0442\u043A\u0430\xBB",
  enableButtonDesc: "\u0414\u043E\u0434\u0430\u0454 \u043D\u0430 \u043F\u0430\u043D\u0435\u043B\u044C \u0456\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0456\u0432 \u0432\u0438\u0433\u043B\u044F\u0434\u0443 Feed \u043A\u043D\u043E\u043F\u043A\u0443, \u044F\u043A\u0430 \u0441\u0442\u0432\u043E\u0440\u044E\u0454 \u043D\u043E\u0432\u0443 \u043D\u043E\u0442\u0430\u0442\u043A\u0443, \u043F\u043E\u0432'\u044F\u0437\u0430\u043D\u0443 \u0437 \u043F\u043E\u0442\u043E\u0447\u043D\u043E\u044E Base.",
  folderName: "\u041F\u0430\u043F\u043A\u0430 \u0434\u043B\u044F \u043D\u043E\u0432\u0438\u0445 \u043D\u043E\u0442\u0430\u0442\u043E\u043A",
  folderDesc: "\u0428\u043B\u044F\u0445 \u0443 \u0441\u0445\u043E\u0432\u0438\u0449\u0456 \u0434\u043E \u043F\u0430\u043F\u043A\u0438, \u043A\u0443\u0434\u0438 \u0437\u0431\u0435\u0440\u0456\u0433\u0430\u044E\u0442\u044C\u0441\u044F \u043D\u043E\u0432\u0456 \u043D\u043E\u0442\u0430\u0442\u043A\u0438.",
  templateName: "\u0428\u0430\u0431\u043B\u043E\u043D",
  templateDesc: "\u0428\u043B\u044F\u0445 \u0443 \u0441\u0445\u043E\u0432\u0438\u0449\u0456 \u0434\u043E \u0444\u0430\u0439\u043B\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0443, \u0449\u043E \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0454\u0442\u044C\u0441\u044F \u0434\u043B\u044F \u043D\u043E\u0432\u0438\u0445 \u043D\u043E\u0442\u0430\u0442\u043E\u043A.",
  showIconName: "\u041F\u043E\u043A\u0430\u0437\u0443\u0432\u0430\u0442\u0438 \u0437\u043D\u0430\u0447\u043E\u043A \u0444\u0430\u0439\u043B\u0443",
  cardWidthName: "\u0428\u0438\u0440\u0438\u043D\u0430 \u043A\u0430\u0440\u0442\u043A\u0438",
  showPropertiesName: "\u041F\u043E\u043A\u0430\u0437\u0443\u0432\u0430\u0442\u0438 \u0432\u043B\u0430\u0441\u0442\u0438\u0432\u043E\u0441\u0442\u0456",
  showMore: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0431\u0456\u043B\u044C\u0448\u0435",
  previewFailed: "(\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0432\u0456\u0434\u043E\u0431\u0440\u0430\u0437\u0438\u0442\u0438 \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u0456\u0439 \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u0434.)",
  imagePropertyName: "\u0412\u043B\u0430\u0441\u0442\u0438\u0432\u0456\u0441\u0442\u044C \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F",
  imageFitName: "\u041F\u0456\u0434\u0433\u043E\u043D\u043A\u0430 \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F",
  imageFitCoverLabel: "\u0417\u0430\u043F\u043E\u0432\u043D\u0438\u0442\u0438",
  imageFitContainLabel: "\u0412\u043C\u0456\u0441\u0442\u0438\u0442\u0438",
  aspectRatioName: "\u0421\u043F\u0456\u0432\u0432\u0456\u0434\u043D\u043E\u0448\u0435\u043D\u043D\u044F \u0441\u0442\u043E\u0440\u0456\u043D \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F",
  compactCardSettingsGroupName: "\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F \u043A\u043E\u043C\u043F\u0430\u043A\u0442\u043D\u0438\u0445 \u043A\u0430\u0440\u0442\u043E\u043A",
  compactToggleName: "\u041A\u043E\u043C\u043F\u0430\u043A\u0442\u043D\u0438\u0439",
  timelineDatePropertyName: "[EN] Date property",
  timelineEndDatePropertyName: "[EN] End date property",
  timelineGroupPropertyName: "[EN] Group property (lanes)",
  timelineLaneHeightName: "[EN] Lane height",
  timelineEmptyState: "[EN] No entries to show on the timeline.",
  timelineTodayMarkerColorName: "[EN] Timeline today-marker color",
  timelineTodayMarkerColorDesc: "[EN] Overrides the default theme-adaptive color of the vertical line marking today's date in the Timeline view.",
  settingsIntro: "[EN] These settings apply globally, to every Base that uses an Advanced Bases view. Per-Base display options \u2014 like card size, image fit, or lane height \u2014 are configured separately in each Base's own view settings.",
  settingsFeedHeading: "[EN] Feed view",
  settingsCardsCompactHeading: "[EN] Cards Compact",
  settingsCardsCompactDesc: "[EN] Cards Compact has no global settings. Its display options (compact mode, card size, image fit, image property, show icon) are configured per Base \u2014 open a Base using the Cards Compact view and edit its view settings from the sidebar.",
  settingsTimelineHeading: "[EN] Timeline view",
  helpAria: "\u0414\u043E\u0432\u0456\u0434\u043A\u0430 \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u0434\u0443",
  feedHelpLine1: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C \u043D\u0430 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u043D\u043E\u0442\u0430\u0442\u043A\u0438, \u0449\u043E\u0431 \u0432\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u0457\u0457.",
  feedHelpLine2: "\u0421\u043A\u043E\u0440\u0438\u0441\u0442\u0430\u0439\u0442\u0435\u0441\u044F \xAB\u041D\u043E\u0432\u0430 \u043D\u043E\u0442\u0430\u0442\u043A\u0430\xBB, \u0449\u043E\u0431 \u0441\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043D\u043E\u0442\u0430\u0442\u043A\u0443, \u043F\u043E\u0432'\u044F\u0437\u0430\u043D\u0443 \u0437 \u0446\u0456\u0454\u044E \u0411\u0430\u0437\u043E\u044E.",
  compactHelpLine1: "\u0423\u0432\u0456\u043C\u043A\u043D\u0456\u0442\u044C \u041A\u043E\u043C\u043F\u0430\u043A\u0442\u043D\u0438\u0439, \u0449\u043E\u0431 \u043F\u0435\u0440\u0435\u043C\u0438\u043A\u0430\u0442\u0438\u0441\u044F \u043C\u0456\u0436 \u0434\u0432\u043E\u043C\u0430 \u043C\u0430\u043A\u0435\u0442\u0430\u043C\u0438.",
  compactHelpLine2: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u043A\u0443, \u0449\u043E\u0431 \u0432\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u0457\u0457 \u043D\u043E\u0442\u0430\u0442\u043A\u0443.",
  timelineHelpLine1: "Ctrl+\u043A\u043E\u043B\u0435\u0441\u043E (\u0430\u0431\u043E \u0449\u0438\u043F\u043E\u043A) \u2014 \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0443\u0432\u0430\u043D\u043D\u044F, \u0437\u0432\u0438\u0447\u0430\u0439\u043D\u0430 \u043F\u0440\u043E\u043A\u0440\u0443\u0442\u043A\u0430 \u2014 \u043F\u0430\u043D\u043E\u0440\u0430\u043C\u0443\u0432\u0430\u043D\u043D\u044F.",
  timelineHelpLine2: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C \u043D\u0430 \u0441\u043C\u0443\u0433\u0443 \u0430\u0431\u043E \u043C\u0456\u0442\u043A\u0443, \u0449\u043E\u0431 \u0432\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u043D\u043E\u0442\u0430\u0442\u043A\u0443.",
  timelineHelpLine3: "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C \u043D\u0430 \u0437\u0440\u0430\u0437\u043E\u043A \u043A\u043E\u043B\u044C\u043E\u0440\u0443 \u0434\u043E\u0440\u0456\u0436\u043A\u0438, \u0449\u043E\u0431 \u0437\u043C\u0456\u043D\u0438\u0442\u0438 \u0457\u0457 \u043A\u043E\u043B\u0456\u0440."
};
var nl = {
  newNoteButton: "Nieuwe notitie",
  createFailed: "Kan de notitie niet aanmaken.",
  templateMissing: "Sjabloon niet gevonden: {path}",
  noteExists: "Notitie bestaat al: {path}",
  enableButtonName: 'Toon knop "Nieuwe notitie"',
  enableButtonDesc: "Voegt een knop toe aan de werkbalk van de Feed-weergave waarmee een nieuwe notitie wordt gemaakt, gekoppeld aan de huidige Base.",
  folderName: "Map voor nieuwe notities",
  folderDesc: "Kluis-relatief pad naar de map waarin nieuwe notities worden opgeslagen.",
  templateName: "Sjabloon",
  templateDesc: "Kluis-relatief pad naar het sjabloonbestand voor nieuwe notities.",
  showIconName: "Bestandspictogram tonen",
  cardWidthName: "Kaartbreedte",
  showPropertiesName: "Eigenschappen tonen",
  showMore: "Meer tonen",
  previewFailed: "(Voorbeeld kon niet worden weergegeven.)",
  imagePropertyName: "Afbeeldingseigenschap",
  imageFitName: "Afbeelding aanpassen",
  imageFitCoverLabel: "Vullen",
  imageFitContainLabel: "Passend",
  aspectRatioName: "Beeldverhouding afbeelding",
  compactCardSettingsGroupName: "Instellingen voor compacte kaarten",
  compactToggleName: "Compact",
  timelineDatePropertyName: "[EN] Date property",
  timelineEndDatePropertyName: "[EN] End date property",
  timelineGroupPropertyName: "[EN] Group property (lanes)",
  timelineLaneHeightName: "[EN] Lane height",
  timelineEmptyState: "[EN] No entries to show on the timeline.",
  timelineTodayMarkerColorName: "[EN] Timeline today-marker color",
  timelineTodayMarkerColorDesc: "[EN] Overrides the default theme-adaptive color of the vertical line marking today's date in the Timeline view.",
  settingsIntro: "[EN] These settings apply globally, to every Base that uses an Advanced Bases view. Per-Base display options \u2014 like card size, image fit, or lane height \u2014 are configured separately in each Base's own view settings.",
  settingsFeedHeading: "[EN] Feed view",
  settingsCardsCompactHeading: "[EN] Cards Compact",
  settingsCardsCompactDesc: "[EN] Cards Compact has no global settings. Its display options (compact mode, card size, image fit, image property, show icon) are configured per Base \u2014 open a Base using the Cards Compact view and edit its view settings from the sidebar.",
  settingsTimelineHeading: "[EN] Timeline view",
  helpAria: "Weergavehulp",
  feedHelpLine1: "Klik op de titel van een notitie om deze te openen.",
  feedHelpLine2: 'Gebruik "Nieuwe notitie" om een notitie te maken die is gekoppeld aan deze Base.',
  compactHelpLine1: "Schakel Compact in om tussen de twee lay-outs te wisselen.",
  compactHelpLine2: "Klik op een kaart om de bijbehorende notitie te openen.",
  timelineHelpLine1: "Ctrl+scrollen (of knijpen) zoomt, gewoon scrollen verschuift.",
  timelineHelpLine2: "Klik op een balk of markering om de notitie te openen.",
  timelineHelpLine3: "Klik op het kleurstaal van een baan om de kleur te wijzigen."
};
var tr = {
  newNoteButton: "Yeni not",
  createFailed: "Not olu\u015Fturulamad\u0131.",
  templateMissing: "\u015Eablon bulunamad\u0131: {path}",
  noteExists: "Not zaten var: {path}",
  enableButtonName: '"Yeni not" d\xFC\u011Fmesini g\xF6ster',
  enableButtonDesc: "Feed g\xF6r\xFCn\xFCm\xFC ara\xE7 \xE7ubu\u011Funa, ge\xE7erli Base ile ili\u015Fkili yeni bir not olu\u015Fturan bir d\xFC\u011Fme ekler.",
  folderName: "Yeni notlar i\xE7in klas\xF6r",
  folderDesc: "Yeni notlar\u0131n kaydedilece\u011Fi klas\xF6r\xFCn kasaya g\xF6reli yolu.",
  templateName: "\u015Eablon",
  templateDesc: "Yeni notlar i\xE7in kullan\u0131lan \u015Fablon dosyas\u0131n\u0131n kasaya g\xF6reli yolu.",
  showIconName: "Dosya simgesini g\xF6ster",
  cardWidthName: "Kart geni\u015Fli\u011Fi",
  showPropertiesName: "\xD6zellikleri g\xF6ster",
  showMore: "Daha fazla g\xF6ster",
  previewFailed: "(\xD6nizleme olu\u015Fturulamad\u0131.)",
  imagePropertyName: "G\xF6rsel \xF6zelli\u011Fi",
  imageFitName: "G\xF6rsel s\u0131\u011Fd\u0131rma",
  imageFitCoverLabel: "Kapla",
  imageFitContainLabel: "S\u0131\u011Fd\u0131r",
  aspectRatioName: "G\xF6rsel en boy oran\u0131",
  // flagged fallback: no fluent Turkish reviewer at authoring time, translated
  // via careful literal construction rather than idiom; follow-up: native review.
  compactCardSettingsGroupName: "Kompakt kart ayarlar\u0131",
  compactToggleName: "Kompakt",
  timelineDatePropertyName: "[EN] Date property",
  timelineEndDatePropertyName: "[EN] End date property",
  timelineGroupPropertyName: "[EN] Group property (lanes)",
  timelineLaneHeightName: "[EN] Lane height",
  timelineEmptyState: "[EN] No entries to show on the timeline.",
  timelineTodayMarkerColorName: "[EN] Timeline today-marker color",
  timelineTodayMarkerColorDesc: "[EN] Overrides the default theme-adaptive color of the vertical line marking today's date in the Timeline view.",
  settingsIntro: "[EN] These settings apply globally, to every Base that uses an Advanced Bases view. Per-Base display options \u2014 like card size, image fit, or lane height \u2014 are configured separately in each Base's own view settings.",
  settingsFeedHeading: "[EN] Feed view",
  settingsCardsCompactHeading: "[EN] Cards Compact",
  settingsCardsCompactDesc: "[EN] Cards Compact has no global settings. Its display options (compact mode, card size, image fit, image property, show icon) are configured per Base \u2014 open a Base using the Cards Compact view and edit its view settings from the sidebar.",
  settingsTimelineHeading: "[EN] Timeline view",
  helpAria: "G\xF6r\xFCn\xFCm yard\u0131m\u0131",
  feedHelpLine1: "A\xE7mak i\xE7in bir notun ba\u015Fl\u0131\u011F\u0131na t\u0131klay\u0131n.",
  feedHelpLine2: `Bu Base'e ba\u011Fl\u0131 bir not olu\u015Fturmak i\xE7in "Yeni not"u kullan\u0131n.`,
  compactHelpLine1: "\u0130ki d\xFCzen aras\u0131nda ge\xE7i\u015F yapmak i\xE7in Kompakt'\u0131 a\xE7\u0131n.",
  compactHelpLine2: "Notunu a\xE7mak i\xE7in bir karta t\u0131klay\u0131n.",
  timelineHelpLine1: "Yak\u0131nla\u015Ft\u0131rmak i\xE7in Ctrl+kayd\u0131rma (veya s\u0131k\u0131\u015Ft\u0131rma), kayd\u0131rmak i\xE7in d\xFCz kayd\u0131rma.",
  timelineHelpLine2: "Notunu a\xE7mak i\xE7in bir \xE7ubu\u011Fa veya i\u015Farete t\u0131klay\u0131n.",
  timelineHelpLine3: "Rengini de\u011Fi\u015Ftirmek i\xE7in bir \u015Feridin renk \xF6rne\u011Fine t\u0131klay\u0131n."
};
var ko = {
  newNoteButton: "\uC0C8 \uB178\uD2B8",
  createFailed: "\uB178\uD2B8\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
  templateMissing: "\uD15C\uD50C\uB9BF\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4: {path}",
  noteExists: "\uB178\uD2B8\uAC00 \uC774\uBBF8 \uC874\uC7AC\uD569\uB2C8\uB2E4: {path}",
  enableButtonName: '"\uC0C8 \uB178\uD2B8" \uBC84\uD2BC \uD45C\uC2DC',
  enableButtonDesc: "\uD604\uC7AC Base\uC5D0 \uC5F0\uACB0\uB41C \uC0C8 \uB178\uD2B8\uB97C \uB9CC\uB4DC\uB294 \uBC84\uD2BC\uC744 Feed \uBCF4\uAE30 \uD234\uBC14\uC5D0 \uCD94\uAC00\uD569\uB2C8\uB2E4.",
  folderName: "\uC0C8 \uB178\uD2B8 \uD3F4\uB354",
  folderDesc: "\uC0C8 \uB178\uD2B8\uB97C \uC800\uC7A5\uD560 \uD3F4\uB354\uC758 \uBCFC\uD2B8 \uC0C1\uB300 \uACBD\uB85C.",
  templateName: "\uD15C\uD50C\uB9BF",
  templateDesc: "\uC0C8 \uB178\uD2B8\uC5D0 \uC0AC\uC6A9\uD560 \uD15C\uD50C\uB9BF \uD30C\uC77C\uC758 \uBCFC\uD2B8 \uC0C1\uB300 \uACBD\uB85C.",
  showIconName: "\uD30C\uC77C \uC544\uC774\uCF58 \uD45C\uC2DC",
  cardWidthName: "\uCE74\uB4DC \uB108\uBE44",
  showPropertiesName: "\uC18D\uC131 \uD45C\uC2DC",
  showMore: "\uB354 \uBCF4\uAE30",
  previewFailed: "(\uBBF8\uB9AC\uBCF4\uAE30\uB97C \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.)",
  imagePropertyName: "\uC774\uBBF8\uC9C0 \uC18D\uC131",
  imageFitName: "\uC774\uBBF8\uC9C0 \uB9DE\uCDA4",
  imageFitCoverLabel: "\uCC44\uC6B0\uAE30",
  imageFitContainLabel: "\uD3EC\uD568",
  aspectRatioName: "\uC774\uBBF8\uC9C0 \uAC00\uB85C\uC138\uB85C \uBE44\uC728",
  compactCardSettingsGroupName: "\uCEF4\uD329\uD2B8 \uCE74\uB4DC \uC124\uC815",
  compactToggleName: "\uCEF4\uD329\uD2B8",
  timelineDatePropertyName: "[EN] Date property",
  timelineEndDatePropertyName: "[EN] End date property",
  timelineGroupPropertyName: "[EN] Group property (lanes)",
  timelineLaneHeightName: "[EN] Lane height",
  timelineEmptyState: "[EN] No entries to show on the timeline.",
  timelineTodayMarkerColorName: "[EN] Timeline today-marker color",
  timelineTodayMarkerColorDesc: "[EN] Overrides the default theme-adaptive color of the vertical line marking today's date in the Timeline view.",
  settingsIntro: "[EN] These settings apply globally, to every Base that uses an Advanced Bases view. Per-Base display options \u2014 like card size, image fit, or lane height \u2014 are configured separately in each Base's own view settings.",
  settingsFeedHeading: "[EN] Feed view",
  settingsCardsCompactHeading: "[EN] Cards Compact",
  settingsCardsCompactDesc: "[EN] Cards Compact has no global settings. Its display options (compact mode, card size, image fit, image property, show icon) are configured per Base \u2014 open a Base using the Cards Compact view and edit its view settings from the sidebar.",
  settingsTimelineHeading: "[EN] Timeline view",
  helpAria: "\uBCF4\uAE30 \uB3C4\uC6C0\uB9D0",
  feedHelpLine1: "\uB178\uD2B8 \uC81C\uBAA9\uC744 \uD074\uB9AD\uD558\uBA74 \uC5F4\uB9BD\uB2C8\uB2E4.",
  feedHelpLine2: '"\uC0C8 \uB178\uD2B8"\uB97C \uC0AC\uC6A9\uD574 \uC774 Base\uC5D0 \uC5F0\uACB0\uB41C \uB178\uD2B8\uB97C \uB9CC\uB4ED\uB2C8\uB2E4.',
  compactHelpLine1: "\uCEF4\uD329\uD2B8\uB97C \uCF1C\uBA74 \uB450 \uB808\uC774\uC544\uC6C3\uC744 \uC804\uD658\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
  compactHelpLine2: "\uCE74\uB4DC\uB97C \uD074\uB9AD\uD558\uBA74 \uD574\uB2F9 \uB178\uD2B8\uAC00 \uC5F4\uB9BD\uB2C8\uB2E4.",
  timelineHelpLine1: "Ctrl+\uC2A4\uD06C\uB864(\uB610\uB294 \uD540\uCE58)\uB85C \uD655\uB300/\uCD95\uC18C, \uC77C\uBC18 \uC2A4\uD06C\uB864\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.",
  timelineHelpLine2: "\uB9C9\uB300\uB098 \uB9C8\uCEE4\uB97C \uD074\uB9AD\uD558\uBA74 \uB178\uD2B8\uAC00 \uC5F4\uB9BD\uB2C8\uB2E4.",
  timelineHelpLine3: "\uB808\uC778\uC758 \uC0C9\uC0C1 \uACAC\uBCF8\uC744 \uD074\uB9AD\uD558\uBA74 \uC0C9\uC0C1\uC744 \uBCC0\uACBD\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
};
var LOCALES = {
  en,
  cs,
  de,
  fr,
  es,
  it,
  pt,
  ru,
  ja,
  zh,
  pl,
  uk,
  nl,
  tr,
  ko
};
function resolveLocale(raw) {
  const normalized = (raw || "en").toLowerCase();
  if (LOCALES[normalized]) return normalized;
  const base = normalized.split("-")[0];
  if (LOCALES[base]) return base;
  return "en";
}
function detectRawLanguage() {
  try {
    return (0, import_obsidian2.getLanguage)();
  } catch (e) {
    return null;
  }
}
function getStrings() {
  var _a;
  return (_a = LOCALES[resolveLocale(detectRawLanguage())]) != null ? _a : en;
}
function format(template, vars) {
  let out = template;
  for (const [key, value] of Object.entries(vars)) {
    out = out.replace(`{${key}}`, value);
  }
  return out;
}

// src/compactCardsView.ts
var COMPACT_CARDS_VIEW_TYPE = "Cards-Compact";
var DEFAULT_CARD_SIZE = 200;
var DEFAULT_ASPECT_RATIO = 1;
var EXTENSION_ICONS = {
  pdf: "file-text",
  md: "file-text",
  canvas: "layout-dashboard",
  png: "image",
  jpg: "image",
  jpeg: "image",
  gif: "image",
  webp: "image",
  svg: "image",
  bmp: "image",
  mp3: "music",
  wav: "music",
  flac: "music",
  ogg: "music",
  m4a: "music",
  mp4: "video",
  mov: "video",
  webm: "video",
  mkv: "video"
};
function getFileIcon(extension) {
  var _a;
  return (_a = EXTENSION_ICONS[extension.toLowerCase()]) != null ? _a : "file";
}
function cleanLinkTarget(raw) {
  return raw.trim().replace(/^!?\[\[/, "").replace(/\]\]$/, "").split("|")[0].trim();
}
function resolveImageSrc(app, sourceFile, raw) {
  const cleaned = cleanLinkTarget(raw);
  if (!cleaned) return null;
  if (/^https?:\/\//i.test(cleaned)) return cleaned;
  const dest = app.metadataCache.getFirstLinkpathDest(cleaned, sourceFile.path);
  return dest instanceof import_obsidian3.TFile ? app.vault.getResourcePath(dest) : null;
}
function getImageSrc(app, file, propId) {
  var _a;
  if (!propId) return null;
  const dot = propId.indexOf(".");
  if (dot === -1 || propId.slice(0, dot) !== "note") return null;
  const key = propId.slice(dot + 1);
  const frontmatter = (_a = app.metadataCache.getFileCache(file)) == null ? void 0 : _a.frontmatter;
  const raw = frontmatter == null ? void 0 : frontmatter[key];
  if (!raw) return null;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return typeof value === "string" ? resolveImageSrc(app, file, value) : null;
}
var CompactCardsView = class extends import_obsidian3.BasesView {
  constructor(controller, containerEl) {
    super(controller);
    this.type = COMPACT_CARDS_VIEW_TYPE;
    containerEl.empty();
    containerEl.addClass("compact-cards-container");
    this.gridEl = containerEl.createDiv({ cls: "compact-cards-grid" });
  }
  get isCompact() {
    const value = this.config.get("compact");
    return value === true || value === "compact";
  }
  get showIcon() {
    return this.config.get("showIcon") !== false;
  }
  get imageFit() {
    return this.config.get("imageFit") === "contain" ? "contain" : "cover";
  }
  get imageAspectRatio() {
    return Number(this.config.get("imageAspectRatio")) || DEFAULT_ASPECT_RATIO;
  }
  get cardSize() {
    return Number(this.config.get("cardSize")) || DEFAULT_CARD_SIZE;
  }
  onDataUpdated() {
    const t = getStrings();
    ensureViewHelpButton(this.gridEl, t.helpAria, () => ({
      title: "Cards Compact",
      lines: [t.compactHelpLine1, t.compactHelpLine2]
    }));
    this.gridEl.empty();
    const compact = this.isCompact;
    this.gridEl.toggleClass("compact-cards-grid-compact", compact);
    this.gridEl.style.setProperty("--compact-card-size", `${this.cardSize}px`);
    this.gridEl.style.setProperty("--compact-card-aspect", String(this.imageAspectRatio));
    const imagePropId = this.config.getAsPropertyId("imageProperty");
    for (const entry of this.data.data) {
      if (compact) {
        this.renderCompactCard(entry, imagePropId);
      } else {
        this.renderImageCard(entry, imagePropId);
      }
    }
  }
  renderImageCard(entry, imagePropId) {
    const cardEl = this.gridEl.createDiv({ cls: "compact-cards-card" });
    cardEl.addEventListener("click", () => {
      void this.app.workspace.getLeaf(false).openFile(entry.file);
    });
    const coverEl = cardEl.createDiv({
      cls: `compact-cards-cover is-${this.imageFit}`
    });
    const src = getImageSrc(this.app, entry.file, imagePropId);
    if (src) {
      coverEl.createEl("img", { attr: { src, loading: "lazy" } });
    } else {
      coverEl.addClass("is-empty");
      (0, import_obsidian3.setIcon)(coverEl.createDiv({ cls: "compact-cards-cover-icon" }), getFileIcon(entry.file.extension));
    }
    cardEl.createDiv({ cls: "compact-cards-title", text: entry.file.basename });
    this.renderProperties(cardEl, entry);
  }
  // Notion-style compact row: same full-width cover image as the Normal
  // layout (only rendered when an image actually resolves — otherwise the
  // row stays lean with no empty placeholder), icon + title below, property
  // values as small inline pills.
  renderCompactCard(entry, imagePropId) {
    const cardEl = this.gridEl.createDiv({ cls: "compact-cards-card compact-cards-card-compact" });
    cardEl.addEventListener("click", () => {
      void this.app.workspace.getLeaf(false).openFile(entry.file);
    });
    const src = getImageSrc(this.app, entry.file, imagePropId);
    if (src) {
      const coverEl = cardEl.createDiv({ cls: `compact-cards-cover is-${this.imageFit}` });
      coverEl.createEl("img", { attr: { src, loading: "lazy" } });
    }
    const bodyEl = cardEl.createDiv({ cls: "compact-cards-body" });
    const headerEl = bodyEl.createDiv({ cls: "compact-cards-header" });
    if (this.showIcon) {
      const iconEl = headerEl.createDiv({ cls: "compact-cards-icon" });
      (0, import_obsidian3.setIcon)(iconEl, getFileIcon(entry.file.extension));
    }
    headerEl.createDiv({ cls: "compact-cards-title", text: entry.file.basename });
    this.renderPills(bodyEl, entry);
  }
  // Normal (Gallery) layout renders each configured property as a labeled
  // row — the property name above its value — matching Obsidian's native
  // Cards view. The label is shown for every property in the configured
  // order, even when the value is empty (native does the same). Which
  // properties appear is controlled by Bases' own "Properties" toolbar
  // picker (config.getOrder()). The leaner inline pills (renderPills) are
  // reserved for the Compact layout.
  renderProperties(cardEl, entry) {
    const order = this.config.getOrder();
    if (order.length === 0) return;
    const listEl = cardEl.createDiv({ cls: "compact-cards-properties" });
    const ctx = new import_obsidian3.RenderContext();
    for (const propId of order) {
      const rowEl = listEl.createDiv({ cls: "compact-cards-property" });
      rowEl.createDiv({
        cls: "compact-cards-property-label",
        text: this.config.getDisplayName(propId)
      });
      const valueEl = rowEl.createDiv({ cls: "compact-cards-property-value" });
      const value = entry.getValue(propId);
      if (value !== null) {
        value.renderTo(valueEl, ctx);
      }
    }
  }
  // Compact layout: property values as small inline pills (no name labels).
  renderPills(cardEl, entry) {
    const order = this.config.getOrder();
    if (order.length === 0) return;
    const rowEl = cardEl.createDiv({ cls: "compact-cards-pills" });
    const ctx = new import_obsidian3.RenderContext();
    for (const propId of order) {
      const value = entry.getValue(propId);
      if (value === null) continue;
      const pillEl = rowEl.createDiv({ cls: "compact-cards-pill" });
      value.renderTo(pillEl, ctx);
    }
  }
};

// src/feedView.ts
var import_obsidian6 = require("obsidian");

// src/feedViewNoteCreator.ts
var import_obsidian5 = require("obsidian");

// src/feedViewNoteTemplate.ts
function renderFeedViewNoteTemplate(raw, title, now) {
  let out = raw;
  out = out.replace(/\{\{\s*title\s*\}\}/gi, title);
  out = out.replace(/\{\{\s*date\s*:([^}]*)\}\}/gi, (_match, fmt) => now.format(fmt));
  out = out.replace(/\{\{\s*time\s*:([^}]*)\}\}/gi, (_match, fmt) => now.format(fmt));
  out = out.replace(/\{\{\s*date\s*\}\}/gi, now.format("YYYY-MM-DD"));
  out = out.replace(/\{\{\s*time\s*\}\}/gi, now.format("HH:mm"));
  return out;
}
function buildFeedViewNoteBasename(now, baseName) {
  return `${now.format("YYYY. M. D")} \u2013 ${baseName}`;
}
function buildFeedViewNotePath(folder, basename) {
  const cleanFolder = folder.replace(/\/+$/, "");
  return `${cleanFolder}/${basename}.md`;
}
function buildBaseWikilink(baseName) {
  return `[[${baseName}]]`;
}

// src/settings.ts
var import_obsidian4 = require("obsidian");
var DEFAULT_SETTINGS = {
  feedViewNoteFolder: "\u0160kola/MUNI/Lekce",
  feedViewNoteTemplatePath: "-Template/Hodiny Template.md",
  showNewNoteButton: true,
  todayMarkerColor: ""
};
function migrateSettings(loaded) {
  const migrated = { ...loaded };
  if (migrated.feedViewNoteFolder === void 0 && loaded.lessonFolder !== void 0) {
    migrated.feedViewNoteFolder = loaded.lessonFolder;
  }
  if (migrated.feedViewNoteTemplatePath === void 0 && loaded.lessonTemplatePath !== void 0) {
    migrated.feedViewNoteTemplatePath = loaded.lessonTemplatePath;
  }
  delete migrated.lessonFolder;
  delete migrated.lessonTemplatePath;
  return Object.assign({}, DEFAULT_SETTINGS, migrated);
}
var AdvancedBasesSettingTab = class extends import_obsidian4.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  // @ts-ignore: display() is deprecated in Obsidian 1.13.0, but we must use it to maintain compatibility with older Obsidian versions (minAppVersion is 1.10.0)
  display() {
    const { containerEl } = this;
    containerEl.empty();
    const t = getStrings();
    containerEl.createEl("p", {
      text: t.settingsIntro,
      cls: "setting-item-description"
    });
    new import_obsidian4.Setting(containerEl).setName(t.settingsFeedHeading).setHeading();
    new import_obsidian4.Setting(containerEl).setName(t.enableButtonName).setDesc(t.enableButtonDesc).addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.showNewNoteButton).onChange(async (value) => {
        this.plugin.settings.showNewNoteButton = value;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(containerEl).setName(t.folderName).setDesc(t.folderDesc).addText((text) => {
      text.setPlaceholder(DEFAULT_SETTINGS.feedViewNoteFolder).setValue(this.plugin.settings.feedViewNoteFolder).onChange(async (value) => {
        this.plugin.settings.feedViewNoteFolder = (0, import_obsidian4.normalizePath)(
          value.trim() || DEFAULT_SETTINGS.feedViewNoteFolder
        );
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(containerEl).setName(t.templateName).setDesc(t.templateDesc).addText((text) => {
      text.setPlaceholder(DEFAULT_SETTINGS.feedViewNoteTemplatePath).setValue(this.plugin.settings.feedViewNoteTemplatePath).onChange(async (value) => {
        this.plugin.settings.feedViewNoteTemplatePath = (0, import_obsidian4.normalizePath)(
          value.trim() || DEFAULT_SETTINGS.feedViewNoteTemplatePath
        );
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(containerEl).setName(t.settingsCardsCompactHeading).setHeading();
    containerEl.createEl("p", {
      text: t.settingsCardsCompactDesc,
      cls: "setting-item-description"
    });
    new import_obsidian4.Setting(containerEl).setName(t.settingsTimelineHeading).setHeading();
    new import_obsidian4.Setting(containerEl).setName(t.timelineTodayMarkerColorName).setDesc(t.timelineTodayMarkerColorDesc).addColorPicker((picker) => {
      picker.setValue(this.plugin.settings.todayMarkerColor || "#000000").onChange(async (value) => {
        this.plugin.settings.todayMarkerColor = value;
        await this.plugin.saveSettings();
      });
    }).addExtraButton((button) => {
      button.setIcon("rotate-ccw").setTooltip("Reset to theme default").onClick(async () => {
        this.plugin.settings.todayMarkerColor = DEFAULT_SETTINGS.todayMarkerColor;
        await this.plugin.saveSettings();
        this.display();
      });
    });
  }
};

// src/feedViewNoteCreator.ts
function settingPath(value, fallback) {
  return (0, import_obsidian5.normalizePath)(value.trim() || fallback);
}
async function ensureFolder(app, path) {
  const normalizedPath = (0, import_obsidian5.normalizePath)(path);
  const exact = app.vault.getAbstractFileByPath(normalizedPath);
  if (exact instanceof import_obsidian5.TFolder) return exact;
  const lowerPath = normalizedPath.toLocaleLowerCase();
  const existing = app.vault.getAllLoadedFiles().find((file) => file instanceof import_obsidian5.TFolder && file.path.toLocaleLowerCase() === lowerPath);
  if (existing instanceof import_obsidian5.TFolder) return existing;
  await app.vault.createFolder(normalizedPath);
  const created = app.vault.getAbstractFileByPath(normalizedPath);
  if (created instanceof import_obsidian5.TFolder) return created;
  throw new Error(`Failed to create folder: ${normalizedPath}`);
}
async function createFeedViewNote(app, baseName, settings) {
  const t = getStrings();
  const templatePath = settingPath(
    settings.feedViewNoteTemplatePath,
    DEFAULT_SETTINGS.feedViewNoteTemplatePath
  );
  const noteFolder = settingPath(settings.feedViewNoteFolder, DEFAULT_SETTINGS.feedViewNoteFolder);
  const templateFile = app.vault.getAbstractFileByPath(templatePath);
  if (!(templateFile instanceof import_obsidian5.TFile)) {
    new import_obsidian5.Notice(format(t.templateMissing, { path: templatePath }));
    return;
  }
  const now = (0, import_obsidian5.moment)();
  const basename = buildFeedViewNoteBasename(now, baseName);
  const folder = await ensureFolder(app, noteFolder);
  const path = (0, import_obsidian5.normalizePath)(buildFeedViewNotePath(folder.path, basename));
  if (app.vault.getAbstractFileByPath(path)) {
    new import_obsidian5.Notice(format(t.noteExists, { path }));
    return;
  }
  const rawTemplate = await app.vault.cachedRead(templateFile);
  const rendered = renderFeedViewNoteTemplate(rawTemplate, basename, now);
  const file = await app.vault.create(path, rendered);
  const baseFile = app.vault.getAbstractFileByPath(`${baseName}.md`);
  await app.fileManager.processFrontMatter(file, (fm) => {
    fm.kurz = baseFile instanceof import_obsidian5.TFile ? app.fileManager.generateMarkdownLink(baseFile, file.path) : buildBaseWikilink(baseName);
  });
  await app.workspace.getLeaf(false).openFile(file);
}

// src/feedView.ts
var FEED_VIEW_TYPE = "feed";
var BODY_MAX_HEIGHT = 300;
var FeedView = class extends import_obsidian6.BasesView {
  constructor(controller, containerEl, getSettings) {
    super(controller);
    this.getSettings = getSettings;
    this.type = FEED_VIEW_TYPE;
    this.cardBodies = /* @__PURE__ */ new WeakMap();
    containerEl.empty();
    containerEl.addClass("feed-view-container");
    if (this.getSettings().showNewNoteButton) {
      const toolbarEl = containerEl.createDiv({ cls: "feed-view-toolbar" });
      const newNoteButton = toolbarEl.createEl("button", {
        cls: "feed-view-new-note-button",
        text: getStrings().newNoteButton
      });
      newNoteButton.addEventListener("click", () => {
        createFeedViewNote(this.app, this.config.name, this.getSettings()).catch((err) => {
          console.error("[advanced-bases] failed to create note", err);
          new import_obsidian6.Notice(getStrings().createFailed);
        });
      });
    }
    this.listEl = containerEl.createDiv({ cls: "feed-view-list" });
    this.observer = new IntersectionObserver(
      (observerEntries) => {
        for (const observerEntry of observerEntries) {
          const bodyEl = observerEntry.target;
          if (observerEntry.isIntersecting) {
            void this.mountBody(bodyEl);
          } else {
            this.unmountBody(bodyEl);
          }
        }
      },
      { root: this.listEl, rootMargin: "400px 0px" }
    );
    this.register(() => this.observer.disconnect());
  }
  onDataUpdated() {
    const t = getStrings();
    ensureViewHelpButton(this.listEl, t.helpAria, () => ({
      title: "Feed",
      lines: [t.feedHelpLine1, t.feedHelpLine2]
    }));
    this.observer.disconnect();
    this.listEl.empty();
    for (const entry of this.data.data) {
      this.renderCard(entry);
    }
  }
  renderCard(entry) {
    const cardEl = this.listEl.createDiv({ cls: "feed-view-card" });
    const titleEl = cardEl.createDiv({
      cls: "feed-view-card-title",
      text: entry.file.basename
    });
    titleEl.addEventListener("click", () => {
      void this.app.workspace.getLeaf(false).openFile(entry.file);
    });
    if (this.config.get("showProperties") !== false) {
      this.renderProperties(cardEl, entry);
    }
    const bodyWrapEl = cardEl.createDiv({ cls: "feed-view-card-body-wrap" });
    const bodyEl = bodyWrapEl.createDiv({ cls: "feed-view-card-body" });
    const fadeEl = bodyWrapEl.createDiv({ cls: "feed-view-card-fade is-hidden" });
    const showMoreEl = bodyWrapEl.createEl("button", {
      cls: "feed-view-card-show-more is-hidden",
      text: getStrings().showMore
    });
    showMoreEl.addEventListener("click", () => {
      bodyWrapEl.addClass("feed-view-card-body-wrap-expanded");
      fadeEl.addClass("is-hidden");
      showMoreEl.addClass("is-hidden");
    });
    this.cardBodies.set(bodyEl, { file: entry.file, fadeEl, showMoreEl, mounted: false });
    this.observer.observe(bodyEl);
  }
  renderProperties(cardEl, entry) {
    const order = this.config.getOrder();
    if (order.length === 0) return;
    const rowEl = cardEl.createDiv({ cls: "feed-view-card-properties" });
    const ctx = new import_obsidian6.RenderContext();
    for (const propId of order) {
      const value = entry.getValue(propId);
      if (value === null) continue;
      const propEl = rowEl.createDiv({ cls: "feed-view-card-property" });
      propEl.createSpan({
        cls: "feed-view-card-property-name",
        text: this.config.getDisplayName(propId) + ": "
      });
      const valueEl = propEl.createSpan({ cls: "feed-view-card-property-value" });
      value.renderTo(valueEl, ctx);
    }
  }
  async mountBody(bodyEl) {
    const card = this.cardBodies.get(bodyEl);
    if (!card || card.mounted) return;
    card.mounted = true;
    try {
      const raw = await this.app.vault.cachedRead(card.file);
      const withoutFrontmatter = raw.replace(/^---\n[\s\S]*?\n---\n/, "");
      bodyEl.empty();
      await import_obsidian6.MarkdownRenderer.render(this.app, withoutFrontmatter, bodyEl, card.file.path, this);
      if (bodyEl.scrollHeight > BODY_MAX_HEIGHT) {
        card.fadeEl.removeClass("is-hidden");
        card.showMoreEl.removeClass("is-hidden");
      }
    } catch (err) {
      console.error("[advanced-bases] failed to render card body", card.file.path, err);
      bodyEl.setText(getStrings().previewFailed);
    }
  }
  unmountBody(bodyEl) {
    const card = this.cardBodies.get(bodyEl);
    if (!card || !card.mounted) return;
    card.mounted = false;
    bodyEl.empty();
  }
};

// src/timelineView.ts
var import_obsidian8 = require("obsidian");

// src/shared/groupColor.ts
var GROUP_COLOR_PALETTE = [
  "#e06c75",
  // red
  "#e5a94c",
  // orange
  "#e5c94c",
  // yellow
  "#98c379",
  // green
  "#56b6c2",
  // cyan
  "#61afef",
  // blue
  "#b389f0",
  // purple
  "#d47fb0"
  // pink
];
function hashStringToIndex(value, modulo) {
  let hash = 5381;
  for (let i = 0; i < value.length; i++) {
    hash = hash * 33 ^ value.charCodeAt(i);
  }
  return (hash >>> 0) % modulo;
}
function getAutoColor(value) {
  const index = hashStringToIndex(value, GROUP_COLOR_PALETTE.length);
  return GROUP_COLOR_PALETTE[index];
}
function resolveGroupColor(value, overrides) {
  var _a;
  return (_a = overrides[value]) != null ? _a : getAutoColor(value);
}
function loadGroupColorOverrides(config, key) {
  const raw = config.get(key);
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const result = {};
    for (const [groupValue, hex] of Object.entries(raw)) {
      if (typeof hex === "string") result[groupValue] = hex;
    }
    return result;
  }
  return {};
}
function saveGroupColorOverride(config, key, groupValue, hex) {
  const current = loadGroupColorOverrides(config, key);
  current[groupValue] = hex;
  config.set(key, current);
}
function renderColorSwatch(parentEl, currentColor, onChange) {
  const swatchEl = parentEl.createEl("button", {
    cls: "advanced-bases-color-swatch",
    attr: { type: "button", "aria-label": "Change color" }
  });
  swatchEl.setCssProps({ "--swatch-color": currentColor });
  const inputEl = parentEl.createEl("input", {
    attr: { type: "color", value: currentColor }
  });
  inputEl.setCssStyles({ display: "none" });
  swatchEl.addEventListener("click", (event) => {
    event.stopPropagation();
    inputEl.click();
  });
  inputEl.addEventListener("input", () => {
    swatchEl.style.setProperty("--swatch-color", inputEl.value);
    onChange(inputEl.value);
  });
  return swatchEl;
}

// src/timelineAxis.ts
var TICK_CASCADE = [
  "day",
  "week",
  "month",
  "quarter",
  "year",
  "5years",
  "10years",
  "25years",
  "100years"
];
var UNIT_DAY_SPAN = {
  day: 1,
  week: 7,
  month: 30.44,
  // average Gregorian month length
  quarter: 91.3125,
  // 365.25 / 4
  year: 365.25,
  "5years": 5 * 365.25,
  "10years": 10 * 365.25,
  "25years": 25 * 365.25,
  "100years": 100 * 365.25
};
function pickTickUnit(pxPerDay, minLabelSpacingPx = 60) {
  for (const unit of TICK_CASCADE) {
    const spacingPx = UNIT_DAY_SPAN[unit] * pxPerDay;
    if (spacingPx >= minLabelSpacingPx) {
      return unit;
    }
  }
  return "100years";
}
function quarterLabel(date) {
  return `Q${Math.floor(date.month() / 3) + 1}`;
}
function decadeLabel(date) {
  const decadeStart = Math.floor(date.year() / 10) * 10;
  return `${decadeStart}s`;
}
function periodLabel(date, spanYears) {
  const periodStart = Math.floor(date.year() / spanYears) * spanYears;
  return `${periodStart}s`;
}
function formatTickLabel(date, unit) {
  switch (unit) {
    case "day":
    case "week":
      return String(date.date());
    case "month":
      return date.format("MMM");
    case "quarter":
      return quarterLabel(date);
    case "year":
    case "5years":
      return String(date.year());
    case "10years":
      return decadeLabel(date);
    case "25years":
      return periodLabel(date, 25);
    case "100years":
      return periodLabel(date, 100);
  }
}
function generateAxisTicks(rangeStart, rangeEnd, pxPerDay, unit) {
  if (rangeStart.isAfter(rangeEnd)) return [];
  const ticks = [];
  switch (unit) {
    case "day": {
      const cursor = rangeStart.clone().startOf("day");
      while (!cursor.isAfter(rangeEnd)) {
        ticks.push({ date: cursor.clone(), label: formatTickLabel(cursor, unit) });
        cursor.add(1, "day");
      }
      break;
    }
    case "week": {
      const cursor = rangeStart.clone().startOf("week");
      while (!cursor.isAfter(rangeEnd)) {
        if (!cursor.isBefore(rangeStart, "day")) {
          ticks.push({ date: cursor.clone(), label: formatTickLabel(cursor, unit) });
        }
        cursor.add(1, "week");
      }
      break;
    }
    case "month": {
      const cursor = rangeStart.clone().startOf("month");
      while (!cursor.isAfter(rangeEnd)) {
        ticks.push({ date: cursor.clone(), label: formatTickLabel(cursor, unit) });
        cursor.add(1, "month");
      }
      break;
    }
    case "quarter": {
      const cursor = rangeStart.clone().startOf("quarter");
      while (!cursor.isAfter(rangeEnd)) {
        ticks.push({ date: cursor.clone(), label: formatTickLabel(cursor, unit) });
        cursor.add(3, "months");
      }
      break;
    }
    case "year": {
      const cursor = rangeStart.clone().startOf("year");
      while (!cursor.isAfter(rangeEnd)) {
        ticks.push({ date: cursor.clone(), label: formatTickLabel(cursor, unit) });
        cursor.add(1, "year");
      }
      break;
    }
    case "5years":
    case "10years":
    case "25years":
    case "100years": {
      const spanYears = unit === "5years" ? 5 : unit === "10years" ? 10 : unit === "25years" ? 25 : 100;
      const alignedStartYear = Math.floor(rangeStart.year() / spanYears) * spanYears;
      const cursor = rangeStart.clone().year(alignedStartYear).startOf("year");
      while (!cursor.isAfter(rangeEnd)) {
        if (!cursor.isBefore(rangeStart, "year")) {
          ticks.push({ date: cursor.clone(), label: formatTickLabel(cursor, unit) });
        }
        cursor.add(spanYears, "years");
      }
      break;
    }
  }
  return ticks;
}

// src/timelineLayout.ts
var import_obsidian7 = require("obsidian");
var MIN_PX_PER_DAY = 2e-3;
var MAX_PX_PER_DAY = 2e3;
function clampPxPerDay(pxPerDay) {
  return Math.min(MAX_PX_PER_DAY, Math.max(MIN_PX_PER_DAY, pxPerDay));
}
function computeDateRange(dates, paddingDays = 30) {
  if (dates.length === 0) {
    const today = (0, import_obsidian7.moment)();
    return {
      start: today.clone().subtract(paddingDays, "days"),
      end: today.clone().add(paddingDays, "days")
    };
  }
  let earliest = dates[0];
  let latest = dates[0];
  for (const date of dates) {
    if (date.isBefore(earliest)) earliest = date;
    if (date.isAfter(latest)) latest = date;
  }
  return {
    start: earliest.clone().subtract(paddingDays, "days"),
    end: latest.clone().add(paddingDays, "days")
  };
}
function dateToX(date, rangeStart, pxPerDay) {
  const daysElapsed = date.diff(rangeStart, "days", true);
  return daysElapsed * pxPerDay;
}
function computeBarGeometry(startDate, endDate, rangeStart, pxPerDay, minMarkerWidth = 12) {
  if (endDate === null) {
    const centerX = dateToX(startDate, rangeStart, pxPerDay);
    return { left: centerX - minMarkerWidth / 2, width: minMarkerWidth };
  }
  const [earlier, later] = startDate.isAfter(endDate) ? [endDate, startDate] : [startDate, endDate];
  const left = dateToX(earlier, rangeStart, pxPerDay);
  const right = dateToX(later, rangeStart, pxPerDay);
  const width = Math.max(minMarkerWidth, right - left);
  return { left, width };
}
function groupIntoLanes(items, getGroupValue) {
  const laneOrder = [];
  const laneMap = /* @__PURE__ */ new Map();
  for (const item of items) {
    const rawKey = getGroupValue(item);
    const key = rawKey != null ? rawKey : "";
    if (!laneMap.has(key)) {
      laneMap.set(key, []);
      laneOrder.push(key);
    }
    laneMap.get(key).push(item);
  }
  return laneOrder.map((key) => ({ key, entries: laneMap.get(key) }));
}
function zoomAnchoredPxPerDay(currentPxPerDay, deltaY, zoomFactorPerNotch = 15e-4) {
  const factor = Math.exp(-deltaY * zoomFactorPerNotch);
  return clampPxPerDay(currentPxPerDay * factor);
}

// src/timelineView.ts
var TIMELINE_VIEW_TYPE = "timeline";
var LANE_COLORS_CONFIG_KEY = "laneColors";
var DEFAULT_LANE_HEIGHT = 48;
var AXIS_HEIGHT = 32;
var DEFAULT_PX_PER_DAY = 20;
var TimelineView = class extends import_obsidian8.BasesView {
  constructor(controller, containerEl, getSettings) {
    super(controller);
    this.getSettings = getSettings;
    this.type = TIMELINE_VIEW_TYPE;
    this.pxPerDay = DEFAULT_PX_PER_DAY;
    this.laneColorOverrides = {};
    this.onWheel = (event) => {
      if (!event.ctrlKey) {
        if (event.deltaY !== 0) {
          event.preventDefault();
          this.scrollEl.scrollLeft += event.deltaY;
        }
        return;
      }
      event.preventDefault();
      const rect = this.scrollEl.getBoundingClientRect();
      const cursorXInScroll = event.clientX - rect.left;
      const cursorXInContent = cursorXInScroll + this.scrollEl.scrollLeft;
      const dateUnderCursorDays = cursorXInContent / this.pxPerDay;
      const nextPxPerDay = zoomAnchoredPxPerDay(this.pxPerDay, event.deltaY);
      this.pxPerDay = nextPxPerDay;
      this.onDataUpdated();
      const newCursorXInContent = dateUnderCursorDays * nextPxPerDay;
      this.scrollEl.scrollLeft = newCursorXInContent - cursorXInScroll;
    };
    containerEl.empty();
    containerEl.addClass("timeline-view-container");
    this.scrollEl = containerEl.createDiv({ cls: "timeline-view-scroll" });
    this.contentEl = this.scrollEl.createDiv({ cls: "timeline-view-content" });
    this.axisEl = this.contentEl.createDiv({ cls: "timeline-view-axis" });
    this.lanesEl = this.contentEl.createDiv({ cls: "timeline-view-lanes" });
    this.emptyStateEl = containerEl.createDiv({
      cls: "timeline-view-empty is-hidden",
      text: getStrings().timelineEmptyState
    });
    this.scrollEl.addEventListener("wheel", this.onWheel, { passive: false });
  }
  onunload() {
    this.scrollEl.removeEventListener("wheel", this.onWheel);
  }
  get dateProperty() {
    return this.config.getAsPropertyId("dateProperty");
  }
  get endDateProperty() {
    return this.config.getAsPropertyId("endDateProperty");
  }
  get groupProperty() {
    return this.config.getAsPropertyId("groupProperty");
  }
  get laneHeight() {
    return Number(this.config.get("laneHeight")) || DEFAULT_LANE_HEIGHT;
  }
  get todayMarkerColor() {
    const override = this.getSettings().todayMarkerColor;
    return override && override.length > 0 ? override : "var(--text-normal)";
  }
  // Resolves an entry's start date. Falls back to file.ctime when
  // dateProperty is unset on the view or empty on this specific entry, so
  // every entry always has *some* placement (project spec's fallback rule).
  resolveStartDate(entry) {
    const dateProp = this.dateProperty;
    if (dateProp) {
      const value = entry.getValue(dateProp);
      if (value !== null) {
        const parsed = (0, import_obsidian8.moment)(value.toString());
        if (parsed.isValid()) return parsed;
      }
    }
    return (0, import_obsidian8.moment)(entry.file.stat.ctime);
  }
  resolveEndDate(entry) {
    const endProp = this.endDateProperty;
    if (!endProp) return null;
    const value = entry.getValue(endProp);
    if (value === null) return null;
    const parsed = (0, import_obsidian8.moment)(value.toString());
    return parsed.isValid() ? parsed : null;
  }
  resolveGroupValue(entry) {
    const groupProp = this.groupProperty;
    if (!groupProp) return null;
    const value = entry.getValue(groupProp);
    if (value === null) return null;
    const text = value.toString().trim();
    return text.length > 0 ? text : null;
  }
  onDataUpdated() {
    const t = getStrings();
    ensureViewHelpButton(this.scrollEl, t.helpAria, () => ({
      title: "Timeline",
      lines: [t.timelineHelpLine1, t.timelineHelpLine2, t.timelineHelpLine3]
    }));
    this.laneColorOverrides = loadGroupColorOverrides(this.config, LANE_COLORS_CONFIG_KEY);
    const timelineEntries = this.data.data.map((entry) => ({
      entry,
      start: this.resolveStartDate(entry),
      end: this.resolveEndDate(entry),
      groupValue: this.resolveGroupValue(entry)
    }));
    const isEmpty = timelineEntries.length === 0;
    this.emptyStateEl.toggleClass("is-hidden", !isEmpty);
    this.scrollEl.toggleClass("is-hidden", isEmpty);
    if (isEmpty) return;
    const allDates = timelineEntries.flatMap((te) => te.end ? [te.start, te.end] : [te.start]);
    const range = computeDateRange(allDates);
    const lanes = groupIntoLanes(timelineEntries, (te) => te.groupValue);
    this.render(range, lanes);
  }
  render(range, lanes) {
    this.pxPerDay = clampPxPerDay(this.pxPerDay);
    const totalDays = range.end.diff(range.start, "days", true);
    const totalWidth = Math.max(1, totalDays * this.pxPerDay);
    const totalHeight = AXIS_HEIGHT + lanes.length * this.laneHeight;
    this.contentEl.style.width = `${totalWidth}px`;
    this.contentEl.style.height = `${totalHeight}px`;
    this.renderAxis(range, totalWidth);
    this.renderLanes(range, lanes);
    this.renderTodayMarker(range, totalHeight);
  }
  renderAxis(range, totalWidth) {
    this.axisEl.empty();
    this.axisEl.style.width = `${totalWidth}px`;
    this.axisEl.style.height = `${AXIS_HEIGHT}px`;
    const unit = pickTickUnit(this.pxPerDay);
    const ticks = generateAxisTicks(range.start, range.end, this.pxPerDay, unit);
    for (const tick of ticks) {
      const x = dateToX(tick.date, range.start, this.pxPerDay);
      const tickEl = this.axisEl.createDiv({ cls: "timeline-view-axis-tick" });
      tickEl.style.left = `${x}px`;
      tickEl.createDiv({ cls: "timeline-view-axis-tick-line" });
      tickEl.createDiv({ cls: "timeline-view-axis-tick-label", text: tick.label });
    }
  }
  renderLanes(range, lanes) {
    this.lanesEl.empty();
    this.lanesEl.style.top = `${AXIS_HEIGHT}px`;
    lanes.forEach((lane, laneIndex) => {
      const laneEl = this.lanesEl.createDiv({ cls: "timeline-view-lane" });
      laneEl.style.top = `${laneIndex * this.laneHeight}px`;
      laneEl.style.height = `${this.laneHeight}px`;
      const color = resolveGroupColor(lane.key, this.laneColorOverrides);
      if (lane.key.length > 0) {
        this.renderLaneHeader(lane.key, color);
      }
      for (const te of lane.entries) {
        this.renderBar(laneEl, te, range, color);
      }
    });
  }
  renderLaneHeader(groupValue, color) {
    const headerEl = this.lanesEl.createDiv({ cls: "timeline-view-lane-header" });
    headerEl.createSpan({ cls: "timeline-view-lane-header-label", text: groupValue });
    renderColorSwatch(headerEl, color, (hex) => {
      saveGroupColorOverride(this.config, LANE_COLORS_CONFIG_KEY, groupValue, hex);
      this.onDataUpdated();
    });
  }
  renderBar(laneEl, te, range, color) {
    const geometry = computeBarGeometry(te.start, te.end, range.start, this.pxPerDay);
    const isMarker = te.end === null;
    const barEl = laneEl.createDiv({
      cls: isMarker ? "timeline-view-marker" : "timeline-view-bar",
      attr: { title: te.entry.file.basename }
    });
    barEl.style.left = `${geometry.left}px`;
    barEl.style.width = `${geometry.width}px`;
    barEl.style.backgroundColor = color;
    barEl.createSpan({ cls: "timeline-view-bar-label", text: te.entry.file.basename });
    barEl.addEventListener("click", () => {
      void this.app.workspace.getLeaf(false).openFile(te.entry.file);
    });
  }
  renderTodayMarker(range, totalHeight) {
    var _a;
    (_a = this.contentEl.querySelector(".timeline-view-today-marker")) == null ? void 0 : _a.remove();
    const today = (0, import_obsidian8.moment)();
    if (today.isBefore(range.start) || today.isAfter(range.end)) return;
    const x = dateToX(today, range.start, this.pxPerDay);
    const markerEl = this.contentEl.createDiv({ cls: "timeline-view-today-marker" });
    markerEl.style.left = `${x}px`;
    markerEl.style.height = `${totalHeight}px`;
    markerEl.style.backgroundColor = this.todayMarkerColor;
  }
};

// src/main.ts
var AdvancedBasesPlugin = class extends import_obsidian9.Plugin {
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new AdvancedBasesSettingTab(this.app, this));
    this.registerBasesView(FEED_VIEW_TYPE, {
      name: "Feed",
      icon: "rss",
      factory: (controller, containerEl) => new FeedView(controller, containerEl, () => this.settings),
      options: () => {
        const t = getStrings();
        return [
          {
            type: "toggle",
            key: "showProperties",
            displayName: t.showPropertiesName,
            default: true
          }
        ];
      }
    });
    this.registerBasesView(COMPACT_CARDS_VIEW_TYPE, {
      name: "Cards Compact",
      icon: "gallery-vertical-end",
      factory: (controller, containerEl) => new CompactCardsView(controller, containerEl),
      options: (config) => {
        const t = getStrings();
        const options = [
          {
            type: "property",
            key: "imageProperty",
            displayName: t.imagePropertyName
          },
          {
            type: "dropdown",
            key: "imageFit",
            displayName: t.imageFitName,
            default: "cover",
            options: {
              cover: t.imageFitCoverLabel,
              contain: t.imageFitContainLabel
            }
          },
          {
            type: "slider",
            key: "imageAspectRatio",
            displayName: t.aspectRatioName,
            default: 1,
            min: 0.5,
            max: 2,
            step: 0.05
          },
          {
            type: "slider",
            key: "cardSize",
            displayName: t.cardWidthName,
            default: 200,
            min: 120,
            max: 400,
            step: 20
          },
          {
            type: "toggle",
            key: "compact",
            displayName: t.compactToggleName,
            default: false
          },
          {
            type: "group",
            displayName: t.compactCardSettingsGroupName,
            shouldHide: () => config.get("compact") !== true,
            items: [
              {
                type: "toggle",
                key: "showIcon",
                displayName: t.showIconName,
                default: true
              }
            ]
          }
        ];
        return options;
      }
    });
    this.registerBasesView(TIMELINE_VIEW_TYPE, {
      name: "Timeline",
      icon: "gantt-chart",
      factory: (controller, containerEl) => new TimelineView(controller, containerEl, () => this.settings),
      options: () => {
        const t = getStrings();
        return [
          {
            type: "property",
            key: "dateProperty",
            displayName: t.timelineDatePropertyName
          },
          {
            type: "property",
            key: "endDateProperty",
            displayName: t.timelineEndDatePropertyName
          },
          {
            type: "property",
            key: "groupProperty",
            displayName: t.timelineGroupPropertyName
          },
          {
            type: "slider",
            key: "laneHeight",
            displayName: t.timelineLaneHeightName,
            default: 48,
            min: 32,
            max: 120,
            step: 4
          }
        ];
      }
    });
  }
  async loadSettings() {
    const loadedData = await this.loadData();
    this.settings = migrateSettings(loadedData || {});
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};

/* nosourcemap */