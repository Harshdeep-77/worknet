import { Router } from "express";
import multer from "multer";
import {
  activeCheck,
  createPost,
  getAllPost,
  deletePost,
  commentPost,
  get_comment_by_post,
  delete_comment_of_uer,
  increase_like,
} from "../controllers/posts.controller.js";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route("/").get(activeCheck);
router.route("/post").post(upload.single("media"), createPost);
router.route("/posts").get(getAllPost);
router.route("/delete_post").post(deletePost);
router.route("/commentPost").post(commentPost);
router.route("/get_comments").get(get_comment_by_post);
router.route("/delete_comment").delete(delete_comment_of_uer);
router.route("/increment_post_like").post(increase_like);

export default router;
