const unorm = require('unorm');
const combining = /[\u0300-\u036F]/g;

String.prototype.norm = function () {
    return unorm.nfkd(this).replace(combining, '').toLowerCase();
};