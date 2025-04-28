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
        this._confcode = "";
        makeAutoObservable(this);
    }
    setComponent(type, obj) {
        this["_" + type] = obj;
        this.generateCode();
    }
    getComponent(type) {
        return this["_" + type];
    }
    setComponents(componentsArray) {
        componentsArray.forEach(component => {
            this["_" + Object.keys(component)[0]] = Object.values(component)[0];
        });
        this.generateCode();
    }
    clearComponents() {
        this._case = {};
        this._cooler = {};
        this._motherboard = {};
        this._power = {};
        this._processor = {};
        this._ram = {};
        this._storage = {};
        this._videocard = {};
        this.generateCode();
    }
    isEmpty(type) {
        if (type === undefined) {
            return (
                Object.entries(this).filter(f => Object.keys(f[1]).length !== 0 && f[0] !== "_confcode").length === 0
            );
        }
        if (this["_" + type] === undefined) {
            return true;
        }
        return Object.keys(this["_" + type]).length === 0;
    }
    generateCode() {
        this._confcode = btoa(
            JSON.stringify(
                Object.entries(this)
                    .filter(f => f[0] !== "_confcode" && f[1]?.id !== undefined)
                    .map(element => {
                        return { [element[0].replace("_", "")]: element[1]?.id };
                    })
            )
        );
    }
    getConsumption() {
        return Math.ceil(
            (this._processor.tdp || 0) * 1.1 +
                (this._videocard.power || 0) +
                (this._motherboard.id ? 40 : 0) +
                (this._ram.moduleAmount || 0) * 5 +
                (this._storage.id ? 10 : 0) +
                (this._cooler.id ? 10 : 0)
        );
    }
    get confCode() {
        return this._confcode;
    }
}
