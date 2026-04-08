import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, MapPin, ArrowRight } from 'lucide-react';

const Events = () => {
  const events = [
    { title: 'Sunday Glory Service', time: '8:00 AM - 11:30 AM', loc: 'Main Sanctuary', day: '12', month: 'APR' },
    { title: 'Midweek Power Encounter', time: '6:00 PM - 8:00 PM', loc: 'Grace Hall', day: '15', month: 'APR' },
    { title: 'All Night Prayer Vigil', time: '10:00 PM - 4:00 AM', loc: 'Main Sanctuary', day: '24', month: 'APR' },
  ];

  return (
    <section id="events" className="py-32 px-6 bg-white/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="ios-caption text-ios-blue">What’s Happening</span>
            <h2 className="ios-title">Calendar of Glory.</h2>
          </div>
          <button className="text-ios-blue font-black text-sm uppercase tracking-widest flex items-center gap-2 group">
            View Full Calendar
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {events.map((e, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-[32px] border-none shadow-md hover:shadow-xl transition-all duration-500 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-ios-blue text-white flex flex-col items-center justify-center shadow-lg shadow-ios-blue/20 shrink-0">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-70">{e.month}</span>
                  <span className="text-2xl font-black">{e.day}</span>
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-lg leading-tight group-hover:text-ios-blue transition-colors truncate">{e.title}</h3>
                  <p className="text-xs text-ios-secondary-label mt-1">Join us live or online</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-ios-secondary-label font-bold uppercase tracking-wider">
                  <CalendarIcon size={14} className="text-ios-blue" />
                  <span>{e.time}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-ios-secondary-label font-bold uppercase tracking-wider">
                  <MapPin size={14} className="text-ios-red" />
                  <span>{e.loc}</span>
                </div>
              </div>

              <button className="w-full mt-8 h-12 bg-ios-separator/10 hover:bg-ios-blue hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                Register Interest
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
