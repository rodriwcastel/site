import React, { useEffect, useState } from 'react';
import { Music, Heart } from "lucide-react"
import client from '../../contentful'; // Adjust path if needed

type Release = {
  title: string;
  year: string;
  type: string;
  link: string;
};

async function fetchLatestRelease(): Promise<Release | null> {
  const entries = await client.getEntries({
    content_type: 'release',
    order: '-fields.year',
    limit: 1,
  });
  if (entries.items.length > 0) {
    const fields = entries.items[0].fields as any;
    return {
      title: fields.title,
      year: fields.year,
      type: fields.type,
      link: fields.link,
    };
  }
  return null;
}

const Footer: React.FC = () => {
  const [latestRelease, setLatestRelease] = useState<Release | null>(null);

  useEffect(() => {
    fetchLatestRelease().then(setLatestRelease);
  }, []);

  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">  
              <h3 className="text-xl font-bold">Rodriw Castel</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Rodriw Castel is a South American artist born in São Paulo, Brazil, in 2002. 
              He creates music in English, drawing inspiration from artists like 
              Beyoncé, Janet Jackson, Björk, Etta James, and Michael Jackson. 
              Through Alternative Pop, Rodriw shares his journey of self-discovery, 
              turning doubt into expression and finding his voice in a world full of noise.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://open.spotify.com/intl-pt/artist/0B3ULU9OFFOT4oQgVokrbS?si=na4-aLERQJWFTDmOjbaQZA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-royal-blue transition-colors"
              >
                Spotify
              </a>
              <a
                href="https://music.apple.com/us/artist/rodriw-castel/1601611291"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-royal-blue transition-colors"
              >
                Apple Music
              </a>
              <a
                href="https://www.youtube.com/@rodriwcastel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-royal-blue transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#music" className="text-gray-400 hover:text-white transition-colors">
                  Music
                </a>
              </li>
              <li>
                <a href="#tour" className="text-gray-400 hover:text-white transition-colors">
                  Tour
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {latestRelease && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Latest Release</h4>
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700">
                <h5 className="font-medium text-white mb-1">{latestRelease.title}</h5>
                <p className="text-sm text-gray-400 mb-2">
                  {latestRelease.type} • {latestRelease.year}
                </p>
                <a
                  href={latestRelease.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-royal-blue hover:text-blue-400 text-sm transition-colors"
                >
                  Listen Now →
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">© 2025 Rodriw Castel. All rights reserved.</p>
          <p className="text-gray-400 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> for lovers
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
