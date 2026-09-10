import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../config/redux/action/postAction";
import { useState } from "react";

export default function dashboard() {
  const router = useRouter();
  const [isTokenThere, setIsTokenThere] = useState(false);
  const dispath = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("token") === null) {
      router.push("/login");
    }
    setIsTokenThere(true);
  }, []);
  useEffect(() => {
    if (isTokenThere) {
      dispath(getAllPosts());
    }
  }, [isTokenThere]);
  return <div>dashboard</div>;
}
