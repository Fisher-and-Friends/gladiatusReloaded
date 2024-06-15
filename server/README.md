# Server

The server application is built with [Elysia](https://elysiajs.com/) with [Bun](https://bun.sh/) runtime.  
The two technologies were chosen based their popularity, community and performance. For the DB [Turso](https://turso.tech/) is used, given its generous free tier costs and decent scaling costs.  
Google OAuth is used for authentication of users, with Google oauth.

### Oauth flow
To sign in using Google, the user only needs to access the path `/auth/google` from their browser.  
They will be redirected to Google's login/user selection screen.  
Once they finished the Google login, they will be redirected back to the root  
of the front-end application and will have two cookies set.  
`authToken` - which is to be used for all api endpoints and  
`refreshToken` - which can be used on the `auth/refresh` endpoint to  
refresh both the auth and refresh tokens

## Development

#### Database

To create a new migration run:

```bash
npx drizzle-kit generate
```

To apply the migrations run:

```bash
npx drizzle-kit migrate
```

#### Server

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.
