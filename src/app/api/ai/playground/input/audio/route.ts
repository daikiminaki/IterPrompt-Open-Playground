import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!audioFile.type.startsWith('audio/')) {
      return NextResponse.json(
        { error: 'File must be an audio file' },
        { status: 400 }
      );
    }

    // Validate file size (e.g., 10MB limit)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (audioFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Process the audio file
    // 2. Store it in your preferred storage solution
    // 3. Return a success response with relevant metadata

    // TODO: Process the audio file
    // TODO: Store it in your preferred storage solution
    // TODO: Return a success response with relevant metadata


    return NextResponse.json({
      success: true,
      filename: audioFile.name,
      size: audioFile.size,
      type: audioFile.type,
    });
  } catch (error) {
    console.error('Error processing audio upload:', error);
    return NextResponse.json(
      { error: 'Failed to process audio upload' },
      { status: 500 }
    );
  }
}

// Optional: Add OPTIONS handler for CORS if needed
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
