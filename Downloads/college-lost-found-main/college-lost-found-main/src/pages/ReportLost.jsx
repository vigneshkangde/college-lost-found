import React, { useState } from 'react';
import {
  AlertCircle,
  Upload,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { useItems } from '../context/ItemContext';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data/mockData';
import Button from '../components/Button';

export default function ReportLost() {
  const { addItem, currentUser } = useItems();

  const [formData, setFormData] = useState(() => ({
    title: '',
    category: 'electronics',
    location: CAMPUS_LOCATIONS[0],
    customLocationDetails: '',
    date: new Date().toISOString().split('T')[0],
    time: '2:00 PM',
    description: '',
    distinctiveMarks: '',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    contactEmail: currentUser?.email || 'alex.smith@college.edu',
    studentId: currentUser?.studentId || 'ST-2024-8841',
    agreedToHonorCode: false
  }));

  const [imagePreview, setImagePreview] = useState(formData.imageUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
const [submitError, setSubmitError] = useState('');

  const sampleImages = [
    { label: 'AirPods / Earbuds', url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80' },
    { label: 'Student ID / Card', url: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?auto=format&fit=crop&w=800&q=80' },
    { label: 'Backpack', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80' },
    { label: 'Scientific Calculator', url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80' },
    { label: 'Water Bottle', url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80' },
    { label: 'Keys', url: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
e.preventDefault();

if (!formData.title.trim() || !formData.description.trim()) return;

setIsSubmitting(true);
setSubmitError('');

const categoryObj = CATEGORIES.find((c) => c.id === formData.category);
const fullLocation = formData.customLocationDetails
  ? `${formData.location} (${formData.customLocationDetails})`
  : formData.location;

try {
  if (!isSupabaseConfigured || !supabase) {
    addItem({
      id: `item-local-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'lost',
      type: 'lost',
      title: formData.title.trim(),
      category: formData.category,
      categoryName: categoryObj?.name || 'Other',
      location: fullLocation,
      date: formData.date || new Date().toISOString().split('T')[0],
      time: formData.time,
      description: [
        formData.description.trim(),
        formData.distinctiveMarks.trim()
          ? `Distinctive marks: ${formData.distinctiveMarks.trim()}`
          : ''
      ].filter(Boolean).join('\n\n'),
      imageUrl: imagePreview?.startsWith('http') ? imagePreview : null,
      contactEmail: formData.contactEmail.trim(),
      reporterName: currentUser?.name || 'Campus Student',
      studentId: formData.studentId,
      distinctiveMarks: formData.distinctiveMarks,
      storageLocation: null,
      matchedWith: []
    });

    setIsSuccess(true);
    return;
  }

  const { data, error } = await supabase
    .from('items')
    .insert({
      title: formData.title.trim(),
      description: [
        formData.description.trim(),
        formData.distinctiveMarks.trim()
          ? `Distinctive marks: ${formData.distinctiveMarks.trim()}`
          : ''
      ].filter(Boolean).join('\n\n'),
      item_type: 'lost',
      category: formData.category,
      location: fullLocation,
      item_date: formData.date || null,
      image_url: imagePreview?.startsWith('http') ? imagePreview : null,
      contact_name: currentUser?.name || 'Campus Student',
      contact_email: formData.contactEmail.trim(),
      status: 'open'
    })
    .select()
    .single();

  if (error) throw error;

  addItem({
    id: data.id,
    createdAt: data.created_at,
    status: data.status,
    type: data.item_type,
    title: data.title,
    category: data.category,
    categoryName: categoryObj?.name || 'Other',
    location: data.location,
    date: data.item_date,
    description: data.description,
    imageUrl: data.image_url,
    contactEmail: data.contact_email,
    reporterName: data.contact_name,
    studentId: formData.studentId,
    distinctiveMarks: formData.distinctiveMarks,
    storageLocation: null
  });

  setIsSuccess(true);
} catch (error) {
  console.error('Supabase report error:', error.message);
  setSubmitError(error.message || 'Something went wrong.');
} finally {
  setIsSubmitting(false);
}
  };



  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-lg text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Lost Item Report Published!</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Your lost item has been registered in the campus directory. When a student or security officer reports a matching item, you will see a match suggestion.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
          <Button to="/my-reports" variant="primary" size="md">
            View in My Reports
          </Button>
          <Button to="/browse" variant="outline" size="md">
            Browse All Items
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 max-w-3xl">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold mb-2">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Student Lost Item Log</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Report a Lost Item
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Provide detailed information so fellow students or campus facility staff can identify and return your belonging.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        {submitError && (
  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
    Failed to publish report: {submitError}
  </p>
)}
        {/* Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Item Name / Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g. Black AirPods Pro in Silicone Case"
            className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Category & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full text-sm p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Campus Location Last Seen <span className="text-rose-500">*</span>
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full text-sm p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {CAMPUS_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Specific Room / Spot */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Specific Room / Desk / Spot (Optional)
          </label>
          <input
            type="text"
            name="customLocationDetails"
            value={formData.customLocationDetails}
            onChange={handleInputChange}
            placeholder="e.g. Desk 12 near the window, 2nd floor silent room"
            className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Date Lost <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleInputChange}
              className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Approximate Time
            </label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              placeholder="e.g. 2:30 PM - 3:00 PM"
              className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Item Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide color, brand, condition, and contents of the item..."
            className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Distinctive Marks (crucial for ownership matching) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Distinctive Marks & Identifiers
          </label>
          <p className="text-xs text-slate-500 mb-1.5">
            Stickers, scratches, initials, serial codes, or wallpapers that prove you own this item.
          </p>
          <input
            type="text"
            name="distinctiveMarks"
            value={formData.distinctiveMarks}
            onChange={handleInputChange}
            placeholder="e.g. NASA sticker on front, small blue keychain, initials S.M."
            className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Image Attachment & Sample Presets */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Item Photo / Reference Image
          </label>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
            <div className="w-24 h-24 rounded-lg bg-slate-200 overflow-hidden shrink-0 border border-slate-300">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <ImageIcon className="w-8 h-8" />
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2 text-xs">
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold shadow-xs">
                <Upload className="w-4 h-4" />
                <span>Upload From Device</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </label>
              <p className="text-[11px] text-slate-500">
                Or select a realistic sample preset:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {sampleImages.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => {
                      setImagePreview(s.url);
                      setFormData((prev) => ({ ...prev, imageUrl: s.url }));
                    }}
                    className="px-2 py-1 text-[11px] rounded bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Contact Student Email
            </label>
            <input
              type="email"
              name="contactEmail"
              required
              value={formData.contactEmail}
              onChange={handleInputChange}
              className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Student ID Card Number
            </label>
            <input
              type="text"
              name="studentId"
              required
              value={formData.studentId}
              onChange={handleInputChange}
              className="w-full text-sm p-3 rounded-xl border border-slate-300 font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Honor Code Declaration */}
        <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer text-xs text-slate-700">
          <input
            type="checkbox"
            required
            name="agreedToHonorCode"
            checked={formData.agreedToHonorCode}
            onChange={handleInputChange}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mt-0.5"
          />
          <span className="text-[11px] leading-relaxed">
            I confirm that this report is genuine and adheres to the University Academic and Student Conduct Honor Code.
          </span>
        </label>

        {/* Actions */}
        <div className="pt-4 flex items-center justify-end gap-3">
          <Button to="/browse" variant="ghost" size="md">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="lost"
            size="md"
            disabled={!formData.agreedToHonorCode || isSubmitting}
            icon={AlertCircle}
          >
            {isSubmitting ? 'Publishing Report...' : 'Publish Lost Report'}
          </Button>
        </div>
      </form>
    </div>
  );
}
