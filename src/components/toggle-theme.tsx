import { useState } from "react";

function ToggleTheme() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const toggleTheme = () => {
        setTheme(
            theme === "light"
                ? "dark"
                : "light"
        );
    };

    const pageStyle = {
        backgroundColor:
            theme === "light"
                ? "#bbdb62"
                : "#1f1f1f",

        color:
            theme === "light"
                ? "#000000"
                : "#ffffff",

        minHeight: "100vh",
        padding: "20px"
    };

    return (<>
        <div style={pageStyle}>
            <h1>
                Current Theme: {theme}
            </h1>

            <button onClick={toggleTheme}>
                Toggle Theme
            </button>
        </div>
    </>);
}

export default ToggleTheme;