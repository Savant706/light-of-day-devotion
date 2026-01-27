import { Layout } from "@/components/layout/Layout";
import { Sun, Heart, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="hero-gradient py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-3">
            About Daily Light
          </h1>
          <p className="text-lg text-muted-foreground">
            Illuminating hearts through God's Word
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="page-container">
        <div className="prose prose-lg max-w-none">
          {/* Mission */}
          <div className="verse-card mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Sun className="h-6 w-6 text-accent" />
              <h2 className="font-serif text-2xl text-foreground m-0">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Daily Light exists to bring the transformative power of Scripture into your everyday life. 
              We believe that starting each day with God's Word sets the foundation for a life of faith, 
              hope, and love. Our mission is to make Scripture accessible, relatable, and applicable to 
              modern life while honoring the timeless truth of the Bible.
            </p>
          </div>

          {/* What We Offer */}
          <div className="verse-card mb-8">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="font-serif text-2xl text-foreground m-0">What We Offer</h2>
            </div>
            <ul className="text-muted-foreground space-y-4 list-none p-0">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">✦</span>
                <span><strong className="text-foreground">Daily Verses</strong> — Carefully selected Scripture passages to inspire and guide your day</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">✦</span>
                <span><strong className="text-foreground">Devotional Reflections</strong> — Thoughtful commentary to help you understand and apply God's Word</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">✦</span>
                <span><strong className="text-foreground">Daily Prayers</strong> — Guided prayers to help you connect with God throughout your day</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">✦</span>
                <span><strong className="text-foreground">Prayer Community</strong> — A place to share your prayer requests and be supported by fellow believers</span>
              </li>
            </ul>
          </div>

          {/* Our Belief */}
          <div className="verse-card mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-6 w-6 text-destructive" />
              <h2 className="font-serif text-2xl text-foreground m-0">What We Believe</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We believe the Bible is the inspired Word of God, living and active, able to transform hearts 
              and minds. We believe in the power of prayer and the importance of community in the Christian walk.
            </p>
            <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/80 my-6">
              "Your word is a lamp for my feet, a light on my path."
              <footer className="not-italic text-accent mt-1">— Psalm 119:105</footer>
            </blockquote>
            <p className="text-muted-foreground leading-relaxed">
              This verse is the inspiration behind Daily Light. Just as a lamp illuminates the path ahead, 
              we hope that our daily devotionals will help light your way through life's journey.
            </p>
          </div>

          {/* Join Us */}
          <div className="verse-card bg-secondary/30">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="font-serif text-2xl text-foreground m-0">Join Our Community</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Whether you're a long-time believer or just beginning your faith journey, Daily Light is here 
              for you. Share your prayer requests, explore our archive of devotionals, and let God's Word 
              transform your life one day at a time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Read Today's Verse
              </Link>
              <Link
                to="/prayer-request"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border bg-card text-foreground rounded-full font-medium hover:bg-secondary transition-colors"
              >
                Submit a Prayer Request
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
