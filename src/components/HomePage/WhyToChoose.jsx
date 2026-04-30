import React from "react";
import SectionContainer from "@/components/ui/SectionContainer";
import { Truck, RefreshCcw, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "Free delivery on all orders above ₹499",
    gradient: "from-blue-50 to-blue-100/50",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    desc: "7-day hassle-free returns & exchanges",
    gradient: "from-violet-50 to-violet-100/50",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-50",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    desc: "100% secure and trusted payment methods",
    gradient: "from-emerald-50 to-emerald-100/50",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    desc: "Handpicked fabrics with attention to detail",
    gradient: "from-amber-50 to-amber-100/50",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const WhyChooseUs = () => {
  return (
    <section className="bg-surface text-foreground relative overflow-hidden">
      <SectionContainer className="relative">
        {/* Heading */}
         <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="text-center mb-14"
              >
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                   The Vastra Promise
                </h1>
                <p className="text-muted-foreground mt-3 uppercase tracking-[0.2em] text-xs font-medium">Why Choose Us</p>
                <div className="w-16 h-1 bg-foreground mx-auto mt-5 rounded-full" />
              </motion.div>
        
       

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="group"
              >
                <div
                  className={`bg-gradient-to-br ${item.gradient} rounded-2xl p-8 text-center h-full border border-border/50 hover:shadow-xl hover:shadow-zinc-100/50 hover:-translate-y-1 transition-all duration-500`}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 rounded-2xl ${item.iconBg}`}>
                      <Icon
                        className={`size-8 ${item.iconColor} group-hover:scale-110 transition-transform duration-500`}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2 tracking-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
};
