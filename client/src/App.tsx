import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/HomePage";
import KingdomsPage from "@/pages/KingdomsPage";
import PlayersPage from "@/pages/PlayersPage";
import FaqPage from "@/pages/FaqPage";
import SignUpPage from "@/pages/SignUpPage";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/kingdoms" component={KingdomsPage} />
          <Route path="/players" component={PlayersPage} />
          <Route path="/faq" component={FaqPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

function App() {
  return <Router />;
}

export default App;
