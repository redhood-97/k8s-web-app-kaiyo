import crypto from "crypto";
const APPLICATION_SECRET = "kaushik-test-application-k8s";

export const random = () => crypto.randomBytes(128).toString("base64");

export const authentication = (salt: string, password: string) => {
    return crypto
        .createHmac("sha256", [salt, password].join("/"))
        .update(APPLICATION_SECRET)
        .digest("hex");
};
