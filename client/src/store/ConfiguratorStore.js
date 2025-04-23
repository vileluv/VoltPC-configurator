import { makeAutoObservable } from "mobx";
export default class ConfiguratorStore {
    constructor() {
        this._case = {};
        this._cooler = {};
        this._motherboard = {};
        this._power = {};
        this._processor = {};
        this._ram = {};
        this._storage = {};
        this._videocard = {};
        makeAutoObservable(this);
    }
    setComponent(type, obj) {
        this["_" + type] = obj;
    }
    getComponent(type) {
        return this["_" + type];
    }
}
