const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");



/* Models */
const UserModel = mongoose.model('User')
const AuthModel = mongoose.model('Auth')
const TodoModel = mongoose.model('Todo')
const MultiTodoModel = mongoose.model('MultiTodo')


/* Get all user Details */
let getAllUser = (req, res) => {
    UserModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller: getAllUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all users


let getAllIssueDetails = (req, res) => {
    IssueModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find issue Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No issue Found', 'User Controller: getAllUser')
                let apiResponse = response.generate(true, 'No Issues Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Issue  Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}
/* Get single user details */
let getSingleIssue = (req, res) => {
    IssueModel.findOne({ 'issueId': req.params.issueId })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getSingleUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller:getSingleUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User Details Found', 200, result)
                res.send(result)
            }
        })
}// end get single user


let getAllTodoLists = (req, res) => {
    TodoModel.find({ 'createdBy': req.params.createdBy })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getSingleUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller:getSingleUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User Details Found', 200, result)
                res.send(result)
            }
        })
}

let getAllMultiTodoLists = (req, res) => {
    MultiTodoModel.find({ 'createdBy': req.params.createdBy })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getSingleUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller:getSingleUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User Details Found', 200, result)
                res.send(result)
            }
        })
}

let getAllMultiTodoListsTask = (req, res) => {
    MultiTodoModel.find({ 'todoId': req.params.createdBy })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getSingleUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller:getSingleUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User Details Found', 200, result)
                res.send(result)
            }
        })
}


let getSingleUser = (req, res) => {
    UserModel.findOne({ 'userId': req.params.userId })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getSingleUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller:getSingleUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}





let deleteUser = (req, res) => {

    UserModel.findOneAndRemove({ 'userId': req.params.userId }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller: deleteUser', 10)
            let apiResponse = response.generate(true, 'Failed To delete user', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: deleteUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the user successfully', 200, result)
            res.send(apiResponse)
        }
    });// end user model find and remove


}// end delete user

let editUser = (req, res) => {

    let options = req.body;
    UserModel.update({ 'userId': req.params.userId }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To edit user details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'User details edited', 200, result)
            res.send(apiResponse)
        }
    });// end user model update


}// end edit user


let editIssue = (req, res) => {

    let options = req.body;
    IssueModel.update({ 'issueId': req.params.issueId }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To edit user details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'User details edited', 200, result)
            res.send(apiResponse)
        }
    });// end user model update


}// end edit user


let addTask = (req, res) => {   

    var options ={
        task : req.body.task,
        status : req.body.status,
        id: shortid.generate()
        

    }
    JSON.stringify(options);
    console.log(options)
    TodoModel.findOneAndUpdate({ 'todoId': req.params.todoId }, { $push: { tasks: options } }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To edit user details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'User details edited', 200, result)
            res.send(apiResponse)
        }
    });// end user model update


}// end edit user


let addMultiTask = (req, res) => {   

    var options ={
        task : req.body.task,
        status : req.body.status,
        id: shortid.generate()
        

    }
    JSON.stringify(options);
    console.log(options)
    MultiTodoModel.findOneAndUpdate({ 'todoId': req.params.todoId }, { $push: { tasks: options } }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To edit user details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'User details edited', 200, result)
            res.send(apiResponse)
        }
    });// end user model update


}// end edit user


let sendFriendRequest = (req,res) =>{
    var options ={
        from : req.body.from,
        to : req.body.to
    }
    JSON.stringify(options);
    UserModel.update({'userId':req.body.to},{ $addToSet: {'friendRequest': req.body.from}}).exec((err,result)=>{
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To send friend request', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found to send Friend Request', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'User details edited', 200, result)
            res.send(apiResponse)
        }
    })
}

let acceptFriendRequest = (req,res) =>{
    UserModel.update({'userId':req.body.userId},{ $pull: { friendRequest:  req.body.friendRequestId  } }, // item(s) to match from array you want to pull/remove
    { multi: true } ).exec((err,result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To accept friend request', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found to accept Friend Request', 404, null)
            res.send(apiResponse)
        } else {
            UserModel.update({'userId':req.body.userId},{  $addToSet: {'friendsList': req.body.friendRequestId}}).exec((err,result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'User Controller:editUser', 10)
                    let apiResponse = response.generate(true, 'Failed To accept friend request', 500, null)
                    res.send(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No User Found', 'User Controller: editUser')
                    let apiResponse = response.generate(true, 'No User Found to accept Friend Request', 404, null)
                    res.send(apiResponse)
                } else {
                    UserModel.update({'userId':req.body.friendRequestId},{  $addToSet: {'friendsList': req.body.userId}}).exec((err,result) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'User Controller:editUser', 10)
                            let apiResponse = response.generate(true, 'Failed To accept friend request', 500, null)
                            res.send(apiResponse)
                        } else if (check.isEmpty(result)) {
                            logger.info('No User Found', 'User Controller: editUser')
                            let apiResponse = response.generate(true, 'No User Found to accept Friend Request', 404, null)
                            res.send(apiResponse)
                        } else {
                            let apiResponse = response.generate(false, 'friend Request accepted', 200, result)
                            res.send(apiResponse)
                        }
                    })
                }
            })
        }
    })

   
}

