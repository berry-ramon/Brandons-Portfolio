import { ThemeProvider } from "./context/ThemeContext";
import { AnalyticsProvider } from "./context/AnalyticsContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
// import Sidebar from "./components/layout/Sidebar";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Testimonials from "./components/sections/Testimonials";
import Resume from "./components/sections/Resume";
import Contact from "./components/sections/Contact";
import ScrollToTop from "./components/ui/ScrollToTop";
import "boxicons";
function App() {
  return (
    <ThemeProvider>
      <AnalyticsProvider>
        <div className="app-container">
          <div className="binary-rain">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="binary-column"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 10 + 5}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              >
                {Array(50)
                  .fill()
                  .map((_, j) => (Math.random() > 0.5 ? "1" : "0"))}
              </div>
            ))}
          </div>

          <Header />
          {/* <Sidebar /> */}
          <main>
            <About />
            <Projects />
            <Skills />
            <Testimonials />
            <Resume />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </AnalyticsProvider>
    </ThemeProvider>
  );
}

export default App;
