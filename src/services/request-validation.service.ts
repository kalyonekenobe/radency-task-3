import {AnySchema} from "yup";
import {NextFunction, Request, Response} from "express";

export const validate = (schema: AnySchema, validationFailedStatus: number = 400) => async (req: Request, res: Response, next: NextFunction) => {

  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (error: any) {
    return res.status(validationFailedStatus).json({ error: error.message });
  }
};