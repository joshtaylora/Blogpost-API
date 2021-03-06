"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
class Post {
    constructor(postId, createdDate, title, content, userId, headerImage, lastUpdated) {
        this.postId = postId;
        this.createdDate = createdDate;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.headerImage = headerImage;
        this.lastUpdated = lastUpdated;
    }
    toJSON() {
        let objString = JSON.stringify(Object.assign({}, this));
        return objString;
    }
}
exports.Post = Post;
//# sourceMappingURL=post.js.map