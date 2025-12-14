import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import UserLayout from "../layout/clientLayout";

export default function Home() {
  const router = useRouter();
  return (
    <UserLayout>
      <div className={`${styles.container} bg-blue-500`}>
        <div className={styles.mainContainer}>
          <div className={styles.mainContainer_left}>
            <p>Connect with friends without any problems</p>
            <p className="">A true social media platfom,where people connect togther</p>

           

            <div
              onClick={() => {
                router.push("/login");
              }}
              className={styles.buttonJoin}
            >
              <p>Join now</p>
            </div>
          </div>
          <div className={styles.mainContainer_right}>
            <img src="images/bg2.jpg" alt="" />
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
