import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquare, Camera } from 'lucide-react';
import { REVIEWS } from '../data/servicesData';
import { CustomerReview } from '../types/service';

type ReviewWithImg = CustomerReview & { projectImage?: string };

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<ReviewWithImg[]>(REVIEWS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('Austin, TX');
  const [newService, setNewService] = useState('Plumbing');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newRev: ReviewWithImg = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      city: newCity,
      service: newService,
      rating: newRating,
      date: 'Just now',
      comment: newComment,
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setShowAddForm(false);
    setNewAuthor('');
    setNewComment('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="reviews" className="py-14 sm:py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold text-[#219EBC] uppercase tracking-wider mb-2">
              Verified Feedback
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#023047] tracking-tight">
              Real Experiences from Real Homeowners
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Every review comes from a customer who booked and completed a service with our vetted technicians, with verified job photos.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2.5 text-xs font-bold text-[#023047] bg-[#8ECAE6]/25 hover:bg-[#8ECAE6]/40 rounded-xl transition-colors self-start md:self-auto flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#219EBC]" />
            <span>{showAddForm ? 'Close Form' : 'Write a Review'}</span>
          </button>
        </div>

        {/* Success toast */}
        {submitted && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Thank you! Your verified review has been published.</span>
          </div>
        )}

        {/* Add Review Inline Form */}
        {showAddForm && (
          <form onSubmit={handleAddReview} className="mb-8 p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="text-sm font-extrabold text-[#023047]">Share Your Experience</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1">Your Name</label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Rachel Adams"
                  required
                  className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1">Service Used</label>
                <input
                  type="text"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  placeholder="e.g. Electrical / AC"
                  required
                  className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1">Rating</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
                >
                  <option value={5}>5 Stars - Excellent</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Average</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">Your Review</label>
              <textarea
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="How was the technician's punctuality, craft, and cleanup?"
                required
                className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-[#023047] text-white rounded-lg hover:bg-[#219EBC]"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}

        {/* Reviews Grid with Real Completed Work Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="group rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-[#219EBC]/60 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Completed Project Photograph */}
                {rev.projectImage && (
                  <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                    <img
                      src={rev.projectImage}
                      alt={rev.service}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-[#023047]/85 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Camera className="w-3 h-3 text-[#FFB703]" />
                      <span>Verified Result</span>
                    </div>
                  </div>
                )}

                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-[#FFB703]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {rev.date}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    "{rev.comment}"
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0">
                <div className="pt-3 border-t border-slate-200/70">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold text-[#023047]">
                        {rev.author}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {rev.city}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified Job
                    </span>
                  </div>
                  <div className="text-[10px] text-[#219EBC] font-bold mt-1.5 truncate">
                    {rev.service}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
