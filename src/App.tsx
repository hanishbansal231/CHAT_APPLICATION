import { Container } from '@chakra-ui/react'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { mainRoutes } from './shared/Routes/mainRoutes.ts';
import { subRoutes } from './shared/Routes/subRoutes.ts';
import Header from './modules/components/Header.tsx';
import PostPage from './modules/pages/PostPage.tsx';
import UserPage from './modules/pages/UserPage.tsx';
import VerifyAccount from './modules/pages/VerifyAccount.tsx';
import Login from './modules/components/Login.tsx';
import SignUp from './modules/components/SignUp.tsx';
import ProtectRoute from './modules/components/ProtectRoute.tsx';
import ForgotPassword from './modules/pages/ForgotPassword.tsx';
import UserProfilePage from './modules/pages/UserProfilePage.tsx';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store.ts';

const App: React.FC = () => {

  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Header children={undefined} />
      <Container maxW={"620px"}>
        <Routes>
          {
            !token
              ?
              (<>
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<Login />} />
                <Route path='/verify-account' element={<VerifyAccount />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='*' element={<Navigate to="/" />} />
              </>) :
              (
                <>
                  <Route element={<ProtectRoute />} >
                    <Route path={`/:${mainRoutes.UserProfile}`} element={<UserPage />} />
                    <Route path={`/:${mainRoutes.UserProfile}/${subRoutes.post}/:${subRoutes.pid}`} element={<PostPage />} />
                    <Route path={`/update`} element={<UserProfilePage />} />
                  </Route>
                </>
              )
          }
        </Routes>
      </Container>
    </>
  )
}

export default App