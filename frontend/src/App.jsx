import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import SchoolListPage from "./pages/SchoolListPage"
import CourseListPage from "./pages/CourseListPage"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import SchoolDetail from "./pages/SchoolDetail"
import CourseDetail from "./pages/CourseDetail"
import InstituteLayout from "./pages/institute/InstituteLayout"
import Profile from "./pages/institute/Profile"
import Members from "./pages/institute/Members"
import Courses from "./pages/institute/Courses"
import Reviews from "./pages/institute/Reviews"
import Dashboard from "./pages/institute/Dashboard"
import EditProfilePage from "./pages/institute/EditProfilePage"
import CreateMember from "./pages/institute/CreateMemberPage"
import InstituteSignup from "./pages/institute/InstituteSignup"
import InstituteSignup2 from "./pages/institute/InstituteSignup2"
import InstituteLogin from "./pages/institute/InstituteLogin"
import CreateCoursePage from "./pages/institute/CreateCoursePage"
import { Toaster } from "sonner"
import AdminLayout from "./pages/admin/AdminLayout"
import AdminDashboard from "./pages/admin/AdminDashboard"
import InstitutePending from "./pages/institute/InstitutePending"

function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
      <Routes>
        {/* user */}
        <Route path="/" element={<Layout/>}>
          <Route path="/" index element={<Home/>}/>
          <Route path="schools" element={<SchoolListPage/>}/>
          <Route path="courses" element={<CourseListPage/>}/>
          <Route path="register" element={<Signup/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="schools/:id" element={<SchoolDetail/>}/>
          <Route path="courses/:id" element={<CourseDetail/>}/>
          <Route path="institute/login" element={<InstituteLogin/>}/>
          <Route path="institute/signup1" element={<InstituteSignup/>}/>
          <Route path="institute/signup2" element={<InstituteSignup2/>}/>
           <Route path="institute/pending" element={<InstitutePending/>}/>
        </Route>

          {/* institute */}
        <Route path="/institute" element={<InstituteLayout/>}>
            <Route path="profile" element={<Profile/>}/>
            <Route path="members" element={<Members/>}/>
            <Route path="courses" element={<Courses/>}/>
            <Route path="create/course" element={<CreateCoursePage/>}/>
            <Route path="reviews" element={<Reviews/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="profile/editPage" element={<EditProfilePage/>}/>
            <Route path="members/createPage" element={<CreateMember/>}/>
        </Route>

        {/* admin */}
        <Route path="/admin" element={<AdminLayout/>}>
            <Route path="dashboard" element={<AdminDashboard/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
