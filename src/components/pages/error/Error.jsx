import styles from "./Error.module.scss";

const Error = () => {
  return (
    <>
      <div className={styles.page}>
        <img
          className={styles.img}
          src="https://images.ctfassets.net/ooa29xqb8tix/3z06UNk6wzqKRAUHIGGqNq/b645540f93c695f6bb9b95c076582e57/UI_Design_400x300_-_1.svg"
          alt="img"
        />
        <h3 className={styles.title}>
          404 <br /> <span>Nothing here...</span>
        </h3>
      </div>
    </>
  );
};

export default Error;
