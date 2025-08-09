import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ImpactCounter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { label: "Total Volunteers", value: 1280 },
    { label: "Projects Completed", value: 250 },
    { label: "Hours Served", value: 46000 },
  ];

  return (
    <div className="my-10  bg-gradient-to-r from-purple-100 to-purple-200 dark:bg-none dark:bg-gray-500 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Our Impact So Far</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {stats.map((stat, idx) => (
            <motion.div 
              ref={ref}
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 } }
              transition={{ delay: idx * 0.3, duration: 0.8 }}
              className="bg-white dark:bg-gray-600 rounded-xl shadow-lg p-8"
            >
              <h3 className="text-5xl font-bold text-indigo-600">{stat.value}</h3>
              <p className="mt-3 text-lg font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImpactCounter;
