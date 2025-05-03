const sequelize = require("../utility/database.js");
const Case = require("./main/caseModel.js");
const Cooler = require("./main/coolerModel.js");
const FormFactor = require("./foreign/formFactorsModel.js");
const RamType = require("./foreign/ramTypesModel.js");
const Socket = require("./foreign/socketsModel.js");
const CoolerSocket = require("./foreign/CoolerSocketsModel.js");
const StorageInterface = require("./foreign/storageInterfacesModel.js");
const Motherboard = require("./main/motherboardModel.js");
const Power = require("./main/powerModel.js");
const Processor = require("./main/processorModel.js");
const Ram = require("./main/ramModel.js");
const Storage = require("./main/storageModel.js");
const User = require("./main/userModel.js");
const Videocard = require("./main/videocardModel.js");
const CaseFormFactor = require("./foreign/CaseFormFactorsModel.js");

const syncDatabase = async () => {
    try {
        Socket.hasMany(Processor);
        Processor.belongsTo(Socket);

        Socket.hasMany(Motherboard);
        Motherboard.belongsTo(Socket);
        FormFactor.hasMany(Motherboard);
        Motherboard.belongsTo(FormFactor);
        RamType.hasMany(Motherboard);
        Motherboard.belongsTo(RamType);
        StorageInterface.hasMany(Motherboard);
        Motherboard.belongsTo(StorageInterface);

        RamType.hasMany(Ram);
        Ram.belongsTo(RamType);

        StorageInterface.hasMany(Storage);
        Storage.belongsTo(StorageInterface);

        Cooler.belongsToMany(Socket, { through: CoolerSocket, timestamps: false });
        Socket.belongsToMany(Cooler, { through: CoolerSocket, timestamps: false });

        Case.belongsToMany(FormFactor, { through: CaseFormFactor, timestamps: false });
        FormFactor.belongsToMany(Case, { through: CaseFormFactor, timestamps: false });

        await sequelize.sync({ force: false });
        console.info("Database was syncronized");
    } catch (error) {
        console.error("Error to syncronize database:", error);
    }
};

module.exports = {
    sequelize,
    syncDatabase,
    Case,
    Cooler,
    Motherboard,
    Power,
    Processor,
    Ram,
    Storage,
    Videocard,
    User,
    Socket,
    FormFactor,
    RamType,
    StorageInterface,
    CaseFormFactor,
    CoolerSocket,
};
