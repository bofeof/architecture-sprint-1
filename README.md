# Задание 1. Деление монолита на микрофронтенды
Задача: оценить монолитное решение по адресу .\frontend и дать предложение по микрофронтендам

1.  В силу того, что в задании не указаны специфические требования и не обозначено планирование перехода на микрофронтенды на нескольких фреймворках, а в текущей реализации используется только React, выбран подход Module Federation. Аргументация выбора новой технологии на проекте:

- Один фреймворк на проекте - React;
- Каждый MF-модуль может быть standalone. MF-модули могут быть развернуты на разных доменах и деплоиться независимо, что упрощает разработку будущим командам;
- Нет полных перезагрузок страниц при переключениях между модулями;
- Есть ленивая загрузка, которая позволяет загружать код по требованию. Есть сборка в run-time.

---

2. Для определения модулей выбрана стратегия вертикальной нарезки. Выделены следующие микрофронтенды:

- host - сборка проекта и динамическое подключение модулей;
- auth - аутентификация пользователья;
- profile - пользователь. Модуль включает:
  - информацию о пользователе,
  - функционал по редактировнию профиля
- cards - карточка с контентом и галерея. Модуль включает:
  - информацию о карточке,
  - добавление и удаление контента,
  - управление лайками
  - управление галереей

Дополнительно выделены заголовок и подвал. В случае, если модули разрастутся новым функционалом, например, появится навигация, сложное меню, то отдельными сервисами будет проще деплоить данные модули:

- header - Заголовок сайта
- footer - Подвал сайта

Дополнительно в проекте создана папка shared для общих стилей, компонентов, контектсов. Для управления контекстом создана ./shared/sharedLib

Порты для модулей:

- host: 8080
- auth: 8081
- cards: 8082
- footer: 8083
- header: 8084
- profile: 8085
* sharedLib: 8090

Новая структура проекта находится в директории .\frontend\microfrontend\

3. Запуск кода: сделан основной набросок кода, без рефакторинга и оптимизаций. Микрофронтенды запускаются сейчас как отдельные сервисы, так и в общей сборке на хосте. Сделана проверка токена, регистрация, вход, базовый рендеринг: профиль, карточки. На хосте сделан роутинг, в том числе защищенный и добавлен общий контекст (релизация через глобальный стор React, без использования RTK, MobX и т.д). Не сделаны попапы и обновления и объектов.
---


# Задание 2. Разделение монолита на микросервисы
Задача: ознакомиться с монолитными решением на схеме и дать свое представление микросервисов с описанием основных потоков данных
1. В данном задании представлена оригинальная схема монолита и вариант делеания на микросервисы.
Схема и описание находятся в .\architecture\
