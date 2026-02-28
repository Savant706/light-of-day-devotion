import { Layout } from "@/components/layout/Layout";
import { Sun, Heart, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: <BookOpen className="h-6 w-6 text-amber-500" />,
    title: "Scripture First",
    description:
      "Every devotion is grounded in the Bible. We believe God's Word is living, active, and relevant to every season of life.",
  },
  {
    icon: <Heart className="h-6 w-6 text-rose-500" />,
    title: "Authentic Faith",
    description:
      "We don't offer easy answers. We offer honest reflections that meet you where you are and point you to the One who heals.",
  },
  {
    icon: <Sun className="h-6 w-6 text-orange-500" />,
    title: "Daily Renewal",
    description:
      "His mercies are new every morning. We believe in the power of daily spiritual habits to transform a life over time.",
  },
  {
    icon: <Users className="h-6 w-6 text-sky-500" />,
    title: "Community",
    description:
      "Faith grows in community. We are building a space where believers can encourage one another and grow together.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 dark:from-rose-950/20 dark:via-orange-950/20 dark:to-amber-950/20 py-20 md:py-28">
        <div className="absolute top-0 left-0 w-80 h-80 bg-rose-300/20 dark:bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-amber-200/60 dark:border-amber-700/40 mb-6 shadow-sm">
            <Sun className="h-8 w-8 text-amber-500" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Light of Day
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We exist to help people begin each day with God's Word — finding light, hope, and
            purpose in the pages of Scripture.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Light of Day Devotion was born out of a simple conviction: that the most
                important thing you can do each morning is spend time with God. In a world
                that demands your attention from the moment you wake up, we want to help you
                pause, breathe, and encounter the living God through His Word.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our devotions are crafted to be accessible yet deep — short enough to read in
                a few minutes, rich enough to carry with you throughout the day. Each one
                includes a Scripture passage, a reflection, and a prayer to help you engage
                with God personally.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you are a lifelong believer or just beginning to explore faith, you
                are welcome here. The light of God's Word is for everyone.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/40 dark:to-orange-950/30 rounded-3xl p-8 border border-amber-200/60 dark:border-amber-700/30">
                <blockquote className="font-serif text-xl italic text-foreground/90 leading-relaxed mb-4">
                  "Thy word is a lamp unto my feet, and a light unto my path."
                </blockquote>
                <footer className="text-amber-600 dark:text-amber-400 font-semibold text-sm">
                  — Psalm 119:105
                </footer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-secondary/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
              What We Believe
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              These values shape everything we create and share.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className="bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">
            Ready to Begin?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Start with today's devotion and let God's Word light your path.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold rounded-full shadow-lg shadow-amber-500/25 transition-all duration-200 hover:-translate-y-0.5"
            >
              Read Today's Devotion
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-border/60 text-foreground font-semibold rounded-full hover:bg-white/90 dark:hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
