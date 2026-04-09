import logoImg from '../assets/church/logo.jpg';

const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-ios-separator/10 bg-white/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl mb-6">
          <img src={logoImg} alt="RICGCW Logo" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-black mb-2 text-ios-label">Rhema Inner Court Gospel Church (Worldwide)</h3>
        <p className="ios-caption mb-8">© 2026 RICGCW. All rights reserved.</p>
        
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Leadership</p>
          <p className="text-sm font-black text-ios-label">Overseer Rev. Nicholas Dobeng</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
