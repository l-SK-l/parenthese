// Russian translations, key = the exact French text passed to t().
export default {
  // App.jsx: summary of changes
  'Nouvelle personne': 'Новый человек',
  'Personne': 'Человек',
  'Sticker': 'Стикер',
  'Dessin': 'Рисунок',
  'Texte': 'Текст',
  'Photo': 'Фото',
  'Annotation': 'Пометка',
  'Relation': 'Родственная связь',
  'Compte': 'Аккаунт',

  // App.jsx: adding people and contributions
  "Ajoutez d'abord un parent à {name} pour pouvoir lui rattacher un frère ou une sœur.": '{name}: сначала добавьте родителя, чтобы можно было привязать брата или сестру.',
  "Ajoutez d'abord un parent à cette personne pour pouvoir lui rattacher un frère ou une sœur.": 'Сначала добавьте этому человеку родителя, чтобы можно было привязать брата или сестру.',
  '{name} est dans vos modifications. Envoyez-les quand vous avez fini.': '{name} — в ваших правках. Отправьте их, когда закончите.',
  "Erreur lors de l'ajout de la personne": 'Не удалось добавить человека',
  'Aucune modification à soumettre.': 'Нет изменений для отправки.',
  'Contribution de {name} · {date}': 'Правки · {name} · {date}',
  'Contribution de la famille · {date}': 'Правки от семьи · {date}',
  "Erreur lors de l'envoi des contributions": 'Не удалось отправить правки',
  "Merci, c'est envoyé ! Ça apparaîtra dans l'arbre une fois relu.": 'Спасибо, отправлено! Всё появится в древе после проверки.',

  // App.jsx: sharing password
  'Session invalide.': 'Недействительная сессия.',
  "C'est bien lui. Rien ne change pour la famille.": 'Да, это он. Для семьи ничего не меняется.',
  "Ce n'est pas le mot de passe actuel de l'arbre.": 'Это не текущий пароль древа.',
  'Arbre introuvable.': 'Древо не найдено.',
  'Minimum 8 caractères.': 'Минимум 8 символов.',
  "C'est déjà le mot de passe actuel.": 'Это и так текущий пароль.',
  'Mot de passe changé. Envoyez le nouveau à la famille.': 'Пароль изменён. Отправьте новый родным.',

  // App.jsx: family links
  'Lien déjà présent': 'Такая связь уже есть',
  'Lien familial ajouté (démo locale)': 'Родственная связь добавлена (локальное демо)',
  'Lien ajouté à la contribution': 'Связь добавлена в ваши правки',
  'Lien familial ajouté': 'Родственная связь добавлена',
  'Relation introuvable pour suppression': 'Не удалось найти эту связь для удаления',
  'Lien familial supprimé (démo locale)': 'Родственная связь удалена (локальное демо)',
  'Suppression de lien ajoutée à la contribution': 'Удаление связи добавлено в ваши правки',
  'Lien familial supprimé': 'Родственная связь удалена',

  // App.jsx: tree access
  "Cet arbre n'existe pas.": 'Такого древа нет.',
  'Impossible de résoudre ce lien de partage.': 'Не удалось открыть эту ссылку.',
  "Aucun arbre accessible n'a pu être chargé automatiquement.": 'Не удалось автоматически загрузить ни одно доступное древо.',
  'Session invalide ou expirée. Reconnectez-vous.': 'Сессия недействительна или истекла. Войдите снова.',

  // App.jsx: empty tree
  'Votre arbre est créé.': 'Ваше древо создано.',
  "Ajoutez un proche pour commencer, comme votre mère, votre père ou un frère. Il suffit d'un prénom.": 'Для начала добавьте кого-то из близких: маму, папу или брата. Достаточно одного имени.',
  'Fermer': 'Закрыть',
  'Ajouter une première personne': 'Добавить первого человека',
  'Ajouter une personne': 'Добавить человека',
  "Commencer l'arbre": 'Начать древо',

  // ErrorBoundary, BootLoader
  'Une erreur inattendue est survenue': 'Произошла непредвиденная ошибка',
  "L'application a rencontré un problème. Vous pouvez essayer de recharger ou revenir à l'écran précédent.": 'В приложении что-то пошло не так. Попробуйте перезагрузить страницу или вернуться на предыдущий экран.',
  'Réessayer': 'Повторить',
  'Recharger la page': 'Перезагрузить страницу',
  "Ouverture de l'arbre": 'Открываем древо',
  'Arbre prêt': 'Древо готово',

  // utils/mediaUpload.js, utils/graphAdapter.js
  'Saisissez le texte de la citation.': 'Введите текст цитаты.',
  'Sélectionnez un fichier.': 'Выберите файл.',
  'Fichier invalide.': 'Недопустимый файл.',
  'Fichier trop volumineux (max 20 Mo).': 'Файл слишком большой (макс. 20 МБ).',
  'Image trop volumineuse (max 5 Mo).': 'Изображение слишком большое (макс. 5 МБ).',
  'Média {n}': 'Медиа {n}',

  // utils/errorMessages.js
  'Mot de passe invalide ou accès expiré.': 'Неверный пароль или доступ истёк.',
  'Trop de tentatives. Réessayez dans une minute.': 'Слишком много попыток. Повторите через минуту.',
  'Connexion backend impossible. Vérifiez API/DB puis réessayez.': 'Нет связи с сервером. Проверьте API и базу данных, затем повторите.',
  'Mot de passe incorrect.': 'Неверный пароль.',
  'Session expirée. Reconnectez-vous puis réessayez.': 'Сессия истекла. Войдите снова и повторите.',
  'Saisissez votre mot de passe actuel.': 'Введите текущий пароль.',
  'Impossible de supprimer le compte pour le moment. Réessayez plus tard.': 'Сейчас не удаётся удалить аккаунт. Попробуйте позже.',
  'Image trop volumineuse (maximum 5 Mo).': 'Изображение слишком большое (максимум 5 МБ).',
  "Format d'avatar invalide. Utilisez une image.": 'Недопустимый формат аватара. Используйте изображение.',
  'Le fichier média envoyé est invalide.': 'Отправленный медиафайл повреждён или недопустим.',
  'Le format de fichier ne correspond pas au type de média choisi.': 'Формат файла не соответствует выбранному типу.',
  'Ajoutez le texte de la citation.': 'Добавьте текст цитаты.',
  "L'arbre n'a plus de place pour de nouveaux souvenirs. Son propriétaire peut en supprimer.": 'В древе закончилось место для новых воспоминаний. Владелец может удалить лишние.',
  "Erreur base de données. Lancez `npm run prisma:deploy` puis redémarrez l'API.": 'Ошибка базы данных. Выполните `npm run prisma:deploy`, затем перезапустите API.',
  'Base de données indisponible. Lancez `npm run db:bootstrap` dans le backend.': 'База данных недоступна. Выполните `npm run db:bootstrap` в бэкенде.',
  'Slug invalide : 3-64 caractères, uniquement lettres minuscules, chiffres et tirets.': 'Недопустимый адрес: от 3 до 64 символов, только строчные латинские буквы, цифры и дефисы.',
  "Nom d'arbre invalide : entre 2 et 120 caractères.": 'Недопустимое название древа: от 2 до 120 символов.',
  'Mots de passe invalides : entre 8 et 128 caractères.': 'Недопустимые пароли: от 8 до 128 символов.',
  'Erreur formulaire : {error}': 'Ошибка формы: {error}',
  'Données invalides. Vérifiez les champs.': 'Неверные данные. Проверьте поля.',
  'Session invalide ou identifiants incorrects.': 'Недействительная сессия или неверные данные для входа.',
  'Accès refusé pour cet arbre.': 'Нет доступа к этому древу.',
  'Ressource introuvable.': 'Не найдено.',
  'Conflit détecté (email ou slug déjà utilisé).': 'Конфликт: email или адрес уже заняты.',
  "Erreur backend. Vérifiez que l'API et la base sont lancées.": 'Ошибка сервера. Проверьте, что API и база данных запущены.',
}
