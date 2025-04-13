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
    setComponentOnType(type, obj) {
        this["_" + type] = obj;
    }
    setCase(obj) {
        this._case = obj;
    }
    setCooler(obj) {
        this._cooler = obj;
    }
    setMotherboard(obj) {
        this._motherboard = obj;
    }
    setPower(obj) {
        this._power = obj;
    }
    setProcessor(obj) {
        this._processor = obj;
    }
    setRam(obj) {
        this._ram = obj;
    }
    setStorage(obj) {
        this._storage = obj;
    }
    setVideocard(obj) {
        this._videocard = obj;
    }
    get case() {
        return this._case;
    }
    get cooler() {
        return this._cooler;
    }
    get motherboard() {
        return this._motherboard;
    }
    get power() {
        return this._power;
    }
    get processor() {
        return this._processor;
    }
    get ram() {
        return this._ram;
    }
    get storage() {
        return this._storage;
    }
    get videocard() {
        return this._videocard;
    }
}
