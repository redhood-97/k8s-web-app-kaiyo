import crypto from 'crypto';

export const random = () => crypto.randomBytes(128).toString('base64');

const APPLICATION_SECRET : string  = process.env.APPLICATION_SECRET || random();

export const authentication = (salt: string, password: string) => {
    return crypto
        .createHmac('sha256', [salt, password].join('/'))
        .update(APPLICATION_SECRET)
        .digest('hex');
};
