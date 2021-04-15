import sqlite3 from "sqlite3";
import path from "path";

const DB = path.join(process.cwd(), "src", "BlogPostAPI_DB.db");
console.log(DB);

let db = new sqlite3.Database(DB, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connection with database successful");
    db.run(
      `CREATE TABLE Users (
            userId text PRIMARY KEY,
            firstName text,
            lastName text,
            emailAddress text,
            password text
            )`,
      (err) => {
        if (err) {
          //console.log(err.message);
        } else {
          // Populate the Users db with some fake users
          let insert =
            "INSERT INTO Users (userId, firstName, lastName, emailAddress, password) VALUES ($userId, $firstName, $lastName, $emailAddress, $password)";
          db.run(insert, {
            $userId: "admin",
            $firstName: "Joshua",
            $lastName: "Taylor",
            $emailAddress: "JoshuaTaylorA@gmail.com",
            $password: "asklnv*wn3DH!@",
          });
          db.run(insert, {
            $userId: "user1",
            $firstName: "testUser1First",
            $lastName: "testUser1Last",
            $emailAddress: "testUser1@email.com",
            $password: "testUser1Pass",
          });
        }
      }
    );
    db.all(
      `CREATE TABLE Posts (
            postId INTEGER PRIMARY KEY,
            createdDate TEXT,
            title TEXT,
            content TEXT,
            userId TEXT,
            headerImage TEXT,
            lastUpdated TEXT
            )`,
      (err) => {
        if (err) {
          // the Posts database has already been made
          // console.log('Posts database could not be created');
        } else {
          let insert =
            "INSERT INTO Posts (createdDate, title, content, userId, headerImage, lastUpdated) VALUES ($createdDate, $title, $content, $userId, $headerImage, $lastUpdated)";
          db.all(insert, {
            $createdDate: "2021-03-13",
            $title: "First Test Post",
            $content:
              "This is a test post, the first of its kind. Hopefully this sqlite3 database insert works!",
            $userId: "admin",
            $headerImage: "Josh.JPG",
            $lastUpdated: "2021-03-13",
          });
        }
      }
    );
    db.run(
      `CREATE TABLE Comments (
                commentId INTEGER PRIMARY KEY,
                comment TEXT,
                userId TEXT,
                postId INTEGER,
                commentDate TEXT
            )`,
      (err) => {
        if (err) {
          // if an error occurrs, it is because the database already exists
        } else {
          let insert =
            "INSERT into Comments (comment, userId, postId, commentDate) VALUES ($comment, $userId, $postId, $commentDate)";
          db.all(insert, {
            $comment:
              "this is the first comment that will be on the First Test Post",
            $userId: "admin",
            $postId: "0",
            $commentDate: "2021-04-05",
          });
        }
      }
    );
  }
});
export { db };

