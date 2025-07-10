"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFields = exports.uploadSingle = void 0;
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});
const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary_1.v2.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
            if (result) {
                resolve(result);
            }
            else {
                reject(error);
            }
        });
        streamifier_1.default.createReadStream(buffer).pipe(stream);
    });
};
const uploadToCloudinary = async (buffer) => {
    let result = await streamUpload(buffer);
    return result["url"];
};
const uploadSingle = async (req, res, next) => {
    try {
        const result = await uploadToCloudinary(req["file"].buffer);
        req.body[req["file"].fieldname] = result;
    }
    catch (error) {
        console.log(error);
    }
    next();
};
exports.uploadSingle = uploadSingle;
const uploadFields = async (req, res, next) => {
    for (const key in req["files"]) {
        req.body[key] = [];
        const array = req["files"][key];
        for (const item of array) {
            try {
                const result = await uploadToCloudinary(item.buffer);
                req.body[key].push(result);
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    next();
};
exports.uploadFields = uploadFields;
