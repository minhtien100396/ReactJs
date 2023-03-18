import EventEmitter from 'events';

const _emitter = new EventEmitter();
_emitter.setMaxListeners(0); // unlimit listener: không giới hạn số người nghe

export const emitter = _emitter;