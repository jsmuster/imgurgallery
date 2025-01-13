import OpenAI from "openai";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import * as T from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const bodySchema = T.Object({
    images: T.Array(T.String(), { minItems: 1 }),
});

app.post("/generate", async (req, res) => {
    try {
        const body = Value.Parse(bodySchema, req.body);

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "What's in this image? Provide information about this product. Generate top 5 keywords! Use this model {description, keywords}",
                        },
                        { type: "text", text: "Return your response as JSON data without ```json and ``` at the end." },
                        ...body.images.map((v) => ({
                            type: "image_url" as const,
                            image_url: {
                                url: v,
                            },
                        })),
                    ],
                },
            ],
        });

        if (!response.choices?.[0]?.message?.content) {
            res.status(401).send("Failed to generate description!");
            return;
        }
        res.send(JSON.parse(response.choices[0].message.content!));
    } catch (err) {
        res.status(409).send(err);
    }
});

server.listen(2020, () => {
    console.log("App Started at http://localhost:2020");
});
