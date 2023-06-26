import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import { useSignOut } from "react-auth-kit";
import styles from "./Home.module.scss";

const Home = () => {
  const auth = useAuthUser();
  const signOut = useSignOut();
  const [allUsers, setAllUsers] = useState(0);
  const [users, setUsers] = useState([{}]);

  document.title = `Users`;

  const server_url = ` https://auth-node.up.railway.app/auth/users`;

  const HandleSignOut = () => {
    signOut();
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        await axios.get(server_url).then((result) => {
          setUsers(result.data);
          setAllUsers(result.data.length);
        });
      } catch (err) {
        alert(err.message);
      }
    };

    getUsers();
  }, []);

  return (
    <>
      {auth() ? (
        <div>
          <button className={styles.btn} onClick={HandleSignOut}>
            Sign Out
          </button>

          <h1 className={styles.title}>All users: {allUsers}</h1>

          {users.map((user, i) => (
            <div className={styles.users} key={i}>
              <div className={styles.logo}>
                <img
                  src={
                    user.photo
                      ? user.photo
                      : "https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
                  }
                  alt="User"
                />
              </div>

              <div className={styles.user_data}>
                <h1 className={styles.full_name}>
                  {user.FirstName} {user.LastName}
                </h1>

                <h3 className={styles.username}>Username: @{user.username}</h3>

                <a href={`tel:${user.PhoneNumber}`}>
                  <p className={styles.phone}>
                    {user.PhoneNumber ? `Phone: ${user.PhoneNumber}` : null}
                  </p>
                </a>

                <a href={`mailto:${user.email}`}>
                  <p className={styles.email}>
                    Email: <span>{user.email}</span>
                  </p>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.welcome}>
          <h1 className={styles.title}>Welcome!</h1>
        </div>
      )}
    </>
  );
};

export default Home;
