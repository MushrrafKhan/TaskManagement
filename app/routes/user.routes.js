module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    // Create a new user
    app.post("/user", user.create);

    app.post("/signup", user.signup);

  
    // Retrieve all user
    app.get("/user", user.findAll);
  
    // Retrieve a single user with userId
    app.get("/user/:userId", user.findOne);
  
    // Update a user with userId
    app.put("/user/:userId", user.update);
  
    // Delete a user with userId
    app.delete("/user/:userId", user.delete);
  
    // Create a new user
    app.delete("/user", user.deleteAll);

    // login user
    app.post("/user/login", user.login);

    app.post("/user/resetpass/:userId", user.resetPassword);


    // reset password
    // app.post("/user/resetpassword/:userId", user.resetPassword);

    // app.post("/user/resetpass/:userid", user.resetpass);
    
    // otp send in email(forgot password api)
    app.post("/users/forgot-password", user.forgotPassword);

    // otp and email check and after change password
    app.post("/user/check-password", user.checkPassword);



  // forgot password
    // app.post("/user/forgot", user.forgot);

    // token reset
    app.post("/user/tokenreset", user.tokenreset);

    app.post("/user/image/:userId", user.uploadImage);



  };
  