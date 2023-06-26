import Image from "next/image";
import styles from "./page.module.css";
import Hero from "public/66.gif";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item1}>
        <h1 className={styles.title}>Unleash your imagination!</h1>
        <p className={styles.desc}>
          Embark on a journey that captivates your senses and leaves you craving
          for more. Unlock the magic of storytelling and let your imagination
          soar.
        </p>

        <Button url="/portfolio" text="Checkout our work" />
      </div>
      <div className={styles.item2}>
        <Image src={Hero} alt="homeImage" className={styles.img} />
      </div>
    </div>
  );
}
