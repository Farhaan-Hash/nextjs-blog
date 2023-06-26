import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import banner from "/public/440.gif";
import Button from "@/components/Button/Button";

export const metadata = {
  title: "About Page",
  description: "",
};

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={banner}
          alt="aboutPage"
          fill={true}
          className={styles.img}
        />
        <div className={styles.imgText}>
          <h1 className={styles.imgTitle}>Digital Storytellers</h1>
        </div>
        <h2 className={styles.imgDesc}>
          Revolutionizing & Transforming Digital experiences{" "}
        </h2>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h1 className={styles.title}>Who we are?</h1>
          <p className={styles.desc}>
            A leading education-focused organization dedicated to empowering
            individuals and shaping a brighter future. At [Company Name], we
            firmly believe that education is the cornerstone of personal and
            societal growth. Our mission is to provide transformative learning
            experiences that nurture the intellectual, emotional, and social
            development of every learner.
            <br></br>
            With a passionate team of educators, researchers, and industry
            experts, we strive to create innovative educational solutions that
            inspire and engage students at all levels. Whether you are a
            student, parent, teacher, or educational institution, is here to
            support you on your educational journey.{" "}
          </p>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title}>What do we do?</h1>
          <p className={styles.desc}>
            we are committed to providing exceptional educational services and
            resources to support individuals in their learning journeys. Our
            extensive range of offerings is designed to cater to diverse
            learning needs and empower learners of all ages and backgrounds. We
            offer a variety of interactive online courses that cover a wide
            range of subjects and disciplines.
            <br></br>
            Whether you are looking to enhance your skills in a specific area or
            explore a new field of interest, our courses are carefully crafted
            to provide engaging and comprehensive learning experiences. Through
            our virtual classrooms, learners have the opportunity to connect
            with expert instructors and collaborate with peers from around the
            world.
          </p>
          <Button url="/contact" text="Contact" />
        </div>
      </div>
    </div>
  );
};

export default About;
