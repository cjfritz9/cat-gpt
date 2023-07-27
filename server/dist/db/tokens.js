import db from './db.js';
import { getUserById } from './users.js';
export const spendTokensByUserId = async (userId, spentTokenAmount = 1) => {
    try {
        const currentUser = await getUserById(userId);
        if (typeof currentUser === 'string')
            return 'Error: User not found';
        if (currentUser.tokens < spentTokenAmount) {
            return 'Error: User has insufficient tokens';
        }
        await db
            .collection('users')
            .doc(userId)
            .update({
            tokens: currentUser.tokens - spentTokenAmount
        });
        return {
            id: currentUser.id,
            email: currentUser.email,
            tokens: currentUser.tokens - spentTokenAmount,
            last_token_refresh: currentUser.last_token_refresh
        };
    }
    catch (err) {
        console.error(err);
        return 'Database Error: Check logs';
    }
};
export const refreshTokensByUserId = async ({ userId, adminOverride = false }) => {
    try {
        if ((await canAddTokensToUser(userId)) === false &&
            adminOverride === false) {
            return 'Unable to add tokens. Try again tomorrow';
        }
        await db.collection('users').doc(userId).update({
            tokens: 10,
            last_token_refresh: Date()
        });
        return await getUserById(userId);
    }
    catch (err) {
        console.error(err);
        return 'Database Error: Check logs';
    }
};
export const getTokensByUserId = async (userId) => {
    try {
        const user = getUserById(userId);
        if (!user)
            return 'Error: User not found';
        return user;
    }
    catch (err) {
        console.error(err);
        return 'Database Error: Check logs';
    }
};
const canAddTokensToUser = async (userId) => {
    try {
        const user = await getUserById(userId);
        const currentTime = new Date().getTime();
        const lastTokenRefreshTime = new Date(user.last_token_refresh).getTime();
        if (!user || !user.id)
            return 'No User Found';
        if (currentTime - 86400000 >= lastTokenRefreshTime) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.error(err);
        return 'Database Error: Check logs';
    }
};
