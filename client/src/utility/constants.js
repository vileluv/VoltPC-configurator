export const ADMIN_ROUTE = "/admin";
export const LOGIN_ROUTE = "/login";
export const REGISTRATION_ROUTE = "/registration";
export const MAIN_ROUTE = "/";

export const ITEMS_LIST = [
    { type: "processor", name: "Процессор", require: true },
    { type: "motherboard", name: "Материнская плата", require: true },
    { type: "ram", name: "Оперативная память", require: true },
    { type: "case", name: "Корпус", require: true },
    { type: "power", name: "Блок питания", require: true },
    { type: "videocard", name: "Видеокарта", require: false },
    { type: "cooler", name: "Кулер", require: false },
    { type: "storage", name: "Хранилище", require: false },
];

export const FILTER_TYPES = {
    interval: "interval",
    selector: "selector",
    selectorWithForeign: "selectorWithForeign",
    selectorWithManyForeign: "selectorWithManyForeign",
};
