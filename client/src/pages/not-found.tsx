import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black">
      <div className="text-center space-y-6 p-8 border border-destructive/30 bg-destructive/5 rounded-2xl backdrop-blur-md max-w-md mx-4">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-24 w-24 text-destructive animate-pulse" />
        </div>
        
        <h1 className="text-4xl font-display font-bold text-destructive tracking-widest">
          ERROR 404
        </h1>
        
        <div className="space-y-2 font-mono text-sm text-destructive/80">
          <p>&gt; TARGET LOCATION NOT FOUND</p>
          <p>&gt; SYSTEM MALFUNCTION DETECTED</p>
          <p>&gt; NAVIGATION PATH INVALID</p>
        </div>

        <Link href="/">
          <button className="mt-8 px-6 py-3 bg-destructive/10 border border-destructive/50 text-destructive hover:bg-destructive hover:text-black transition-all font-bold font-display rounded w-full">
            RETURN TO BASE
          </button>
        </Link>
      </div>
    </div>
  );
}
