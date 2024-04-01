import type { Response } from 'express'
import { StatusCodes } from 'http-status-codes'

type Handler<T = any> = {
  success: boolean
  message?: string
  payload?: T
}

const baseResult = <T>(isSuccess: boolean, message?: string, payload?: T) => {
  return {
    success: isSuccess,
    message: message ?? null,
    payload: payload ?? null,
  }
}

type HandlerArgs<TPayload> = Omit<Handler<TPayload>, 'success'>

export function success<TPayload>({ message, payload }: HandlerArgs<TPayload>) {
  return baseResult(true, message, payload)
}

export function failure<TPayload>({ message, payload }: HandlerArgs<TPayload>) {
  return baseResult(false, message, payload)
}

type BaseResponseConfig<TPayload> = HandlerArgs<TPayload> & {
  statusCode?: StatusCodes
}

export class BaseResponse {
  static success<TPayload>(
    res: Response,
    cfg: BaseResponseConfig<TPayload> = {}
  ) {
    const { statusCode = StatusCodes.OK, ...rest } = cfg

    return res.status(statusCode).json(success(rest))
  }

  static failure<TPayload>(
    res: Response,
    cfg: BaseResponseConfig<TPayload> = {}
  ) {
    const { statusCode = StatusCodes.BAD_REQUEST, ...rest } = cfg

    return res.status(statusCode).json(failure(rest))
  }
}
