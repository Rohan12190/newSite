import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-serif font-bold">404</h1>
          <p className="text-2xl md:text-3xl font-serif">Page Not Found</p>
        </div>
        
        <p className="text-lg text-foreground/70 max-w-md mx-auto">
          The page you're looking for doesn't exist. Return to the portfolio to continue exploring.
        </p>

        <a
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Return to Home
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default NotFound;
