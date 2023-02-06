import { isResasApiFailedResponseType } from 'api/isResasApiFailedResponseType';
import dummy from 'api/dummy.json';

describe('APIレスポンスの判定', () => {
  test('エラーレスポンスを渡した際にtrueが返ってくるか', () => {
    // 参考: https://opendata.resas-portal.go.jp/docs/api/v1/detail/index.html
    const res = isResasApiFailedResponseType({
      statusCode: '404',
      message: "404. That's an error.",
      description: 'The requested URL /404 was not found on this server.',
    });
    expect(res).toBe(true);
  });

  test('正常なレスポンスを渡した際にfalseが返ってくるか', () => {
    // 参考: https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
    const res = isResasApiFailedResponseType(dummy);
    expect(res).toBe(false);
  });
});
