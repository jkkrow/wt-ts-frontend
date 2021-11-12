import axios, { AxiosAdapter, AxiosError } from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import jwt_decode, { JwtPayload } from 'jwt-decode';

import { AppDispatch, AppState } from 'store';
import { authActions } from 'store/reducers/auth-reducer';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: { 'Cache-Control': 'no-cache' },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter, {
    enabledByDefault: false,
  }),
});

export const api = () => {
  return (dispatch: AppDispatch, getState: () => AppState) => {
    axiosInstance.interceptors.request.use(async (req) => {
      const { refreshToken, accessToken } = getState().auth;

      if (!refreshToken || !accessToken) return req;

      const { exp } = jwt_decode<JwtPayload>(accessToken);

      if ((exp as number) * 1000 < Date.now()) {
        const { refreshToken } = getState().auth;

        const { data } = await axios.get('/auth/access-token', {
          headers: { Authorization: 'Bearer ' + refreshToken },
        });

        dispatch(authActions.setAccessToken(data.accessToken));

        req.headers.Authorization = `Bearer ${data.accessToken}`;

        return req;
      }

      req.headers.Authorization = `Bearer ${accessToken}`;

      return req;
    });

    axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);

        let axiosError: AxiosError | undefined;

        if (err.response) {
          axiosError = err.response.data;
        }

        return Promise.reject(axiosError || err);
      }
    );

    return axiosInstance;
  };
};