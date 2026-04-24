import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Enter valid email" }),
  message: z.string().min(10, { message: "Minimum 10 characters required" }),
});

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
    toast.success("Message Sent", {
      description: `Thanks ${data.fullName}, we'll contact you soon.`,
    });
    reset();
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      desc: "Ahmedabad, Gujarat",
    },
    {
      icon: Phone,
      title: "Phone",
      desc: "+91 98765 43210",
    },
    {
      icon: Mail,
      title: "Email",
      desc: "support@vastra.co",
    },
    {
      icon: Clock,
      title: "Hours",
      desc: "Mon – Sat, 10AM – 7PM",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-background to-muted px-4 md:px-12 py-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Contact
          </p>

          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Let’s talk 👋
          </h1>

          <p className="text-muted-foreground mb-8 max-w-md">
            Have questions about your order, sizing, or anything else? We're
            here to help you.
          </p>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="p-5 bg-surface border border-border rounded-2xl shadow-sm"
                >
                  <Icon className="w-5 h-5 text-foreground mb-2" />
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* RIGHT SIDE (FORM) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-border rounded-3xl p-8 md:p-10 shadow-xl"
        >
          <h2 className="text-lg font-bold mb-6">Send a message</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <Input
                {...register("fullName")}
                placeholder="Full Name"
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName && (
                <p className="text-destructive text-xs mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Input
                {...register("email")}
                placeholder="Email Address"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-destructive text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <textarea
                {...register("message")}
                placeholder="Your message..."
                rows="5"
                aria-invalid={!!errors.message}
                className="w-full border rounded-xl px-4 py-3 text-sm outline-none resize-none"
              />
              {errors.message && (
                <p className="text-destructive text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Button */}
            <Button type="submit" variant="default" size="lg">
              <Send size={16} />
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
