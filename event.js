function EventEmitter() {}

EventEmitter.prototype._events = [];
EventEmitter.prototype._eventsCount = 0;


const validEventName = (event_name) => {
    if(event_name === undefined)throw setError('event name must be defined');
    if(typeof event_name !== 'string') throw setError('events name must be string');
    return true;
}

const validateListner = (listner) => {
    if(listner && typeof listner === "function")return true;
    else throw setError('listner must be function');
}

EventEmitter.prototype.on = function(type, listnerFun) {
    addListner(this, type, listnerFun);
}

EventEmitter.prototype.off = function(name, cb) {
    return removeListner(this, name, cb)
}

EventEmitter.prototype.once = function(type, cb) {
    addListnerForOnce(this, type, cb)
}

EventEmitter.prototype.eventsName = function() {
    return listnerName(this);
}

function listnerName(target) {
    const event = target._events;
    if(event.length === 0)return undefined;
    return event.map(Object.keys).map(([key]) => key);
}

function addListner(target, type, listner) {
    validEventName(type);
    validateListner(listner);
    let event = {
        [type]: listner,
    }
    target._eventsCount +=1;
    target._events.push(event);
}

function addListnerForOnce (target, type, listner) {
    validEventName(type);
    validateListner(listner);
    const event = target._events;
    if(!event.find(i => i[type] !== undefined)){
        const _event = {
            [type]: listner
        }
        event.push(_event);
        target._eventsCount +=1;
    }
}

function removeListner(target, name, cb) {
    validEventName(name);
    const event = target._events;
    if(event.length === 0)return name;
    target._events = event.filter(_i => _i[name] === undefined);
    cb && typeof cd === "function" && cb(true);
    target._eventsCount = target._events.length;
}

EventEmitter.prototype.emit = function(eventName, ...args) {
    validEventName(eventName);
    const event = this._events;
    event.map((item, index) => {
        let listnerFun = item[eventName];
        if(listnerFun && typeof listnerFun === "function"){
            listnerFun(...args);
        }
    })
}

module.exports = EventEmitter;