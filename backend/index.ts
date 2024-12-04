import { Client } from "@notionhq/client";

type Path = "/";
type Method = "GET" | "POST" | "PUT" | "DELETE";
type ApiEndpoint = `${Method} ${Path}`;
const PORT = 8079;

// TODO: Make actual endpoints
Bun.serve({
	port: PORT,
	async fetch(req) {
		try {
			const url = new URL(req.url);
			const method = req.method;
			const headers = {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			};

			if (req.method === "OPTIONS") {
				return new Response(null, { headers });
			}

			const apiEndpoint: ApiEndpoint = `${method as Method} ${url.pathname as Path}`;

			const notion = new Client({
				auth: process.env.NOTION_API_KEY,
			});

			const listUsersResponse = await notion.users.list({});

			switch (apiEndpoint) {
				case "GET /":
					return new Response(
						JSON.stringify({
							message: "You called GET /",
							data: listUsersResponse,
						}),
						{
							headers: headers,
							status: 200,
						},
					);
				default:
					return new Response(
						JSON.stringify({
							message: `You called ${apiEndpoint}, which I don't know how to handle!`,
						}),
						{ headers: headers, status: 404 },
					);
			}
		} catch (err) {
			console.log(err);
			return new Response(
				JSON.stringify({ message: "Internal Server Error" }),
				{ headers: { "Content-Type": "application/json" }, status: 500 },
			);
		}
	},
});

console.log(`Listening on http://localhost:${PORT}...`);
