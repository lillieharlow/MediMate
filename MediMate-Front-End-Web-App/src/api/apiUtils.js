/*
 * API Utilities:
 * - getApiResponse: sends GET, POST, PATCH, and DELETE requests.
 *   Auto adds authentication tokens for protected routes, handles errors,
 *   Returns server response in a consistent format.
 *
 * - getErrorReason: user-friendly error message from API response.
 */

import { API_BASE_URL } from './apiConfig';

export const getApiResponse = async (method, endpoint, body, sendToken = false) => {
  const methods = ['GET', 'POST', 'PATCH', 'DELETE'];
  if (!methods.includes(method)) throw new Error('Method not recognised');

  const headers = {
    'Content-Type': 'application/json',
  };

  if (sendToken) {
    const token = localStorage.getItem('token');
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: method,
      headers,
      body: method === 'GET' || method === 'DELETE' ? undefined : JSON.stringify(body),
    });

    let responseData;
    try {
      responseData = await response.json();
    } catch {
      responseData = {
        error: 'Invalid JSON response',
        status: response.status,
      };
    }

    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }

    if (!response.ok) {
      const error = {
        status: response.status,
        message: responseData?.message || response.statusText || 'Unknown error',
        data: responseData,
      };
      throw error;
    }
    return responseData;
  } catch (error) {
    return {
      success: false,
      status: error.status || 500,
      message: error.message || 'Network or server error',
      error: error.data || error,
    };
  }
};

export const getErrorReason = apiResponse => {
  const errorsString = Array.isArray(apiResponse.errors)
    ? apiResponse.errors
        .map(e => e?.msg)
        .filter(Boolean)
        .join(', ')
    : undefined;

  return errorsString || apiResponse.message || apiResponse.name || 'Unknown error';
};
