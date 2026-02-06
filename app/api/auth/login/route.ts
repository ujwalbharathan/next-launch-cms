import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { email, password } = await request.json();

        let admin = await Admin.findOne({ email });

        if (!admin) {
            const defaultEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
            const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';

            if (email === defaultEmail) {
                const hashedPassword = await bcrypt.hash(defaultPassword, 10);
                admin = await Admin.create({ email: defaultEmail, password: hashedPassword });
            } else {
                return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
            }
        }

        const isValid = await bcrypt.compare(password, admin.password);

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        return NextResponse.json({ success: true, email: admin.email });
    } catch (error) {
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }
}
