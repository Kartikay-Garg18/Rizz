import Header from './HomePage/Header.jsx';
import Main from './HomePage/Content.jsx';
import Footer from './HomePage/Footer.jsx';

const Home = () => {

  return (
    <div className='relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col font-pop'>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
    </div>
  )
}

export default Home