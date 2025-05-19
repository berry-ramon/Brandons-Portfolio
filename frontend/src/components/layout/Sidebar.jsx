// import { useState, useEffect } from "react";
// import { useTheme } from "../../context/ThemeContext";
// // import "../../styles/Sidebar.css";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { theme } = useTheme();

//   const navLinks = [
//     { id: "about", label: "About Me" },
//     { id: "projects", label: "Projects" },
//     { id: "skills", label: "Skills" },
//     { id: "testimonials", label: "Testimonials" },
//     { id: "resume", label: "Resume" }, // Fixed typo
//     { id: "contact", label: "Contact" },
//   ];

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 768) {
//         setIsOpen(false);
//       }
//     };

//     const handleKeyDown = (e) => {
//       if (e.key === "Escape" && isOpen) {
//         setIsOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isOpen]);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <button
//         className={`sidebar-toggle ${theme}`}
//         onClick={toggleSidebar}
//         aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
//         aria-expanded={isOpen}
//       >
//         <i className={`bx ${isOpen ? "bx-x" : "bx-menu"}`} />
//       </button>

//       {/* Added overlay */}
//       <div
//         className={`sidebar-overlay ${isOpen ? "open" : ""}`}
//         onClick={toggleSidebar}
//         aria-hidden={!isOpen}
//         tabIndex={isOpen ? 0 : -1}
//       />

//       <aside
//         className={`sidebar ${isOpen ? "open" : ""} ${theme}`}
//         aria-hidden={!isOpen}
//       >
//         <div className="sidebar-header">
//           <h3>Menu</h3>
//         </div>
//         <nav className="sidebar-nav" aria-label="Main navigation">
//           <ul>
//             {navLinks.map((link) => (
//               <li key={link.id}>
//                 <a
//                   href={`#${link.id}`}
//                   onClick={() => setIsOpen(false)}
//                   className="sidebar-link"
//                 >
//                   {link.label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;
