import React from "react";
import Image from "next/image";
import imm from "/public/l1.gif";
import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <Image src={imm} alt="Loader" width={80} height={80} />
      </div>
    </div>
  );
};

export default Loader;
