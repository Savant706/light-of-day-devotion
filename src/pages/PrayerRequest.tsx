import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useSubmitPrayerRequest } from "@/hooks/usePrayerRequests";
import { Heart, Send, CheckCircle } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const prayerRequestSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters").optional().or(z.literal("")),
  prayer_request: z.string().trim().min(10, "Prayer request must be at least 10 characters").max(2000, "Prayer request must be less than 2000 characters"),
  is_anonymous: z.boolean().default(false),
});

const PrayerRequest = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    prayer_request: "",
    is_anonymous: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submitMutation = useSubmitPrayerRequest();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validated = prayerRequestSchema.parse(formData);
      
      await submitMutation.mutateAsync({
        name: validated.is_anonymous ? "Anonymous" : validated.name,
        email: validated.email || undefined,
        prayer_request: validated.prayer_request,
        is_anonymous: validated.is_anonymous,
      });

      setSubmitted(true);
      toast.success("Prayer request submitted successfully");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        toast.error("Failed to submit prayer request. Please try again.");
      }
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="page-container py-16 md:py-24">
          <div className="max-w-xl mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Prayer Request Received
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for sharing your heart with us. We will be lifting you up in prayer.
            </p>
            <blockquote className="text-muted-foreground italic border-l-4 border-accent pl-4 text-left">
              "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."
              <footer className="mt-2 text-accent not-italic">— Philippians 4:6</footer>
            </blockquote>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", prayer_request: "", is_anonymous: false });
              }}
              className="mt-8 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="hero-gradient py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-3">
            Submit a Prayer Request
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Share your prayer needs with us. We believe in the power of prayer and are honored to pray for you.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="page-container max-w-2xl">
        <div className="verse-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Your Name {!formData.is_anonymous && <span className="text-destructive">*</span>}
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={formData.is_anonymous}
                className="form-input disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your name"
              />
              {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email (optional)
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
                placeholder="your@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
            </div>

            {/* Prayer Request */}
            <div>
              <label htmlFor="prayer_request" className="block text-sm font-medium text-foreground mb-2">
                Prayer Request <span className="text-destructive">*</span>
              </label>
              <textarea
                id="prayer_request"
                value={formData.prayer_request}
                onChange={(e) => setFormData({ ...formData, prayer_request: e.target.value })}
                rows={6}
                className="form-input resize-none"
                placeholder="Share your prayer request here..."
              />
              {errors.prayer_request && (
                <p className="mt-1 text-sm text-destructive">{errors.prayer_request}</p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                {formData.prayer_request.length}/2000 characters
              </p>
            </div>

            {/* Anonymous Toggle */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_anonymous"
                checked={formData.is_anonymous}
                onChange={(e) =>
                  setFormData({ ...formData, is_anonymous: e.target.checked })
                }
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="is_anonymous" className="text-sm text-muted-foreground">
                Submit anonymously
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitMutation.isPending ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Prayer Request
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default PrayerRequest;
