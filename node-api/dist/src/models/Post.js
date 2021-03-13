"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
var Post = /** @class */ (function () {
    function Post(postId, createdDate, title, content, userId, headerImage, lastUpdated) {
        this.postId = postId;
        this.createdDate = createdDate;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.headerImage = headerImage;
        this.lastUpdated = lastUpdated;
    }
    Post.prototype.toJSON = function () {
        var objString = JSON.stringify(Object.assign({}, this));
        return objString;
    };
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=Post.js.map