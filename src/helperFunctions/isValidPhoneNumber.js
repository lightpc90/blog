export default function IsValidPhoneNumber(entry) {
    // Regular expression for phone number validation
    const phoneRegex = /^\d{11}$/; // Assumes a 11-digit phone number without any special characters
  
    return phoneRegex.test(entry);
  }