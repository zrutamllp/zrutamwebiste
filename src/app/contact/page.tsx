"use client";

import { motion } from "framer-motion";

export default function ContactPage() {

  return (
    <>
      {/* Hero */}
      <section className="gradient-navy py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Ready to transform your workforce? Let us show you how Zrutam can
            drive measurable L&D outcomes for your organization.
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-navy mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Have a question or want to discuss your L&D needs? Drop us an
                  email and our team will get back to you within 24 hours.
                </p>

                <a
                  href="mailto:ceo@zrutam.com?subject=Inquiry%20from%20Zrutam%20Website"
                  className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-10 py-4 bg-amber hover:bg-amber-600 text-navy font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-amber/25 text-base"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Send Email to ceo@zrutam.com
                </a>

                <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-gray-500 text-sm">
                    Clicking the button above will open your default email client
                    with our CEO&apos;s email address pre-filled. You can also email
                    us directly at{" "}
                    <a href="mailto:ceo@zrutam.com" className="text-teal hover:text-teal-500 font-medium">
                      ceo@zrutam.com
                    </a>
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-8"
              >
                {/* Email */}
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-3">
                    Email Us
                  </h3>
                  <a
                    href="mailto:ceo@zrutam.com"
                    className="inline-flex items-center gap-3 text-gray-600 hover:text-teal transition-colors"
                  >
                    <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    ceo@zrutam.com
                  </a>
                </div>

                {/* Office Location */}
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-4">
                    Our Office
                  </h3>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-navy">Bhubaneswar, India</p>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Chandrabali House, Ground Floor,<br />
                        Uttamundahunan, Janla, Khordha,<br />
                        Bhubaneswar &ndash; 752054
                      </p>
                    </div>
                  </div>
                </div>

                {/* Schedule a Call */}
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-3">
                    Schedule a Call
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    {/* Calendly Embed Placeholder */}
                    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <svg
                          className="w-10 h-10 text-gray-400 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                          />
                        </svg>
                        <p className="text-gray-500 text-sm font-medium">
                          Calendly Embed
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          Schedule a 30-minute demo call
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-3">
                    Working Hours
                  </h3>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p>Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
