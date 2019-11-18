"use strict";
// export default new Router()
//   .add('room', '/room/:id')
//   .add('preview-room', '/preview-room/:id')
//   .add('user', '/user/:id')
//   .add('booking-cancel', '/booking-cancel/:id')
//   .add('reviews', '/reviews/:id')
//   .add('promotion', '/promotion/:id')
//   .add('collection', '/collection/:id')
//   .add('/payment/invoice/:uuid', 'payment/invoice')
//   .add('/payment/direct/:uuid', 'payment/direct')
//   .add('host', '/host')
//   .add('host/create-listing', '/host/create-listing')
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const next_routes_1 = __importDefault(require("next-routes"));
// @ts-ignore
exports.routes = next_routes_1.default();
exports.Router = exports.routes.Router;
exports.Link = exports.routes.Link;
exports.routes
    .add('room', '/room/:id')
    .add('long-term-room', '/long-term-room/:id')
    .add('preview-room', '/preview-room/:id')
    .add('user', '/user/:id')
    .add('booking-cancel', '/booking-cancel/:id')
    .add('reviews', '/reviews/:id')
    .add('promotion', '/promotion/:id')
    .add('collection', '/collection/:id')
    .add('/payment/invoice/:uuid', 'payment/invoice')
    .add('/payment/direct/:uuid', 'payment/direct')
    .add('host', '/host')
    .add('create-listing', 'host/create-listing/:id')
    .add('update-listing', 'host/update-listing/:id')
    .add('room-list', 'host/room-list');
//# sourceMappingURL=index.js.map