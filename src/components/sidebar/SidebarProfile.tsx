"use client"
import React, { useEffect, useState } from 'react'
import { SidebarFooter } from '../ui/sidebar'
import SidebarFooterMenu from './sidebar-footer-menu'
import useUser from '@/hooks/useUser'

interface User {
    name: string;
    email: string;
    avatar: string;
}

const SidebarProfile = () => {
    const [user, setUser] = useState<User | null>(null);
    const { getMyUserInfo } = useUser();

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getMyUserInfo();
            if (userData!==null || userData!==undefined) {
                setUser(userData);
            }
        };
        fetchUser();
    }, []);

    return (
        <SidebarFooter>
            <SidebarFooterMenu user={user} />
        </SidebarFooter>
    )
}

export default SidebarProfile