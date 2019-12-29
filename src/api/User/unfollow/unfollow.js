import { isAuthentificated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        unfollow: async (_, args, { request }) => {
            isAuthentificated(request);
            const { id } = args;
            const { user } = request;

            try {
                await prisma.updateUser({
                    where: {
                        id: user.id
                    },
                    data: {
                        following: {
                            disconnect: {
                                id
                            }
                        }
                    }
                });
                return true;
            } catch (Error) {
                return false;
            }
        }
    }
};
