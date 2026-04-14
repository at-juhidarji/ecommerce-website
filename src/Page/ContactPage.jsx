import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const contactSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data) => {
    // 1. Success Toast
    toast.success("Message Sent", {
      description: `Thank you ${data.fullName}, we'll get back to you shortly.`,
    });
    
    console.log("Form Data:", data);
    reset(); 
  };

  const contactCards = [
    {
      icon: MapPin,
      title: "Visit Us",
      desc: "Ahmedabad, Gujarat, India",
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      icon: Phone,
      title: "Call Us",
      desc: "+91 98765 43210",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: Mail,
      title: "Email Us",
      desc: "support@vastra.co",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      icon: Clock,
      title: "Business Hours",
      desc: "Mon – Sat, 10AM – 7PM IST",
      color: "text-violet-500",
      bg: "bg-violet-50",
    },
  ];

  // Shared input styles
  const inputBase = "w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 bg-white";
  const inputNormal = "border-zinc-200 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200";
  const inputError = "border-red-400 focus:ring-2 focus:ring-red-100";

  return (
    <section className="bg-white min-h-screen py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-semibold mb-3">
            Get in Touch
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
            Contact Us
          </h1>
          <p className="text-zinc-400 mt-3 text-sm max-w-md mx-auto">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className={`${card.bg} p-5 md:p-6 rounded-2xl text-center hover:-translate-y-1 transition-transform duration-500`}
              >
                <Icon className={`${card.color} w-6 h-6 mx-auto mb-3`} />
                <h3 className="font-semibold text-sm tracking-tight mb-1">{card.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-zinc-50/80 p-8 md:p-10 rounded-2xl border border-zinc-100">
            <h2 className="text-lg font-bold tracking-tight mb-6">Send us a message</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-zinc-400 mb-2.5">
                    Full Name
                  </label>
                  <input
                    {...register("fullName")}
                    placeholder="Your name"
                    className={`${inputBase} ${errors.fullName ? inputError : inputNormal}`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.fullName.message}</p>}
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-zinc-400 mb-2.5">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    placeholder="email@example.com"
                    className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-zinc-400 mb-2.5">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows="5"
                  placeholder="How can we help you?"
                  className={`${inputBase} resize-none ${errors.message ? inputError : inputNormal}`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.message.message}</p>}
              </div>

              <Button
                variant="default"
                type="submit"
                className="w-full bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl uppercase tracking-[0.15em] text-xs h-12 font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Send size={14} />
                Send Message
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}