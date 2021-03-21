import { Post } from "./Post";
import { db } from "../db/database";

class PostDatabase {
  private postArray: Array<Post>;
  private tail: number;
  public constructor() {
    this.postArray = [];
    let sql = "select MIN(postId) from Posts";
    let params = {};
    db.all(sql, params, (err:any, rows:any[]) => {
        if (err) {
            console.log({error: err.message});
            this.tail = 0;
        } else if (rows !== undefined){
            // .replace(/['"]+/g, "")
            console.log((JSON.stringify(rows[0].postId)));
            console.log(this.tail);
        }
    })
    this.tail = 0;
  }
  /**
   * Method to create new Post objects and add them to the database
   * @param createdDate
   * @param title
   * @param content
   * @param userId
   * @param headerImage
   * @param lastUpdated
   */
  //   public createPost(
  //     title: string,
  //     content: string,
  //     userId: string,
  //     headerImage: string,
  //   ) {
  //     // create the Post object
  //     let newPost: Post = new Post(
  //       this.tail,
  //       new Date(),
  //       title,
  //       content,
  //       userId,
  //       headerImage,
  //       new Date()
  //     );
  //     // push the new post to the array
  //     this.postArray.push(newPost);
  //     // increment the tail
  //     this.tail++;
  //   }

  public createPost(
    title: string,
    content: string,
    userId: string,
    headerImage: string
  ): Post | null {
    let date = new Date();
    let postId = this.tail;
    let sql =
      "insert into Posts (createdDate, title, content, userId, headerImage, lastUpdated) VALUES ($createdDate, $title, $content, $userId, $headerImage, $lastUpdated)";
    let params = {
      $createdDate: date,
      $title: title,
      $content: content,
      $userId: userId,
      $headerImage: headerImage,
      $lastUpdated: date,
    };
    db.all(sql, params, (err:any, rows:any[]) => {
        if (err) {
            // if an error occurs, catch it, log it to the console, and return null
            console.log({error: err.message});
            return null;
        } else {
            db.all(
                "select * from Posts where postId = $postId",
                {$postId: this.tail},
                (err:any, rows:any[]) => {
                    if (err) {
                        console.log({error: err.message});
                        return null;
                    } else if (rows === undefined || rows.length === 0) {
                        console.log({error: `error, no row returned from query for row with postId = ${postId}`});
                        return null;
                    } else {
                        // if no error occurred while inserting into the database, we can create the new Post and return it
                        let successfulPost = new Post(postId, date, title, content, userId, headerImage, date);
                        // increment the tail so we can increase the post id
                        this.tail++;
                        return successfulPost;
                    }
                }
            )
        }
    });
    return null;
  }
  /**
   * Method to retrieve a specific Post from the DB given its postId
   * @param postId - the ID of the post being retrieved
   * @returns - the Post object matching the postId passed in, or null if it could not be found
   */
  public retrievePostById(postId: number): Post | null {
    if (this.postArray[postId] === null) {
      return null;
    } else {
      return this.postArray[postId];
    }
  }
  /**
   * Method to return an array of Posts made by the user being passed
   * @param userId - the userId string for the user whose posts are being queried
   * @returns - and array of Posts if any exist for the user in question, otherwise returns null
   */
  public retrievePostsByUser(userId: string): Post[] | null {
    let userPosts: Post[] = [];
    this.postArray.forEach((element) => {
      // if the userId of the current element matches the userId passes in, add it to the array of posts
      if (element.userId === userId) {
        userPosts.push(element);
      }
    });
    // after every Post in the postsArray has been queried, if no posts by the user have been found, return null
    if (userPosts.length === 0) {
      return null;
    } else {
      return userPosts;
    }
  }

  /**
   * Method to update an existing post
   * @param postId  - the postId for the post that is being updated
   * @param userId - the userId for the User who is currently logged in and authenticated
   * @param headerImage - the string with the link to the image that should replace the current headerImage string
   * @param content - the string with the content that should replace the content string currently in the Post
   * @returns - the Post with its updated values if it could be updated, and null otherwise
   */
  public updatePost(
    postId: number,
    userId: string,
    headerImage: string,
    content: string
  ): Post | null {
    let oldPost: Post | null = this.retrievePostById(postId);
    // if the value returned by retrievePostById is not null and the author matches the authenticated user, update the Post
    if (oldPost !== null && oldPost.userId === userId) {
      let oldContent: string | null = null;
      let oldHeaderString: string | null = null;
      // if the length of the string passed for the content update is greater than 0, update the Post's content
      if (content.length > 0) {
        oldContent = oldPost.content;
        this.postArray[postId].content = content;
      }

      // if the length of the string passed for the headerImage update is greater than 0, update the Post's headerImage
      if (headerImage.length > 0) {
        oldHeaderString = oldPost.headerImage;
        // update the Post's headerImage
        this.postArray[postId].headerImage = headerImage;
      }
      // update the lastUpdated Date field for the post to the current date
      this.postArray[postId].lastUpdated = new Date();
      // return the Post from the database with its updated values
      return this.retrievePostById(postId);
    } else {
      return null;
    }
  }

  /**
   * Method to delete a post from the database
   * @param postId
   * @param userId
   * @returns
   */
  public deletePost(postId: number, userId: string): Post | null {
    // get post from the db
    let post: Post | null = this.retrievePostById(postId);
    // verify that we could retrieve the postId and that it's author is the currently authenticated user
    if (post !== null && post.userId === userId) {
      // remove the post from the database and update the tail
      this.postArray.splice(postId, 1);
      this.tail--;
      return post;
    } else {
      // return null if the post could not be deleted
      return null;
    }
  }
  public toJSON() {
    let stringArray = [] as JSON[];
    this.postArray.forEach(function (entry) {
      stringArray.push(JSON.parse(entry.toJSON()));
    });
    return stringArray;
  }
}

export { PostDatabase };
