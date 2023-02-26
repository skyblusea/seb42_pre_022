import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from "react-router-dom";
import GlobalStyle from "./Styles/GlobalStyle";
import Questions from "./Pages/Questions";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Askquestion from "./Pages/Askquestion";
import Question from "./Pages/Question";
import Users from "./Pages/Users";
import EditPost from "./Pages/EditPost";
import Mypage from "./Pages/Mypage";
import { loginActions } from "./Reducers/loginReducer";

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if (userInfo) {
      dispatch(loginActions.changeLogin(true))
      dispatch(loginActions.setUserInfo(userInfo))
    }
  }, [])
  return (
    <div className="app-wrap">
      <GlobalStyle />
      <Header />
      <div className="wrap">
        <div className="container">
        {(pathname === "/users/login" || pathname === "/users/signup" || pathname === "/askquestion") ? null : <Nav />}
          <Routes>
            <Route path="/" element={<Questions />}/>
            <Route path="/questions/:question_id" element={<Question />} />
            <Route path="/questions/:id/edit" element={<EditPost />}/>
            <Route path="/answers/:id/edit" element={<EditPost />}/>
            <Route path="/askquestion" element={<Askquestion />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/signup" element={<Signup />} />
            <Route path="/users" element={<Users />}/>
            <Route path="/users/mypage" element={<Mypage />}/>
          </Routes>
        </div>
      {/*배포 이후 배포한 주소 길이에 맞게 slice 변경*/}
      {(pathname === "/users/login" || pathname === "/users/signup") ? null : <Footer />}
      </div>
    </div>
  );
}

export default App;