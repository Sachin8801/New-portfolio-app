import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
  projectType: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: '',
    projectType: 'consultation'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        projectType: 'consultation'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-800/60 backdrop-blur-sm rounded-lg p-8 border border-gray-600/50">
      <h3 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Start a Conversation</h3>
      
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-400/30 rounded-lg flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-green-300">Message sent successfully! I'll get back to you soon.</span>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-gradient-to-r from-red-900/30 to-pink-900/30 border border-red-400/30 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-300">Failed to send message. Please try again.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.name ? 'border-red-500' : 'border-gray-600'
              }`}
              className={`w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 ${
                errors.name ? 'border-red-400' : 'border-gray-600/50'
              }`}
              placeholder="Your full name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              }`}
              className={`w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 ${
                errors.email ? 'border-red-400' : 'border-gray-600/50'
              }`}
              placeholder="your.email@company.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
              placeholder="Your company name"
            />
          </div>

          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
              Project Type
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
            >
              <option value="consultation">Consultation</option>
              <option value="migration">Cloud Migration</option>
              <option value="automation">CI/CD Automation</option>
              <option value="monitoring">Monitoring Setup</option>
              <option value="security">Security Audit</option>
              <option value="training">Team Training</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
              errors.message ? 'border-red-500' : 'border-gray-600'
            }`}
            className={`w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 resize-none ${
              errors.message ? 'border-red-400' : 'border-gray-600/50'
            }`}
            placeholder="Tell me about your project, challenges, or questions..."
          />
          {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/25"
        >
          {isSubmitting ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
