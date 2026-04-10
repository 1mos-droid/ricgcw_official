import { motion } from 'framer-motion';
import { Heart, Globe, Users, ArrowRight, DollarSign, Gift, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sponsorshipNeeds = [
  {
    id: 1,
    title: "Orphanage Support",
    description: "Providing daily meals, education, and clothing for 50+ children in our community center.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
    goal: "$5,000",
    raised: "$3,200",
    category: "Community"
  },
  {
    id: 2,
    title: "Rural Evangelism",
    description: "Supporting mission trips to remote villages to spread the Gospel and provide basic medical aid.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
    goal: "$2,500",
    raised: "$1,800",
    category: "Missions"
  },
  {
    id: 3,
    title: "Youth Scholarship",
    description: "Sponsoring talented but underprivileged students to attend university and vocational training.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    goal: "$10,000",
    raised: "$4,500",
    category: "Education"
  }
];

const Sponsorship = () => {
  return (
    <div className="relative min-h-screen bg-ios-bg">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
            >
              <Heart size={16} className="text-ios-red" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ios-red">Give with Love</span>
            </motion.div>
            <h1 className="ios-title text-4xl md:text-6xl mb-6">Partnership & <br /><span className="text-ios-blue">Sponsorship</span></h1>
            <p className="ios-body text-ios-secondary-label max-w-2xl mx-auto">
              Join us in our mission to touch lives and spread the Gospel. Your sponsorship makes a direct impact on the lives of those in need.
            </p>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {[
              { label: 'Lives Impacted', value: '10k+', icon: Users },
              { label: 'Communities', value: '25', icon: Globe },
              { label: 'Active Projects', value: '12', icon: Gift },
              { label: 'Next Event', value: 'Dec 15', icon: Calendar },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-3xl text-center"
              >
                <div className="w-10 h-10 rounded-2xl bg-white mx-auto mb-4 flex items-center justify-center text-ios-blue shadow-sm">
                  <stat.icon size={20} />
                </div>
                <p className="text-2xl font-black text-ios-label">{stat.value}</p>
                <p className="text-[10px] text-ios-secondary-label font-bold uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Projects List */}
          <div className="grid md:grid-cols-3 gap-8">
            {sponsorshipNeeds.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass-card overflow-hidden group rounded-[32px] border-none shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-video relative overflow-hidden">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full pointer-events-none">
                    <span className="text-[10px] font-black uppercase tracking-widest text-ios-label">{project.category}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-black mb-3">{project.title}</h3>
                  <p className="text-sm text-ios-secondary-label mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <p className="text-[10px] font-black uppercase tracking-widest text-ios-secondary-label">Progress</p>
                      <p className="text-sm font-black text-ios-blue">{project.raised} / {project.goal}</p>
                    </div>
                    <div className="h-2 bg-ios-separator/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-ios-blue rounded-full" 
                        style={{ width: `${(parseInt(project.raised.replace('$', '').replace(',', '')) / parseInt(project.goal.replace('$', '').replace(',', ''))) * 100}%` }}
                      />
                    </div>
                  </div>

                  <button className="w-full mt-8 h-14 bg-ios-blue text-white rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-ios-blue/20 active:scale-95 transition-all">
                    <DollarSign size={18} />
                    Sponsor Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Sponsorship */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-20 glass-card p-12 rounded-[40px] text-center max-w-4xl mx-auto border-none shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-ios-blue/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-4">Custom Sponsorship</h2>
              <p className="ios-body text-ios-secondary-label mb-10 max-w-2xl mx-auto">
                Have a specific project or initiative you'd like to support? We welcome custom partnerships to further our mission.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a href="mailto:innercourtch@gmail.com" className="h-16 px-10 bg-ios-label text-white rounded-2xl font-black flex items-center justify-center gap-3 active:scale-95 transition-all">
                  Contact Missions Team
                  <ArrowRight size={20} />
                </a>
                <div className="text-ios-secondary-label font-bold uppercase tracking-widest text-xs">or email us at innercourtch@gmail.com</div>              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sponsorship;
