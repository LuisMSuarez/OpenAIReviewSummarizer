import './App.css';
// import ChatBot from './components/ChatBot';
import ReviewList from './components/reviews/ReviewList';

function App() {
   // h-[100dvh] works like vh, but it takes into account the url bar that shows/hides on mobile browsers when you scroll.
   return (
      <div className="p-4 w-screen h-[100dvh]">
         <ReviewList productId={1} />
      </div>
   );
}

export default App;
