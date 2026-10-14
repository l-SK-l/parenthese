// Russian translations, key = the exact French text passed to t().
// "photos" batch: first faces after an import, recovered photos, import when the tree is created.
// "фото" does not decline: only the sentences about people and portraits need plural forms.
export default {
  // First faces window (PhotoStartPanel)
  "Import terminé": "Импорт завершён",
  "Il manque les <em>visages</em>": "Не хватает <em>лиц</em>",
  "{n} personnes sont dans votre arbre. Avec une photo, la famille se reconnaît tout de suite.": {
    one: "В вашем древе {n} человек. С фотографией родные сразу узнают друг друга.",
    few: "В вашем древе {n} человека. С фотографией родные сразу узнают друг друга.",
    many: "В вашем древе {n} человек. С фотографией родные сразу узнают друг друга.",
  },
  "Avec une photo, la famille se reconnaît tout de suite.": "С фотографией родные сразу узнают друг друга.",
  "Vos photos sont déjà sur votre ordinateur": "Ваши фото уже есть на компьютере",
  "Votre logiciel associait une photo à 1 personne. Choisissez le dossier où il la range, Parenthèse place le portrait.": "В вашей программе было фото для 1 человека. Выберите папку, где она его хранит, и Parenthèse поставит портрет.",
  "Votre logiciel associait une photo à {n} personnes. Choisissez le dossier où il les range, Parenthèse place chaque portrait.": {
    one: "В вашей программе были фото для {n} человека. Выберите папку, где она их хранит, и Parenthèse расставит портреты.",
    few: "В вашей программе были фото для {n} человек. Выберите папку, где она их хранит, и Parenthèse расставит портреты.",
    many: "В вашей программе были фото для {n} человек. Выберите папку, где она их хранит, и Parenthèse расставит портреты.",
  },
  "Il les rangeait dans {folder}": "Она хранила их в {folder}",
  "Toutes les photos de votre logiciel sont placées.": "Все фото из вашей программы расставлены.",
  "Envoi de {done} sur {total}": "Отправка: {done} из {total}",
  "1 photo retrouvée sur {k}.": "Найдено 1 фото из {k}.",
  "{n} photos retrouvées sur {k}.": "Найдено {n} фото из {k}.",
  "Placer ce portrait": "Поставить портрет",
  "Placer les {n} portraits": { one: "Поставить {n} портрет", few: "Поставить {n} портрета", many: "Поставить {n} портретов" },
  "Un autre dossier": "Другая папка",
  "Aucune photo de ce dossier ne correspond. Essayez le dossier indiqué plus haut, ou celui qui le contient.": "Ни одно фото из этой папки не подходит. Попробуйте папку, указанную выше, или ту, в которой она лежит.",
  "Choisir un autre dossier": "Выбрать другую папку",
  "Choisir le dossier des photos": "Выбрать папку с фото",
  "1 portrait placé.": "Поставлен 1 портрет.",
  "{n} portraits placés.": { one: "Поставлен {n} портрет.", few: "Поставлено {n} портрета.", many: "Поставлено {n} портретов." },
  "{f} n'ont pas pu être envoyés (format non pris en charge ou fichier trop lourd).": "Не удалось отправить: {f} (формат не поддерживается или файл слишком большой).",
  "Seules les photos qui correspondent à une personne sont envoyées, vers votre arbre uniquement.": "Отправляются только фото, которые соответствуют людям, и только в ваше древо.",
  "Ou commencez par ces visages": "Или начните с этих лиц",
  "Commencez par ces visages": "Начните с этих лиц",
  "Envoi": "Отправка",
  "Ajoutée": "Добавлено",
  "1 photo ajoutée.": "Добавлено 1 фото.",
  "{n} photos ajoutées.": "Добавлено {n} фото.",
  "Vous pourrez en ajouter plus tard depuis chaque fiche.": "Позже можно добавить ещё из карточки каждого человека.",
  "Voir l'arbre": "Смотреть древо",
  "Session expirée, reconnectez-vous.": "Сессия истекла, войдите снова.",

  // Empty portrait on the tree, on hover
  "photo": "фото",

  // Tree settings
  "Ajouter des portraits": "Добавить портреты",
  "Retrouver les photos de votre ancien logiciel, ou ajouter les premiers visages un par un.": "Найдите фото из прежней программы или добавьте первые лица по одному.",

  // Tree creation, "I already have a tree"
  "Point de départ": "С чего начать",
  "Je pars de moi": "Начать с себя",
  "J'ai déjà un arbre": "У меня уже есть древо",
  "Importez <em>votre arbre</em>": "Импортируйте <em>своё древо</em>",
  "Heredis, Geneanet, Gramps, MyHeritage ou Ancestry savent exporter un fichier .ged. Parenthèse reprend les personnes, les liens et les dates, puis vous aide à retrouver les photos.": "Heredis, Geneanet, Gramps, MyHeritage и Ancestry умеют экспортировать файл .ged. Parenthèse перенесёт людей, связи и даты, а потом поможет найти фото.",
  "Choisir le fichier .ged": "Выбрать файл .ged",
  "Cliquez pour en choisir un autre": "Нажмите, чтобы выбрать другой",
  "Exporté depuis le logiciel où vous tenez votre arbre": "Экспортированный из программы, где вы ведёте древо",
  "Importer mon arbre": "Импортировать древо",
  "Votre arbre est créé, mais l'import n'a pas abouti.": "Древо создано, но импорт не удался.",
  "Vous pouvez réessayer depuis les paramètres de l'arbre.": "Можно повторить попытку в настройках древа.",
}
