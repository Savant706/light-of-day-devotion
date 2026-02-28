import { Layout } from "@/components/layout/Layout";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend / email service
    setSubmitted(true);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-teal-50 to-emerald-50 dark:from-sky-950/20 dark:via-teal-950/20 dark:to-emerald-950/20 py-20 md:py-28">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-300/20 dark:bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-teal-200/60 dark:border-teal-700/40 mb-6 shadow-sm">
            <Mail className="h-8 w-8 text-teal-500" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Have a question, a prayer request, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  We're Here for You
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you have a question about our devotions, want to share how God has
                  spoken to you through His Word, or need prayer — reach out. Every message
                  is read and valued.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Email Us</p>
                    <p className="text-muted-foreground text-sm">hello@lightofday.app</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Prayer Requests</p>
                    <p className="text-muted-foreground text-sm">
                      Use the form to share your prayer needs. We pray for every request.
                    </p>
                  </div>
                </div>
              </div>

              {/* Future integrations note */}
              <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 rounded-2xl border border-amber-100 dark:border-amber-800/30">
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-2">
                  Coming Soon
                </p>
                <p className="text-sm text-muted-foreground">
                  User accounts, M-Pesa giving, and an admin dashboard are on the roadmap.
                  Stay tuned!
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-10 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 rounded-3xl shadow-xl">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We'll get back to you soon. God bless you!
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                      className="mt-6 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full text-sm hover:from-amber-400 hover:to-orange-400 transition-all duration-200"
                    >
                      Send Another
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 rounded-3xl p-8 shadow-xl space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background/60 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background/60 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/60 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-sm"
                    >
                      <option value="">Select a subject…</option>
                      <option value="general">General Inquiry</option>
                      <option value="prayer">Prayer Request</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Share your thoughts, questions, or prayer requests…"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/60 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
