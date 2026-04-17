import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

const logout = async () => {
  try {
    await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });

    setUser(null);
    navigate("/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};


  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Home</h2>

      {user ? (
        <div>
          <h3>Welcome, {user.name} 👋</h3>
          <p>Email: {user.email}</p>

          {/* Optional Profile Image */}
          {user.profilePic && (
            <img
              src={user.profilePic}
              alt="profile"
              width="100"
              style={{ borderRadius: "50%" }}
            />
          )}
        </div>
      ) : (
        navigate("/login")
    
      )}
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Home;