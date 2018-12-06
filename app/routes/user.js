
const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;


    app.get(`${baseUrl}/view/all`,  userController.getAllUser);
    app.get(`${baseUrl}/:createdBy/todolist`,userController.getAllTodoLists)
    app.get(`${baseUrl}/:createdBy/multitodolist`,userController.getAllMultiTodoLists)

    app.get(`${baseUrl}/:createdBy/multitodolisttasks`,userController.getAllMultiTodoListsTask)


    // params: userId.
    app.get(`${baseUrl}/:issueId/details`,  userController.getSingleIssue);
    app.get(`${baseUrl}/:userId`,  userController.getSingleUser);

    app.get(`${baseUrl}/issue/issueDetails`,  userController.getAllIssueDetails);
    
    // forgot password
app.get(`${baseUrl}/forgot`, function(req, res) {
    res.render('../views/forgot');
  });
  
  app.post(`${baseUrl}/forgot`, userController.forgot);
  
  app.get(`${baseUrl}/reset`, function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/forgot');
      }
      res.render('reset', {token: req.params.token});
    });
  });
  
  app.post(`${baseUrl}/reset`, userController.reset);
 
    
    // params: firstName, lastName, email, mobileNumber, password, apiKey.
    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    app.post(`${baseUrl}/todo`,  userController.newTodo)
    app.post(`${baseUrl}/multitodo`,  userController.newMultiTodo)

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "firstName": "Rishabh",
                "userId": "-E9zxTYA8"
            }

        }
    */
   app.post(`${baseUrl}/sendfriendrequest`, userController.sendFriendRequest)
   app.post(`${baseUrl}/acceptfriendrequest`, userController.acceptFriendRequest)
   app.post(`${baseUrl}/rejectfriendrequest`, userController.rejectFriendRequest)

   app.put(`${baseUrl}/:todoId/edit`, userController.addTask);
   
   app.put(`${baseUrl}/:todoId/multiedit`, userController.addMultiTask);
   app.post(`${baseUrl}/deletetask`,userController.deleteTask);

   app.post(`${baseUrl}/deletemultitask`,userController.deleteMultiTask);


   app.put(`${baseUrl}/alterCheck`, userController.alterCheck);
   app.put(`${baseUrl}/altermultiCheck`, userController.alterMultiCheck);
   app.put(`${baseUrl}/:issueId/edit`, userController.editIssue);

    app.post(`${baseUrl}/login`, userController.loginFunction);

    app.put(`${baseUrl}/:userId/edit`, auth.isAuthorized, userController.editUser);

    app.post(`${baseUrl}/:userId/delete`, auth.isAuthorized, userController.deleteUser);

    

    app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);

}
