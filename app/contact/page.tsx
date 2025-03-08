"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  HeartHandshake,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Check,
  Loader2
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      // Show success message
      setSubmitted(true);
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible",
      });

      // Reset form
      form.reset();

    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Something went wrong",
        description: "Failed to send your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 to-white">
      {/* Header Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <div className="w-24 h-1 bg-gold/70 mx-auto mb-6"></div>
            <p className="max-w-xl mx-auto text-gray-600 mb-8">
              Have questions about our wedding planning services? We'd love to hear from you and help make your special day perfect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 md:px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <motion.div
              className="lg:col-span-3 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h2 className="text-2xl font-semibold mb-6 text-center">Send Us a Message</h2>

                {submitted ? (
                  <div className="bg-green-50 border border-green-100 rounded-lg p-6 text-center flex-1 flex flex-col items-center justify-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium text-green-800 mb-3">Message Sent Successfully!</h3>
                    <p className="text-green-700 mb-6 max-w-md">Thank you for reaching out. We'll get back to you shortly.</p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      className="bg-white text-green-700 border border-green-200 hover:bg-green-50 px-6"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 flex flex-col">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Jane Doe"
                                  {...field}
                                  className="border-gray-200 focus-visible:ring-gold/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="jane@example.com"
                                  type="email"
                                  {...field}
                                  className="border-gray-200 focus-visible:ring-gold/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="How can we help you?"
                                {...field}
                                className="border-gray-200 focus-visible:ring-gold/50"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem className="flex-1 flex flex-col">
                            <FormLabel>Your Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your wedding plans or questions..."
                                className="flex-1 min-h-[180px] border-gray-200 focus-visible:ring-gold/50"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="pt-2 mt-auto">
                        <Button
                          type="submit"
                          className="w-full bg-gold hover:bg-gold/90 text-white py-6"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Contact Info Card */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-gold/10 p-3 rounded-full mr-4">
                        <MapPin className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Our Location</h3>
                        <p className="text-gray-600 mt-1">123 Wedding Way, Celebration City, AB 12345</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-gold/10 p-3 rounded-full mr-4">
                        <Phone className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Phone Number</h3>
                        <p className="text-gray-600 mt-1">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-gold/10 p-3 rounded-full mr-4">
                        <Mail className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Email Address</h3>
                        <p className="text-gray-600 mt-1">hello@bloomknot.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-gold/10 p-3 rounded-full mr-4">
                        <Clock className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Business Hours</h3>
                        <p className="text-gray-600 mt-1">Monday - Friday: 9am - 6pm<br />Saturday: 10am - 4pm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Our Promise Card */}
              <div className="bg-gold/5 rounded-xl shadow-sm border border-gold/20 overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-4">
                    <HeartHandshake className="h-6 w-6 text-gold mr-3" />
                    <h3 className="text-lg font-semibold">Our Promise</h3>
                  </div>
                  <p className="text-gray-600">
                    We'll respond to your inquiry within 24 hours. Your wedding journey matters to us, and we're committed to making every step of the planning process seamless and enjoyable.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-4 md:px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="rounded-xl overflow-hidden shadow-md h-80 md:h-96 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1391.8924321338914!2d75.03166545576303!3d26.62681834048882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c09d2ae57438f%3A0xe01d485d4c13972a!2sCaptain%20Vikram%20Batra(B5)%20Hostel%20CURAJ!5e1!3m2!1sen!2sin!4v1741469703593!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BloomKnot Location"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
