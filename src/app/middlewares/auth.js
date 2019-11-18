import RestHelper from "../rest/RestHelper";
import MsgEnum from "../enum/message";
import StatusEnum from "../enum/status";
import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";
import { promisify } from "util";

export default async (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(400).json({
            meta: RestHelper.getMeta(StatusEnum.WARNING, MsgEnum.UNAUTHORIZED)
        });
    }

    const [,token] = authHeader.split(" ");

    try {
        const decodedToken = await promisify(jwt.verify)(token, authConfig.secret);

        request.userId = decodedToken.id;

        console.log(request.userId);

        return next();
    } catch(error) {
        return response.status(401).json({
            meta: RestHelper.getMeta(StatusEnum.WARNING, MsgEnum.UNAUTHORIZED)
        });
    }
};