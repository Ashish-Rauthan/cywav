import { motion } from "framer-motion";

const stories = [
  { name: "Priya", text: "The Manali homestay was magical! Cozy rooms and stunning views.", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Rohan", text: "Booked a villa in Goa – amazing location and great service!", img: "https://randomuser.me/api/portraits/men/45.jpg" }
];

export default function CustomerStories() {
  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6">What Our Guests Say</h2>
      <div className="grid md:grid-cols-2 gap-6 px-6">
        {stories.map((story, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4"
          >
            <img src={story.img} alt={story.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <h4 className="font-semibold">{story.name}</h4>
              <p className="text-gray-600">{story.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
