"use client"
import Axios from '@/lib/axiosInstance';
import { useEffect, useState } from 'react';

export default function useProfile() {
    const [walletBalance, setWalletBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await Axios.get('profile');
                setWalletBalance(res.data.user.wallet);
            } catch (e) {
                console.error(e);
                setError('Failed to fetch profile data.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    return { walletBalance, loading, error };
}