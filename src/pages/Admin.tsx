import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useVerseArchive, useCreateVerse, useUpdateVerse, useDeleteVerse, DailyVerse } from "@/hooks/useVerses";
import { Lock, Plus, Edit2, Trash2, LogOut, Save, X } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = isSignUp
      ? await signUp(email, password)
      : await signIn(email, password);

    if (error) {
      toast.error(error.message);
    } else if (isSignUp) {
      toast.success("Account created! Please contact an administrator to get admin access.");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <section className="page-container max-w-md py-16 md:py-24">
        <div className="verse-card">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Lock className="h-5 w-5 text-primary" />
            <h1 className="font-serif text-2xl text-foreground">Admin Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary hover:underline"
            >
              {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
            </button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground text-center">
            Note: After signing up, an existing admin must grant you admin privileges.
          </p>
        </div>
      </section>
    </Layout>
  );
};

const VerseForm = ({
  verse,
  onSave,
  onCancel,
  isPending,
}: {
  verse?: DailyVerse;
  onSave: (data: Omit<DailyVerse, "id" | "created_at" | "updated_at">) => void;
  onCancel: () => void;
  isPending: boolean;
}) => {
  const [formData, setFormData] = useState({
    date: verse?.date || new Date().toISOString().split("T")[0],
    verse_reference: verse?.verse_reference || "",
    verse_text: verse?.verse_text || "",
    devotional: verse?.devotional || "",
    prayer: verse?.prayer || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="form-input"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Verse Reference</label>
          <input
            type="text"
            value={formData.verse_reference}
            onChange={(e) => setFormData({ ...formData, verse_reference: e.target.value })}
            className="form-input"
            placeholder="e.g., John 3:16"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Verse Text</label>
        <textarea
          value={formData.verse_text}
          onChange={(e) => setFormData({ ...formData, verse_text: e.target.value })}
          className="form-input resize-none"
          rows={3}
          placeholder="Enter the scripture text..."
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Devotional</label>
        <textarea
          value={formData.devotional}
          onChange={(e) => setFormData({ ...formData, devotional: e.target.value })}
          className="form-input resize-none"
          rows={5}
          placeholder="Write the devotional reflection..."
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Prayer</label>
        <textarea
          value={formData.prayer}
          onChange={(e) => setFormData({ ...formData, prayer: e.target.value })}
          className="form-input resize-none"
          rows={3}
          placeholder="Write a prayer..."
          required
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {isPending ? "Saving..." : "Save Verse"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-border rounded-xl font-medium hover:bg-secondary transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
};

const AdminDashboard = () => {
  const { signOut, user } = useAuth();
  const { data: verses, isLoading } = useVerseArchive();
  const createVerse = useCreateVerse();
  const updateVerse = useUpdateVerse();
  const deleteVerse = useDeleteVerse();

  const [showForm, setShowForm] = useState(false);
  const [editingVerse, setEditingVerse] = useState<DailyVerse | null>(null);

  const handleCreate = async (data: Omit<DailyVerse, "id" | "created_at" | "updated_at">) => {
    try {
      await createVerse.mutateAsync(data);
      toast.success("Verse created successfully");
      setShowForm(false);
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Failed to create verse");
    }
  };

  const handleUpdate = async (data: Omit<DailyVerse, "id" | "created_at" | "updated_at">) => {
    if (!editingVerse) return;
    try {
      await updateVerse.mutateAsync({ id: editingVerse.id, ...data });
      toast.success("Verse updated successfully");
      setEditingVerse(null);
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Failed to update verse");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this verse?")) return;
    try {
      await deleteVerse.mutateAsync(id);
      toast.success("Verse deleted successfully");
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Failed to delete verse");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
  };

  return (
    <Layout>
      <section className="page-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-foreground mb-1">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Logged in as {user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        {/* Add New Verse Button */}
        {!showForm && !editingVerse && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add New Verse
          </button>
        )}

        {/* Create Form */}
        {showForm && (
          <div className="verse-card mb-6">
            <h2 className="font-serif text-xl text-foreground mb-4">Add New Verse</h2>
            <VerseForm
              onSave={handleCreate}
              onCancel={() => setShowForm(false)}
              isPending={createVerse.isPending}
            />
          </div>
        )}

        {/* Edit Form */}
        {editingVerse && (
          <div className="verse-card mb-6">
            <h2 className="font-serif text-xl text-foreground mb-4">Edit Verse</h2>
            <VerseForm
              verse={editingVerse}
              onSave={handleUpdate}
              onCancel={() => setEditingVerse(null)}
              isPending={updateVerse.isPending}
            />
          </div>
        )}

        {/* Verses List */}
        <div className="verse-card">
          <h2 className="font-serif text-xl text-foreground mb-4">All Verses</h2>
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-muted rounded" />
              ))}
            </div>
          ) : verses && verses.length > 0 ? (
            <div className="divide-y divide-border">
              {verses.map((verse) => (
                <div key={verse.id} className="py-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground">
                        {format(new Date(verse.date), "MMM d, yyyy")}
                      </span>
                      <span className="text-sm text-accent">{verse.verse_reference}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {verse.verse_text}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingVerse(verse)}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Edit verse"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(verse.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Delete verse"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No verses yet. Click "Add New Verse" to create one.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
};

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <section className="page-container py-16 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </section>
      </Layout>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  if (!isAdmin) {
    return (
      <Layout>
        <section className="page-container max-w-md py-16 md:py-24">
          <div className="verse-card text-center">
            <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="font-serif text-2xl text-foreground mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-4">
              You don't have admin privileges. Please contact an administrator to get access.
            </p>
            <p className="text-sm text-muted-foreground">
              Logged in as: {user.email}
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  return <AdminDashboard />;
};

export default Admin;
