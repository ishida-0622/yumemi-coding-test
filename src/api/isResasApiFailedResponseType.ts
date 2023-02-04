import { ResasApiFailedResponseType } from 'types/api';

/**
 * RESAS APIからのレスポンスがエラーかを判定する
 * @param arg apiからのレスポンス
 * @returns エラーならtrue, そうでなければfalse
 */
export const isResasApiFailedResponseType = (
  arg: any
): arg is ResasApiFailedResponseType => {
  return (
    arg != null && typeof arg === 'object' && typeof arg.statusCode === 'string'
  );
};
