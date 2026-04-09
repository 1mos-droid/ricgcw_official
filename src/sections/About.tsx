import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Globe2, Sparkles, Star, Target, Quote, Gavel } from 'lucide-react';
import pastorsImg from '../assets/church/all_church_pastors/IMG-20260301-WA0187.jpg';
import overseerImg from '../assets/church/pastor/IMG-20260408-WA0061.jpg';
import pastor2Img from '../assets/church/pastor/IMG-20260408-WA0062.jpg';
import pastorWife2Img from '../assets/church/pastor_and_wife/IMG-20260408-WA0063.jpg';

const About = () => {
  const values = [
    { icon: Heart, title: 'Worship', desc: 'Passionate and authentic praise that connects us to God.' },
    { icon: Globe2, title: 'Mission', desc: 'Evangelism and community outreach reaching the ends of the earth.' },
    { icon: ShieldCheck, title: 'Integrity', desc: 'Living a life of character guided by Biblical principles.' },
  ];

  const leadership = [
    { name: 'Rev. Nicholas Dobeng', role: 'Overseer', img: overseerImg },
    { name: 'Leadership Team', role: 'Pastoral Council', img: pastor2Img },
    { name: 'Family Ministry', role: 'Support & Care', img: pastorWife2Img },
  ];

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto space-y-32">
        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex flex-col gap-2">
              <span className="ios-caption text-ios-blue">Our Identity</span>
              <h1 className="text-3xl font-black text-ios-label leading-tight">
                RHEMA INNER COURT GOSPEL CHURCH <br />
                <span className="text-ios-blue">(WORLDWIDE) (RICGCW)</span>
              </h1>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-ios-red/10 flex-shrink-0 flex items-center justify-center text-ios-red">
                  <Star size={20} />
                </div>
                <div>
                  <h4 className="font-black text-ios-label text-sm uppercase tracking-widest">Scriptural Foundation</h4>
                  <p className="text-ios-secondary-label mt-1 italic font-medium">"Now it came to pass on the third day, that Esther put on her royal apparel, and stood in the inner court of the king's house..." — Esther 5:1</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-ios-orange/10 flex-shrink-0 flex items-center justify-center text-ios-orange">
                  <Quote size={20} />
                </div>
                <div>
                  <h4 className="font-black text-ios-label text-sm uppercase tracking-widest">Motto & Slogan</h4>
                  <p className="text-ios-secondary-label mt-1">
                    <span className="font-bold text-ios-label">Motto:</span> Perfecting The Saints And Taking Territories, Where The Impossibilities Are Possible Through Jesus Christ.
                  </p>
                  <p className="text-ios-secondary-label mt-2">
                    <span className="font-bold text-ios-label">Slogan:</span> Inner court – where sacrifices made to heaven!!!
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-ios-green/10 flex-shrink-0 flex items-center justify-center text-ios-green">
                  <Target size={20} />
                </div>
                <div>
                  <h4 className="font-black text-ios-label text-sm uppercase tracking-widest">Our Vision</h4>
                  <p className="text-ios-secondary-label mt-1">To Reach Out To People; To Love The People; To Care For The People, Spiritual And Physical Needs.</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-ios-separator/20">
              <p className="ios-body text-ios-secondary-label text-lg">
                RICGCW was founded with a singular vision: to create a spiritual haven where every individual can experience the transformative power of God's presence.
              </p>
            </div>

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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl shadow-black/10 transition-all duration-700">
              <motion.img 
                src={pastorsImg} 
                alt="Church Pastors"
                initial={{ scale: 1.1, filter: 'grayscale(20%)' }}
                whileInView={{ scale: 1, filter: 'grayscale(0%)' }}
                transition={{ duration: 1.2 }}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass p-8 rounded-[32px] shadow-2xl max-w-xs border-white/40">
              <p className="text-sm font-black italic text-ios-label leading-relaxed mb-4">
                "We don't just build buildings; we build people who build the kingdom."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-ios-blue/10 flex items-center justify-center">
                  <img src={overseerImg} alt="Overseer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-black text-xs">Rev. Nicholas Dobeng</p>
                  <p className="text-[10px] text-ios-secondary-label uppercase font-bold tracking-widest">Overseer</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Ecclesiastical Authority */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-[48px] border-none shadow-2xl bg-gradient-to-br from-ios-blue/5 to-white"
        >
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="w-16 h-16 rounded-[30%] bg-ios-blue/10 flex items-center justify-center text-ios-blue mx-auto">
              <Gavel size={32} />
            </div>
            <h2 className="ios-headline text-3xl">Ecclesiastical Authority</h2>
            <p className="ios-body text-ios-secondary-label text-xl leading-relaxed">
              As a body of Christian believers, we hold to a shared creed and observe sacred rites, acknowledging a distinct ecclesiastical authority that guides our spiritual journey and governance, separate from worldly states.
            </p>
          </div>
        </motion.div>

        {/* Leadership Section */}
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <span className="ios-caption text-ios-blue">Our Shepherds</span>
            <h2 className="ios-title">Guided by Spiritual <br />Leadership.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-4 rounded-[40px] group border-none shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-[3/4] rounded-[32px] overflow-hidden mb-6 relative">
                  <motion.img 
                    src={leader.img} 
                    alt={leader.name} 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8 pointer-events-none">
                    <Sparkles className="text-white w-6 h-6" />
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-ios-blue mb-1">{leader.role}</p>
                  <h3 className="font-black text-xl text-ios-label">{leader.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
