require('module-alias/register');
const routine = require('@services/routine');

// list of all pages with theier parameters
const pages = [
  // CRM
  {
    id : 'app', group:'CRM', name:'CRM', title:'CRM', url:'/crm', newpage: false, visible: true
  },
  {
    id:'clients', group:'CRM', name:'Клиенты (все)', title:'CRM. Клиенты (все)', url:'/client', newpage: false, visible: true
  },
  {
    id:'errors', group:'CRM', name:'Ошибки', title:'CRM. Ошибки!', url:'/errors', newpage: false, visible: true
  },
  {
    id:'ats', group:'CRM', name:'Входящие', title:'CRM. Входящие', url:'/crm/ats', newpage: false, visible: true
  },
  {
    id:'client_projects', group:'CRM', name:'Проекты заказчика', title:'CRM. Проекты заказчика', url:'/projects', newpage: false, visible: true
  },
  {
    id:'clients_category', group:'CRM', name:'Клиенты по категориям', title:'CRM. Клиенты по категориям', url:'/clients_category', newpage: false, visible: true
  },
  {
    id:'ordertransfer', group:'CRM', name:'Смена менеджера', title:'CRM. Смена менеджера', url:'/crm/transfer', newpage: false, visible: true
  },

  // Договоры
  {
    id:'contracts', group:'Договоры', name:'Договоры', title:'Договоры', url:'/contracts', newpage: false, visible: true
  },
  {
    id:'factpayments', group:'Договоры', name:'Фактические платежи', title:'Договоры. Фактические платежи', url:'/factpayments', newpage: false, visible: true
  },
  {
    id:'projectdocumentation', group:'Договоры', name:'Проектная документация', title:'Договоры. Проектная документация', url:'/projectdocumentation', newpage: false, visible: true
  },
  {
    id:'finance', group:'Договоры', name:'Финансы', title:'Договоры Финансы', url:'/finance', newpage: false, visible: true
  },
  {
    id:'claims', group:'Договоры', name:'Претензии и замечания', title:'Договоры Претензии и замечания', url:'/claims', newpage: false, visible: true
  },
  {
    id:'outgoing', group:'Договоры', name:'Исходящие', title:'Договоры Исходящие', url:'/outgoing', newpage: false, visible: true
  },

  // Администрирование
  {
    id:'dir', group: 'Администрирование', name:'Справочники', title:'Администрирование. Справочники', url:'/dir', newpage: false, visible: true
  },
  {
    id:'users', group: 'Администрирование', name:'Пользователи', title:'Администрирование. Пользователи', url:'/user', newpage: false, visible: true
  },
  {
    id:'roles', group: 'Администрирование', name:'Роли', title:'Администрирование. Роли', url:'/role', newpage: false, visible: true
  },
  {
    id:'conformity', group:'Администрирование', name:'Соответствие. Работы/Материалы', title:'Администрирование. Соответствие. Работы/Материалы', url:'/conformity', newpage: false, visible: true
  },

  // Производство
  {
    id:'joblog', group:'Производство', name:'Журнал работ', title:'Производство. Журнал работ', url:'/joblog', newpage: false, visible: true
  },
  {
    id:'workorderdate', group:'Производство', name:'Наряды', title:'Производство. Наряды', url:'/workorderdate', newpage: false, visible: true
  },
  {
    id:'timeline', group:'Производство', name:'График производства', title:'Производство. График производства', url:'/timeline', newpage: true, visible: true
  },
  {
    id:'timeline_editor', group:'Производство', name:'График производства. Редактор', title:'Производство. График производства. Редактор', url:'/timeline/editor/', newpage: true, visible: true
  },
  {
    id:'plannorm', group:'Производство', name:'Спецификации заказов', title:'Производство. Спецификации заказов', url:'/orderspecification', newpage: false, visible: true
  },
  {
    id:'plannormblank', group:'Производство', name:'Спецификации заказов. Бланки', title:'Производство. Спецификации заказов. Бланки', url:'/specificationorderblank', newpage: false, visible: true
  },
  {
    id:'stats', group:'Производство', name:'Статистика', title:'Производство. Статистика', url:'/stats/production', newpage: false, visible: true
  },
  {
    id:'planecalculation', group:'Производство', name:'МТО', title:'Производство. MTO', url:'/mto', newpage: false, visible: true
  },
  {
    id:'stock', group:'Производство', name:'Склад', title:'Производство. Склад', url:'/stock', newpage: false, visible: true
  },
  {
    id:'shift_tasks', group:'Производство', name:'Задания на производство', title:'Производство. Задания на производство', url:'/shift_tasks', newpage: false, visible: true
  },
  {
    id:'shift_task_facts', group:'Производство', name:'Отчет производства за смену', title:'Производство. Отчет производства за смену', url:'/shift_task/facts', newpage: false, visible: true
  },

  // ЭСУД
  {
    id:'esud', group:'ЭСУД', name:'ЭСУД', title:'ЭСУД', url:'/esud', newpage: true, visible: true
  },
  {
    id:'esud_calculation', group:'ЭСУД', name:'Расчеты', title:'ЭСУД. Расчеты', url:'/esud_calculation', newpage: true, visible: false
  },
  {
    id:'esud_specification', group:'ЭСУД', name:'Спецификации', title:'ЭСУД. Спецификации', url:'/esud/specification', newpage: true, visible: true
  },
  {
    id:'esud_specification_calculation', group:'ЭСУД', name:'Спецификация. Расчеты', title:'ЭСУД. Спецификация. Расчеты', url:'/esud/specification/calculation', newpage: true, visible: true
  },
  {
    id:'esudtreegraph', group:'ЭСУД', name:'Граф данных', title:'ЭСУД. Граф данных', url:'/esudtreegraph', newpage: false, visible: true
  },
  {
    id:'esud_specification_update', group:'ЭСУД', name:'Обновление спецификаций', title:'ЭСУД. Обновление спецификаций', url:'/esud/esud_specification_update', newpage: false, visible: true
  },
  {
    id:'esud_configuration_update', group:'ЭСУД', name:'Обновление конфигураций', title:'ЭСУД. Обновление конфигураций', url:'/esud/esud_configuration_update', newpage: false, visible: true
  },
  {
    id:'esud_complect', group:'ЭСУД', name:'Комлплекты', title:'ЭСУД. Комлплекты', url:'/esud/complect', newpage: true, visible: true
  },
  {
    id:'purchasenorms', group:'ЭСУД', name:'Покупные изделия', title:'ЭСУД. Покупные изделия', url:'/purchasenorms', newpage: false, visible: true
  },

  // Статистика
  {
    id:'brief', group:'Статистика', name:'Повестка дня', title:'Статистика. Повестка дня', url:'/brief', newpage: false, visible: true
  },
  {
    id:'date_calculators', group:'Статистика', name:'Калькуляторы дат', title:'Статистика. Калькуляторы дат', url:'/calculator', newpage: true, visible: true
  },

  // Отсутствия
  {
    id:'absence', group:'Кадры', name:'Отсутствия', title:'Кадры. Отсутствия', url:'/absence-page', newpage: false, visible: true
  },

  // Сервис
  {
    id:'material_price_page', group:'Сервис', name:'Стоимость материала', title:'Сервис. Стоимость материала', url:'/material-price-page', newpage: false, visible: false
  }
];

