import { motion } from 'framer-motion';

const testimonials = [
  { name: "Sarah J.", feedback: "Volunteering has changed my life. The platform is easy to use and very organized!" },
  { name: "Rafiq A.", feedback: "Thanks to this platform, I’ve joined many healthcare projects & made great friends." },
  { name: "Maya P.", feedback: "Excellent experience. The management system is smooth and efficient." }
];

const Testimonials = () => {
  return (
    <div className="my-20  bg-gradient-to-r from-pink-100 to-pink-200 dark:bg-none dark:bg-gray-500 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Volunteers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.3, duration: 0.8 }}
              className="bg-white dark:bg-gray-600 rounded-xl shadow-lg p-8"
            >
              <p className="italic text-gray-700">"{t.feedback}"</p>
              <h4 className="mt-4 text-lg font-semibold">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonials;
