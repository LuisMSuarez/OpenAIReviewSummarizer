import './App.css';
import ChatBot from './components/ChatBot';

function App() {
   // h-[100dvh] works like vh, but it takes into account the url bar that shows/hides on mobile browsers when you scroll.
   return (
      <div className="p-4 w-screen h-[100dvh]">
         <ChatBot />
      </div>
   );
}

export default App;
