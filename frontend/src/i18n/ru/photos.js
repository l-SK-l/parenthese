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
  // Other files the software listed (records, family photos): they become memories
  "Votre logiciel citait 1 fichier, un acte ou une photo de famille. Choisissez le dossier où il le range, Parenthèse l’ajoute aux souvenirs.":
    "В вашей программе упоминался 1 файл — документ или семейное фото. Выберите папку, где она его хранит, и Parenthèse добавит его в воспоминания.",
  "Votre logiciel citait {n} fichiers, actes ou photos de famille. Choisissez le dossier où il les range, Parenthèse les ajoute aux souvenirs de chaque personne.": {
    one: "В вашей программе упоминался {n} файл — документы или семейные фото. Выберите папку, где она их хранит, и Parenthèse добавит их в воспоминания каждого человека.",
    few: "В вашей программе упоминалось {n} файла — документы или семейные фото. Выберите папку, где она их хранит, и Parenthèse добавит их в воспоминания каждого человека.",
    many: "В вашей программе упоминалось {n} файлов — документы или семейные фото. Выберите папку, где она их хранит, и Parenthèse добавит их в воспоминания каждого человека.",
  },
  "1 fichier retrouvé sur {k}.": "Найден 1 файл из {k}.",
  "{n} fichiers retrouvés sur {k}.": { one: "Найден {n} файл из {k}.", few: "Найдено {n} файла из {k}.", many: "Найдено {n} файлов из {k}." },
  "{portraits} et {files} retrouvés.": "Найдено: {portraits} и {files}.",
  "1 portrait": "1 портрет",
  "{n} portraits": { one: "{n} портрет", few: "{n} портрета", many: "{n} портретов" },
  "1 autre fichier": "1 другой файл",
  "{n} autres fichiers": { one: "{n} другой файл", few: "{n} других файла", many: "{n} других файлов" },
  "Ajouter ce fichier": "Добавить файл",
  "1 fichier ajouté.": "Добавлен 1 файл.",
  "{n} fichiers ajoutés.": { one: "Добавлен {n} файл.", few: "Добавлено {n} файла.", many: "Добавлено {n} файлов." },
  "Tout ajouter ({n})": "Добавить всё ({n})",
  "1 fichier ajouté aux souvenirs.": "1 файл добавлен в воспоминания.",
  "{n} fichiers ajoutés aux souvenirs.": {
    one: "{n} файл добавлен в воспоминания.",
    few: "{n} файла добавлены в воспоминания.",
    many: "{n} файлов добавлено в воспоминания.",
  },
  "Seuls les fichiers cités par votre logiciel sont envoyés, vers votre arbre uniquement.":
    "Отправляются только файлы, которые упоминаются в вашей программе, и только в ваше древо.",
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
  // Importing a zip (GEDCOM and its photos)
  "Ajoute les personnes et les liens du fichier à cet arbre. Un fichier .ged, ou un zip qui contient le .ged et ses photos.":
    "Добавляет в древо людей и связи из файла .ged или из zip-архива, где лежат .ged и его фотографии.",
  "Aucun fichier du zip ne correspond à ceux que votre logiciel citait. Choisissez le dossier où il les range.":
    "Ни один файл из архива не совпадает с теми, что упоминались в вашей программе. Выберите папку, где она их хранит.",
  "Votre zip contenait aussi les fichiers. Parenthèse a retrouvé ceux que votre logiciel citait.":
    "В архиве были и сами файлы. Найдены те, что упоминались в вашей программе.",
  "Choisir le fichier .ged ou le zip": "Выбрать файл .ged или zip",
  "Exporté depuis votre logiciel. Un zip avec le .ged et ses photos fait tout en une fois.":
    "Экспортированный из вашей программы. Zip с .ged и фотографиями переносит всё за один раз.",
  "Ce zip est protégé par un mot de passe. Refaites-le sans mot de passe, puis réessayez.":
    "Этот архив защищён паролем. Создайте его заново без пароля и попробуйте ещё раз.",
  "Ce zip est trop gros pour être lu ici (plus de 4 Go). Importez le fichier .ged seul, puis ajoutez les photos depuis leur dossier.":
    "Этот архив слишком большой, чтобы прочитать его здесь (больше 4 ГБ). Импортируйте только файл .ged, а потом добавьте фото из их папки.",
  "Ce zip ne contient pas de fichier .ged. Il faut l’export GEDCOM de votre logiciel, avec ses photos à côté.":
    "В этом архиве нет файла .ged. Нужен экспорт GEDCOM из вашей программы вместе с фотографиями.",
  "Ce zip n’a pas pu être lu. Vérifiez qu’il s’ouvre sur votre ordinateur, puis réessayez.":
    "Не удалось прочитать архив. Проверьте, открывается ли он на компьютере, и попробуйте ещё раз.",
  "Ce zip utilise une compression que le navigateur ne sait pas lire. Refaites-le avec l’outil de compression de votre ordinateur.":
    "В этом архиве используется сжатие, которое браузер не умеет читать. Создайте архив заново встроенными средствами компьютера.",
  "Les photos et actes de votre zip": "Фото и документы из вашего архива",
  "Votre logiciel associait une photo à 1 personne, et citait {others}. Choisissez le dossier où il les range, Parenthèse place le portrait et ajoute le reste aux souvenirs.":
    "В вашей программе было фото для 1 человека, а также {others}. Выберите папку, где она их хранит, и Parenthèse поставит портрет, а остальное добавит в воспоминания.",
  "Votre logiciel associait une photo à {n} personnes, et citait {others}. Choisissez le dossier où il les range, Parenthèse place les portraits et ajoute le reste aux souvenirs.": {
    one: "В вашей программе были фото для {n} человека, а также {others}. Выберите папку, где она их хранит, и Parenthèse расставит портреты, а остальное добавит в воспоминания.",
    few: "В вашей программе были фото для {n} человек, а также {others}. Выберите папку, где она их хранит, и Parenthèse расставит портреты, а остальное добавит в воспоминания.",
    many: "В вашей программе были фото для {n} человек, а также {others}. Выберите папку, где она их хранит, и Parenthèse расставит портреты, а остальное добавит в воспоминания.",
  },
  "Votre zip contient le fichier .ged et les photos ou actes qu’il cite. Parenthèse les a retrouvés, il ne reste qu’à les ajouter. Les portraits vont sur chaque fiche, le reste rejoint les souvenirs.":
    "В вашем архиве есть файл .ged и фото или документы, которые в нём упоминаются. Они уже найдены, осталось только добавить. Портреты встанут в карточки, остальное попадёт в воспоминания.",
  "1 autre fichier, un acte ou une photo de famille": "1 другой файл — документ или семейное фото",
  "{n} autres fichiers, actes ou photos de famille": {
    one: "{n} другой файл — документы или семейные фото",
    few: "{n} других файла — документы или семейные фото",
    many: "{n} других файлов — документы или семейные фото",
  },
}
