const express = require('express')
const app = express()
const port = 5000

app.get("/", (req, res) => {
    res.json({
        success: true,

        // 🔴 MUST INFORMATION
        project: {
            name: "Izibay",
            type: "E-commerce Platform",
            version: "1.0.0",
            status: "Development",
            apiStatus: "Running",
        },

        // 🔴 SERVER INFO (Must)
        server: {
            environment: "development",
            port: 5000,
            timestamp: new Date().toISOString(),
        },

        // 🔴 BASIC API INFO (Must)
        api: {
            baseUrl: "http://localhost:5000",
            documentation: "/api/docs",
        },

        // 🟡 OPTIONAL INFORMATION
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
            auth: "JWT (planned)",
        },

        developer: {
            name: "Izibay Team",
            contact: "support@izibay.com",
        },

        message: "Welcome to Izibay API 🚀"
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
