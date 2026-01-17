const express = require('express')
const app = express()
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.gphdl2n.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let usersCollection

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("izibay-database");
        usersCollection = database.collection("users");


        app.get('/api/users', async (req, res) => {
            try {
                const users = await usersCollection.find().toArray();
                console.log(users);
                res.json({
                    success: true,
                    count: users.length,
                    data: users
                })
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Failed to fetch users",
                    error: error.message
                });
            }
        })

        app.post("/api/users", async (req, res) => {
            try {
                const user = req.body;
                const result = await usersCollection.insertOne(user);

                res.json({
                    success: true,
                    message: "User added",
                    insertedId: result.insertedId
                });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Failed to add user",
                    error: error.message
                });
            }
        });





        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


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
