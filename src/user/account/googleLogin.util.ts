import { OAuth2Client } from 'google-auth-library';
import { CODE, CustomError } from 'src/common/errors/custom.error';
export async function googleAccountIdTokenCheck(bind_id) {
  try {
    /**
     * FIXME: 修复代码应用的问题
     */
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
      idToken: bind_id,
      audience: 'xxxxxx.apps.googleusercontent.com', // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    return {
      bind_id: userid,
      email: payload['email'],
    };
  } catch (e) {
    throw new CustomError(CODE.GOOGLE_ACCOUNT_TOKEN_VERIFY_ERROR, e.message);
  }
}
