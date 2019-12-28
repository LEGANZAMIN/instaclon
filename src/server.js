import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import { sendSecretMail } from "./utils";
import passport from "passport-jwt";
import { anthenticateJwt } from "./passport";

//sendSecretMail("lsmin01@gmail.com", "TEST 111233");

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
    schema,
    context: ({ request }) => ({ request })
});

server.express.use(logger("dev"));
server.express.use(anthenticateJwt);

server.start({ port: PORT }, () => {
    console.log(`Server is stated on http://localhost:${PORT}`);
});
