import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const CONTACT_LOCK_KEY = 'contact-submit-timestamp';

const Contact = () => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);

  useEffect(() => {
    emailjs.init('yf6tNTXif_DwJ32k-');
    const lastSubmit = localStorage.getItem(CONTACT_LOCK_KEY);
    if (lastSubmit && Date.now() - Number(lastSubmit) < 24 * 60 * 60 * 1000) {
      setIsCooldown(true);
    }
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'mhdameent2006@gmail.com',
      href: 'mailto:mhdameent2006@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9946276759',
      href: 'tel:+919946276759',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kerala, India',
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/muhammed-ameen-t',
      color: 'hover:text-[#0077B5]',
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Muhammed-Ameen-T',
      color: 'hover:text-foreground',
    },
    {
      icon: Code2,
      label: 'LeetCode',
      href: 'https://leetcode.com/u/mhdAmeenT',
      color: 'hover:text-[#FFA116]',
    },
  ];

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: undefined,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const lastSubmit = localStorage.getItem(CONTACT_LOCK_KEY);
    if (lastSubmit && Date.now() - Number(lastSubmit) < 24 * 60 * 60 * 1000) {
      setIsCooldown(true);
      return;
    }

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      await emailjs.send(
        'service_8xj0gc3',
        'template_i29d6kv',
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: new Date().toLocaleString()
        }
      );
      toast({
        title: 'Message Sent!',
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setIsCooldown(true);
      localStorage.setItem(CONTACT_LOCK_KEY, Date.now().toString());
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again later.',
        variant: 'destructive',
      });
      // eslint-disable-next-line no-console
      console.error('EmailJS error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's collaborate and build something amazing together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{item.label}</div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-foreground hover:text-primary transition-smooth font-medium"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-foreground font-medium">{item.value}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-primary/20 transition-smooth group ${social.color}`}
                      aria-label={social.label}
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  );
                })}
              </div>
            </div>
            {/* Decorative Element */}
            <div className="hidden lg:block">
              <div className="glass rounded-lg p-8 border-primary/30">
                <p className="text-muted-foreground italic">
                  "Always eager to learn, collaborate, and take on new challenges in the world of
                  web development."
                </p>
              </div>
            </div>
          </motion.div>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-lg p-8 space-y-5">
              {isCooldown && (
                <div className="bg-red-600/10 text-red-400 border border-red-500/20 p-4 rounded-xl mb-3 text-center font-semibold">
                  You can submit the form only once every 24 hours.
                </div>
              )}
              <div className="flex gap-2">
                <div className="w-1/2">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`bg-background/50 border-border focus:border-primary ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby="name-error"
                    disabled={submitting || isCooldown}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="w-1/2">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`bg-background/50 border-border focus:border-primary ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                    placeholder="your.email@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                    disabled={submitting || isCooldown}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`bg-background/50 border-border focus:border-primary ${errors.subject ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="Subject"
                  aria-invalid={!!errors.subject}
                  aria-describedby="subject-error"
                  disabled={submitting || isCooldown}
                />
                {errors.subject && (
                  <p id="subject-error" className="text-red-500 text-xs mt-1">{errors.subject}</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`bg-background/50 border-border focus:border-primary min-h-[150px] ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="Your message..."
                  aria-invalid={!!errors.message}
                  aria-describedby="message-error"
                  disabled={submitting || isCooldown}
                />
                {errors.message && (
                  <p id="message-error" className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>
              <Button
                type="submit"
                size="lg"
                className={`w-full bg-primary hover:bg-primary/90 text-primary-foreground glow group ${submitting ? "opacity-60 cursor-not-allowed" : ""}`}
                disabled={submitting || isCooldown}
              >
                {submitting ? (
                  <span>
                    <svg className="inline mr-2 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
