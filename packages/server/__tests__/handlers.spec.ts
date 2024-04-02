import { describe, test, expect, vi } from 'vitest'
import { StatusCodes } from 'http-status-codes'
import type { Response } from 'express'
import { success, failure, BaseResponse } from '../src/handlers'

describe('Handlers', () => {
  test('success function', () => {
    const result = success({ message: 'Success', payload: { data: 'test' } })
    expect(result).toEqual({
      success: true,
      message: 'Success',
      payload: { data: 'test' },
    })
  })

  test('failure function', () => {
    const result = failure({ message: 'Failure', payload: { error: 'test' } })
    expect(result).toEqual({
      success: false,
      message: 'Failure',
      payload: { error: 'test' },
    })
  })

  describe('BaseResponse', () => {
    const mockResponse = () => {
      // @ts-ignore
      const res: Response = {}
      res.status = vi.fn(() => res)
      res.json = vi.fn(() => res)
      return res as Response
    }

    test('success response', () => {
      const res = mockResponse()

      BaseResponse.success(res, {
        message: 'Success',
        payload: { data: 'test' },
      })

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)
      expect(res.json).toHaveBeenCalledWith(
        success({ message: 'Success', payload: { data: 'test' } })
      )
    })

    test('failure response', () => {
      const res = mockResponse()

      BaseResponse.failure(res, {
        message: 'Failure',
        payload: { error: 'test' },
      })

      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
      expect(res.json).toHaveBeenCalledWith(
        failure({ message: 'Failure', payload: { error: 'test' } })
      )
    })
  })
})