/*
 * @desc Get deep copy pages object
 * @return cloned list of bages
 */
module.exports.getList = () => routine.deepCopy(pages);

/*
 * @desc Get page details by key
 * @param {String} page key
 * @return page object
 */
module.exports.getPage = key => pages.find(x => x.id === key);

/*
 * @desc Get page URL by key
 * @param {String} page key
 * @return page url
 */
module.exports.getURL = key => pages.find(x => x.id === key).url;

/*
 * @desc Get pages groupped by their group key
 * @return {List} list of pages objects groupped by group key
 */
module.exports.getGrouppedPages = () => {
  let result = {};
  for (const item of pages) {
    if (item.visible) {
      if (item.group) {
        if (item.group in result) {
          result[item.group].items.push(item);
        } else { result[item.group] = { group: item.group, items:[item] }; }
      } else {
        result[item.id] = item;
      }
    }
  }
  result = Object.values(result).sort((a, b) => {
    if (a.group > b.group) { return 1; }
    if (a.group < b.group) { return -1; }
    return 0;
  });
  for (const item of result) {
    if (item.items) {
      item.items = item.items.sort((a, b) => {
        if (a.name > b.name) { return 1; }
        if (a.name < b.name) { return -1; }
        return 0;
      });
    }
  }
  return result;
};
