import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Profile from '@/models/Profile';

export async function POST(req: Request) {
  await dbConnect();
  
  try {
    const body = await req.json();
    console.log('POST - Request body:', body);
    const profile = await Profile.create(body);
    console.log('POST - Created profile:', profile);
    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json({ 
      error: 'Failed to create profile', 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  await dbConnect();
  
  try {
    const body = await req.json();
    const { address } = body;
    console.log('PUT - Request body:', body);
    console.log('PUT - Address:', address);
    
    const updatedProfile = await Profile.findOneAndUpdate(
      { address },
      body,
      { new: true, runValidators: true }
    );
    
    console.log('PUT - Updated profile:', updatedProfile);
    
    if (!updatedProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ 
      error: 'Failed to update profile', 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 400 });
  }
}

export async function GET(req: Request) {
  await dbConnect();
  
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || '';
    console.log('GET - Search query:', query);
    
    const profiles = await Profile.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { address: { $regex: query, $options: 'i' } },
      ]
    }).limit(20);
    
    console.log('GET - Fetched profiles:', profiles);
    return NextResponse.json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch profiles', 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 400 });
  }
}
