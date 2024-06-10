# Server

The server application is built with [Elysia](https://elysiajs.com/) with [Bun](https://bun.sh/) runtime.  
The two technologies were chosen based their popularity, community and performance. For the DB [Turso](https://turso.tech/) is used, given its generous free tier costs and decent scaling costs.  
OAuth is used for authentication of users, with Google oauth.

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.
