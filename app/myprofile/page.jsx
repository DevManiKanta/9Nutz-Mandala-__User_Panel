
import React, { useEffect, useState, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Lock,
  X,
  Edit3 as EditIcon,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { Login_API_BASE } from "@/lib/api";
import apiAxios from "@/lib/api";
import { useDispatch } from "react-redux";
export default function ProfilePage({ initialUser = null, initialOrders = [] }) {
  // user state (editable)
  const [user, setUser] = useState(
    initialUser || {
      id: null,
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "",
      address: "", // single-line address
      createdAt: new Date().toISOString(),
    }
  );

  const [userOrders] = useState(initialOrders);

  // Edit Details modal state
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "", // NEW: optional password field
  });
  const [formError, setFormError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // password visibility toggle state
  const [showPassword, setShowPassword] = useState(false);

  // focus + trigger refs
  const modalRef = useRef(null);
  const triggerRef = useRef(null);

  // utility to get token (adjust if your key differs)
  const getToken = () => localStorage.getItem("token") || "";

  // --- Fetch profile on mount ---
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 const fetchProfile = async () => {
  const token = getToken();
  if (!token) {
    toast.error("Not logged in — token missing.");
    return;
  }

  setIsFetching(true);
  const loadingId = toast.loading("Loading profile...");

  try {
    const res = await apiAxios.get(`/admin/profile`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data;

    // Expecting { status: true, profile: [ { ... } ] }
    if (!data || !data.status || !Array.isArray(data.profile) || data.profile.length === 0) {
      const msg = "Profile not found.";
      toast.error(msg);
      throw new Error(msg);
    }

    const p = data.profile[0];

    const normalized = {
      id: p.id ?? null,
      name: p.name ?? "",
      email: p.email ?? "",
      phone: p.contact ? String(p.contact) : p.contact ?? "",
      address: p.address ?? "",
      createdAt: p.created_at ?? p.createdAt ?? new Date().toISOString(),
    };

    setUser((prev) => ({ ...prev, ...normalized }));

    // update localStorage user if present
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const u = JSON.parse(raw);
        localStorage.setItem("user", JSON.stringify({ ...u, ...normalized }));
      }
    } catch {
      // ignore localStorage errors
    }

    toast.dismiss(loadingId);
    // toast.success("Profile loaded");
  } catch (err) {
    toast.dismiss();
    const msg =
      err.response?.data?.message ||
      err.message ||
      "Failed to fetch profile.";
    toast.error(msg);
  } finally {
    setIsFetching(false);
  }
};

  // prevent background scroll when modal open
  useEffect(() => {
    if (showDetailsModal) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [showDetailsModal]);

  // Prefill form when modal opens and manage keyboard close / focus restoration
  useEffect(() => {
    if (showDetailsModal) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        password: "", // don't prefill password
      });

      setShowPassword(false);

      // focus first input after render
      const t = setTimeout(() => {
        const input = modalRef.current?.querySelector("input[name='name']");
        if (input) {
          input.focus();
          input.select?.();
        }
      }, 0);

      const onKey = (e) => {
        if (e.key === "Escape") setShowDetailsModal(false);
      };
      document.addEventListener("keydown", onKey);
      return () => {
        clearTimeout(t);
        document.removeEventListener("keydown", onKey);
      };
    } else {
      // restore focus to trigger
      triggerRef.current?.focus();
    }
  }, [showDetailsModal, user]);

  // Validators
  const validators = {
    name: (v) => {
      if (!v || !v.trim()) return "Name is required.";
      if (v.trim().length < 2) return "Please enter at least 2 characters for name.";
      return "";
    },
    email: (v) => {
      if (!v || !v.trim()) return "Email is required.";
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(v.trim())) return "Enter a valid email address.";
      return "";
    },
    phone: (v) => {
      if (!v || !String(v).trim()) return "Phone is required.";
      const digits = String(v).replace(/\D/g, "");
      if (digits.length < 10) return "Phone must be at least 10 digits.";
      if (digits.length > 15) return "Phone must not exceed 15 digits.";
      return "";
    },
    address: (v) => {
      if (!v || !v.trim()) return "Address is required.";
      if (v.trim().length < 5) return "Address looks too short.";
      return "";
    },
    // Password validation: apply only if provided (optional)
    password: (v) => {
      if (!v) return ""; // optional field
      if (v.length < 8) return "Password must be at least 8 characters.";
      if (!/[0-9]/.test(v)) return "Password must contain at least one digit.";
      return "";
    },
  };

  const validateForm = () => {
    const fields = ["name", "email", "phone", "address"];
    for (const f of fields) {
      const err = validators[f](form[f]);
      if (err) return err;
    }
    // password optional — if present validate
    const pwErr = validators.password(form.password);
    if (pwErr) return pwErr;
    return "";
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (formError) setFormError("");
  };


 const handleSubmitDetails = async (e) => {
  e?.preventDefault();

  const err = validateForm();
  if (err) {
    setFormError(err);
    toast.error(err);
    return;
  }

  const token = getToken();
  if (!token) {
    toast.error("Session expired — please login again.");
    return;
  }

  setIsUpdating(true);
  const loadingId = toast.loading("Updating profile...");
  setFormError("");

  try {
    // Build FormData
    const fd = new FormData();
    fd.append("name", form.name.trim());
    fd.append("email", form.email.trim());
    fd.append("contact", String(form.phone).trim());
    fd.append("phone", String(form.phone).trim());
    fd.append("address", form.address.trim());

    if (form.password && String(form.password).trim().length > 0) {
      fd.append("password", String(form.password));
    }

    // Axios POST — note: don't set Content-Type for FormData
    const res = await apiAxios.post(`/admin/profile/update`, fd, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data;

    if (!data || data.status === false) {
      const msg = data?.message || data?.error || "Update failed.";
      toast.error(msg);
      throw new Error(msg);
    }

    // Handle various response shapes (profile array, profile object, or user object)
    let updatedUser = { ...user };
    if (Array.isArray(data.profile) && data.profile.length > 0) {
      const p = data.profile[0];
      updatedUser = {
        ...updatedUser,
        id: p.id ?? updatedUser.id,
        name: p.name ?? updatedUser.name,
        email: p.email ?? updatedUser.email,
        phone: p.contact ? String(p.contact) : p.contact ?? updatedUser.phone,
        address: p.address ?? updatedUser.address,
        createdAt: p.created_at ?? p.createdAt ?? updatedUser.createdAt,
      };
    } else if (data.profile && typeof data.profile === "object") {
      const p = data.profile;
      updatedUser = {
        ...updatedUser,
        id: p.id ?? updatedUser.id,
        name: p.name ?? updatedUser.name,
        email: p.email ?? updatedUser.email,
        phone: p.contact ? String(p.contact) : p.contact ?? updatedUser.phone,
        address: p.address ?? updatedUser.address,
        createdAt: p.created_at ?? p.createdAt ?? updatedUser.createdAt,
      };
    } else if (data.user && typeof data.user === "object") {
      const p = data.user;
      updatedUser = {
        ...updatedUser,
        id: p.id ?? updatedUser.id,
        name: p.name ?? updatedUser.name,
        email: p.email ?? updatedUser.email,
        phone: p.contact ? String(p.contact) : p.contact ?? updatedUser.phone,
        address: p.address ?? updatedUser.address,
        createdAt: p.created_at ?? p.createdAt ?? updatedUser.createdAt,
      };
    } else {
      // fallback: use form values
      updatedUser = {
        ...updatedUser,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: String(form.phone).trim(),
        address: form.address.trim(),
      };
    }

    // Update state and localStorage
    setUser(updatedUser);
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const u = JSON.parse(raw);
        localStorage.setItem("user", JSON.stringify({ ...u, ...updatedUser }));
      }
    } catch {
      // ignore localStorage error
    }

    toast.dismiss(loadingId);
    // toast.success("Profile updated successfully");
    setShowDetailsModal(false);
  } catch (err) {
    toast.dismiss();
    const msg =
      err.response?.data?.message || err.message || "Failed to update profile.";
    if (!toast.isActive?.(msg)) {
      toast.error(msg);
    }
    setFormError(msg);
  } finally {
    setIsUpdating(false);
  }
};
  const displayName = user?.name || user?.fullName || user?.username || "User";

  return (
    <div className="space-y-8">
      {/* Top: Personal Details + Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Info */}
        <div className="lg:col-span-2 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="h-5 w-5" /> Personal Details
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="p-4 bg-white rounded-lg border flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase text-gray-500">Name</div>
                <div className="mt-1 font-medium text-gray-900">{displayName}</div>
              </div>
            </div>

            {/* Email */}
            <div className="p-4 bg-white rounded-lg border">
              <div className="text-xs uppercase text-gray-500">Email</div>
              <div className="mt-1 font-medium text-gray-900 flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                {user?.email ?? "—"}
              </div>
            </div>

            {/* Phone */}
            <div className="p-4 bg-white rounded-lg border flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase text-gray-500">Phone</div>
                <div className="mt-1 font-medium text-gray-900 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" /> {user?.phone || "—"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Details card */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5" /> Edit Details
          </h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setShowDetailsModal(true)}
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-lg transition-colors border"
              >
                <EditIcon className="h-4 w-4" />
                Edit Details
              </button>
            </div>
            {isFetching && <div className="text-sm text-gray-500">Loading profile…</div>}
          </div>
        </div>
      </div>

      {/* Unified Edit Details Modal */}
      {showDetailsModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          aria-hidden={!showDetailsModal}
        >
          {/* Backdrop - z lower than modal */}
          <div
            className="fixed inset-0 bg-black/40 z-[9998]"
            aria-hidden="true"
            onClick={() => setShowDetailsModal(false)}
          />

          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-details-title"
            className="relative z-[9999] w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 id="edit-details-title" className="text-lg font-semibold">
                Edit Details
              </h4>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setShowDetailsModal(false)}
                className="rounded-md p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmitDetails} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formError && validators.name(form.name) ? "border-red-400" : "border-gray-300"
                  }`}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formError && validators.email(form.email) ? "border-red-400" : "border-gray-300"
                  }`}
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formError && validators.phone(form.phone) ? "border-red-400" : "border-gray-300"
                  }`}
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className={`w-full border rounded-lg px-3 py-2 h-24 resize-y focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formError && validators.address(form.address) ? "border-red-400" : "border-gray-300"
                  }`}
                  required
                />
              </div>

              {/* NEW: Password (optional) */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter new password (leave blank to keep current)"
                    className={`w-full border rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formError && validators.password(form.password) ? "border-red-400" : "border-gray-300"
                    }`}
                    aria-describedby={formError && validators.password(form.password) ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-600" /> : <Eye className="h-5 w-5 text-gray-600" />}
                  </button>
                </div>
                {formError && validators.password(form.password) && (
                  <p id="password-error" className="text-xs text-red-600 mt-1">
                    {validators.password(form.password)}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters and include a digit (only required if you enter a new password).</p>
              </div>

              {/* Error */}
              {formError && !validators.password(form.password) && (
                <p className="text-xs text-red-600" role="alert">
                  {formError}
                </p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60"
                >
                  {isUpdating ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

