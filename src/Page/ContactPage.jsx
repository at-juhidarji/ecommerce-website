import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner"; // Import toast
import { Button } from "@/components/ui/button";
const contactSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
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
    // 1. Success Toast
    toast.success("Message Sent", {
      description: `Thank you ${data.fullName}, we'll get back to you shortly.`,
    });
    
    console.log("Form Data:", data);
    reset(); 
  };

  return (
    <section className="bg-white min-h-screen py-16 px-6 md:px-12 lg:px-20">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Contact Us</h1>
        <p className="text-gray-500 mt-3 uppercase text-xs tracking-[2px]">
          Get in touch with Vastra.co 2026-2027
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left - Contact Info */}
        <div className="space-y-8">
          <div className="bg-gray-50 p-6 rounded-2xl flex items-start gap-4">
            <MapPin className="text-orange-500 shrink-0" />
            <div>
              <h3 className="font-semibold text-lg">Address</h3>
              <p className="text-gray-600">Ahmedabad, Gujarat, India</p>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl flex items-start gap-4">
            <Phone className="text-orange-500 shrink-0" />
            <div>
              <h3 className="font-semibold text-lg">Phone</h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl flex items-start gap-4">
            <Mail className="text-orange-500 shrink-0" />
            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <p className="text-gray-600">support@vastra.co</p>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                {...register("fullName")}
                placeholder="Piyush..."
                className={`w-full border rounded-lg px-4 py-2 outline-none transition ${
                  errors.fullName ? "border-red-500" : "border-gray-200 focus:ring-2 focus:ring-orange-400"
                }`}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                {...register("email")}
                placeholder="email@example.com"
                className={`w-full border rounded-lg px-4 py-2 outline-none transition ${
                  errors.email ? "border-red-500" : "border-gray-200 focus:ring-2 focus:ring-orange-400"
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                {...register("message")}
                rows="5"
                placeholder="How can we help you?"
                className={`w-full border rounded-lg px-4 py-2 outline-none transition ${
                  errors.message ? "border-red-500" : "border-gray-200 focus:ring-2 focus:ring-orange-400"
                }`}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <Button variant="default" type="submit" className="w-full bg-black text-white hover:bg-zinc-800 rounded-none uppercase tracking-widest text-xs h-11">
              Send Message
                        </Button>
          </form>
        </div>
      </div>
    </section>
  );
}