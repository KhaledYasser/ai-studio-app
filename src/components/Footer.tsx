import { Terminal, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#090f15] text-slate-500 py-20 border-t border-[#1c2430]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#81ecff] rounded-lg flex items-center justify-center shadow-lg shadow-[#81ecff]/20">
                <Terminal className="text-[#090f15] w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white uppercase">TechNexus</span>
            </div>
            <p className="max-w-sm text-slate-500 leading-relaxed mb-8">
              A platform dedicated to sharing knowledge and showcasing the potential of modern web technologies. Built with passion for the developer community.
            </p>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-[#81ecff] transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#81ecff] transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#81ecff] transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#81ecff] transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wide">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#articles" className="hover:text-[#81ecff] transition-colors">Articles</a></li>
              <li><a href="#gallery" className="hover:text-[#81ecff] transition-colors">App Gallery</a></li>
              <li><a href="#" className="hover:text-[#81ecff] transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-[#81ecff] transition-colors">Open Source</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wide">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-[#81ecff] transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-[#81ecff] transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-[#81ecff] transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-[#81ecff] transition-colors">Newsletter</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1c2430] flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2023 TechNexus. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-[#81ecff] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#81ecff] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#81ecff] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
