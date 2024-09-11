import { Star } from "lucide-react";
import React from "react";
import { config } from "@/config";
import { makePronouns } from "@/lib/utils";

const Header: React.FC = () => {
  const pronouns = makePronouns(config.pronouns, {
    returnAsString: true,
    isNormalized: true,
  });
  return (
    <>
      <header className="bg-pink-200 p-4 text-center">
        <img src={config.avatar} alt={config.name} className="h-24 w-24 rounded-full mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-pink-600 flex items-center justify-center gap-2">
          <Star className="h-8 w-8 text-yellow-400" />
          {config.name}
          <Star className="h-8 w-8 text-yellow-400" />
        </h1>
        <p className="text-lg mt-2">
          Welcome to my cute corner of the internet! ♡
        </p>
        <p className="text-sm mt-1">({pronouns.toString()})</p>
      </header>

      <nav className="bg-pink-100 p-4">
        <ul className="flex justify-center space-x-6">
            {
                config.frontLinks.map((link) => (
                    <li key={link.href}>
                        <a href={link.href} className="text-pink-600 hover:text-pink-700">
                            {link.name}
                        </a>
                    </li>
                ))
            }
        </ul>
      </nav>
    </>
  );
};

export default Header;
