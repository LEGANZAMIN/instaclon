import { isAuthentificated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleLike: async (_, args, { request }) => {
            isAuthentificated(request);
            const { postId } = args;
            const { user } = request;

            const filterOption = {
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id: postId
                        }
                    }
                ]
            };

            const existingLike = await prisma.$exists.like(filterOption);

            if (existingLike) {
                await prisma.deleteManyLikes(filterOption);
                return true;
            } else {
                try {
                    await prisma.createLike({
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

                    return true;
                } catch (Error) {
                    return false;
                }
            }
        }
    }
};
