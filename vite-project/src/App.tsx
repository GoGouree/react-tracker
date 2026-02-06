
import Counter from "./components/Counter";
import Timer from "./components/Timer";
import LoginForm from "./components/LoginForm";
import UserCardList from "./components/UserCardList";
import { Navbar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import GitHubUserSearch from "./components/GitHubUserSearch";
import "./App.css";




function App() {
  return (
    <div id="root">
      {/* Header */}
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', letterSpacing: 1 }}>React Tracker App</h1>
      </header>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <main style={{ marginTop: 32 }}>
        <section style={{ marginBottom: 32 }}>
          <h2>Counter & Timer</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginTop: 16 }}>
            <Counter />
            <Timer />
          </div>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2>Login</h2>
          <LoginForm />
        </section>

        <section style={{ marginBottom: 32 }}>
          <GitHubUserSearch />
        </section>

        <section>
          <UserCardList />
        </section>
      </main>

      <footer style={{ marginTop: 48, color: '#ee8cc9', fontSize: 14 }}>
        &copy; {new Date().getFullYear()} React Tracker App
      </footer>
    </div>
  );
}


export default App;