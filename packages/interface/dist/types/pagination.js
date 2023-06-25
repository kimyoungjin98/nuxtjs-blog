"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePageInfo = void 0;
var generatePageInfo = function (pageNo, pageSize, itemLength, count) { return ({
    currentPage: pageNo,
    itemsPerPage: pageSize,
    itemsCount: itemLength,
    totalItems: count,
    totalPages: Math.ceil(count / pageSize),
}); };
exports.generatePageInfo = generatePageInfo;
//# sourceMappingURL=pagination.js.map