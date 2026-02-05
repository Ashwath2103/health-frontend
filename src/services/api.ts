const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetcher(url: string, options?: RequestInit) {
    // Get token from local storage if available (since auth store persists there)
    // Or handle via state passing. For simplicity with zustand persist:
    let token = null;
    if (typeof window !== 'undefined') {
        const storage = localStorage.getItem('health-auth-storage');
        if (storage) {
            const parsed = JSON.parse(storage);
            token = parsed.state?.token;
        }
    }

    const headers = {
        'Content-Type': 'application/json',
        ...options?.headers,
    } as HeadersInit;

    if (token) {
        (headers as any)['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${url}`, {
        headers,
        ...options,
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || 'An error occurred while fetching the data.');
    }

    return data;
}

export const authApi = {
    citizenLogin: (abhaId: string, password: string) =>
        fetcher('/auth/citizen/login', { method: 'POST', body: JSON.stringify({ abhaId, password }) }),
    doctorLogin: (licenseId: string, password: string) =>
        fetcher('/auth/doctor/login', { method: 'POST', body: JSON.stringify({ licenseId, password }) }),
    citizenRegister: (data: any) =>
        fetcher('/auth/citizen/register', { method: 'POST', body: JSON.stringify(data) }),
    doctorRegister: (data: any) =>
        fetcher('/auth/doctor/register', { method: 'POST', body: JSON.stringify(data) }),
};

export const citizenApi = {
    getProfile: (userId: string) => fetcher(`/citizen/profile/${userId}`),
    getHistory: (userId: string) => fetcher(`/citizen/history/${userId}`),
    toggleConsent: (data: { patientId: string; doctorId: string; status: string }) =>
        fetcher('/citizen/consent', { method: 'POST', body: JSON.stringify(data) }),
};

export const doctorApi = {
    searchPatient: (abhaId: string) => fetcher(`/doctor/search-patient?abhaId=${abhaId}`),
    getPatientRecords: (patientId: string, doctorId: string) =>
        fetcher(`/doctor/patient-records?patientId=${patientId}&doctorId=${doctorId}`),
    addRecord: (data: any) => fetcher('/doctor/record', { method: 'POST', body: JSON.stringify(data) }),
};
