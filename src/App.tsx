import { Container } from '@chakra-ui/react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { mainRoutes } from './shared/Routes/mainRoutes.ts';
import { subRoutes } from './shared/Routes/subRoutes.ts';
import Header from './modules/components/Header.tsx';
import PostPage from './modules/pages/PostPage.tsx';
import UserPage from './modules/pages/UserPage.tsx';
import VerifyAccount from './modules/pages/VerifyAccount.tsx';
import Login from './modules/components/Login.tsx';
import SignUp from './modules/components/SignUp.tsx';

const App: React.FC = () => {
  return (
    <Container maxW={"620px"}>
      <Header />
      <Routes>
        <Route path={`/:${mainRoutes.UserProfile}`} element={<UserPage />} />
        <Route path={`/:${mainRoutes.UserProfile}/${subRoutes.post}/:${subRoutes.pid}`} element={<PostPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify-account' element={<VerifyAccount />} />
      </Routes>
    </Container>
  )
}

export default App