let rejectFriendRequest = (req,res) =>{
    UserModel.update({'userId':req.body.userId},{ $pull: { friendRequest:  req.body.friendRequestId  } }, // item(s) to match from array you want to pull/remove
    { multi: true } ).exec((err,result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To accept friend request', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found to accept Friend Request', 404, null)
            res.send(apiResponse)
        } else {
           
                
                            let apiResponse = response.generate(false, 'friend Request Rejected', 200, result)
                            res.send(apiResponse)
                        }
                    })
                }
            

    



let alterCheck = (req, res) => {
   /* var options ={
      status : req.body.status,  

    }   { 'todoId': req.body.todoId, 'tasks.id':req.body.id}
    JSON.stringify(options);*/
    TodoModel.update(
        { "tasks.id":req.body.id  }, 
        { "$set": { "tasks.$.status": req.body.status} }
    ).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To edit user details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'User details edited', 200, result)
            res.send(apiResponse)
        }
    });// end user model 
}

let alterMultiCheck = (req, res) => {
    /* var options ={
       status : req.body.status,  
 
     }   { 'todoId': req.body.todoId, 'tasks.id':req.body.id}
     JSON.stringify(options);*/
     MultiTodoModel.update(
         { "tasks.id":req.body.id  }, 
         { "$set": { "tasks.$.status": req.body.status} }
     ).exec((err, result) => {
         if (err) {
             console.log(err)
             logger.error(err.message, 'User Controller:editUser', 10)
             let apiResponse = response.generate(true, 'Failed To edit user details', 500, null)
             res.send(apiResponse)
         } else if (check.isEmpty(result)) {
             logger.info('No User Found', 'User Controller: editUser')
             let apiResponse = response.generate(true, 'No User Found', 404, null)
             res.send(apiResponse)
         } else {
             let apiResponse = response.generate(false, 'User details edited', 200, result)
             res.send(apiResponse)
         }
     });// end user model 
 }


let deleteTask = (req, res) => {

    TodoModel.update(
        { },
        { $pull: { "tasks": { "id": req.body.id  } } },
        { multi: true }
      ).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller: delete Task', 10)
            let apiResponse = response.generate(true, 'Failed To delete task', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No task Found', 'User Controller: delete Task')
            let apiResponse = response.generate(true, 'No task Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the task successfully', 200, result)
            res.send(apiResponse)
        }
    });// end user model find and remove


}


let deleteMultiTask = (req, res) => {

    MultiTodoModel.update(
        { },
        { $pull: { "tasks": { "id": req.body.id  } } },
        { multi: true }
      ).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller: delete Task', 10)
            let apiResponse = response.generate(true, 'Failed To delete task', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No task Found', 'User Controller: delete Task')
            let apiResponse = response.generate(true, 'No task Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the task successfully', 200, result)
            res.send(apiResponse)
        }
    });// end user model find and remove


}

// start user signup function 

