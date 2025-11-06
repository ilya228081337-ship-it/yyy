export const translations = {
  ru: {
    header: {
      submitScamList: 'Подать скам-лист',
      contactAdmin: 'Написать администрации',
      arbitration: 'Арбитраж',
      guarantor: 'Гарант',
      resources: 'Ресурсы',
      profile: 'Мой профиль',
      logout: 'Выход',
      login: 'Войти',
    },
    filters: {
      search: 'Поиск по нику',
      dateRange: 'Диапазон дат',
      caseNumber: 'Номер кейса',
      damageAmount: 'Сумма ущерба',
      apply: 'Применить',
      reset: 'Сбросить',
    },
    cases: {
      new: 'Новое',
      caseNumber: 'Кейс',
      damage: 'Ущерб',
      publishedOn: 'Опубликовано',
      loadMore: 'Загрузить ещё',
      noResults: 'Ничего не найдено',
    },
    reactions: {
      thumbsUp: 'Подтвердить',
      warning: 'Под вопросом',
      cross: 'Ложь',
    },
    common: {
      submit: 'Отправить',
      cancel: 'Отмена',
      save: 'Сохранить',
      delete: 'Удалить',
      edit: 'Редактировать',
    },
  },
  en: {
    header: {
      submitScamList: 'Submit Scam Report',
      contactAdmin: 'Contact Administration',
      arbitration: 'Arbitration',
      guarantor: 'Guarantor',
      resources: 'Resources',
      profile: 'My Profile',
      logout: 'Logout',
      login: 'Login',
    },
    filters: {
      search: 'Search by nickname',
      dateRange: 'Date range',
      caseNumber: 'Case number',
      damageAmount: 'Damage amount',
      apply: 'Apply',
      reset: 'Reset',
    },
    cases: {
      new: 'New',
      caseNumber: 'Case',
      damage: 'Damage',
      publishedOn: 'Published',
      loadMore: 'Load more',
      noResults: 'No results found',
    },
    reactions: {
      thumbsUp: 'Confirm',
      warning: 'Questionable',
      cross: 'False',
    },
    common: {
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
    },
  },
};

export type Language = 'ru' | 'en';
export type TranslationKeys = typeof translations.ru;
