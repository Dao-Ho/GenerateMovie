import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
    const apiRoute = process.env.NEXT_PUBLIC_WATCHING_MOVIES;

    if (!apiRoute) {
        return NextResponse.json({ error: 'API route is not defined' }, { status: 500 });
    }

    try {
        const response = await axios.get(apiRoute);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
    }
}