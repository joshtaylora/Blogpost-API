import express from "express";
import jwt from "jsonwebtoken";

import { db } from "../db/database";
import { secret } from "../index";
import { Post } from "../models/Post";

const bcrypt = require("bcrypt");
const saltRounds = 10;

const postRouter = express.Router();
/**
 * method: get
 * rotue: /Posts/
 * description: retrieves all Posts in the Posts database
 */
postRouter.get("/", (req, res, next) => {
  let sql = "select * from Posts order by createdDate ASC";
  let params: any[] = [];
  db.all(sql, params, (err: any, rows: any[]) => {
    if (err) {
      res
        .status(400)
        .send({ error: "Posts could not be retrieved from the Posts table" });
      return;
    } else {
      console.log({
        method: "get",
        route: "/Posts/",
        data: rows,
      });
      res.status(200).send({
        message: "success",
        data: rows,
      });
      return;
    }
  });
});

/**
 * method: post
 * route: /Posts/
 * description: creates a new post if the user attempting to create the post can successfully be authenticated
 */
postRouter.post("/", (req, res, next) => {
  let newDate = new Date().toJSON().slice(0, 10);
  let sql =
    "insert into Posts (createdDate, title, content, userId, headerImage, lastUpdated) VALUES ($createdDate, $title, $content, $userId, $headerImage, $lastUpdated)";
  let params = {
    $createdDate: newDate,
    $title: req.body.title,
    $content: req.body.content,
    $userId: req.body.userId,
    $headerImage: req.body.headerImage,
    $lastUpdated: newDate,
  };
  // requires User to be properly authenticated
  if (req.headers.authorization) {
    try {
      // verify that the token passed in the authorization header can be authenticated
      let tokenPayload = jwt.verify(
        req.headers.authorization.toString().split(" ")[1],
        secret
      ) as { userId: string; exp: number; sub: string };
      db.all(
        "select * from Users where userId = $userId",
        { $userId: tokenPayload.userId },
        (err: any, row: any[]) => {
          if (err) {
            // if an error occurred, log the error and send the 404 status code
            console.log({
              error: `User ${req.body.userId} is not authenticated and is thereby not able to create a new Post`,
            });
            res.status(401).send({
              error: `User ${req.body.userId} is not authenticated and is thereby not able to create a new Post`,
            });
            return;
          } else if (row.length === 0 || row === undefined) {
            console.log({
              Status: 401,
              Message: `User with userId = ${tokenPayload.userId} is not authenticated`,
            });
            res.status(401).send({
              Status: 401,
              Message: `User with userId = ${tokenPayload.userId} is not authenticated`,
            });
            return;
          } else {
            let userIdQueryStr = JSON.stringify(row[0].userId);
            let user = userIdQueryStr.replace(/['"]+/g, "");
            if (tokenPayload.userId === user) {
              db.all(sql, params, (err: any) => {
                if (err) {
                  console.log({
                    Status: 404,
                    Message: `Error occurred while trying to find User with userId =  ${req.body.userId}`,
                  });
                  res.status(404).json({
                    Status: 404,
                    Message: `Error occurred while trying to find User with userId =  ${req.body.userId}`,
                  });
                  return;
                } else {
                  let sql = "select * from Posts order by postId DESC";
                  let params = {};
                  db.all(sql, params, (err: any, rows: any[]) => {
                    if (err) {
                      console.log({
                        Status: 404,
                        Message: `Error occurred while trying to find User with userId =  ${req.body.userId}`,
                      });
                      res.status(404).json({
                        Status: 404,
                        Message: `Error occurred while trying to find User with userId =  ${req.body.userId}`,
                      });
                    } else if (rows === undefined || rows.length === 0) {
                      console.log({
                        Status: 404,
                        Message: `Error occurred while trying to find User with userId =  ${req.body.userId}`,
                      });
                      res.status(404).json({
                        Status: 404,
                        Message: `Error occurred while trying to find User with userId =  ${req.body.userId}`,
                      });
                    } else {
                      let row = rows[0];
                      let postId = JSON.stringify(row.postId).replace(
                        /['"]+/g,
                        ""
                      );
                      let createdDate = JSON.stringify(row.createdDate).replace(
                        /['"]+/g,
                        ""
                      );
                      let title = JSON.stringify(row.title).replace(
                        /['"]+/g,
                        ""
                      );
                      let content = JSON.stringify(row.content).replace(
                        /['"]+/g,
                        ""
                      );
                      let userId = JSON.stringify(row.userId).replace(
                        /['"]+/g,
                        ""
                      );
                      let headerImage = JSON.stringify(row.headerImage).replace(
                        /['"]+/g,
                        ""
                      );
                      let lastUpdated = JSON.stringify(row.lastUpdated).replace(
                        /['"]+/g,
                        ""
                      );
                      let newPost = new Post(
                        +postId,
                        createdDate,
                        title,
                        content,
                        userId,
                        headerImage,
                        lastUpdated
                      );
                      console.log(JSON.parse(newPost.toJSON()));
                      console.log({
                        method: "post",
                        route: "/Posts/",
                        message: `User ${req.body.userId} successfully created post ${req.body.title}`,
                      });
                      res.status(201).send({
                        message: `User ${req.body.userId} successfully created post ${req.body.title}`,
                        data: JSON.parse(newPost.toJSON()),
                      });
                      return;
                    }
                  });
                }
              });
            } else {
              console.log({
                error: `User ${req.body.userId} is not authorized to create a new Post`,
              });
              res.status(401).json({
                Status: 401,
                Message: `User ${req.body.userId} is not authorized to create new Post`,
              });
              return;
            }
          }
        }
      );
    } catch (err) {
      console.log({ Status: 401, Message: err.message });
      res.status(401).send({ error: "invalid web token" });
      return;
    }
  }
});

function getLastPost(): Post | null {
  let postReturn: Post | null = null;
  let sql = "select * from Posts order by postId DESC";
  let params = {};
  db.all(sql, params, (err: any, rows: any[]) => {
    if (err) {
      return null;
    } else if (rows === undefined || rows.length === 0) {
      return null;
    } else {
      let row = rows[0];
      let postId = JSON.stringify(row.postId).replace(/['"]+/g, "");
      let createdDate = JSON.stringify(row.createdDate).replace(/['"]+/g, "");
      let title = JSON.stringify(row.title).replace(/['"]+/g, "");
      let content = JSON.stringify(row.content).replace(/['"]+/g, "");
      let userId = JSON.stringify(row.userId).replace(/['"]+/g, "");
      let headerImage = JSON.stringify(row.headerImage).replace(/['"]+/g, "");
      let lastUpdated = JSON.stringify(row.lastUpdated).replace(/['"]+/g, "");
      postReturn = new Post(
        +postId,
        createdDate,
        title,
        content,
        userId,
        headerImage,
        lastUpdated
      );
      console.log(JSON.parse(postReturn.toJSON()));
      return postReturn;
    }
  });
  return postReturn;
}

/**
 * methood: get
 * route: /Posts/{postId}
 * description:
 */
postRouter.get("/:postId", (req, res, next) => {
  let sql =
    "select postId, createdDate, title, content, userId, headerImage, lastUpdated from Posts where postId = $postId";
  let params = {
    $postId: req.params.postId,
  };
  db.all(sql, params, (err: any, row: any[]) => {
    if (err) {
      console.log({
        method: "get",
        route: "/Posts/:postId",
        error: `Post with postId = ${req.params.postId} could not be retrieved`,
      });
      res.status(404).send({
        Status: 404,
        Message: `Post with postId = ${req.params.postId} could not be retrieved`,
      });
      return;
    } else if (row.length === 0 || row === undefined) {
      console.log({
        method: "get",
        route: "/Posts/:postId",
        error: `Post with postId = ${req.params.postId} could not be retrieved`,
      });
      res
        .status(404)
        .send({
          Status: 404,
          Message: `Post with postId = ${req.params.postId} could not be found`,
        });
      return;
    } else {
      console.log({ data: row[0] });
      res.status(200).send({ data: row[0] });
      return;
    }
  });
});

/**
 * method: patch
 * route: /Posts/{postId}
 * description:
 */
postRouter.patch("/:postId", (req, res, next) => {
  if (req.headers.authorization === undefined) {
    let errorMsg = {
      Status: 401,
      Message: `User ${req.body.userId} is not authorized to update post with postId: ${req.params.postId}`,
    };
    console.log(errorMsg);
    res.status(401).send(errorMsg);
    return;
  } else {
    let tokenPayload = jwt.verify(
      req.headers.authorization.toString().split(" ")[1],
      secret
    ) as { userId: string; exp: number; sub: string };
    db.all(
      "select * from Users where userId = $userID",
      { $userID: req.body.userId },
      (err: any, row: any[]) => {
        if (err) {
          let errorMsg = {
            Status: 404,
            Message: `Authorization token for User with userId: ${tokenPayload.userId} does not reference a User in the database.`,
          };
          console.log(errorMsg);
          res.status(404).send(errorMsg);
          return;
        } else if (row.length === 0 || row === undefined) {
          // block executes if no row is found in the database correspoinding to the userId in the body
          // of the request
          let errorMsg = {
            Status: 401,
            Message: `The User with userId = ${req.body.userId} that created the post with postId: ${req.params.postId} is not the User that is currently logged in.`,
          };
          console.log(errorMsg);
          res.status(401).send(errorMsg);
          return;
        } else {
          if (tokenPayload.userId === req.body.userId) {
            // if the userId in the request body matches the one that is authenticated by the jwt token,
            // check to see if they are the author of the post they are trying to edit
            let sql =
              "select * from Posts where postId = $postId and userId = $userId";
            let params = {
              $postId: req.params.postId,
              $userId: req.body.userId,
            };
            db.all(sql, params, (err, row) => {
              if (err) {
                let errorMsg = {
                  Status: 404,
                  Message:
                    "The Post with the specified postId could not be found",
                };
                console.log(errorMsg);
                res.status(404).send(errorMsg);
                return;
              } else if (row === undefined || row.length === 0) {
                let errorMsg = {
                  route: "/Posts/{postId}",
                  method: "patch",
                  error: `User attempting the patch is not the author of the post`,
                };
                console.log(errorMsg);
                res.status(401).send(errorMsg);
                return;
              } else {
                let sql = "update Posts set";
                let commaCheck: boolean = false;
                let fieldCheck: boolean[] = [];
                let updateParameters: string[] = [];

                let params: any = {};

                if (req.body.content === undefined) {
                  fieldCheck[0] = false;
                } else {
                  let contentStr: string = "";
                  fieldCheck[0] = true;
                  if (commaCheck) {
                    contentStr += ",";
                  } else {
                    commaCheck = true;
                  }
                  contentStr += " content = $content";
                  params["$content"] = req.body.content;
                  updateParameters[0] = contentStr;
                }

                if (req.body.headerImage === undefined) {
                  fieldCheck[1] = false;
                } else {
                  let headerImageStr: string = "";
                  fieldCheck[1] = true;
                  if (commaCheck) {
                    headerImageStr += ",";
                  }
                  headerImageStr += " headerImage = $headerImage";
                  params["$headerImage"] = req.body.headerImage;
                  updateParameters[1] = headerImageStr;
                }

                updateParameters.forEach((entry) => {
                  sql += entry;
                });
                sql += ", lastUpdated = $lastUpdated";
                params["$lastUpdated"] = new Date().toJSON().slice(0, 10);
                sql += " where postId = $postId";
                params["$postId"] = req.params.postId;

                db.all(sql, params, (err: any) => {
                  if (err) {
                    console.log({ error: err.message });
                    res
                      .status(404)
                      .send({ error: "Post could not be updated" });
                    return;
                  }
                  console.log({
                    method: "patch",
                    route: "/Posts/:postId",
                    message: `Post with postId = ${req.params.postId} successfully updated`,
                  });
                  res.status(200).send({
                    message: `Post with postId = ${req.params.postId} successfully updated`,
                  });
                  return;
                });
              }
            });
          }
        }
      }
    );
  }
});

postRouter.delete("/:postId", (req, res, next) => {
  // check that the authorization header is not undefined
  if (req.headers.authorization) {
    try {
      let tokenPayload = jwt.verify(
        req.headers.authorization.toString().split(" ")[1],
        secret
      ) as { userId: string; exp: number; sub: string };
      db.all(
        "select * from Users where userId = $userId",
        { $userId: tokenPayload.userId },
        (err: Error | null, rows: any[]) => {
          if (err) {
            let errorMsg = {
              Status: 401,
              Message: `error occurred while attempting to get User with userId = |${tokenPayload.userId}| from Users DB`,
            };
            console.log(errorMsg);
            res.status(401).send(errorMsg);
            return;
          } else if (rows === undefined || rows.length === 0) {
            let errorMsg = {
              Status: 401,
              Message: `User with userId = ${tokenPayload.userId} could not be properly authenticated`,
            };
            console.log(errorMsg);
            res.status(401).send(errorMsg);
            return;
          } else {
            let userIdQueryStr = JSON.stringify(rows[0].userId);
            let userIdStr = userIdQueryStr.replace(/['"]+/g, "");
            let postsSql = "select * from Posts where postId = $postId";
            let postsParams = {
              $postId: req.params.postId,
            };
            // check that the post with the specified postId exists in the database
            db.all(postsSql, postsParams, (err: Error | null, rows: any[]) => {
              if (err) {
                let errorMsg = {
                  Status: 404,
                  Message: `Unable to find Post with postId = ${req.params.postId}`,
                };
                console.log(errorMsg);
                res.status(404).send(errorMsg);
                return;
              } else if (rows.length === 0 || rows === undefined) {
                let errorMsg = {
                  Status: 404,
                  Message: `Unable to find post with postId = ${req.params.postId}`,
                };
                console.log(errorMsg);
                res.status(404).send(errorMsg);
                return;
              } else {
                let postUsrStr = JSON.stringify(rows[0].userId);
                let postAuthor = postUsrStr.replace(/['"]+/g, "");
                // if the post author and the userId sent in the token match, we can delete the Post
                if (userIdStr === postAuthor) {
                  let sql = "delete from Posts where postId = $postId";
                  let params = {
                    $postId: req.params.postId,
                  };
                  db.all(sql, params, (err: Error | null, rows: any[]) => {
                    if (err) {
                      let errorMsg = {
                        Status: 404,
                        Message:
                          "unable to find post with the specified postId",
                      };
                      console.log(errorMsg);
                      res.status(404).send(errorMsg);
                      return;
                    } else {
                      let success = {
                        route: "/Posts/{postId}",
                        method: "delete",
                      };
                      console.log(success);
                      res.status(204).send(success);
                      return;
                    }
                  });
                }
              }
            });
          }
        }
      );
    } catch (err) {
      let errorMsg = {
        route: "/Posts/{postId}",
        method: "delete",
        error: err.message,
      };
      console.log(errorMsg);
      res.status(401).send(errorMsg);
    }
  } else {
    res.status(401).send();
    return;
  }
});

export { postRouter };
