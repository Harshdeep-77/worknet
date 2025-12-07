import { Router } from "express";
import { activeCheck } from "../controllers/posts.controller.js";
import { login, register ,uploadProfilePicture,updateUserProfile, 
  getUserAndProfile,updateProfileData, getAllUserProfile, downloadProfile,
  sendConnectionRequest,
  getMyConnection,
  whatAreMyConnection,
  acceptConnectionRequest} 
  from "../controllers/user.controllers.js";
import multer from "multer";


const router=Router();

// Storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder for profile pics
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // unique name
  }
});
const upload=multer({storage:storage});

router.route("/upload_profile_picture")
.post(upload.single("profile_picture"),uploadProfilePicture);




router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user_update").post(updateUserProfile);
router.route("/get_user_and_profile").get(getUserAndProfile);
router.route("/update_profile_data").post(updateProfileData);
router.route("/get_all_user_profile").get(getAllUserProfile);
router.route("/user/download_resume").get(downloadProfile);
router.route("/user/send_connection_request").post(sendConnectionRequest);
router.route("/user/get_connection_request").get(getMyConnection);
router.route("/user/user_connection_request").get(whatAreMyConnection);
router.route("/user/accept_connection_request").post(acceptConnectionRequest);
  



export default router;