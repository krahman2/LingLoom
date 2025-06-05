const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function MethodsGrid() {
  return (
    <motion.section
      className="bg-white text-black py-24 px-6 sm:px-10 md:px-20 lg:px-32 xl:px-40 relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.1 }}
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-sm"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
      </motion.div>
    </motion.section>
  );
} 