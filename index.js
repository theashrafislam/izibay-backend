const express = require('express')
const app = express()
const port = 5000

// ROOT API
app.get("/", (req, res) => {
    const isProduction = process.env.NODE_ENV === "production";
    const now = new Date();

    res.json({
        success: true,

        // 🔴 MUST INFORMATION
        project: {
            name: "Izibay",
            type: "E-commerce Platform",
            version: "1.0.0",
            status: isProduction ? "Live" : "Development",
            apiStatus: "Running"
        },

        // 🔴 SERVER INFO (Must)
        server: {
            environment: isProduction ? "production" : "development",
            timestamp: {
                utc: now.toISOString(),
                bangladesh: now.toLocaleString("en-BD", {
                    timeZone: "Asia/Dhaka"
                })
            }
        },

        // 🔴 BASIC API INFO (Must)
        api: {
            baseUrl: isProduction
                ? "https://izibay-backend.vercel.app"
                : "http://localhost:5000",
            documentation: "/api/docs"
        },

        // 🟡 OPTIONAL (ONLY DEVELOPMENT MODE)
        ...(!isProduction && {
            features: [
                "User Authentication",
                "Product Management",
                "Cart System",
                "Order Management",
                "Payment Integration"
            ],

            techStack: {
                frontend: "Next.js + Tailwind CSS",
                backend: "Express.js",
                database: "MongoDB",
                auth: "JWT (planned)"
            },

            developer: {
                team: "Izibay Team",
                note: "Visible only in development mode"
            }
        }),

        message: "Welcome to Izibay API 🚀"
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
