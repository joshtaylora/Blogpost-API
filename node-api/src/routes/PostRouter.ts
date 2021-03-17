import express from "express";
import jwt from "jsonwebtoken";

import { db } from "../db/database";
import { secret } from "../index";

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
  let sql =
    "insert into Posts (createdDate, title, content, userId, headerImage, lastUpdated) VALUES ($createdDate, $title, $content, $userId, $headerImage, $lastUpdated)";
  let params = {
    $createdDate: req.body.createdDate,
    $title: req.body.title,
    $content: req.body.content,
    $userId: req.body.userId,
    $headerImage: req.body.headerImage,
    $lastUpdated: req.body.lastUpdated,
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
            res.status(404).send({
              error: `User ${req.body.userId} is not authenticated and is thereby not able to create a new Post`,
            });
            return;
          } else if (row.length === 0 || row === undefined) {
            console.log({
              error: `User ${tokenPayload.userId} could not be located in the Users database`,
            });
            res.status(404).send({
              error: `User ${req.body.userId} could not create post successfully`,
            });
            return;
          } else {
            let userIdQueryStr = JSON.stringify(row[0].userId);
            let user = userIdQueryStr.replace(/['"]+/g, "");
            if (tokenPayload.userId === user) {
              db.all(sql, params, (err: any) => {
                if (err) {
                  console.log({
                    error: `Error occurred while User ${req.body.userId} attempted to create a new Post`,
                  });
                  res.status(404).json({
                    error: `User ${req.body.userId} could not create new Post successfully`,
                  });
                  return;
                } else {
                  console.log({
                    method: "post",
                    route: "/Posts/",
                    message: `User ${req.body.userId} successfully created post ${req.body.title}`,
                  });
                  res.status(204).send({
                    message: `User ${req.body.userId} successfully created post ${req.body.title}`,
                  });
                  return;
                }
              });
            } else {
              console.log({
                error: `User ${req.body.userId} is not authorized to create a new Post`,
              });
              res.status(404).json({
                error: `User ${req.body.userId} is not authorized to create new Post`,
              });
              return;
            }
          }
        }
      );
    } catch (err) {
      console.log({ method: "post", route: "/Posts/", error: err.message });
      res.status(401).send({ error: "invalid web token" });
      return;
    }
  }
});

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
        error: `Post with postId = ${req.params.postId} could not be retrieved`,
      });
      return;
    } else if (row.length === 0 || row === undefined) {
      console.log({
        method: "get",
        route: "/Posts/:postId",
        error: `Post with postId = ${req.params.postId} could not be retrieved`,
      });
      res.status(404).send({
        error: `Post with postId = ${req.params.postId} could not be retrieved`,
      });
      return;
    } else {
      console.log({ data: row[0] });
      res.status(200).send({ data: row[0] });
      return;
    }
  });
});

postRouter.patch("/:postId", (req, res, next) => {
  /**
   * @TODO need to add authorization verification
   */
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

  sql += " where postId = $postId";
  params["$postId"] = req.params.postId;

  db.all(sql, params, (err: any) => {
    if (err) {
      console.log({ error: err.message });
      res.status(404).send({ error: "Post could not be updated" });
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
});

export { postRouter };
