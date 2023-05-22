import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('i18nextLng')?.toString() || 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          header: {
            sign_up: 'sign up',
            sign_in: 'sign in',
            go_to_main: 'go to main page',
            log_out: 'log out',
          },
          home: {
            welcome: 'welcome to',
            what: 'what',
            what_text:
              'GraphiQL is a tool designed for developers to test and explore GraphQL APIs: it provides an interactive platform enabling the execution and composition of GraphQL queries, examination of response data, and navigation of API documentation.',
            who: 'who',
            who_nastya: 'Anastasia Klimov',
            who_lena: 'Elena Lukashova',
            who_karina: 'Karina Timoshina',
            why: 'why',
            why_text:
              "GraphiQL clone is the final task of the RSSchool React course, the so-called 'Stage 3' in the learning path provided by the school for those willing to become front-end developers.",
          },
        },
      },
      ru: {
        translation: {
          header: {
            sign_up: 'регистрация',
            sign_in: 'вход',
            go_to_main: 'на главную',
            log_out: 'выход',
          },
          home: {
            welcome: 'добро пожаловать в',
            what: 'что',
            what_text:
              'GraphiQL - это инструмент, разработанный для разработчиков для тестирования и исследования GraphQL API. Он предоставляет интерактивную платформу, позволяющую выполнять и составлять запросы GraphQL, осуществлять проверку данных ответа и навигацию по документации API.',
            who: 'кто',
            who_nastya: 'Анастасия Климова',
            who_lena: 'Елена Лукашева',
            who_karina: 'Карина Тимошина',
            why: 'зачем',
            why_text:
              'Клон GraphiQL является финальным заданием курса по React в RSSchool, так называемым третьим этапом в учебной программе, предоставляемой желающим стать фронт-энд разработчиками.',
          },
        },
      },
    },
  });

export default i18n;
