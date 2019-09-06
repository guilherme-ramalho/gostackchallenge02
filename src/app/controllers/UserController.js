import User from "../models/User";
import RestHelper from "../rest/RestHelper";
import MsgEnum from "../enum/message";
import StatusEnum from "../enum/status";

class UserController {
  async create(request, response) {
    try {
      const json = {};

      const userExists = await User.findOne({
        where: { email: request.body.email }
      });

      if (userExists) {
        json.meta = RestHelper.getMeta(
          StatusEnum.SUCCESS,
          MsgEnum.DUPLICATED_EMAIL
        );

        return response.json(json);
      }

      const user = await User.create(request.body);

      json.meta = RestHelper.getMeta(StatusEnum.SUCCESS, MsgEnum.SELECTED);

      return response.json(json);
    } catch (error) {
      console.log(error);
      json = {
        meta: RestHelper.getMeta(StatusEnum.ERROR, MsgEnum.PROCESSING_ERROR)
      };

      json.meta.stack = error;

      return response.status(400).json(json);
    }
  }
}

export default new UserController();