let signUpFunction = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Email Does not met the requirement', 400, null)
                    reject(apiResponse)
                } else if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, '"password" parameter is missing"', 400, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input
    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        console.log(req.body)
                        let newUser = new UserModel({
                            userId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            email: req.body.email.toLowerCase(),
                            mobileNumber: req.body.mobileNumber,
                            password: passwordLib.hashpassword(req.body.password),
                            createdOn: time.now()
                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj)
                            }
                        })
                    } else {
                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                        let apiResponse = response.generate(true, 'User Already Present With this Email', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create user function



    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password
            let apiResponse = response.generate(false, 'User created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end user signup function 

let newTodo = (req,res) => {
    var today = Date.now()
    let todoId = shortid.generate()

    let newTodo = new TodoModel({
        todoId:todoId,
        todoListName: req.body.name,
        createdOn:today,
        createdBy:req.body.userId
        

    })
    newTodo.save((err,result)=>{
        if(err){
            logger.error(err.message, 'userController: createUser', 10)
            let apiResponse = response.generate(true, 'Failed to create new issue', 500, null)
            res.send(apiResponse)
        }
        else{
            let newTodoObject = newTodo.toObject();
            let apiResponse = response.generate(false, 'success', 200, result)
            res.send(apiResponse)
        }
    })
}

let newMultiTodo = (req,res) => {
    var today = Date.now()
    let todoId = shortid.generate()

    let newMultiTodo = new MultiTodoModel({
        todoId:todoId,
        todoListName: req.body.name,
        createdOn:today,
        createdBy:req.body.userId
        

    })
    newMultiTodo.save((err,result)=>{
        if(err){
            logger.error(err.message, 'userController: createUser', 10)
            let apiResponse = response.generate(true, 'Failed to create new issue', 500, null)
            res.send(apiResponse)
        }
        else{
            let newTodoObject = newMultiTodo.toObject();
            let apiResponse = response.generate(false, 'success', 200, result)
            res.send(apiResponse)
        }
    })
}

// start of login function 
let loginFunction = (req, res) => {
    let findUser = () => {
        console.log("findUser");
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                console.log("req body email is there");
                console.log(req.body);
                UserModel.findOne({ email: req.body.email}, (err, userDetails) => {
                    /* handle the error here if the User is not found */
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        /* generate the error message and the api response message here */
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                        /* if Company Details is not found */
                    } else if (check.isEmpty(userDetails)) {
                        /* generate the response and the console error message here */
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        /* prepare the message and the api response here */
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                });
               
            } else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }
    let validatePassword = (retrievedUserDetails) => {
        console.log("validatePassword");
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (isMatch) {
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }

    let generateToken = (userDetails) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }
    let saveToken = (tokenDetails) => {
        console.log("save token");
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }

    findUser(req,res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}



// end of the login function 


/**
 * function to logout user.
 * auth params: userId.
 */
let logout = (req, res) => {
  AuthModel.findOneAndRemove({userId: req.user.userId}, (err, result) => {
    if (err) {
        console.log(err)
        logger.error(err.message, 'user Controller: logout', 10)
        let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
        res.send(apiResponse)
    } else if (check.isEmpty(result)) {
        let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
        res.send(apiResponse)
    } else {
        let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
        res.send(apiResponse)
    }
  })
} // end of the logout function.

let forgot =(req, res, next) => {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          console.log(token)
          done(err, token);
        });
      },
      function(token, done) {
        UserModel.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            let apiResponse = response.generate(true, 'No account with that email address exists.', 500, null)
            res.send(apiResponse)
          }
          else{
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
          user.save(function(err) {
            done(err, token, user);
          });
        }});
      },
      function(token, user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail', 
          auth: {
            user: 'todolistbyvenky@gmail.com',
            pass: 'Abc1234321'
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'todolistbyvenky@gmail.com',
          subject: 'Todo application Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + 'venky146.online' + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log('mail sent');
          done(err, 'done');
          let apiResponse = response.generate(false, 'Email Sent SucessFully.', 200, null)
          res.send(apiResponse)
        });
      }
    ],function(err) {
        if (err) return next(err);
        
    });

}
          
let reset = (req, res) => {
        async.waterfall([
          function(done) {
            UserModel.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
              if (!user) {
                let apiResponse = response.generate(true, 'Password reset token is invalid or has expired.', 500, null)
                res.send(apiResponse)
              }
              if(req.body.password === req.body.confirm) {
               user.password = passwordLib.hashpassword(req.body.password)
               user.resetPasswordToken = undefined;
               user.resetPasswordExpires = undefined;
                  
                }
                user.save();
                console.log(user.email +'from -----');
                mailReset(user.email);

                let apiResponse = response.generate(false, 'success', 200, null)
                res.send(apiResponse)
            });
          },
        
        ]);
      
    }

    let mailReset =   (mailId) => {
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail', 
          auth: {
            user: 'todolistbyvenky@gmail.com',
            pass: 'Abc1234321'
          }
        });
        var mailOptions = {
          to: mailId,
          from: 'learntocodeinfo@mail.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + mailId + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          return
        });
      }


module.exports = {

    signUpFunction: signUpFunction,
    getAllUser: getAllUser,
    editUser: editUser,
    deleteUser: deleteUser,
    getSingleIssue: getSingleIssue,
    loginFunction: loginFunction,
    logout: logout,
    newTodo:newTodo,
    newMultiTodo:newMultiTodo,
    editIssue:editIssue,
    getSingleUser:getSingleUser,
    getAllIssueDetails:getAllIssueDetails,
    addTask:addTask,
    addMultiTask:addMultiTask,
    forgot:forgot,
    reset:reset,
    getAllTodoLists:getAllTodoLists,
    alterCheck:alterCheck,
    deleteTask:deleteTask,
    sendFriendRequest:sendFriendRequest,
    acceptFriendRequest:acceptFriendRequest,
    rejectFriendRequest:rejectFriendRequest,
    getAllMultiTodoLists:getAllMultiTodoLists,
    alterMultiCheck:alterMultiCheck,
    deleteMultiTask:deleteMultiTask,
    getAllMultiTodoListsTask:getAllMultiTodoListsTask

}// end exports