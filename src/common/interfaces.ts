export interface IObject<T = unknown> {
  [key: string]: T
}

export interface IResponseCommon<ResultType> {
  result: ResultType[] | ResultType
  meta?:
    | {
        total: number
        page: number
      }
    | unknown
}

export interface IResponseStatus {
  result: boolean
}
