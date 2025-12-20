import api from "./api";

/**
 * Booking API Service
 * Handles all booking-related API calls
 */

export const bookingService = {
  /**
   * Create a new booking
   * @param {Object} bookingData - Booking data { event, num_tickets, ... }
   * @returns {Promise} Response with booking details
   */
  createBooking: async (bookingData) => {
    try {
      const response = await api.post("bookings/", bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Failed to create booking" };
    }
  },

  /**
   * Get all bookings for the current user
   * @returns {Promise} Array of booking objects
   */
  getMyBookings: async () => {
    try {
      const response = await api.get("bookings/");
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Failed to fetch bookings" };
    }
  },

  /**
   * Get a specific booking by ID
   * @param {number} bookingId - Booking ID
   * @returns {Promise} Booking details
   */
  getBookingById: async (bookingId) => {
    try {
      const response = await api.get(`bookings/${bookingId}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Failed to fetch booking" };
    }
  },

  /**
   * Cancel a booking
   * @param {number} bookingId - Booking ID
   * @returns {Promise} Updated booking with cancelled status
   */
  cancelBooking: async (bookingId) => {
    try {
      const response = await api.patch(`bookings/${bookingId}/`, {
        status: "cancelled",
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Failed to cancel booking" };
    }
  },
};

export default bookingService;
