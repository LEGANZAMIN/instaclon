export const isAuthentificated = request => {
    if (!request.user) {
        throw Error("You need to log in to perform this action.");
    }
};
