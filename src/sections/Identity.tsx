import { motion } from 'framer-motion';
import { Shield, Palette, BookOpen, Scroll } from 'lucide-react';

const Identity = () => {
  const colors = [
    {
      name: 'White',
      hex: '#ffffff',
      meanings: 'Light, Purity, Bride of Christ, Surrender, Joy, Angels',
      textColor: 'text-ios-label',
      borderColor: 'border-ios-separator'
    },
    {
      name: 'Black',
      hex: '#000000',
      meanings: 'Death, Mourning, Sin, Judgment, Evil, Humility, Fear of God',
      textColor: 'text-white',
      borderColor: 'border-transparent'
    },
    {
      name: 'Gold',
      hex: '#ffd700',
      meanings: 'Glory, Godhead, Refining Process, Kingship, Words of Wisdom, Truth, Knowledge, Faith, Anointing Oil',
      textColor: 'text-ios-label',
      borderColor: 'border-transparent'
    },
    {
      name: 'Deep Orange',
      hex: '#ff4500',
      meanings: 'Warning, Change, Prophetic Ministry, Ambition, Harvest, Strength, Endurance',
      textColor: 'text-white',
      borderColor: 'border-transparent'
    },
    {
      name: 'Lemon Green',
      hex: '#32cd32',
      meanings: 'Prosperity, New life and Growth, Fresh, Healing, Hope, Peace, Victory, Rest',
      textColor: 'text-white',
      borderColor: 'border-transparent'
    }
  ];

  const definitions = [
    { term: 'Inner', definition: 'Inside or closer to the inside of the body. Located or occurring within or closer to a center. Close to the center of power: the inner cabinet.' },
    { term: 'Court', definition: 'A tribunal presided over by a judge, judges, or magistrate in civil and criminal cases.' },
    { term: 'Gospel', definition: 'Glad tidings; especially, the good news concerning Christ, the kingdom of God, and salvation.' },
    { term: 'Church', definition: 'The collective body of Christians; Temple, house of worship, house of God, meeting-house. Body of Christians, ecclesiastical body.' }
  ];

  const templeElements = [
    { title: 'The Great or Outer Court', ref: 'Jeremiah 19:14, 26:2', desc: 'Where people assembled to worship.' },
    { title: 'The Inner Court', ref: '1 Kings 6:36', desc: 'A sacred space closer to the presence.' },
    { title: 'The Court of the Priests', ref: '2 Chronicles 4:9', desc: 'Reserved for those serving in the sanctuary.' }
  ];

  return (
    <section id="identity" className="py-32 px-6 bg-white/50">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* Cultural Beliefs */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-ios-blue/10 flex items-center justify-center text-ios-blue">
                <Shield size={20} />
              </div>
              <span className="ios-caption text-ios-blue">Our Culture</span>
            </div>
            <h2 className="ios-title font-black">Culture of <br />Loyalty.</h2>
            <div className="glass-card p-8 rounded-[32px] border-none shadow-xl bg-white/80">
              <p className="ios-body text-ios-label text-lg font-medium leading-relaxed italic">
                "ICGCW believes in our HEAD PASTOR and the ASSOCIATES, also the LEADERS and all the DEPARTMENTAL HEAD EXECUTIVES as well as all the MEMBERS too, so we the members don't speak evil things and will not allow anybody from within or outside to speak evil about them. Internally (inside the church) or externally (outside the church). This is the way we ICGCW members think and do our things as a LOYAL PEOPLE, not a disloyal people."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
             <div className="aspect-square rounded-[40px] bg-gradient-to-br from-ios-blue/5 to-ios-blue/20 flex items-center justify-center p-12">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 rounded-[30%] bg-white shadow-2xl flex items-center justify-center mx-auto text-ios-blue">
                    <Shield size={48} />
                  </div>
                  <h3 className="ios-headline">Built on Loyalty</h3>
                  <p className="ios-body text-ios-secondary-label">
                    We protect the integrity of our leadership and our family, both within and outside the walls of the church.
                  </p>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Biblical Context */}
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-ios-purple/10 flex items-center justify-center text-ios-purple">
                <BookOpen size={20} />
              </div>
              <span className="ios-caption text-ios-purple">Biblical Context</span>
            </div>
            <h2 className="ios-title">Understanding Our Name.</h2>
            <p className="ios-body text-ios-secondary-label max-w-2xl mx-auto">
              The name "Inner Court Gospel Church" is rooted in deep biblical truth and the architecture of the Tabernacle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {definitions.map((item, index) => (
              <motion.div
                key={item.term}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-[32px] border-none shadow-lg bg-white/60"
              >
                <h3 className="font-black text-2xl text-ios-blue mb-4">{item.term}</h3>
                <p className="text-sm text-ios-secondary-label leading-relaxed">
                  {item.definition}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-[40px] border-none shadow-xl bg-gradient-to-br from-white to-ios-blue/5"
            >
              <div className="flex items-center gap-3 mb-8">
                <Scroll className="text-ios-blue" size={24} />
                <h3 className="ios-headline">The Concept of the Temple</h3>
              </div>
              <div className="space-y-6">
                {templeElements.map((el, i) => (
                  <div key={i} className="border-l-2 border-ios-blue/20 pl-6 py-2">
                    <h4 className="font-black text-ios-label">{el.title}</h4>
                    <p className="text-[10px] text-ios-blue font-bold uppercase tracking-widest mt-1">{el.ref}</p>
                    <p className="text-sm text-ios-secondary-label mt-2">{el.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center space-y-8"
            >
              <h3 className="ios-headline">Scriptural Foundations</h3>
              <div className="flex flex-wrap gap-3">
                {['Ezekiel 8:16', 'Matthew 27:51', 'Hebrews 4:14-16', 'Hebrews 10:19-20', 'Hebrews 8:13', 'Acts 17:24'].map((scripture) => (
                  <span key={scripture} className="px-5 py-3 rounded-2xl bg-white shadow-sm text-sm font-bold text-ios-label border border-ios-separator/20">
                    {scripture}
                  </span>
                ))}
              </div>
              <p className="ios-body text-ios-secondary-label italic">
                "Our journey leads us from the outer court into the holy place, where we encounter the living God face to face."
              </p>
            </motion.div>
          </div>
        </div>

        {/* Church Colors */}
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-ios-green/10 flex items-center justify-center text-ios-green">
                <Palette size={20} />
              </div>
              <span className="ios-caption text-ios-green">Symbolism</span>
            </div>
            <h2 className="ios-title">Our Church Colors.</h2>
            <p className="ios-body text-ios-secondary-label max-w-2xl mx-auto">
              Every color we use carries deep spiritual significance and reflects our journey of faith.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {colors.map((color, index) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card overflow-hidden rounded-[32px] border-none shadow-lg hover:shadow-2xl transition-all duration-500 group"
              >
                <div 
                  className={`h-32 w-full ${color.borderColor} border-b relative`}
                  style={{ backgroundColor: color.hex }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="font-black text-xl">{color.name}</h3>
                  <p className="text-sm text-ios-secondary-label leading-relaxed">
                    {color.meanings}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Identity;
