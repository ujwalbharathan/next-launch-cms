import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
    branding: {
        logo: { type: String, default: '/logo.png' },
        name: { type: String, default: 'Reppoo' },
        description: { type: String, default: 'innovative health assistant app that leverages artificial intelligence to provide personalized wellness recommendations.' },
        email: { type: String, default: 'hello@reppoo.com' },
        social: {
            x: { type: String, default: 'https://twitter.com' },
            facebook: { type: String, default: 'https://facebook.com' },
            instagram: { type: String, default: 'https://instagram.com' },
            linkedin: { type: String, default: 'https://linkedin.com' },
        },
        download: {
            appStoreUrl: { type: String, default: '#' },
            playStoreUrl: { type: String, default: '#' },
        },
    },
    hero: {
        title: { type: String, default: 'Your AI Health Coach' },
        subtitle: { type: String, default: 'Transform your wellness journey with personalized AI-powered guidance that adapts to your unique needs.' },
        backgroundImage: { type: String, default: '/Hero_image.png' },
        happyUsers: {
            enabled: { type: Boolean, default: true },
            count: { type: Number, default: 59182 },
            avatars: [{
                name: { type: String, default: '' },
                url: { type: String, default: '' },
            }],
        },
        downloadButtons: {
            ios: {
                enabled: { type: Boolean, default: true },
            },
            android: {
                enabled: { type: Boolean, default: true },
            },
        },
    },
    about: {
        heading: { type: String, default: 'Maximizing Your Health Potential Together' },
        subheading: { type: String, default: 'Smart Nutrition Planning' },
        paragraph: { type: String, default: 'Your AI-powered health companion transforms the way you approach wellness, making healthy living effortless and personalized' },
        imageUrl: { type: String, default: '/about.png' },
        readMoreUrl: { type: String, default: '#' },
        readMoreEnabled: { type: Boolean, default: false },
    },
    clients: [{
        name: { type: String, default: '' },
        logo: { type: String, default: '' },
    }],
    testimonials: [{
        name: { type: String, default: '' },
        role: { type: String, default: '' },
        text: { type: String, default: '' },
    }],
    testimonialsSection: {
        heading: { type: String, default: 'Our Users Feel the Transformation' },
        subheading: { type: String, default: 'Real Stories from People Empowered by Personalized Wellness' },
    },
    faqs: [{
        question: { type: String, default: '' },
        answer: { type: String, default: '' },
    }],
    faqsSection: {
        heading: { type: String, default: 'Frequently Asked Questions' },
        subheading: { type: String, default: 'Get answers to common questions about our AI health assistant app' },
    },
    offer: {
        header: { type: String, default: 'Special Launch offer' },
        subheader: { type: String, default: 'Your journey to better health starts now' },
        offer: { type: String, default: 'Get 50% off your first 3 months when you start your trial today!' },
        downloadButton: {
            enabled: { type: Boolean, default: false },
        },
    },
    footer: {
        copyright: { type: String, default: '© Copyright Reppoo' },
        social: {
            facebook: { type: Boolean, default: false },
            twitter: { type: Boolean, default: false },
            instagram: { type: Boolean, default: false },
            linkedin: { type: Boolean, default: false },
        },
        navigations: [{
            title: { type: String, default: '' },
            pages: [{
                name: { type: String, default: '' },
                url: { type: String, default: '' },
            }],
        }],
    },
    updatedAt: { type: Date, default: Date.now },
}, { strict: false });

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);
