import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Content from '@/models/Content';

// Default content structure
const getDefaultContent = () => ({
    branding: {
        logo: '/logo.png',
        name: 'Reppoo',
        description: 'innovative health assistant app that leverages artificial intelligence to provide personalized wellness recommendations.',
        email: 'hello@reppoo.com',
        social: {
            x: 'https://twitter.com',
            facebook: 'https://facebook.com',
            instagram: 'https://instagram.com',
            linkedin: 'https://linkedin.com',
        },
        download: {
            appStoreUrl: '#',
            playStoreUrl: '#',
        },
    },
    hero: {
        title: 'Your AI Health Coach',
        subtitle: 'Transform your wellness journey with personalized AI-powered guidance that adapts to your unique needs.',
        backgroundImage: '/Hero_image.png',
        happyUsers: {
            enabled: true,
            count: 59182,
            avatars: [
                { name: 'Sarah', url: '/avatar_1.png' },
                { name: 'Michael', url: '/avatar_2.png' },
                { name: 'Emma', url: '/avatar_3.png' },
            ],
        },
        downloadButtons: {
            ios: { enabled: true },
            android: { enabled: true },
        },
    },
    about: {
        heading: 'Maximizing Your Health Potential Together',
        subheading: 'Smart Nutrition Planning',
        paragraph: 'Your AI-powered health companion transforms the way you approach wellness, making healthy living effortless and personalized',
        imageUrl: '/about.png',
        readMoreUrl: '#',
        readMoreEnabled: true,
    },
    clients: [
        { name: 'logoipsum', logo: '/client_logo.png' },
        { name: 'logoipsum_1', logo: '/client_logo_1.png' },
        { name: 'logoipsum_2 ', logo: '/client_logo_2.png' },
        { name: 'logoipsum_3 ', logo: '/client_logo_3.png' },
        { name: 'logoipsum_4 ', logo: '/client_logo_4.png' },
    ],
    testimonials: [
        {
            name: 'Ava L',
            role: 'Marketing Executive',
            text: 'I’ve tried countless health apps, but none come close to this. The AI truly understands my needs it suggested daily routines and nutrition tips that actually fit my lifestyle. Within weeks, I felt more energized, slept better, and became more mindful. It’s like having a personal wellness coach in my pocket.',
        },
        {
            name: 'Namo Serlina',
            role: 'CEO Delego',
            text: 'This app has completely transformed my approach to health and wellness!',
        },
        {
            name: 'Michael Chen',
            role: 'Busy Professional',
            text: 'Finally, a health app that understands my schedule and adapts to my needs.',
        },
    ],
    testimonialsSection: {
        heading: 'Our Users Feel the Transformation',
        subheading: 'Real Stories from People Empowered by Personalized Wellness',
    },
    faqs: [
        {
            question: 'How does the AI personalization work?',
            answer: 'Our AI analyzes your health data, preferences, and goals to create a customized wellness plan just for you.',
        },
        {
            question: 'Is my data secure?',
            answer: 'Absolutely! We use enterprise-grade encryption and never share your personal information.',
        },
        {
            question: 'How accurate is the AI health tracking?',
            answer: 'Experience the future of personalized health and wellness before everyone else. Join our exclusive early access program and help shape the future of AI-powered health coaching.',
        },
    ],
    faqsSection: {
        heading: 'Frequently Asked Questions',
        subheading: 'Get answers to common questions about our AI health assistant app',
    },
    offer: {
        header: 'Special Launch offerr',
        subheader: 'Your journey to better health starts now',
        offer: 'Get 50% off your first 3 months when you start your trial today!',
        downloadButton: {
            enabled: true,
        },
    },
    footer: {
        copyright: '© Copyright Reppoo',
        social: {
            facebook: true,
            twitter: true,
            instagram: true,
            linkedin: true,
        },
        navigations: [
            {
                title: 'Company',
                pages: [
                    { name: 'Home', url: '#' },
                    { name: 'Early Access', url: '#' },
                    { name: '404', url: '#' },
                ],
            },
            {
                title: 'App',
                pages: [
                    { name: 'Download for IOS', url: '#' },
                    { name: 'Download for Android', url: '#' },
                ],
            },
            {
                title: 'Legal Pages',
                pages: [
                    { name: 'Privacy Policy', url: '#' },
                    { name: 'Terms of Service', url: '#' },
                ],
            },
        ],
    },
});

export async function GET() {
    try {
        await dbConnect();

        let content = await Content.findOne();

        // Only create default content if none exists
        if (!content) {
            content = await Content.create(getDefaultContent());
        }

        return NextResponse.json(content);
    } catch (error: any) {
        console.error('GET /api/content error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch content', details: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        // Validate request body
        if (!body || Object.keys(body).length === 0) {
            return NextResponse.json(
                { error: 'No data provided for update' },
                { status: 400 }
            );
        }

        // Remove MongoDB internal fields to avoid conflicts
        const { _id, __v, ...updateData } = body;

        // Update or create content
        const content = await Content.findOneAndUpdate(
            {},
            { ...updateData, updatedAt: new Date() },
            {
                new: true,
                upsert: true,
                runValidators: false,
            }
        );

        if (!content) {
            return NextResponse.json(
                { error: 'Failed to update content' },
                { status: 500 }
            );
        }

        return NextResponse.json(content);
    } catch (error: any) {
        console.error('PUT /api/content error:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            return NextResponse.json(
                { error: 'Validation error', details: error.message },
                { status: 400 }
            );
        }

        // Handle other errors
        return NextResponse.json(
            { error: 'Failed to update content', details: error.message },
            { status: 500 }
        );
    }
}
