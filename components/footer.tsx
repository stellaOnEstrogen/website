import { Heart } from 'lucide-react';
import React from 'react';
import { config } from '@/config';

const Footer: React.FC = () => {
    return (
        <>
            <footer className="bg-pink-200 p-4 text-center">
        <p className="text-sm text-pink-600">
          © {new Date().getFullYear()} {config.name}. Made with{" "}
          <Heart className="h-4 w-4 inline-block text-red-500" /> in{" "}
            {config.location}.
        </p>
      </footer>
        </>
    );
};

export default Footer;
