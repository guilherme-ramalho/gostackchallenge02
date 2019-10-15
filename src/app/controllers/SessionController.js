import jwt from "jsonwebtoken";
import User from "../models/User";
import RestHelper from "../rest/RestHelper";
import MsgEnum from "../enum/message";
import StatusEnum from "../enum/status";
import AuthConfig from '../../config/auth'

class SessionController {
    async create(request, response) {
        try {
            const json = {};
            const { email, password } = request.body;

            const user = await User.findOne({ where: { email: email } });

            if (!user) {
                json.meta = RestHelper.getMeta(StatusEnum.WARNING, MsgEnum.REGISTER_NOT_FOUND);
                return response.json(json);
            }

            if (!(await user.checkPassword(password))) {
                json.meta = RestHelper.getMeta(StatusEnum.WARNING, MsgEnum.PASSWORD_MISMATCH);
                return response.json(json);
            }

            json.data = user;
            const { id } = user;
            json.meta = RestHelper.getMeta(StatusEnum.SUCCESS, MsgEnum.SELECTED);
            json.meta.token = jwt.sign({ id }, AuthConfig.secret, { expiresIn: AuthConfig.expiresIn });

            return response.json(json);
        } catch (error) {
            json = {
                meta: RestHelper.getMeta(StatusEnum.ERROR, MsgEnum.PROCESSING_ERROR)
            };

            json.meta.stack = error;

            return response.status(400).json(json);
        }
    }
}

export default new SessionController();