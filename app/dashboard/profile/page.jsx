"use client";
import { useEffect, useState } from "react";
import { Button, Avatar } from "@heroui/react"; // Cleaned up lowercase 'avatar' import
import { BLOOD_GROUPS, DISTRICTS, UPAZILAS } from "@/lib/mockData";
import { getUser, userUpdate } from "@/lib/api/user/user";
import { CustomSelect } from "@/components/CustomSelect";
import toast from "react-hot-toast";

const Field = ({ label, children }) => (
  <div>
    <label className="form-label">{label}</label>
    {children}
  </div>
);

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    id: "", 
    name: "",
    avatar: "",
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  useEffect(() => {
    async function session() {
      const session = await getUser();
      if (session?.user) {
        setUser(session.user);
        setForm(session.user);
      }
    }
    session();
  }, []);

  const upazilas = form.district ? (UPAZILAS[form.district] || []) : [];
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const updateData = {
      name: form.name,
      bloodGroup: form.bloodGroup,
      district: form.district,
      upazila: form.upazila,
    };

    const targetId = form.id || form._id; 

    try {
      const data = await userUpdate(targetId, updateData, "updateProfile");
      
      if (data?.message?.modifiedCount > 0) {
        toast.success("Profile updated successfully!");
        
        const updatedUser = { 
          ...user, 
          ...updateData 
        };
        
        setUser(updatedUser);
        setForm(updatedUser);
        setSaved(true);
        setEditing(false);
        setTimeout(() => setSaved(false), 3000);
      } else {
        toast.error("No changes made or user not found.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(user); 
    setEditing(false);
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-charcoal">My Profile</h1>
          <p className="text-sm text-ash mt-1">Manage your personal information</p>
        </div>
        {!editing && (
          <Button
            onPress={() => setEditing(true)}
            variant="bordered"
            className="border-border text-slate font-medium rounded-xl"
          >
            Edit Profile
          </Button>
        )}
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
          ✓ Profile updated successfully!
        </div>
      )}

      {/* Avatar section */}
      <div className="bg-white border border-border rounded-2xl p-6 flex items-center gap-6">
        <Avatar
          src={form.avatar}
          name={form.name}
          className="w-20 h-20 text-2xl"
          isBordered
          color="primary"
        />
        <div>
          <p className="font-semibold text-charcoal text-lg">{form.name}</p>
          <p className="text-sm text-ash">{user?.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-mono text-xs font-semibold text-wine bg-wine/8 px-2 py-0.5 rounded-lg">
              {form.bloodGroup}
            </span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg capitalize
              ${user?.status === "active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {user?.status}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-parchment text-slate capitalize">
              {user?.userRole}
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className={`bg-white border ${editing ? "border-black/20" : "border-border"} rounded-2xl p-6`}>
        <form onSubmit={handleSave} className="space-y-5">
          <Field label="Full Name">
            <input
              className="form-input"
              value={form.name || ""}
              readOnly={!editing}
              onChange={(e) => update("name", e.target.value)}
              required
            />
          </Field>

          <Field label="Email Address">
            <input
              type="email"
              className="form-input"
              value={user?.email || ""}
              readOnly
            />
          </Field>

          <Field label="Blood Group">
            <CustomSelect
              options={BLOOD_GROUPS}
              placeholder={'Select Your Blood Group'}
              className="form-input"
              value={form.bloodGroup}
              disable={!editing}
              onChange={(val) => update("bloodGroup", val)}
              required
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="District">
              <CustomSelect
                options={DISTRICTS}
                className="form-input"
                value={form.district}
                disable={!editing}
                onChange={(val) => { update("district", val); update("upazila", ""); }}
                required
              />
            </Field>
            <Field label="Upazila">
              <CustomSelect
                placeholder={"Select Your Upazila"}
                options={upazilas}
                className="form-input"
                value={form.upazila}
                disable={!editing}
                onChange={(val) => update("upazila", val)}
                required
              />
            </Field>
          </div>

          {editing && (
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                isLoading={saving}
                className="bg-wine text-white font-semibold rounded-xl px-6 hover:bg-wine-dark"
              >
                Save Changes
              </Button>
              <Button
                type="button"
                variant="bordered"
                className="border-border text-slate rounded-xl"
                onPress={handleCancel}
              >
                Cancel
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}