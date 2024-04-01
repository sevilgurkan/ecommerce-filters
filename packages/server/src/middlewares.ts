import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import z from 'zod'
import { filterQueryReqSchema } from './filter-query-schema'

export function filterQueryMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsed = filterQueryReqSchema.parse(req.query)

    req.__parsedQuery = parsed
    next()
  } catch (error) {
    let err

    if (error instanceof z.ZodError) {
      err = error.flatten().formErrors
    }

    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Query parameters are not valid',
      ...(err ? { payload: err } : {}),
    })
  }
}
