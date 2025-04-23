
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-emergency-light">
      <div className="text-center max-w-md p-6">
        <div className="mx-auto w-20 h-20 bg-emergency-warning/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="h-10 w-10 text-emergency-warning" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Sayfa Bulunamadı</h1>
        <p className="text-lg text-emergency-dark/80 mb-6">
          Aradığınız sayfaya ulaşılamadı. Ana sayfaya dönün veya diğer acil durum kaynaklarına göz atın.
        </p>
        <div className="space-y-2">
          <Link to="/">
            <Button className="w-full">Ana Sayfaya Dön</Button>
          </Link>
          <Link to="/emergency-info">
            <Button variant="outline" className="w-full">
              Acil Durum Bilgilerine Bak
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
