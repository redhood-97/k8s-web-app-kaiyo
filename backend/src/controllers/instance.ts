import { Request, Response } from "express";
import os from "os";

export const getInstanceInfo = (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        platform: os.platform(),
        architectre: os.arch(),
        hostname: os.hostname(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        homeDirectory: os.homedir(),
        tempDirectory: os.tmpdir(),
        cpuCores: os.cpus(),
        uptime: os.uptime(),
        loadAvg: os.loadavg(),
        userInfo: os.userInfo(),
        networkInterface: os.networkInterfaces(),
        endianness: os.endianness(),
        release: os.release(),
        eolChar: os.EOL,

    });
};