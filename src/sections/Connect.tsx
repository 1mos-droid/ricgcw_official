import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Camera, Globe, Play, Send } from 'lucide-react';

const Connect = () => {
  const socials = [
    { icon: Camera, href: 'https://www.instagram.com/ofttouchinglives', color: 'hover:text-pink-500' },
    { icon: Globe, href: 'https://www.facebook.com/share/1CT6hkuLu8/', color: 'hover:text-blue-600' },
    { icon: Play, href: 'https://youtube.com/@innercourtgospelchurchworl2293', color: 'hover:text-red-600' },
  ];

  return (
    <section id="connect" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <span className="ios-caption text-ios-blue">Get in Touch</span>
              <h2 className="ios-title">Connect with Our <br />Community.</h2>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-ios-blue shadow-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs text-ios-secondary-label font-bold uppercase tracking-widest mb-1">Visit Us</p>
                  <p className="font-bold text-lg">Ghana, West Africa (Main Branch)</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-ios-blue shadow-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs text-ios-secondary-label font-bold uppercase tracking-widest mb-1">Email Us</p>
                  <p className="font-bold text-lg">contact@ricgcw.org</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-ios-blue shadow-sm">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs text-ios-secondary-label font-bold uppercase tracking-widest mb-1">Call Us</p>
                  <p className="font-bold text-lg">+233 543 111 456</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-xs text-ios-secondary-label font-bold uppercase tracking-[0.2em] mb-6">Follow Our Journey</p>
              <div className="flex gap-4">
                {socials.map((s, i) => (
                  <a 
                    key={i} 
                    href={s.href} 
                    target="_blank" 
                    rel="noreferrer"
                    className={`w-14 h-14 rounded-2xl glass flex items-center justify-center text-ios-label transition-all duration-300 active:scale-90 ${s.color}`}
                  >
                    <s.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-[40px] border-none shadow-2xl relative"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-ios-secondary-label ml-1">Full Name</label>
                  <input type="text" className="w-full h-14 bg-ios-bg rounded-2xl px-6 outline-none focus:ring-2 focus:ring-ios-blue/30 font-bold transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-ios-secondary-label ml-1">Email Address</label>
                  <input type="email" className="w-full h-14 bg-ios-bg rounded-2xl px-6 outline-none focus:ring-2 focus:ring-ios-blue/30 font-bold transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-ios-secondary-label ml-1">Your Message</label>
                <textarea className="w-full h-40 bg-ios-bg rounded-2xl p-6 outline-none focus:ring-2 focus:ring-ios-blue/30 font-bold transition-all resize-none" placeholder="How can we pray for you or help you?" />
              </div>
              <button className="w-full h-16 bg-ios-blue text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-ios-blue/20 active:scale-95 transition-all">
                <Send size={20} />
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Connect;
