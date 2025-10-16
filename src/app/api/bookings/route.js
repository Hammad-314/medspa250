// In-memory storage for demo purposes (in production, use a database)
let bookings = [];

// Helper function to extract user ID from token or request
function extractUserId(req, body) {
  // Get user ID from Authorization header
  const authHeader = req.headers.get('authorization');
  let userId = null;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    
    // For demo purposes, we'll create a consistent user ID based on token
    // In production, you would decode the JWT token and extract the user ID
    try {
      // Create a consistent user ID based on token hash (demo approach)
      // In real app: const decoded = jwt.verify(token, JWT_SECRET);
      // userId = decoded.userId;
      
      // For demo, use a simple hash of the token to create consistent user ID
      let hash = 0;
      for (let i = 0; i < token.length; i++) {
        const char = token.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      userId = `user_${Math.abs(hash)}`;
    } catch (error) {
      console.warn('Could not extract user ID from token:', error);
    }
  }

  // If no auth token, try to get userId from request body (fallback)
  if (!userId && body.userId) {
    userId = body.userId;
  }

  // If still no userId, generate one (for demo purposes)
  if (!userId) {
    userId = `user_${Date.now()}`;
  }

  return userId;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, about } = body;

    // Extract user ID
    const userId = extractUserId(req, body);

    // Validate required fields
    if (!name || !email || !phone || !about) {
      return Response.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Additional validation
    if (typeof name !== 'string' || name.trim().length === 0) {
      return Response.json({ message: "Name is required and must be a valid string" }, { status: 400 });
    }

    if (typeof email !== 'string' || !email.includes('@')) {
      return Response.json({ message: "Valid email is required" }, { status: 400 });
    }

    if (typeof phone !== 'string' || phone.trim().length === 0) {
      return Response.json({ message: "Phone number is required" }, { status: 400 });
    }

    if (typeof about !== 'string') {
      return Response.json({ message: "About field must be a string" }, { status: 400 });
    }

    // Create booking object
    const booking = {
      id: `booking_${Date.now()}`,
      userId: userId || `user_${Date.now()}`, // Generate user ID if not provided
      name,
      email,
      phone,
      about,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // Store booking
    bookings.push(booking);
    
    console.log("Booking created:", booking);
    
    return Response.json({ 
      message: "Booking successful!", 
      booking: {
        id: booking.id,
        status: booking.status,
        createdAt: booking.createdAt
      }
    }, { status: 201 });
  } catch (err) {
    console.error("Booking error:", err);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    // Check if requesting user's own bookings
    const url = new URL(req.url);
    const mine = url.searchParams.get('mine');
    const requestedUserId = url.searchParams.get('userId');

    if (mine === 'true') {
      // Extract user ID for authenticated requests
      const userId = extractUserId(req, {});
      
      if (!userId) {
        return Response.json({ message: "Not authenticated" }, { status: 401 });
      }
      
      // Return only bookings for the authenticated user
      const userBookings = bookings.filter(booking => booking.userId === userId);
      console.log(`Returning ${userBookings.length} bookings for user ${userId}`);
      return Response.json({ bookings: userBookings }, { status: 200 });
    }

    if (requestedUserId) {
      // Return bookings for specific user (if not using auth)
      const userBookings = bookings.filter(booking => booking.userId === requestedUserId);
      return Response.json({ bookings: userBookings }, { status: 200 });
    }

    // If no specific user requested, return all bookings (admin only)
    // In production, check if user has admin role
    return Response.json({ bookings }, { status: 200 });
  } catch (err) {
    console.error("Get bookings error:", err);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
