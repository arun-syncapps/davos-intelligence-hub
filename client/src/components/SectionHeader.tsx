import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => {
    return (
        <div className="mb-12 mt-12 border-b border-wef-dark pb-4">
            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-4xl font-bold text-wef-dark tracking-tight mb-2"
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-sm text-gray-600 font-medium"
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
};

export default SectionHeader;
