import { useAuth } from "../context/AuthContext.jsx";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 24 }}>
      <h1>Event Booking Platform</h1>
      {user ? (
        <>
          <p>Logged in as {user.name} ({user.role})</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
      <p style={{ color: "gray" }}>
        Event listing, search, and booking will appear here in later phases.
      </p>
    </div>
  );
}
