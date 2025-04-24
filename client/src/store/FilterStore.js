import { makeAutoObservable } from "mobx";
export default class FilterStore {
    constructor() {
        this._filters = new Map();
        makeAutoObservable(this);
    }

    setFilters(obj) {
        this._filters = new Map(Object.entries(obj));
    }
    addFilters(type, value) {
        this._filters.set(type, value);
    }
    deleteFilter(type) {
        this._filters.delete(type);
    }
    get filters() {
        return Object.fromEntries(this._filters);
    }
}
