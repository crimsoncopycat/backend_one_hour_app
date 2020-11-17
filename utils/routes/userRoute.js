// const express = require("express");
//
// const userController = require("./../controllers/userController");
// const authController = require("./../controllers/authController");
// const router = express.Router();
//
//
// router.get('/logout',authController.logout);
// router.route('/')
//     .get(authController.protect,authController.restrictTo('admin'),userController.getAllUsers)
//     .post(authController.protect,authController.restrictTo('admin'),userController.createUser);
//
// router.post('/signup',authController.signup);
// router.post('/login',authController.login);
//
//
//
// router.use(authController.protect);
// router.post('/forgotPassword',authController.forgotPassword);
// router.patch('/resetPassword/:token',authController.resetPassword);
//
// router.patch('/updateMyPassword',
//     authController.updatePassword);
//
// router.get('/me',
//     userController.getMe,
//     userController.getUserById);
//
// router.patch('/updateMe',
//     userController.uploadUserPhoto,
//     userController.resizeUserPhoto,
//     userController.updateMe);
//
// router.delete('/deleteMe',
//     userController.deleteMe);
//
// router.route("/:id")
//     .get(authController.restrictTo('admin'),userController.getUserById)
//     .patch(authController.restrictTo('admin'),userController.updateUser)
//     .delete(authController.restrictTo('admin'),userController.deleteUser);
//
// module.exports = router;
//
