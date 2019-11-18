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

import Routes from 'next-routes';

// @ts-ignore
export const routes = Routes();
export const Router = routes.Router;
export const Link = routes.Link;

routes
  .add('room', '/room/:id')
  .add('long-term-room', '/long-term-room/:id')
  .add('preview-room', '/preview-room/:id')
  .add('preview-long-term-room', '/preview-long-term-room/:id')
  .add('user', '/user/:id')
  .add('booking-cancel', '/booking-cancel/:id')
  .add('reviews', '/reviews/:id')
  .add('promotion', '/promotion/:id')
  // .add('collection', '/collection/:id')
  .add('/payment/invoice/:uuid', 'payment/invoice')
  .add('/payment/direct/:uuid', 'payment/direct')
  // .add('host', '/host')
  .add('create-listing', 'host/create-listing/:id')
  .add('update-listing', 'host/update-listing/:id')
  .add('room-list', 'host/room-list')
  .add('booking-list', 'host/booking-list');
