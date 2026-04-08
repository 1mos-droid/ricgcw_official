import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Globe2 } from 'lucide-react';

const About = () => {
  const values = [
    { icon: Heart, title: 'Worship', desc: 'Passionate and authentic praise that connects us to God.' },
    { icon: Globe2, title: 'Mission', desc: 'Evangelism and community outreach reaching the ends of the earth.' },
    { icon: ShieldCheck, title: 'Integrity', desc: 'Living a life of character guided by Biblical principles.' },
  ];

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="ios-caption text-ios-blue">Our Foundation</span>
            <h2 className="ios-title">Built on Faith, <br />Driven by Love.</h2>
            <p className="ios-body text-ios-secondary-label text-lg">
              Inner Court Gospel Church Worldwide was founded with a singular vision: to create a spiritual haven where every individual can experience the transformative power of God's presence.
            </p>
            <p className="ios-body text-ios-secondary-label text-lg">
              Under the leadership of Overseer Rev. Nicholas Dobeng, we have grown into a global family, united by our commitment to truth, service, and spiritual excellence.
            </p>

            <div className="grid md:grid-cols-3 gap-6 pt-8">
              {values.map((v) => (
                <div key={v.title} className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-ios-blue">
                    <v.icon size={24} />
                  </div>
                  <h4 className="font-black text-sm">{v.title}</h4>
                  <p className="text-xs text-ios-secondary-label leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl shadow-black/10 grayscale-[0.2] hover:grayscale-0 transition-all duration-700">
              <img 
                src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=800" 
                alt="Church Service"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass p-8 rounded-[32px] shadow-2xl max-w-xs border-white/40">
              <p className="text-sm font-black italic text-ios-label leading-relaxed mb-4">
                "We don't just build buildings; we build people who build the kingdom."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ios-blue/10 flex items-center justify-center text-ios-blue">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="font-black text-xs">Rev. Nicholas Dobeng</p>
                  <p className="text-[10px] text-ios-secondary-label uppercase font-bold tracking-widest">Overseer</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
