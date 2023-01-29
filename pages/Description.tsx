import styles from "../styles/Description.module.css";

export default function Description() {
  return (
    <div className={styles.description}>
      <img className={styles.logo} alt="Unco logo" src="/logo@4x.png" />
      <div className={styles.message}>
        <h3>Record your unco in the world...</h3>
        <p className={styles.authors}>
          produced by
          <a
            href="https://twitter.com/biga816"
            target="_blank"
            rel="noreferrer"
          >
            @biga816
          </a>
          ,
          <a
            href="https://twitter.com/atsukita"
            target="_blank"
            rel="noreferrer"
          >
            @atsukita
          </a>
          .
        </p>
      </div>
    </div>
  );
}
