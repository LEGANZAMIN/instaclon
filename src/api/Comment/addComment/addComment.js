import { isAuthentificated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addComment: async (_, args, { request }) => {
            isAuthentificated(request);
            const { text, postId } = args;
            const { user } = request;

            const comment = await prisma.createComment({
                text: text,
                user: {
                    connect: {
                        id: user.id
                    }
                },
                post: {
                    connect: {
                        id: postId
                    }
                }
            });

            return comment;
        }
    }
};
