import { motion } from 'framer-motion';
import { Users, Baby, School, Flame, Music, HeartHandshake } from 'lucide-react';

const Ministries = () => {
  const ministries = [
    { icon: Users, title: 'Men of Valor', color: 'bg-blue-500', desc: 'Equipping men to be spiritual leaders in their homes and communities.' },
    { icon: HeartHandshake, title: "Women's Ministry", color: 'bg-pink-500', desc: 'A sisterhood dedicated to prayer, growth, and empowerment.' },
    { icon: Flame, title: 'Youth Alive', color: 'bg-orange-500', desc: 'Igniting a passion for Christ in the next generation.' },
    { icon: School, title: 'Campus Mission', color: 'bg-purple-500', desc: 'Reaching students with the Gospel across global universities.' },
    { icon: Music, title: 'Worship Arts', color: 'bg-indigo-500', desc: 'Expressing God’s glory through music, dance, and creative media.' },
    { icon: Baby, title: 'Kids Court', color: 'bg-green-500', desc: 'Building a strong Biblical foundation for our little ones.' },
  ];

  return (
    <section id="ministries" className="py-32 px-6 bg-white/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="ios-caption text-ios-blue"
          >
            Our Communities
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="ios-title mt-2"
          >
            Find Your Place.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((m, index) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card group p-8 rounded-[32px] hover:shadow-2xl hover:shadow-ios-blue/10 transition-all duration-500"
            >
              <div className={`w-14 h-14 rounded-2xl ${m.color} flex items-center justify-center text-white mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-500`}>
                <m.icon size={28} />
              </div>
              <h3 className="ios-headline mb-3">{m.title}</h3>
              <p className="ios-body text-ios-secondary-label text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                {m.desc}
              </p>
              <button className="mt-6 text-ios-blue font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More
                <span className="text-lg">→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ministries;
