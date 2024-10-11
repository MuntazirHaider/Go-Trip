import { NextResponse } from "next/server"
import { v4 as uuidv4 } from 'uuid'

const MapBoxBaseUrl = process.env.MAPBOX_BASE_URL;
const AccessToken = process.env.MAPBOX_ACCESS_TOKEN;

export async function GET(request: any) {

    const SessionToken = uuidv4();
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get('searchFor');
    const response = await fetch(`${MapBoxBaseUrl}?q=${searchText}&language=en&limit=6&country=IN&session_token=${SessionToken}&access_token=${AccessToken}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return NextResponse.json(result);
}