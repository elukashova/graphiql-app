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
          sign_up: 'Sign up',
          sign_in: 'Sign in',
          header: {
            go_to_main: 'go to main page',
            log_out: 'log out',
          },
          home: {
            welcome: 'Welcome to',
            what: 'What',
            what_text:
              'GraphiQL is a tool designed for developers to test and explore GraphQL APIs: it provides an interactive platform enabling the execution and composition of GraphQL queries, examination of response data, and navigation of API documentation.',
            who: 'Who',
            who_nastya: 'Anastasia Klimov',
            who_lena: 'Elena Lukashova',
            who_karina: 'Karina Timoshina',
            why: 'Why',
            why_text:
              "GraphiQL clone is the final task of the RSSchool React course, the so-called 'Stage 3' in the learning path provided by the school for those willing to become front-end developers.",
          },
          auth: {
            email: 'Email',
            password: 'Password',
            submit: 'submit',
            have_account: 'Have an account',
            no_account: 'Not registered',
            sign_up: 'Sign',
            sign_in: 'Sign',
            up: 'up',
            in: 'in',
          },
          firebase: {
            email_in_use: 'Email is already in use',
            user_not_found: "Email doesn't exist",
            invalid_password: 'Invalid password',
            generic_message: 'Something went wrong. Please, retry',
          },
          validation: {
            email: 'Please, provide a valid email',
            password_length: 'The password must be at least 8 characters long',
            password_letters: 'The password must contain at least 1 letter',
            password_digit: 'The password must contain at least 1 digit',
            password_special_char: 'The password must contain at least 1 special character',
            empty_email: 'Please, provide a valid email',
            empty_password: 'Please, provide a valid password',
          },
          editor: {
            variables: 'variables',
            variables_placeholder: 'Enter variables in JSON format',
            variables_invalid: 'Invalid variables format',
            headers: 'headers',
            headers_placeholder: 'Enter headers in JSON format',
            headers_invalid: 'Invalid variables format',
            cta: 'Please, submit for response',
          },
          errorBoundary: {
            headers_fallback: "Can't get data from API with these headers",
            variables_fallback: "Can't get data from API with these variables",
          },
        },
      },
      ru: {
        translation: {
          sign_up: 'Регистрация',
          sign_in: 'Войти',
          header: {
            go_to_main: 'на главную',
            log_out: 'выход',
          },
          home: {
            welcome: 'Добро пожаловать в',
            what: 'Что',
            what_text:
              'GraphiQL - это инструмен для тестирования и исследования GraphQL API. Он предоставляет интерактивную платформу, позволяющую выполнять и составлять запросы GraphQL, осуществлять проверку данных ответа и навигацию по документации API.',
            who: 'Кто',
            who_nastya: 'Анастасия Климова',
            who_lena: 'Елена Лукашева',
            who_karina: 'Карина Тимошина',
            why: 'Зачем',
            why_text:
              'Клон GraphiQL является финальным заданием курса по React в RSSchool, так называемым третьим этапом в учебной программе, предоставляемой желающим стать фронт-энд разработчиками.',
          },
          auth: {
            email: 'Эл. почта',
            password: 'Пароль',
            submit: 'отправить',
            have_account: 'Уже есть аккаунт',
            no_account: 'Нет аккаунта',
            sign_up: 'Создать',
            sign_in: 'Войти в',
            up: 'аккаунт',
            in: 'аккаунт',
          },
          firebase: {
            email_in_use: 'Такой адрес эл. почты уже используется',
            user_not_found: 'Такого адреса эл. почты не существует',
            invalid_password: 'Неверный пароль',
            generic_message: 'Что-то пошло не так. Пожалуйста, повторите попытку',
          },
          validation: {
            email: 'Пожалуйста, введите действительный адрес эл. почты',
            password_length: 'Пароль должен содержать минимум 8 символов',
            password_letters: 'Пароль должен содержать хотя бы 1 букву',
            password_digit: 'Пароль должен содержать хотя бы 1 цифру',
            password_special_char: 'Пароль должен содержать хотя бы 1 спец. символ',
            empty_email: 'Пожалуйста, введите адрес эл. почты',
            empty_password: 'Пожалуйста, введите пароль',
          },
          editor: {
            variables: 'переменные',
            variables_placeholder: 'Введите переменные в формате JSON',
            variables_invalid: 'Неверный формат переменных',
            headers: 'заголовки',
            headers_placeholder: 'Введите заголовки в формате JSON',
            headers_invalid: 'Неверный формат заголовков',
            cta: 'Пожалуйста, отправьте запрос для получения ответа',
          },
          errorBoundary: {
            headers_fallback: 'Не удается получить данные с API с этими заголовками',
            variables_fallback: 'Не удается получить данные с API с этими переменными',
          },
        },
      },
    },
  });

export default i18n;
