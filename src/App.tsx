import { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from 'components/Layout/Header/Header';
import Footer from 'components/Layout/Footer/Footer';
import GlobalMessageList from 'components/Common/UI/GlobalMessage/List/GlobalMessageList';
import VideoListPage from 'pages/Video/VideoListPage';
import VerificationPage from 'pages/Auth/VerificationPage';
import AccountPage from 'pages/User/AccountPage';
import UserVideoListPage from 'pages/User/UserVideoListPage';
import UploadPage from 'pages/Upload/UploadPage';
import HistoryPage from 'pages/User/HistoryPage';
import LoginPage from 'pages/Auth/LoginPage';
import SendRecoveryPage from 'pages/Auth/SendRecoveryPage';
import ResetPasswordPage from 'pages/Auth/ResetPasswordPage';
import NotFoundPage from 'pages/Error/NotFoundPage';
import ProtectedRoute from 'service/ProtectedRoute';
import { useAppDispatch, useAppSelector } from 'hooks/store-hook';
import { fetchTokenOnload } from 'store/thunks/auth-thunk';
import './App.scss';

const App: React.FC = () => {
  const { refreshToken } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTokenOnload());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <GlobalMessageList />
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={VideoListPage} />
          <Route
            exact
            path="/auth/verification/:token"
            component={VerificationPage}
          />
          <ProtectedRoute
            require={!refreshToken}
            exact
            path="/auth"
            component={LoginPage}
          />
          <ProtectedRoute
            require={!refreshToken}
            exact
            path="/auth/recovery"
            component={SendRecoveryPage}
          />
          <ProtectedRoute
            require={!refreshToken}
            exact
            path="/auth/reset-password/:token"
            component={ResetPasswordPage}
          />
          <ProtectedRoute
            require={refreshToken}
            redirect="/auth"
            exact
            path="/account"
            component={AccountPage}
          />
          <ProtectedRoute
            require={refreshToken}
            redirect="/auth"
            exact
            path="/my-videos"
            component={UserVideoListPage}
          />
          <ProtectedRoute
            require={refreshToken}
            redirect="/auth"
            exact
            path="/new-video"
            component={UploadPage}
          />
          <ProtectedRoute
            exact
            path="/history"
            redirect="/auth"
            require={refreshToken}
            component={HistoryPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
