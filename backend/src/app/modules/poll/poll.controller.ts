import type { Request, Response } from "express";
import { ApiResponse } from "../../common/utils";
import { createPoll } from "./poll.services";
import type { AuthenticatedRequest } from "../../common/utils/interfaces";

export default class PollController {
  static async handleCreatePoll(req: AuthenticatedRequest, res: Response) {
    try {
      const payload = req.body;
      const poll = await createPoll(payload, req.user!.sub);

      ApiResponse.ok(res, "Poll created", poll);
    } catch (error) {
      ApiResponse.error(res, error);
    }
  }
}
